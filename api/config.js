// api/config.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Supabase credentials are not configured in Vercel environment variables.' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // METODO GET: Cargar configuraciones, servicios, carrusel y galería
  if (req.method === 'GET') {
    try {
      // 1. Cargar configs
      const { data: configData, error: configError } = await supabase
        .from('lajuntada_config')
        .select('key, value');
      if (configError) throw configError;

      const configs = {};
      configData.forEach(item => {
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
        supabaseUrl,
        supabaseAnonKey,
        configs,
        services,
        carousel,
        gallery
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // METODO POST: Guardar cambios completos en lote
  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is required' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    try {
      // Inicializar el cliente Supabase pasando el token del usuario en las cabeceras globales
      // para que PostgreSQL herede el rol 'authenticated' y cumpla con las políticas RLS.
      const authenticatedSupabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      });

      const { data: { user }, error: authError } = await authenticatedSupabase.auth.getUser();
      
      if (authError || !user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      if (user.email !== 'leo@lajuntada.com.ar' && user.email !== 'lajuntadaeventos@gmail.com') {
        return res.status(403).json({ error: 'Forbidden: Access denied' });
      }

      const { configs, services, carousel, gallery } = req.body;

      // 1. Guardar configs
      if (configs && Array.isArray(configs)) {
        const { error: err } = await authenticatedSupabase
          .from('lajuntada_config')
          .upsert(configs, { onConflict: 'key' });
        if (err) throw err;
      }

      // 2. Guardar servicios y eliminar los eliminados
      if (services && Array.isArray(services)) {
        const cleanedServices = services.map(s => ({
          key: String(s.key || ''),
          name: String(s.name || ''),
          description: String(s.description || ''),
          price: Number(s.price || 0),
          is_per_person: Boolean(s.is_per_person),
          is_available: Boolean(s.is_available),
          category: String(s.category || 'adicional'),
          tag: String(s.tag || '')
        }));

        const { error: err } = await authenticatedSupabase
          .from('lajuntada_services')
          .upsert(cleanedServices, { onConflict: 'key' });
        if (err) throw err;

        const activeKeys = cleanedServices.map(s => s.key).filter(k => k);
        if (activeKeys.length > 0) {
          const { error: delErr } = await authenticatedSupabase
            .from('lajuntada_services')
            .delete()
            .not('key', 'in', `(${activeKeys.join(',')})`);
          if (delErr) throw delErr;
        }
      }

      // 3. Guardar carrusel y eliminar los eliminados
      if (carousel && Array.isArray(carousel)) {
        const { error: err } = await authenticatedSupabase
          .from('lajuntada_carousel')
          .upsert(carousel);
        if (err) throw err;

        const activeIds = carousel.filter(c => c.id).map(c => c.id);
        if (activeIds.length > 0) {
          const { error: delErr } = await authenticatedSupabase
            .from('lajuntada_carousel')
            .delete()
            .not('id', 'in', `(${activeIds.join(',')})`);
          if (delErr) throw delErr;
        } else {
          const { error: delErr } = await authenticatedSupabase
            .from('lajuntada_carousel')
            .delete()
            .neq('image_url', '');
          if (delErr) throw delErr;
        }
      }

      // 4. Guardar galeria y eliminar los eliminados
      if (gallery && Array.isArray(gallery)) {
        const { error: err } = await authenticatedSupabase
          .from('lajuntada_gallery')
          .upsert(gallery);
        if (err) throw err;

        const activeIds = gallery.filter(g => g.id).map(g => g.id);
        if (activeIds.length > 0) {
          const { error: delErr } = await authenticatedSupabase
            .from('lajuntada_gallery')
            .delete()
            .not('id', 'in', `(${activeIds.join(',')})`);
          if (delErr) throw delErr;
        } else {
          const { error: delErr } = await authenticatedSupabase
            .from('lajuntada_gallery')
            .delete()
            .neq('image_url', '');
          if (delErr) throw delErr;
        }
      }

      return res.status(200).json({ success: true, message: 'Todo guardado exitosamente.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
