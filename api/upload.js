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
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Supabase credentials are not configured in Vercel environment variables.' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { image, folder = 'general' } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    let buffer;
    let contentType = 'image/jpeg';
    
    if (typeof image === 'string' && image.startsWith('data:')) {
      const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (matches) {
        contentType = matches[1];
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(image, 'base64');
      }
    } else if (Buffer.isBuffer(image)) {
      buffer = image;
    } else {
      buffer = Buffer.from(image);
    }

    const bucketName = 'lajuntada_images';

    // Intentar asegurar o crear el bucket publico
    try {
      await supabase.storage.createBucket(bucketName, { public: true });
    } catch (bErr) {
      // El bucket ya existe
    }

    const ext = contentType.includes('png') ? 'png' : 'jpg';
    const filePath = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType,
        upsert: true
      });

    if (uploadError) {
      console.error("Error al subir a Supabase Storage via admin API:", uploadError);
      return res.status(500).json({ error: 'Error de almacenamiento en Supabase: ' + uploadError.message });
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return res.status(200).json({ success: true, url: publicUrl });
  } catch (err) {
    console.error("Error en handler /api/upload:", err);
    return res.status(500).json({ error: err.message });
  }
}
