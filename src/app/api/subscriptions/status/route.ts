// API para obtener estado de suscripción - TEMPORALMENTE DESHABILITADA
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // TEMPORALMENTE DESHABILITADA - Firebase API Key Error
  return NextResponse.json({ 
    success: false, 
    error: 'API temporalmente deshabilitada' 
  }, { status: 503 });
}