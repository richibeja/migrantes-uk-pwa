// Sistema de Códigos en el Frontend - Solución Híbrida
// Funciona sin depender de APIs del servidor

interface CodeData {
  code: string;
  email: string;
  plan: string;
  createdAt: string;
  used: boolean;
  usedAt?: string;
  usedBy?: string;
}

class FrontendCodeSystem {
  private storageKey = 'ganaFacilActivationCodes';

  constructor() {
    this.initializeStorage();
  }

  // Inicializar almacenamiento
  private initializeStorage() {
    if (typeof window !== 'undefined' && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Generar código único
  generateCode(email: string, plan: string = 'premium'): { success: boolean; code?: string; error?: string } {
    try {
      const codes = this.getCodes();
      const code = this.generateUniqueCode();
      
      const codeData: CodeData = {
        code,
        email,
        plan,
        createdAt: new Date().toISOString(),
        used: false
      };
      
      codes.push(codeData);
      this.saveCodes(codes);
      
      return { success: true, code };
    } catch (error) {
      return { success: false, error: 'Error generando código' };
    }
  }

  // Validar código
  validateCode(code: string): { valid: boolean; message: string; userData?: any } {
    try {
      const codes = this.getCodes();
      const codeData = codes.find(c => c.code === code);

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
      this.saveCodes(codes);

      // Crear usuario activado
      const userData = {
        id: `user_${Date.now()}`,
        email: codeData.email,
        name: codeData.email.split('@')[0],
        plan: codeData.plan,
        activated: true,
        activatedAt: new Date().toISOString(),
        method: 'unique_code_frontend',
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
  getCodes(): CodeData[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  // Obtener estadísticas
  getStats() {
    const codes = this.getCodes();
    return {
      total: codes.length,
      used: codes.filter(c => c.used).length,
      available: codes.filter(c => !c.used).length
    };
  }

  // Eliminar código
  deleteCode(code: string): boolean {
    try {
      const codes = this.getCodes();
      const filteredCodes = codes.filter(c => c.code !== code);
      this.saveCodes(filteredCodes);
      return true;
    } catch {
      return false;
    }
  }

  // Limpiar todos los códigos
  clearAllCodes(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
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
    return this.getCodes().some(c => c.code === code);
  }

  // Guardar códigos
  private saveCodes(codes: CodeData[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(codes));
    }
  }
}

// Instancia global
export const frontendCodeSystem = new FrontendCodeSystem();

// Hacer disponible globalmente para debugging
if (typeof window !== 'undefined') {
  (window as any).codeSystem = frontendCodeSystem;
}
