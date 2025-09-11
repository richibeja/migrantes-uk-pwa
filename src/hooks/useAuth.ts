'use client';

import { useState, useEffect } from 'react';
import { 
  validateCode, 
  createUser, 
  saveUser, 
  loadUser, 
  clearUser, 
  isUserAuthenticated, 
  isUserAdmin,
  User 
} from '@/lib/unified-auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Cargar usuario al inicializar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const loadedUser = loadUser();
        if (loadedUser) {
          setUser(loadedUser);
          setIsAuthenticated(true);
          setIsAdmin(loadedUser.isAdmin || false);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Activar código
  const activateCode = (code: string, email?: string, username?: string): { success: boolean; message: string } => {
    try {
      const validation = validateCode(code);
      
      if (!validation.valid) {
        return { success: false, message: 'Código no válido' };
      }

      const newUser = createUser(code, email, username);
      saveUser(newUser);
      
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(newUser.isAdmin || false);

      return { 
        success: true, 
        message: `¡Código activado exitosamente! Plan: ${newUser.plan.toUpperCase()}` 
      };
    } catch (error) {
      console.error('Error activating code:', error);
      return { success: false, message: 'Error al activar el código' };
    }
  };

  // Cerrar sesión
  const logout = () => {
    clearUser();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Verificar si el usuario está autenticado
  const checkAuth = () => {
    const authStatus = isUserAuthenticated();
    const adminStatus = isUserAdmin();
    setIsAuthenticated(authStatus);
    setIsAdmin(adminStatus);
    return authStatus;
  };

  // Obtener información del usuario
  const getUserInfo = () => {
    return user;
  };

  // Verificar si el usuario tiene un plan específico
  const hasPlan = (plan: 'basic' | 'premium' | 'vip') => {
    return user?.plan === plan;
  };

  // Verificar si el usuario está activo
  const isActive = () => {
    return user?.status === 'active' && user?.isActivated;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    activateCode,
    logout,
    checkAuth,
    getUserInfo,
    hasPlan,
    isActive
  };
};