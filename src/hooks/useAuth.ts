'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  code: string;
  createdAt: Date;
}

// Códigos válidos de prueba + códigos reales
const VALID_CODES = [
  'DEMO2024', 'PRUEBA123', 'TEST456', 'ADMIN789', 'VIP2025',
  'GANAFACIL', 'LOTERIA', 'SUERTE', 'FORTUNA',
  'GANA2025POWER001', 'GANA2025MEGA002', 'GANA2025EURO003',
  'GANA2025UK004', 'GANA2025SPAIN005', 'DEMO2025TEST001',
  'FREE2025TRIAL001', 'VIP2025ACCESS001'
];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carga usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('ganaFacilUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData && userData.id && userData.code && userData.createdAt) {
          userData.createdAt = new Date(userData.createdAt);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('ganaFacilUser');
        }
      } catch {
        localStorage.removeItem('ganaFacilUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Activar código
  const activateCode = (code: string): { success: boolean; message: string } => {
    const normalizedCode = (code || '').toString().trim().toUpperCase();
    console.log('🚀 ACTIVATING CODE:', normalizedCode);

    if (VALID_CODES.includes(normalizedCode)) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        code: normalizedCode,
        createdAt: new Date(),
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('ganaFacilUser', JSON.stringify(newUser));

      return { success: true, message: 'Code activated successfully.' };
    }

    return { success: false, message: 'Invalid code.' };
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ganaFacilUser');
  };

  // Limpiar todo lo manejado por la app
  const clearAll = () => {
    localStorage.removeItem('ganaFacilUser');
    localStorage.removeItem('usedCodes');
    localStorage.removeItem('adminGeneratedCodes');
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  const getUsedCodes = (): Record<string, User> => {
    try {
      return JSON.parse(localStorage.getItem('usedCodes') || '{}');
    } catch {
      return {};
    }
  };

  const getAdminGeneratedCodes = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem('adminGeneratedCodes') || '[]');
    } catch {
      return [];
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    activateCode,
    logout,
    clearAll,
    getUsedCodes,
    getAdminGeneratedCodes,
  };
};
