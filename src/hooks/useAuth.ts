'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  code: string;
  createdAt: Date;
}

// Valid test codes
const VALID_CODES = ['DEMO2024', 'PRUEBA123', 'TEST456', 'ADMIN789', 'VIP2025'];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on load
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
        console.error('Error checking authentication:', error);
        localStorage.removeItem('ganaFacilUser');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // MAIN ACTIVATION FUNCTION
  const activateCode = async (code: string): Promise<{ success: boolean; message: string }> => {
    const normalizedCode = (code || '').toString().trim().toUpperCase();

    console.log('🚀 ACTIVATING CODE:', normalizedCode);

    // Test codes
    if (VALID_CODES.includes(normalizedCode)) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        code: normalizedCode,
        createdAt: new Date()
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('ganaFacilUser', JSON.stringify(newUser));

      return { success: true, message: "Code activated successfully." };
    }

    // Any other code
    return { success: false, message: "Invalid code." };
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

  const getUsedCodes = () => {
    try {
      return JSON.parse(localStorage.getItem('usedCodes') || '{}');
    } catch (error) {
      return {};
    }
  };

  const getAdminGeneratedCodes = () => {
    try {
      return JSON.parse(localStorage.getItem('adminGeneratedCodes') || '[]');
    } catch (error) {
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
    getAdminGeneratedCodes
  };
};
