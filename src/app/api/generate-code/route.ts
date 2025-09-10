import { NextRequest, NextResponse } from 'next/server';
import { codesDatabase } from '@/lib/codes-database';

export async function POST(request: NextRequest) {
  try {
    const { email, plan = 'premium' } = await request.json();

    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email requerido' 
      }, { status: 400 });
    }

    // Crear código único usando la base de datos compartida
    const { code, data } = codesDatabase.createCode(email, plan);

    return NextResponse.json({ 
      success: true, 
      code: code,
      id: `local_${Date.now()}`,
      expiresAt: data.expiresAt.toISOString(),
      message: 'Código generado exitosamente'
    });

  } catch (error) {
    console.error('Error generating code:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error generando código' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Obtener todos los códigos de la base de datos compartida
    const codes = codesDatabase.getAllCodes().map(codeData => ({
      id: `local_${codeData.code}`,
      ...codeData,
      createdAt: codeData.createdAt?.toISOString() || null,
      expiresAt: codeData.expiresAt?.toISOString() || null,
      usedAt: codeData.usedAt?.toISOString() || null
    }));

    return NextResponse.json({ 
      success: true, 
      codes 
    });

  } catch (error) {
    console.error('Error getting codes:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error obteniendo códigos' 
    }, { status: 500 });
  }
}
