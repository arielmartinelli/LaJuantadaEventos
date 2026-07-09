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

  // METODO GET: Cargar configuraciones y credenciales públicas
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('lajuntada_config')
        .select('key, value');

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Convertir array de configs en un objeto simple key-value
      const configs = {};
      data.forEach(item => {
        configs[item.key] = item.value;
      });

      return res.status(200).json({
        supabaseUrl,
        supabaseAnonKey,
        configs
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // METODO POST: Guardar configuraciones validadas con JWT Token de Supabase Auth
  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is required' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    try {
      // Verificar validez del token en Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      // Validar que el usuario sea Leo
      if (user.email !== 'leo@lajuntada.com.ar') {
        return res.status(403).json({ error: 'Forbidden: Access denied' });
      }

      const payload = req.body;
      if (!Array.isArray(payload)) {
        return res.status(400).json({ error: 'Invalid payload format. Expected array of configs.' });
      }

      const { error: upsertError } = await supabase
        .from('lajuntada_config')
        .upsert(payload, { onConflict: 'key' });

      if (upsertError) {
        return res.status(500).json({ error: upsertError.message });
      }

      return res.status(200).json({ success: true, message: 'Config saved' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
