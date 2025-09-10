import { NextRequest, NextResponse } from 'next/server';

// Simular base de datos en memoria (para desarrollo)
const codesDatabase = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const { code, email } = await request.json();

    if (!code) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Código requerido' 
      }, { status: 400 });
    }

    // Buscar el código en la base de datos en memoria
    const codeData = codesDatabase.get(code.toUpperCase());

    if (!codeData) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Código no válido' 
      }, { status: 404 });
    }

    // Verificar si ya fue usado
    if (codeData.used) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Este código ya fue usado' 
      }, { status: 400 });
    }

    // Verificar si ha expirado
    if (codeData.expiresAt && new Date() > new Date(codeData.expiresAt)) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Este código ha expirado' 
      }, { status: 400 });
    }

    // Marcar como usado
    codeData.used = true;
    codeData.usedAt = new Date();
    codeData.usedBy = email || 'unknown';
    codesDatabase.set(code.toUpperCase(), codeData);

    // Crear usuario activado
    const userData = {
      id: `user_${Date.now()}`,
      email: codeData.email || email,
      name: codeData.email?.split('@')[0] || 'Usuario',
      plan: codeData.plan || 'premium',
      activated: true,
      activatedAt: new Date(),
      method: 'unique_code',
      code: code
    };

    return NextResponse.json({ 
      valid: true, 
      message: 'Código válido. Cuenta activada.',
      userData 
    });

  } catch (error) {
    console.error('Error validating code:', error);
    return NextResponse.json({ 
      valid: false, 
      error: 'Error del servidor' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Obtener estadísticas de códigos de la base de datos en memoria
    const codes = Array.from(codesDatabase.values());

    const total = codes.length;
    const used = codes.filter(code => code.used).length;
    const available = total - used;

    return NextResponse.json({
      total,
      used,
      available,
      codes: codes.slice(0, 10) // Solo los primeros 10 para no sobrecargar
    });

  } catch (error) {
    console.error('Error getting codes stats:', error);
    return NextResponse.json({ 
      error: 'Error del servidor' 
    }, { status: 500 });
  }
}
