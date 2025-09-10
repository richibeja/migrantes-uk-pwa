// Sistema de invitaciones únicas para GANA FÁCIL
export interface Invitation {
  id: string;
  code: string;
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  usedBy?: string;
  usedAt?: string;
  isActive: boolean;
  plan: 'basic' | 'premium' | 'vip' | 'lifetime';
  maxUses: number;
  currentUses: number;
}

export class InvitationSystem {
  private static instance: InvitationSystem;
  private invitations: Invitation[] = [];
  private readonly STORAGE_KEY = 'ganafacil_invitations';

  static getInstance(): InvitationSystem {
    if (!InvitationSystem.instance) {
      InvitationSystem.instance = new InvitationSystem();
    }
    return InvitationSystem.instance;
  }

  // Cargar invitaciones desde localStorage
  loadInvitations(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.invitations = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error cargando invitaciones:', error);
      this.invitations = [];
    }
  }

  // Guardar invitaciones en localStorage
  saveInvitations(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.invitations));
    } catch (error) {
      console.error('Error guardando invitaciones:', error);
    }
  }

  // Crear nueva invitación
  createInvitation(createdBy: string, plan: 'basic' | 'premium' | 'vip' | 'lifetime' = 'basic', maxUses: number = 1): Invitation {
    const id = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const code = this.generateUniqueCode();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 días

    const invitation: Invitation = {
      id,
      code,
      createdBy,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      isActive: true,
      plan,
      maxUses,
      currentUses: 0
    };

    this.invitations.push(invitation);
    this.saveInvitations();
    return invitation;
  }

  // Generar código único
  private generateUniqueCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    do {
      code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.invitations.some(inv => inv.code === code));

    return code;
  }

  // Validar código de invitación
  validateInvitation(code: string): { valid: boolean; invitation?: Invitation; message: string } {
    this.loadInvitations();
    
    const invitation = this.invitations.find(inv => inv.code === code);
    
    if (!invitation) {
      return { valid: false, message: 'Código de invitación no válido' };
    }

    if (!invitation.isActive) {
      return { valid: false, message: 'Código de invitación inactivo' };
    }

    const now = new Date();
    const expiresAt = new Date(invitation.expiresAt);
    
    if (now > expiresAt) {
      return { valid: false, message: 'Código de invitación expirado' };
    }

    if (invitation.currentUses >= invitation.maxUses) {
      return { valid: false, message: 'Código de invitación ya utilizado' };
    }

    return { valid: true, invitation, message: 'Código válido' };
  }

  // Usar código de invitación
  useInvitation(code: string, usedBy: string): { success: boolean; invitation?: Invitation; message: string } {
    const validation = this.validateInvitation(code);
    
    if (!validation.valid) {
      return { success: false, message: validation.message };
    }

    const invitation = validation.invitation!;
    invitation.currentUses++;
    invitation.usedBy = usedBy;
    invitation.usedAt = new Date().toISOString();

    if (invitation.currentUses >= invitation.maxUses) {
      invitation.isActive = false;
    }

    this.saveInvitations();
    return { success: true, invitation, message: 'Invitación utilizada exitosamente' };
  }

  // Obtener invitaciones del usuario
  getUserInvitations(createdBy: string): Invitation[] {
    this.loadInvitations();
    return this.invitations.filter(inv => inv.createdBy === createdBy);
  }

  // Obtener todas las invitaciones
  getAllInvitations(): Invitation[] {
    this.loadInvitations();
    return this.invitations;
  }

  // Desactivar invitación
  deactivateInvitation(code: string): boolean {
    this.loadInvitations();
    const invitation = this.invitations.find(inv => inv.code === code);
    
    if (invitation) {
      invitation.isActive = false;
      this.saveInvitations();
      return true;
    }
    
    return false;
  }

  // Eliminar invitación
  deleteInvitation(code: string): boolean {
    this.loadInvitations();
    const index = this.invitations.findIndex(inv => inv.code === code);
    
    if (index !== -1) {
      this.invitations.splice(index, 1);
      this.saveInvitations();
      return true;
    }
    
    return false;
  }

  // Limpiar invitaciones expiradas
  cleanExpiredInvitations(): number {
    this.loadInvitations();
    const now = new Date();
    const initialCount = this.invitations.length;
    
    this.invitations = this.invitations.filter(inv => {
      const expiresAt = new Date(inv.expiresAt);
      return now <= expiresAt;
    });
    
    const cleanedCount = initialCount - this.invitations.length;
    if (cleanedCount > 0) {
      this.saveInvitations();
    }
    
    return cleanedCount;
  }

  // Obtener estadísticas
  getStats(): {
    total: number;
    active: number;
    expired: number;
    used: number;
    available: number;
  } {
    this.loadInvitations();
    const now = new Date();
    
    const total = this.invitations.length;
    const active = this.invitations.filter(inv => inv.isActive).length;
    const expired = this.invitations.filter(inv => new Date(inv.expiresAt) < now).length;
    const used = this.invitations.filter(inv => inv.currentUses > 0).length;
    const available = this.invitations.filter(inv => inv.isActive && inv.currentUses < inv.maxUses).length;
    
    return { total, active, expired, used, available };
  }
}

// Instancia global
export const invitationSystem = InvitationSystem.getInstance();

// Hook para React
export const useInvitationSystem = () => {
  return invitationSystem;
};
