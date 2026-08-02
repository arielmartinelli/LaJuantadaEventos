// api/config.js
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

/**
 * Claves que NUNCA deben salir del servidor ni escribirse desde el panel.
 * La autenticación vive en Supabase Auth, no en la tabla de configuración.
 */
const SENSITIVE_KEYS = new Set([
  'admin_password',
  'admin_username',
  'admin_pass',
  'password',
]);

/** Orígenes autorizados a mandar peticiones con credenciales. */
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
  // Sin configuración explícita: sólo se admite el mismo host que sirve la API.
  try {
    if (new URL(origin).host === req.headers.host) return origin;
  } catch (_) {
    return null;
  }
  return null;
}

/**
 * Verifica el JWT de Supabase Auth y comprueba que el usuario sea admin.
 * Devuelve { user } si es válido, o { error, status } si no.
 */
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

/**
 * Borra las filas de `table` cuya columna `column` no esté en `activeValues`.
 * Se resuelve leyendo primero y borrando con .in(), que escapa los valores
 * correctamente (evita inyección en el filtro PostgREST) y permite además
 * borrar el último elemento cuando la lista queda vacía.
 */
async function deleteObsolete(client, table, column, activeValues) {
  const { data: existing, error: readErr } = await client.from(table).select(column);
  if (readErr) {
    console.error(`Error leyendo ${table} para limpiar obsoletos:`, readErr);
    return;
  }

  const active = new Set(activeValues.map((v) => String(v)));
  const toDelete = (existing || [])
    .map((row) => row[column])
    .filter((v) => v !== null && v !== undefined && !active.has(String(v)));

  if (toDelete.length === 0) return;

  const { error: delErr } = await client.from(table).delete().in(column, toDelete);
  if (delErr) {
    console.error(`Error eliminando registros obsoletos de ${table}:`, delErr);
  }
}

