'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'basic' | 'premium' | 'vip' | 'admin';
  isActive: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  isVip: boolean;
  createdAt: Date;
  lastLogin: Date;
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

  // Cargar estado de autenticación desde localStorage
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedUser = localStorage.getItem('anbel_user');
        const storedToken = localStorage.getItem('anbel_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user: {
              ...user,
              createdAt: new Date(user.createdAt),
              lastLogin: new Date(user.lastLogin),
              subscription: user.subscription ? {
                ...user.subscription,
                startDate: new Date(user.subscription.startDate),
                endDate: new Date(user.subscription.endDate),
              } : undefined,
            },
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

  // Función de activación
  const activate = useCallback(async (data: ActivationData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulación de API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validación básica
      if (!data.email || !data.code) {
        throw new Error('Email and activation code are required');
      }

      // Códigos válidos
      const validCodes = ['GANAFACIL2024', 'PREMIUM123', 'VIP456', 'BASIC789', 'DEMO2024', 'TEST123'];
      
      if (!validCodes.includes(data.code.toUpperCase())) {
        throw new Error('Invalid activation code');
      }

      // Determinar plan basado en código
      let plan: 'basic' | 'premium' | 'vip' | 'admin' = 'basic';
      let isPremium = false;
      let isVip = false;
      let permissions: string[] = ['dashboard:view', 'anbel:chat'];

      switch (data.code.toUpperCase()) {
        case 'GANAFACIL2024':
        case 'PREMIUM123':
          plan = 'premium';
          isPremium = true;
          permissions = ['dashboard:view', 'anbel:chat', 'anbel:predict', 'predictions:view', 'predictions:create'];
          break;
        case 'VIP456':
          plan = 'vip';
          isVip = true;
          isPremium = true;
          permissions = ['dashboard:view', 'anbel:chat', 'anbel:predict', 'predictions:view', 'predictions:create', 'predictions:edit'];
          break;
        case 'BASIC789':
        case 'DEMO2024':
        case 'TEST123':
          plan = 'basic';
          break;
      }

      // Simulación de usuario activado
      const user: User = {
        id: '1',
        email: data.email,
        name: data.email.split('@')[0],
        plan,
        isActive: true,
        isAdmin: false,
        isPremium,
        isVip,
        createdAt: new Date(),
        lastLogin: new Date(),
        permissions,
        subscription: plan !== 'basic' ? {
          id: `sub_${Date.now()}`,
          plan,
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
          autoRenew: true,
        } : undefined,
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
    localStorage.removeItem('anbel_user');
    localStorage.removeItem('anbel_token');
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