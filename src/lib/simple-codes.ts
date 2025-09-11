// Sistema Simple de Códigos - Solo lo que funciona
// Códigos predefinidos que SIEMPRE funcionan en producción

export interface SimpleCode {
  code: string;
  plan: 'basic' | 'premium' | 'vip';
  description: string;
}

// Códigos predefinidos que funcionan en cualquier navegador
export const SIMPLE_CODES: SimpleCode[] = [
  {
    code: 'GANAFACIL',
    plan: 'premium',
    description: 'Código de prueba principal'
  },
  {
    code: 'PREMIUM123',
    plan: 'premium',
    description: 'Código premium de prueba'
  },
  {
    code: 'VIP456',
    plan: 'vip',
    description: 'Código VIP de prueba'
  },
  {
    code: 'BASIC789',
    plan: 'basic',
    description: 'Código básico de prueba'
  },
  {
    code: 'PZMEUE',
    plan: 'premium',
    description: 'Código generado por admin'
  },
  {
    code: '6C9USH',
    plan: 'basic',
    description: 'Código generado por admin'
  }
];

// Validar código simple
export function validateSimpleCode(code: string): { valid: boolean; plan?: string; message?: string } {
  const upperCode = code.toUpperCase();
  const codeData = SIMPLE_CODES.find(c => c.code === upperCode);
  
  if (!codeData) {
    return { valid: false, message: 'Código no válido' };
  }
  
  return { 
    valid: true, 
    plan: codeData.plan,
    message: 'Código válido'
  };
}

// Obtener todos los códigos
export function getAllSimpleCodes(): SimpleCode[] {
  return [...SIMPLE_CODES];
}

// Obtener estadísticas
export function getSimpleStats() {
  return {
    total: SIMPLE_CODES.length,
    available: SIMPLE_CODES.length,
    used: 0
  };
}

// Generar código simple (solo para admin)
export function generateSimpleCode(plan: 'basic' | 'premium' | 'vip' = 'premium'): { success: boolean; code?: string; error?: string } {
  try {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    // Generar código de 6 caracteres
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Verificar que no existe
    if (SIMPLE_CODES.some(c => c.code === code)) {
      return generateSimpleCode(plan); // Recursivo si existe
    }
    
    return { success: true, code };
  } catch (error) {
    return { success: false, error: 'Error generando código' };
  }
}
