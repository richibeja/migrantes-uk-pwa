// Sistema de Códigos Únicos Seguros para GANA FÁCIL
// Cada usuario tiene un código único que solo se puede usar una vez

interface CodigoUnico {
  codigo: string;
  userId: string;
  userEmail: string;
  plan: string;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
  expiresAt: string;
  createdBy: string; // Admin que lo creó
}

class CodigosUnicosSeguros {
  private codigos: Map<string, CodigoUnico> = new Map();

  constructor() {
    this.cargarCodigos();
  }

  // Generar código único para un usuario
  generarCodigoUnico(userEmail: string, plan: string = 'premium', createdBy: string = 'admin'): string {
    const codigo = this.generarCodigo();
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días

    const codigoUnico: CodigoUnico = {
      codigo,
      userId,
      userEmail,
      plan,
      isUsed: false,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      createdBy
    };

    this.codigos.set(codigo, codigoUnico);
    this.guardarCodigos();

    return codigo;
  }

  // Validar y usar código único
  validarYUsarCodigo(codigo: string): { success: boolean; message: string; userData?: any } {
    const codigoUnico = this.codigos.get(codigo);

    if (!codigoUnico) {
      return { success: false, message: 'Código no válido' };
    }

    if (codigoUnico.isUsed) {
      return { success: false, message: 'Este código ya fue usado' };
    }

    const now = new Date();
    const expiresAt = new Date(codigoUnico.expiresAt);

    if (now > expiresAt) {
      return { success: false, message: 'Este código ha expirado' };
    }

    // Marcar como usado
    codigoUnico.isUsed = true;
    codigoUnico.usedAt = now.toISOString();
    this.codigos.set(codigo, codigoUnico);
    this.guardarCodigos();

    // Crear usuario activado
    const userData = {
      id: codigoUnico.userId,
      email: codigoUnico.userEmail,
      name: codigoUnico.userEmail.split('@')[0],
      plan: codigoUnico.plan,
      isActivated: true,
      activatedAt: now.toISOString(),
      activationMethod: 'codigo_unico',
      activationCode: codigo
    };

    // Guardar usuario en localStorage
    localStorage.setItem('ganaFacilUser', JSON.stringify(userData));
    localStorage.setItem('ganafacil_activated', 'true');

    return { 
      success: true, 
      message: 'Cuenta activada exitosamente',
      userData 
    };
  }

  // Verificar estado del código
  verificarEstadoCodigo(codigo: string): { exists: boolean; isUsed: boolean; isExpired: boolean } {
    const codigoUnico = this.codigos.get(codigo);
    
    if (!codigoUnico) {
      return { exists: false, isUsed: false, isExpired: false };
    }

    const now = new Date();
    const expiresAt = new Date(codigoUnico.expiresAt);
    const isExpired = now > expiresAt;

    return {
      exists: true,
      isUsed: codigoUnico.isUsed,
      isExpired
    };
  }

  // Obtener estadísticas
  obtenerEstadisticas() {
    const todosCodigos = Array.from(this.codigos.values());
    return {
      total: todosCodigos.length,
      usados: todosCodigos.filter(codigo => codigo.isUsed).length,
      disponibles: todosCodigos.filter(codigo => !codigo.isUsed).length,
      expirados: todosCodigos.filter(codigo => new Date() > new Date(codigo.expiresAt)).length
    };
  }

  // Obtener todos los códigos (para admin)
  obtenerTodosLosCodigos(): CodigoUnico[] {
    return Array.from(this.codigos.values());
  }

  // Eliminar código (para admin)
  eliminarCodigo(codigo: string): boolean {
    if (this.codigos.has(codigo)) {
      this.codigos.delete(codigo);
      this.guardarCodigos();
      return true;
    }
    return false;
  }

  // Generar código único
  private generarCodigo(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
  }

  // Guardar códigos en localStorage
  private guardarCodigos() {
    if (typeof window !== 'undefined') {
      const codigosArray = Array.from(this.codigos.entries());
      localStorage.setItem('ganaFacilCodigosUnicos', JSON.stringify(codigosArray));
    }
  }

  // Cargar códigos desde localStorage
  private cargarCodigos() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ganaFacilCodigosUnicos');
      if (stored) {
        try {
          const codigosArray = JSON.parse(stored);
          this.codigos = new Map(codigosArray);
        } catch (error) {
          console.error('Error cargando códigos únicos:', error);
        }
      }
    }
  }
}

// Instancia global
export const codigosUnicosSeguros = new CodigosUnicosSeguros();
