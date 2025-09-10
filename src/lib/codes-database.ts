// Base de datos compartida para códigos de activación
// Funciona sin Firebase usando memoria del servidor

interface CodeData {
  code: string;
  email: string;
  plan: string;
  used: boolean;
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
  usedBy?: string;
}

class CodesDatabase {
  private codes: Map<string, CodeData> = new Map();

  // Generar código único
  generateUniqueCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    // Generar código de 6 caracteres
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  // Verificar si el código ya existe
  isCodeUnique(code: string): boolean {
    return !this.codes.has(code);
  }

  // Generar código único que no exista
  generateUniqueCodeSafe(): string {
    let code: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      code = this.generateUniqueCode();
      isUnique = this.isCodeUnique(code);
      attempts++;
      
      if (attempts >= maxAttempts) {
        throw new Error('No se pudo generar un código único después de múltiples intentos');
      }
    } while (!isUnique);

    return code;
  }

  // Crear nuevo código
  createCode(email: string, plan: string = 'premium'): { code: string; data: CodeData } {
    const code = this.generateUniqueCodeSafe();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días

    const codeData: CodeData = {
      code,
      email,
      plan,
      used: false,
      createdAt: now,
      expiresAt: expiresAt
    };

    this.codes.set(code, codeData);
    return { code, data: codeData };
  }

  // Validar código
  validateCode(code: string): { valid: boolean; message: string; data?: CodeData } {
    const codeData = this.codes.get(code);

    if (!codeData) {
      return { valid: false, message: 'Código no válido' };
    }

    if (codeData.used) {
      return { valid: false, message: 'Este código ya fue usado' };
    }

    const now = new Date();
    if (now > codeData.expiresAt) {
      return { valid: false, message: 'Este código ha expirado' };
    }

    return { valid: true, message: 'Código válido', data: codeData };
  }

  // Usar código
  useCode(code: string, usedBy?: string): boolean {
    const codeData = this.codes.get(code);
    if (!codeData || codeData.used) {
      return false;
    }

    codeData.used = true;
    codeData.usedAt = new Date();
    codeData.usedBy = usedBy || 'unknown';
    this.codes.set(code, codeData);
    return true;
  }

  // Obtener todos los códigos
  getAllCodes(): CodeData[] {
    return Array.from(this.codes.values());
  }

  // Obtener estadísticas
  getStats() {
    const allCodes = this.getAllCodes();
    return {
      total: allCodes.length,
      used: allCodes.filter(c => c.used).length,
      available: allCodes.filter(c => !c.used).length
    };
  }

  // Eliminar código
  deleteCode(code: string): boolean {
    return this.codes.delete(code);
  }
}

// Instancia global compartida
export const codesDatabase = new CodesDatabase();
