// api/upload.js
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const BUCKET_NAME = 'lajuntada_images';
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};
const ALLOWED_FOLDERS = new Set(['general', 'carousel', 'gallery', 'salones', 'menu']);

function resolveAllowedOrigin(req) {
  const configured = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  const origin = req.headers.origin;
  if (!origin) return null;
  if (configured.length > 0) {
    return configured.includes(origin) ? origin : null;
  }
  // Sin configuración explícita: sólo el mismo host que sirve la API.
  try {
    if (new URL(origin).host === req.headers.host) return origin;
  } catch (_) {
    return null;
  }
  return null;
}

/** Verifica el JWT de Supabase Auth y que el usuario sea admin. */
async function authenticate(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

  if (!token) {
    return { error: 'No autorizado: falta el token de sesión.', status: 401 };
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await authClient.auth.getUser(token);

  if (error || !data || !data.user) {
    return { error: 'No autorizado: sesión inválida o expirada.', status: 401 };
  }

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (adminEmails.length > 0) {
    const email = (data.user.email || '').toLowerCase();
    if (!adminEmails.includes(email)) {
      return { error: 'No autorizado: la cuenta no tiene permisos de administrador.', status: 403 };
    }
  }

  return { user: data.user };
}

export default async function handler(req, res) {
  const allowedOrigin = resolveAllowedOrigin(req);
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Supabase credentials are not configured in Vercel environment variables.' });
  }

  // Subir archivos sólo está permitido a un administrador autenticado.
  const auth = await authenticate(req);
  if (auth.error) {
    return res.status(auth.status).json({ error: auth.error });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { image, folder = 'general' } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'No image provided' });
    }

    const safeFolder = ALLOWED_FOLDERS.has(String(folder)) ? String(folder) : 'general';

    // Sólo aceptamos data URLs de imagen: así el content-type es verificable.
    const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Formato inválido. Se espera una data URL de imagen en base64.' });
    }

    const contentType = matches[1].toLowerCase();
    const ext = ALLOWED_TYPES[contentType];
    if (!ext) {
      return res.status(415).json({ error: `Tipo de imagen no permitido: ${contentType}` });
    }

    const buffer = Buffer.from(matches[2], 'base64');
    if (buffer.length === 0) {
      return res.status(400).json({ error: 'La imagen está vacía o mal codificada.' });
    }
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ error: 'La imagen supera el límite de 8 MB.' });
    }

    const filePath = `${safeFolder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, { contentType, upsert: false });

    if (uploadError) {
      console.error('Error al subir a Supabase Storage:', uploadError);
      return res.status(500).json({ error: 'Error de almacenamiento en Supabase: ' + uploadError.message });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    return res.status(200).json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Error en handler /api/upload:', err);
    return res.status(500).json({ error: err.message });
  }
}
