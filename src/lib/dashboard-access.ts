// Sistema de acceso seguro para dashboard de GANA FÁCIL
export interface DashboardAccess {
  userId: string;
  invitationCode: string;
  plan: 'basic' | 'premium' | 'vip' | 'lifetime';
  grantedAt: string;
  expiresAt: string;
  isActive: boolean;
  lastAccess: string;
  accessCount: number;
}

export class DashboardAccessSystem {
  private static instance: DashboardAccessSystem;
  private accessRecords: DashboardAccess[] = [];
  private readonly STORAGE_KEY = 'ganafacil_dashboard_access';
  private readonly SESSION_KEY = 'ganafacil_dashboard_session';

  static getInstance(): DashboardAccessSystem {
    if (!DashboardAccessSystem.instance) {
      DashboardAccessSystem.instance = new DashboardAccessSystem();
    }
    return DashboardAccessSystem.instance;
  }

  // Cargar registros de acceso
  loadAccessRecords(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.accessRecords = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error cargando registros de acceso:', error);
      this.accessRecords = [];
    }
  }

  // Guardar registros de acceso
  saveAccessRecords(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.accessRecords));
    } catch (error) {
      console.error('Error guardando registros de acceso:', error);
    }
  }

  // Verificar si el usuario tiene acceso al dashboard
  hasDashboardAccess(userId: string): { hasAccess: boolean; access?: DashboardAccess; message: string } {
    this.loadAccessRecords();
    
    const access = this.accessRecords.find(record => 
      record.userId === userId && record.isActive
    );
    
    if (!access) {
      return { hasAccess: false, message: 'No tienes acceso al dashboard' };
    }

    const now = new Date();
    const expiresAt = new Date(access.expiresAt);
    
    if (now > expiresAt) {
      // Acceso expirado
      access.isActive = false;
      this.saveAccessRecords();
      return { hasAccess: false, message: 'Tu acceso al dashboard ha expirado' };
    }

    return { hasAccess: true, access, message: 'Acceso válido' };
  }

  // Otorgar acceso al dashboard
  grantDashboardAccess(userId: string, invitationCode: string, plan: 'basic' | 'premium' | 'vip' | 'lifetime'): { success: boolean; message: string } {
    // Verificar si ya tiene acceso
    const existingAccess = this.hasDashboardAccess(userId);
    if (existingAccess.hasAccess) {
      return { success: false, message: 'Ya tienes acceso al dashboard' };
    }

    // Crear nuevo registro de acceso
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 año

    const access: DashboardAccess = {
      userId,
      invitationCode,
      plan,
      grantedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      isActive: true,
      lastAccess: now.toISOString(),
      accessCount: 0
    };

    this.accessRecords.push(access);
    this.saveAccessRecords();

    // Crear sesión de dashboard
    this.createDashboardSession(userId);

    return { success: true, message: 'Acceso al dashboard otorgado exitosamente' };
  }

  // Crear sesión de dashboard
  createDashboardSession(userId: string): void {
    const now = new Date();
    const sessionData = {
      userId,
      loginTime: now.toISOString(),
      expiresAt: new Date(now.getTime() + (24 * 60 * 60 * 1000)).toISOString() // 24 horas
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
  }

  // Verificar sesión de dashboard
  isDashboardSessionValid(): { valid: boolean; userId?: string; message: string } {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) {
        return { valid: false, message: 'No hay sesión activa' };
      }

      const session = JSON.parse(sessionData);
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);

      if (now > expiresAt) {
        localStorage.removeItem(this.SESSION_KEY);
        return { valid: false, message: 'Sesión expirada' };
      }

      return { valid: true, userId: session.userId, message: 'Sesión válida' };
    } catch (error) {
      return { valid: false, message: 'Sesión inválida' };
    }
  }

  // Registrar acceso al dashboard
  recordDashboardAccess(userId: string): void {
    this.loadAccessRecords();
    
    const access = this.accessRecords.find(record => 
      record.userId === userId && record.isActive
    );
    
    if (access) {
      access.lastAccess = new Date().toISOString();
      access.accessCount++;
      this.saveAccessRecords();
    }
  }

  // Revocar acceso al dashboard
  revokeDashboardAccess(userId: string): boolean {
    this.loadAccessRecords();
    
    const access = this.accessRecords.find(record => 
      record.userId === userId && record.isActive
    );
    
    if (access) {
      access.isActive = false;
      this.saveAccessRecords();
      return true;
    }
    
    return false;
  }

  // Obtener estadísticas de acceso
  getAccessStats(): {
    totalUsers: number;
    activeUsers: number;
    expiredUsers: number;
    totalAccesses: number;
  } {
    this.loadAccessRecords();
    const now = new Date();
    
    const totalUsers = this.accessRecords.length;
    const activeUsers = this.accessRecords.filter(record => 
      record.isActive && new Date(record.expiresAt) > now
    ).length;
    const expiredUsers = this.accessRecords.filter(record => 
      new Date(record.expiresAt) <= now
    ).length;
    const totalAccesses = this.accessRecords.reduce((sum, record) => sum + record.accessCount, 0);
    
    return { totalUsers, activeUsers, expiredUsers, totalAccesses };
  }

  // Limpiar sesiones expiradas
  cleanExpiredSessions(): void {
    this.loadAccessRecords();
    const now = new Date();
    
    this.accessRecords = this.accessRecords.filter(record => {
      const expiresAt = new Date(record.expiresAt);
      return now <= expiresAt;
    });
    
    this.saveAccessRecords();
  }

  // Cerrar sesión de dashboard
  closeDashboardSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }
}

// Instancia global
export const dashboardAccessSystem = DashboardAccessSystem.getInstance();

// Hook para React
export const useDashboardAccess = () => {
  return dashboardAccessSystem;
};
