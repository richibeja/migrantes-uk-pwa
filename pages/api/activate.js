// API route para activación de códigos
// Esta ruta se ejecuta en el servidor de Next.js

export default async function handler(req, res) {
  const { method } = req;
  
  if (method === 'OPTIONS') {
    // Habilitar preflight por si llaman desde otros orígenes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }

  const baseUrl = process.env.GAS_ACTIVATE_URL;
  if (!baseUrl) {
    return res.status(500).json({ 
      success: false, 
      message: 'GAS_ACTIVATE_URL not configured' 
    });
  }

  try {
    let targetUrl = baseUrl;
    
    // Agregar parámetros de consulta si existen
    if (req.query && Object.keys(req.query).length > 0) {
      const searchParams = new URLSearchParams();
      if (req.query.action) searchParams.set('action', req.query.action);
      if (req.query.code) searchParams.set('code', req.query.code);
      targetUrl += '?' + searchParams.toString();
    }

    const response = await fetch(targetUrl, {
      method: method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.status(response.status).send(data);
    
  } catch (error) {
    console.error('Error en API activate:', error);
    res.status(502).json({ 
      success: false, 
      message: 'Upstream error' 
    });
  }
}
