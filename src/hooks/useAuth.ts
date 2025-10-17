'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  loadUser, 
  saveUser, 
  clearUser, 
  createUser, 
  isUserAuthenticated,
  validateCode,
  type User as UnifiedUser
} from '@/lib/unified-auth';

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  code?: string;
  plan: 'basic' | 'premium' | 'vip' | 'admin';
  isActive: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  isVip: boolean;
  createdAt: Date;
  lastLogin: Date;
  expiresAt?: Date;
  permissions: string[];
  subscription?: {
    id: string;
    plan: string;
    status: 'active' | 'inactive' | 'cancelled' | 'expired';
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface ActivationData {
  email: string;
  code: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Cargar estado de autenticación desde localStorage usando unified-auth
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const unifiedUser = loadUser();
        
        if (unifiedUser && isUserAuthenticated()) {
          const user: User = {
            id: unifiedUser.id,
            email: unifiedUser.email || '',
            name: unifiedUser.username || unifiedUser.email?.split('@')[0] || 'User',
            username: unifiedUser.username,
            code: unifiedUser.code,
            plan: unifiedUser.plan as 'basic' | 'premium' | 'vip' | 'admin',
            isActive: unifiedUser.isActivated,
            isAdmin: unifiedUser.isAdmin || false,
            isPremium: unifiedUser.plan === 'premium' || unifiedUser.plan === 'vip',
            isVip: unifiedUser.plan === 'vip',
            createdAt: unifiedUser.createdAt,
            lastLogin: new Date(),
            expiresAt: unifiedUser.expiresAt,
            permissions: getPlanPermissions(unifiedUser.plan, unifiedUser.isAdmin),
            subscription: unifiedUser.expiresAt ? {
              id: unifiedUser.id,
              plan: unifiedUser.plan,
              status: 'active',
              startDate: unifiedUser.createdAt,
              endDate: unifiedUser.expiresAt,
              autoRenew: false,
            } : undefined,
          };
          
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Error loading authentication state',
        });
      }
    };

    loadAuthState();
  }, []);

  // Helper function to get permissions based on plan
  const getPlanPermissions = (plan: string, isAdmin?: boolean): string[] => {
    const basePermissions = ['dashboard:view'];
    
    if (isAdmin) {
      return [...basePermissions, 'admin:all', 'anbel:chat', 'anbel:predict', 'predictions:view', 'predictions:create', 'predictions:edit'];
    }
    
    switch (plan) {
      case 'vip':
        return [...basePermissions, 'anbel:chat', 'anbel:predict', 'predictions:view', 'predictions:create', 'predictions:edit', 'clubs:premium'];
      case 'premium':
        return [...basePermissions, 'anbel:chat', 'anbel:predict', 'predictions:view', 'predictions:create'];
      case 'basic':
      default:
        return [...basePermissions, 'anbel:chat', 'predictions:view'];
    }
  };

  // Función de login
  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulación de API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validación básica
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Simulación de usuario
      const user: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        plan: 'premium',
        isActive: true,
        isAdmin: false,
        isPremium: true,
        isVip: false,
        createdAt: new Date(),
        lastLogin: new Date(),
        permissions: ['dashboard:view', 'anbel:chat', 'predictions:view'],
        subscription: {
          id: 'sub_1',
          plan: 'premium',
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
          autoRenew: true,
        },
      };

      // Guardar en localStorage
      localStorage.setItem('anbel_user', JSON.stringify(user));
      localStorage.setItem('anbel_token', 'mock_jwt_token');

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Función de registro
  const register = useCallback(async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulación de API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validación básica
      if (!data.email || !data.password || !data.name) {
        throw new Error('All fields are required');
      }

      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulación de usuario registrado
      const user: User = {
        id: '1',
        email: data.email,
        name: data.name,
        plan: 'basic',
        isActive: true,
        isAdmin: false,
        isPremium: false,
        isVip: false,
        createdAt: new Date(),
        lastLogin: new Date(),
        permissions: ['dashboard:view', 'anbel:chat'],
      };

      // Guardar en localStorage
      localStorage.setItem('anbel_user', JSON.stringify(user));
      localStorage.setItem('anbel_token', 'mock_jwt_token');

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Función de activación usando unified-auth
  const activate = useCallback(async (data: ActivationData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulación de API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validación básica
      if (!data.email || !data.code) {
        throw new Error('Email and activation code are required');
      }

      // Validar código usando unified-auth
      const validation = validateCode(data.code);
      
      if (!validation.valid || !validation.data) {
        throw new Error('Invalid activation code');
      }

      // Crear usuario usando unified-auth
      const unifiedUser = createUser(data.code, data.email, data.email.split('@')[0]);
      
      // Guardar usuario
      saveUser(unifiedUser);

      // También guardar en formatos legacy para compatibilidad
      localStorage.setItem('ganafacil_activated', 'true');
      localStorage.setItem('user', JSON.stringify({
        email: data.email,
        plan: unifiedUser.plan,
        isActive: true
      }));
      localStorage.setItem('anbel_user', JSON.stringify({
        id: unifiedUser.id,
        email: data.email,
        name: data.email.split('@')[0],
        plan: unifiedUser.plan,
        isActive: true,
        isPremium: unifiedUser.plan === 'premium' || unifiedUser.plan === 'vip',
        permissions: getPlanPermissions(unifiedUser.plan, unifiedUser.isAdmin)
      }));
      localStorage.setItem('anbel_token', 'active_token');

      // Convertir a formato User para el estado
      const user: User = {
        id: unifiedUser.id,
        email: unifiedUser.email || data.email,
        name: unifiedUser.username || data.email.split('@')[0],
        username: unifiedUser.username,
        code: unifiedUser.code,
        plan: unifiedUser.plan as 'basic' | 'premium' | 'vip' | 'admin',
        isActive: unifiedUser.isActivated,
        isAdmin: unifiedUser.isAdmin || false,
        isPremium: unifiedUser.plan === 'premium' || unifiedUser.plan === 'vip',
        isVip: unifiedUser.plan === 'vip',
        createdAt: unifiedUser.createdAt,
        lastLogin: new Date(),
        expiresAt: unifiedUser.expiresAt,
        permissions: getPlanPermissions(unifiedUser.plan, unifiedUser.isAdmin),
        subscription: unifiedUser.expiresAt ? {
          id: unifiedUser.id,
          plan: unifiedUser.plan,
          status: 'active',
          startDate: unifiedUser.createdAt,
          endDate: unifiedUser.expiresAt,
          autoRenew: false,
        } : undefined,
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Activation failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Función de logout
  const logout = useCallback(() => {
    // Limpiar unified-auth
    clearUser();
    
    // Limpiar localStorage legacy
    localStorage.removeItem('anbel_user');
    localStorage.removeItem('anbel_token');
    localStorage.removeItem('user');
    localStorage.removeItem('ganafacil_activated');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    router.push('/');
  }, [router]);

  // Función para actualizar usuario
  const updateUser = useCallback((updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem('anbel_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  }, [authState.user]);

  // Función para verificar permisos
  const hasPermission = useCallback((permission: string) => {
    if (!authState.user) return false;
    return authState.user.permissions.includes(permission);
  }, [authState.user]);

  // Función para verificar rol
  const hasRole = useCallback((role: string) => {
    if (!authState.user) return false;
    return authState.user.plan === role;
  }, [authState.user]);

  // Función para verificar si es admin
  const isAdmin = useCallback(() => {
    return authState.user?.isAdmin || false;
  }, [authState.user]);

  // Función para verificar si es premium
  const isPremium = useCallback(() => {
    return authState.user?.isPremium || false;
  }, [authState.user]);

  // Función para verificar si es VIP
  const isVip = useCallback(() => {
    return authState.user?.isVip || false;
  }, [authState.user]);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    register,
    activate,
    logout,
    updateUser,
    hasPermission,
    hasRole,
    isAdmin,
    isPremium,
    isVip,
    clearError,
  };
};