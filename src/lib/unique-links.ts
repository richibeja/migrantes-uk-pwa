// Sistema de Enlaces Únicos con Límite de Uso
// Cada enlace solo se puede usar 1 vez

interface UniqueLink {
  token: string;
  userId: string;
  userEmail: string;
  plan: string;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
  expiresAt: string;
}

class UniqueLinkSystem {
  private links: Map<string, UniqueLink> = new Map();

  // Generar enlace único para un usuario
  generateUniqueLink(userId: string, userEmail: string, plan: string = 'premium'): string {
    const token = this.generateToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días

    const link: UniqueLink = {
      token,
      userId,
      userEmail,
      plan,
      isUsed: false,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    this.links.set(token, link);
    this.saveToStorage();

    return `${window.location.origin}/activate?token=${token}`;
  }

  // Validar y usar un enlace
  validateAndUseLink(token: string): { success: boolean; message: string; userData?: any } {
    const link = this.links.get(token);

    if (!link) {
      return { success: false, message: 'Enlace no válido' };
    }

    if (link.isUsed) {
      return { success: false, message: 'Este enlace ya fue usado' };
    }

    const now = new Date();
    const expiresAt = new Date(link.expiresAt);

    if (now > expiresAt) {
      return { success: false, message: 'Este enlace ha expirado' };
    }

    // Marcar como usado
    link.isUsed = true;
    link.usedAt = now.toISOString();
    this.links.set(token, link);
    this.saveToStorage();

    // Crear usuario activado
    const userData = {
      id: link.userId,
      email: link.userEmail,
      name: link.userEmail.split('@')[0],
      plan: link.plan,
      isActivated: true,
      activatedAt: now.toISOString(),
      activationMethod: 'unique_link',
      activationToken: token
    };

    return { 
      success: true, 
      message: 'Cuenta activada exitosamente',
      userData 
    };
  }

  // Verificar si un enlace existe y es válido
  checkLinkStatus(token: string): { exists: boolean; isUsed: boolean; isExpired: boolean } {
    const link = this.links.get(token);
    
    if (!link) {
      return { exists: false, isUsed: false, isExpired: false };
    }

    const now = new Date();
    const expiresAt = new Date(link.expiresAt);
    const isExpired = now > expiresAt;

    return {
      exists: true,
      isUsed: link.isUsed,
      isExpired
    };
  }

  // Obtener estadísticas
  getStats() {
    const allLinks = Array.from(this.links.values());
    return {
      total: allLinks.length,
      used: allLinks.filter(link => link.isUsed).length,
      unused: allLinks.filter(link => !link.isUsed).length,
      expired: allLinks.filter(link => new Date() > new Date(link.expiresAt)).length
    };
  }

  // Generar token único
  private generateToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 12; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  // Guardar en localStorage
  private saveToStorage() {
    if (typeof window !== 'undefined') {
      const linksArray = Array.from(this.links.entries());
      localStorage.setItem('ganaFacilUniqueLinks', JSON.stringify(linksArray));
    }
  }

  // Cargar desde localStorage
  loadFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ganaFacilUniqueLinks');
      if (stored) {
        try {
          const linksArray = JSON.parse(stored);
          this.links = new Map(linksArray);
        } catch (error) {
          console.error('Error cargando enlaces únicos:', error);
        }
      }
    }
  }
}

// Instancia global
export const uniqueLinkSystem = new UniqueLinkSystem();

// Cargar datos al inicializar
if (typeof window !== 'undefined') {
  uniqueLinkSystem.loadFromStorage();
}
