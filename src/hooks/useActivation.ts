'use client';

import { useState, useEffect } from 'react';

export function useActivation() {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si está activado en localStorage
    const activated = localStorage.getItem('ganafacil_activated');
    setIsActivated(activated === 'true');
    setIsLoading(false);
  }, []);

  const activate = (code: string) => {
    if (code.toUpperCase() === 'GANAFACIL') {
      localStorage.setItem('ganafacil_activated', 'true');
      setIsActivated(true);
      return true;
    }
    return false;
  };

  const deactivate = () => {
    localStorage.removeItem('ganafacil_activated');
    setIsActivated(false);
  };

  return {
    isActivated,
    isLoading,
    activate,
    deactivate
  };
}
