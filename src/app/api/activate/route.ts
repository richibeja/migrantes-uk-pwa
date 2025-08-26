import { NextRequest, NextResponse } from 'next/server';

// Proxy a Google Apps Script para evitar CORS desde el navegador
// Configurar en variables de entorno: GAS_ACTIVATE_URL

function buildTargetUrl(baseUrl: string, search: URLSearchParams): string {
  const url = new URL(baseUrl);
  // Solo pasar parámetros permitidos
  const action = search.get('action');
  const code = search.get('code');
  if (action) url.searchParams.set('action', action);
  if (code) url.searchParams.set('code', code);
  return url.toString();
}

export async function GET(req: NextRequest) {
  const baseUrl = process.env.GAS_ACTIVATE_URL;
  if (!baseUrl) {
    return NextResponse.json({ success: false, message: 'GAS_ACTIVATE_URL not configured' }, { status: 500 });
  }

  try {
    const targetUrl = buildTargetUrl(baseUrl, req.nextUrl.searchParams);
    const res = await fetch(targetUrl, { method: 'GET' });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Upstream error' }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  const baseUrl = process.env.GAS_ACTIVATE_URL;
  if (!baseUrl) {
    return NextResponse.json({ success: false, message: 'GAS_ACTIVATE_URL not configured' }, { status: 500 });
  }

  try {
    const body = await req.text();
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': req.headers.get('content-type') || 'application/json' },
      body,
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Upstream error' }, { status: 502 });
  }
}

export async function OPTIONS() {
  // Habilitar preflight por si llaman desde otros orígenes (opcional)
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}