export default async function handler(req, res) {
  const allowedOrigin = resolveAllowedOrigin(req);
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Supabase credentials are not configured in Vercel environment variables.' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // METODO GET: Cargar configuraciones, servicios, carrusel y galería (público)
  if (req.method === 'GET') {
    // Este endpoint es público: sólo debe exponer datos públicos del sitio.
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      // 1. Cargar configs
      const { data: configData, error: configError } = await supabase
        .from('lajuntada_config')
        .select('key, value');
      if (configError) throw configError;

      const configs = {};
      configData.forEach((item) => {
        // Nunca exponer credenciales al navegador.
        if (SENSITIVE_KEYS.has(item.key)) return;
        configs[item.key] = item.value;
      });

      // 2. Cargar servicios adicionales
      const { data: services, error: servicesError } = await supabase
        .from('lajuntada_services')
        .select('*')
        .order('key', { ascending: true });
      if (servicesError) throw servicesError;

      // 3. Cargar slides de carrusel
      const { data: carousel, error: carouselError } = await supabase
        .from('lajuntada_carousel')
        .select('*')
        .order('created_at', { ascending: true });
      if (carouselError) throw carouselError;

      // 4. Cargar galería
      const { data: gallery, error: galleryError } = await supabase
        .from('lajuntada_gallery')
        .select('*')
        .order('created_at', { ascending: true });
      if (galleryError) throw galleryError;

      return res.status(200).json({
        // La anon key es pública por diseño (protegida por RLS), la service_role NUNCA se envía.
        supabaseUrl,
        supabaseAnonKey,
        configs,
        services,
        carousel,
        gallery,
      });
    } catch (err) {
      console.error('Error en GET /api/config:', err);
      return res.status(500).json({ error: 'No se pudieron cargar los datos del sitio.' });
    }
  }

  // METODO POST: Guardar cambios completos en lote (requiere sesión de admin)
  if (req.method === 'POST') {
    const auth = await authenticate(req);
    if (auth.error) {
      return res.status(auth.status).json({ error: auth.error });
    }

    try {
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const token = (req.headers.authorization || '').slice(7).trim();

      // Ya validamos que quien llama es un admin autenticado.
      const targetSupabase = serviceRoleKey
        ? createClient(supabaseUrl, serviceRoleKey)
        : createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } },
          });

      const { configs, services, carousel, gallery } = req.body;

      // 1. Guardar configs (descartando cualquier intento de escribir credenciales)
      if (configs && Array.isArray(configs)) {
        const cleanedConfigs = configs
          .filter((c) => c && c.key && !SENSITIVE_KEYS.has(String(c.key)))
          .map((c) => ({ key: String(c.key), value: String(c.value ?? '') }));

        if (cleanedConfigs.length > 0) {
          const { error: err } = await targetSupabase
            .from('lajuntada_config')
            .upsert(cleanedConfigs, { onConflict: 'key' });
          if (err) {
            console.error('Error al guardar configs en Supabase:', err);
            throw new Error('Error guardando configuraciones: ' + err.message);
          }
        }
      }

      // 2. Guardar servicios y eliminar los eliminados
      if (services && Array.isArray(services)) {
        const cleanedServices = services
          .filter((s) => s && String(s.key || '').trim())
          .map((s) => ({
            key: String(s.key).trim(),
            name: String(s.name || ''),
            description: String(s.description || ''),
            price: Number(s.price || 0),
            is_per_person: Boolean(s.is_per_person),
            is_available: Boolean(s.is_available),
            category: String(s.category || 'adicional'),
            tag: String(s.tag || ''),
          }));

        if (cleanedServices.length > 0) {
          const { error: err } = await targetSupabase
            .from('lajuntada_services')
            .upsert(cleanedServices, { onConflict: 'key' });
          if (err) {
            console.error('Error al guardar servicios en Supabase:', err);
            throw new Error('Error guardando servicios: ' + err.message);
          }
        }

        await deleteObsolete(
          targetSupabase,
          'lajuntada_services',
          'key',
          cleanedServices.map((s) => s.key)
        );
      }

      // 3. Guardar carrusel y eliminar los eliminados
      if (carousel && Array.isArray(carousel)) {
        const cleanedCarousel = carousel.map((c) => {
          const item = {
            title: String(c.title || ''),
            description: String(c.description || ''),
            image_url: String(c.image_url || ''),
          };
          if (c.id) item.id = c.id;
          return item;
        });

        if (cleanedCarousel.length > 0) {
          const { error: err } = await targetSupabase
            .from('lajuntada_carousel')
            .upsert(cleanedCarousel);
          if (err) {
            console.error('Error al guardar carrusel en Supabase:', err);
            throw new Error('Error guardando carrusel: ' + err.message);
          }
        }

        await deleteObsolete(
          targetSupabase,
          'lajuntada_carousel',
          'id',
          cleanedCarousel.filter((c) => c.id).map((c) => c.id)
        );
      }

      // 4. Guardar galeria y eliminar los eliminados
      if (gallery && Array.isArray(gallery)) {
        const cleanedGallery = gallery.map((g) => {
          const item = {
            title: String(g.title || ''),
            category: String(g.category || 'casamiento'),
            image_url: String(g.image_url || ''),
          };
          if (g.id) item.id = g.id;
          return item;
        });

        if (cleanedGallery.length > 0) {
          const { error: err } = await targetSupabase
            .from('lajuntada_gallery')
            .upsert(cleanedGallery);
          if (err) {
            console.error('Error al guardar galeria en Supabase:', err);
            throw new Error('Error guardando galería: ' + err.message);
          }
        }

        await deleteObsolete(
          targetSupabase,
          'lajuntada_gallery',
          'id',
          cleanedGallery.filter((g) => g.id).map((g) => g.id)
        );
      }

      return res.status(200).json({ success: true, message: 'Todo guardado exitosamente en Supabase.' });
    } catch (err) {
      console.error('Error en POST /api/config:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
