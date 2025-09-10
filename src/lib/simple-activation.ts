// Sistema de Activación Simple para GANA FÁCIL
// Funciona con código "GANAFACIL" y enlaces únicos

interface UserData {
  id: string;
  email: string;
  name: string;
  plan: string;
  isActivated: boolean;
  activatedAt: string;
  activationMethod: string;
  activationToken?: string;
}

class SimpleActivationSystem {
  // Activar con código simple
  activateWithCode(code: string, userInfo: { name?: string; email?: string; phone?: string }): { success: boolean; message: string; userData?: UserData } {
    if (code.toUpperCase() !== 'GANAFACIL') {
      return { success: false, message: 'Código incorrecto. Usa: GANAFACIL' };
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    const userData: UserData = {
      id: userId,
      email: userInfo.email || 'usuario@ganafacil.com',
      name: userInfo.name || 'Usuario GANA FÁCIL',
      plan: 'premium',
      isActivated: true,
      activatedAt: new Date().toISOString(),
      activationMethod: 'code_ganafacil'
    };

    // Guardar en localStorage
    this.saveUser(userData);
    
    return { 
      success: true, 
      message: 'Cuenta activada exitosamente',
      userData 
    };
  }

  // Activar con enlace único
  activateWithLink(token: string): { success: boolean; message: string; userData?: UserData } {
    // Verificar si el token existe en localStorage
    const savedLinks = localStorage.getItem('ganaFacilUniqueLinks');
    if (!savedLinks) {
      return { success: false, message: 'Enlace no válido' };
    }

    try {
      const linksArray = JSON.parse(savedLinks);
      const linkData = linksArray.find(([t]: [string, any]) => t === token);
      
      if (!linkData) {
        return { success: false, message: 'Enlace no válido' };
      }

      const [, link] = linkData;
      
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
      
      // Actualizar localStorage
      const updatedLinks = linksArray.map(([t, l]: [string, any]) => 
        t === token ? [t, link] : [t, l]
      );
      localStorage.setItem('ganaFacilUniqueLinks', JSON.stringify(updatedLinks));

      const userData: UserData = {
        id: link.userId,
        email: link.userEmail,
        name: link.userEmail.split('@')[0],
        plan: link.plan,
        isActivated: true,
        activatedAt: now.toISOString(),
        activationMethod: 'unique_link',
        activationToken: token
      };

      // Guardar usuario
      this.saveUser(userData);
      
      return { 
        success: true, 
        message: 'Cuenta activada exitosamente',
        userData 
      };
      
    } catch (error) {
      return { success: false, message: 'Error al procesar el enlace' };
    }
  }

  // Verificar si el usuario está activado
  checkUserActivation(): { isActivated: boolean; userData?: UserData } {
    const isActivated = localStorage.getItem('ganafacil_activated') === 'true';
    const savedUser = localStorage.getItem('ganaFacilUser');
    
    if (isActivated && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        return { isActivated: true, userData };
      } catch (error) {
        return { isActivated: false };
      }
    }
    
    return { isActivated: false };
  }

  // Guardar usuario en localStorage
  private saveUser(userData: UserData) {
    localStorage.setItem('ganaFacilUser', JSON.stringify(userData));
    localStorage.setItem('ganafacil_activated', 'true');
  }

  // Generar enlace único para testing
  generateTestLink(userEmail: string, plan: string = 'premium'): string {
    const token = 'TEST' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    const linkData = {
      token,
      userId,
      userEmail,
      plan,
      isUsed: false,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    // Guardar en localStorage
    const existingLinks = localStorage.getItem('ganaFacilUniqueLinks');
    const linksArray = existingLinks ? JSON.parse(existingLinks) : [];
    linksArray.push([token, linkData]);
    localStorage.setItem('ganaFacilUniqueLinks', JSON.stringify(linksArray));
    
    return `${window.location.origin}/activate?token=${token}`;
  }
}

// Instancia global
export const simpleActivationSystem = new SimpleActivationSystem();
