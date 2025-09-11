// Sistema de Códigos Predefinidos - Funciona en Producción
// Los códigos se almacenan en el código fuente, no en localStorage

export interface PredefinedCode {
  code: string;
  email: string;
  plan: 'basic' | 'premium' | 'vip';
  createdAt: string;
  used: boolean;
  usedAt?: string;
  usedBy?: string;
  description?: string;
}

// Lista de códigos predefinidos
// Estos códigos funcionarán en cualquier navegador/dispositivo
const PREDEFINED_CODES: PredefinedCode[] = [
  // Códigos de prueba
  {
    code: 'GANAFACIL',
    email: 'test@ganafacil.com',
    plan: 'premium',
    createdAt: '2025-01-01T00:00:00.000Z',
    used: false,
    description: 'Código de prueba principal'
  },
  {
    code: 'PREMIUM123',
    email: 'premium@ganafacil.com',
    plan: 'premium',
    createdAt: '2025-01-01T00:00:00.000Z',
    used: false,
    description: 'Código premium de prueba'
  },
  {
    code: 'VIP456',
    email: 'vip@ganafacil.com',
    plan: 'vip',
    createdAt: '2025-01-01T00:00:00.000Z',
    used: false,
    description: 'Código VIP de prueba'
  },
  {
    code: 'BASIC789',
    email: 'basic@ganafacil.com',
    plan: 'basic',
    createdAt: '2025-01-01T00:00:00.000Z',
    used: false,
    description: 'Código básico de prueba'
  },
  // Códigos generados por admin (se agregan dinámicamente)
  {
    code: 'PZMEUE',
    email: 'richardbejarano52@gmail.com',
    plan: 'premium',
    createdAt: '2025-01-10T21:19:00.000Z',
    used: false,
    description: 'Código generado por admin'
  },
  {
    code: '6C9USH',
    email: 'richardbejarano52@gmail.com',
    plan: 'basic',
    createdAt: '2025-01-11T03:32:00.000Z',
    used: false,
    description: 'Código generado por admin'
  }
];

class PredefinedCodeSystem {
  private storageKey = 'ganaFacilPredefinedCodes';
  private codes: PredefinedCode[] = [];

  constructor() {
    this.loadCodes();
  }

  // Cargar códigos desde localStorage o usar predefinidos
  private loadCodes() {
    if (typeof window === 'undefined') {
      this.codes = [...PREDEFINED_CODES];
      return;
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.codes = JSON.parse(stored);
      } else {
        // Primera vez: usar códigos predefinidos
        this.codes = [...PREDEFINED_CODES];
        this.saveCodes();
      }
    } catch (error) {
      console.error('Error loading codes:', error);
      this.codes = [...PREDEFINED_CODES];
    }
  }

  // Guardar códigos en localStorage
  private saveCodes() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.codes));
    }
  }

  // Generar nuevo código
  generateCode(email: string, plan: 'basic' | 'premium' | 'vip' = 'premium'): { success: boolean; code?: string; error?: string } {
    try {
      const code = this.generateUniqueCode();
      
      const newCode: PredefinedCode = {
        code,
        email,
        plan,
        createdAt: new Date().toISOString(),
        used: false,
        description: `Código generado para ${email}`
      };
      
      this.codes.push(newCode);
      this.saveCodes();
      
      return { success: true, code };
    } catch (error) {
      return { success: false, error: 'Error generando código' };
    }
  }

  // Validar código
  validateCode(code: string): { valid: boolean; message: string; userData?: any } {
    try {
      const codeData = this.codes.find(c => c.code === code);

      if (!codeData) {
        return { valid: false, message: 'Código no válido' };
      }

      if (codeData.used) {
        return { valid: false, message: 'Este código ya fue usado' };
      }

      // Marcar como usado
      codeData.used = true;
      codeData.usedAt = new Date().toISOString();
      codeData.usedBy = 'usuario@ganafacil.com';
      this.saveCodes();

      // Crear usuario activado
      const userData = {
        id: `user_${Date.now()}`,
        email: codeData.email,
        name: codeData.email.split('@')[0],
        plan: codeData.plan,
        activated: true,
        activatedAt: new Date().toISOString(),
        method: 'predefined_code',
        code: code
      };

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('ganaFacilUser', JSON.stringify(userData));
        localStorage.setItem('ganafacil_activated', 'true');
      }

      return { 
        valid: true, 
        message: 'Cuenta activada exitosamente',
        userData 
      };
    } catch (error) {
      return { valid: false, message: 'Error validando código' };
    }
  }

  // Obtener todos los códigos
  getCodes(): PredefinedCode[] {
    return [...this.codes];
  }

  // Obtener estadísticas
  getStats() {
    return {
      total: this.codes.length,
      used: this.codes.filter(c => c.used).length,
      available: this.codes.filter(c => !c.used).length
    };
  }

  // Eliminar código
  deleteCode(code: string): boolean {
    try {
      const index = this.codes.findIndex(c => c.code === code);
      if (index !== -1) {
        this.codes.splice(index, 1);
        this.saveCodes();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Limpiar todos los códigos (excepto predefinidos)
  clearAllCodes(): void {
    this.codes = [...PREDEFINED_CODES];
    this.saveCodes();
  }

  // Generar código único
  private generateUniqueCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    let attempts = 0;
    const maxAttempts = 100;

    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      attempts++;
    } while (this.codeExists(code) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      throw new Error('No se pudo generar un código único');
    }

    return code;
  }

  // Verificar si el código existe
  private codeExists(code: string): boolean {
    return this.codes.some(c => c.code === code);
  }

  // Agregar código manualmente (para admin)
  addCode(code: string, email: string, plan: 'basic' | 'premium' | 'vip', description?: string): boolean {
    try {
      if (this.codeExists(code)) {
        return false; // Código ya existe
      }

      const newCode: PredefinedCode = {
        code,
        email,
        plan,
        createdAt: new Date().toISOString(),
        used: false,
        description: description || `Código manual para ${email}`
      };

      this.codes.push(newCode);
      this.saveCodes();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Instancia global
export const predefinedCodeSystem = new PredefinedCodeSystem();

// Hacer disponible globalmente para debugging
if (typeof window !== 'undefined') {
  (window as any).predefinedCodeSystem = predefinedCodeSystem;
}
