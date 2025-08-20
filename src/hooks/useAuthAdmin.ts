'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  code: string;
  createdAt: Date;
}

export const useAuthAdmin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Códigos de admin válidos (LOCALES)
  const ADMIN_CODES = ['ADMIN123', 'ADMIN456', 'ADMIN789', 'VIP2025', 'DEMO2024', 'TEST456', 'PRUEBA123', 'GANA7878', 'FACIL0707'];

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('ganaFacilUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        localStorage.removeItem('ganaFacilUser');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const activateCode = async (code: string): Promise<{ success: boolean; message: string }> => {
    const normalizedCode = (code || '').toString().trim().toUpperCase();
    
    console.log('🔑 Activando código:', normalizedCode);
    
    // Verificar en códigos locales
    if (ADMIN_CODES.includes(normalizedCode)) {
      console.log('✅ CÓDIGO VÁLIDO:', normalizedCode);
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        code: normalizedCode,
        createdAt: new Date()
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('ganaFacilUser', JSON.stringify(newUser));
      
      return { success: true, message: "¡Código activado exitosamente! Bienvenido al dashboard." };
    } else {
      console.log('❌ CÓDIGO NO VÁLIDO:', normalizedCode);
      return { success: false, message: "Código no válido." };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ganaFacilUser');
  };

  const clearAll = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    activateCode,
    logout,
    clearAll
  };
};
