// Sistema de Enlaces Únicos Simple para GANA FÁCIL
// Funciona con enlaces únicos que se pueden usar solo una vez

interface EnlaceUnico {
  token: string;
  userId: string;
  userEmail: string;
  plan: string;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
  expiresAt: string;
}

class EnlacesUnicosSimple {
  private enlaces: Map<string, EnlaceUnico> = new Map();

  constructor() {
    this.cargarEnlaces();
  }

  // Generar enlace único
  generarEnlaceUnico(userEmail: string, plan: string = 'premium'): string {
    const token = this.generarToken();
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días

    const enlace: EnlaceUnico = {
      token,
      userId,
      userEmail,
      plan,
      isUsed: false,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    this.enlaces.set(token, enlace);
    this.guardarEnlaces();

    return `${window.location.origin}/activate?token=${token}`;
  }

  // Validar y usar enlace único
  validarYUsarEnlace(token: string): { success: boolean; message: string; userData?: any } {
    const enlace = this.enlaces.get(token);

    if (!enlace) {
      return { success: false, message: 'Enlace no válido' };
    }

    if (enlace.isUsed) {
      return { success: false, message: 'Este enlace ya fue usado' };
    }

    const now = new Date();
    const expiresAt = new Date(enlace.expiresAt);

    if (now > expiresAt) {
      return { success: false, message: 'Este enlace ha expirado' };
    }

    // Marcar como usado
    enlace.isUsed = true;
    enlace.usedAt = now.toISOString();
    this.enlaces.set(token, enlace);
    this.guardarEnlaces();

    // Crear usuario activado
    const userData = {
      id: enlace.userId,
      email: enlace.userEmail,
      name: enlace.userEmail.split('@')[0],
      plan: enlace.plan,
      isActivated: true,
      activatedAt: now.toISOString(),
      activationMethod: 'unique_link',
      activationToken: token
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

  // Verificar estado del enlace
  verificarEstadoEnlace(token: string): { exists: boolean; isUsed: boolean; isExpired: boolean } {
    const enlace = this.enlaces.get(token);
    
    if (!enlace) {
      return { exists: false, isUsed: false, isExpired: false };
    }

    const now = new Date();
    const expiresAt = new Date(enlace.expiresAt);
    const isExpired = now > expiresAt;

    return {
      exists: true,
      isUsed: enlace.isUsed,
      isExpired
    };
  }

  // Obtener estadísticas
  obtenerEstadisticas() {
    const todosEnlaces = Array.from(this.enlaces.values());
    return {
      total: todosEnlaces.length,
      usados: todosEnlaces.filter(enlace => enlace.isUsed).length,
      disponibles: todosEnlaces.filter(enlace => !enlace.isUsed).length,
      expirados: todosEnlaces.filter(enlace => new Date() > new Date(enlace.expiresAt)).length
    };
  }

  // Generar token único
  private generarToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 12; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  // Guardar enlaces en localStorage
  private guardarEnlaces() {
    if (typeof window !== 'undefined') {
      const enlacesArray = Array.from(this.enlaces.entries());
      localStorage.setItem('ganaFacilEnlacesUnicos', JSON.stringify(enlacesArray));
    }
  }

  // Cargar enlaces desde localStorage
  private cargarEnlaces() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ganaFacilEnlacesUnicos');
      if (stored) {
        try {
          const enlacesArray = JSON.parse(stored);
          this.enlaces = new Map(enlacesArray);
        } catch (error) {
          console.error('Error cargando enlaces únicos:', error);
        }
      }
    }
  }
}

// Instancia global
export const enlacesUnicosSimple = new EnlacesUnicosSimple();
