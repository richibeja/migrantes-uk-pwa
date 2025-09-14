'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export default function ConnectionStatus() {
  const { isOnline } = usePWA();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowStatus(true);
      const timer = setTimeout(() => setShowStatus(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowStatus(true);
      const timer = setTimeout(() => setShowStatus(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showStatus) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isOnline ? 'translate-x-0' : 'translate-x-0'
    }`}>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm ${
        isOnline 
          ? 'bg-green-500/90 text-white' 
          : 'bg-red-500/90 text-white'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span>Conectado</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>Sin conexión</span>
          </>
        )}
      </div>
    </div>
  );
}
