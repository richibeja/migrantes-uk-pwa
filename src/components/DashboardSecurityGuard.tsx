'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, AlertCircle, Loader2, Key } from 'lucide-react';

interface DashboardSecurityGuardProps {
  children: React.ReactNode;
}

export default function DashboardSecurityGuard({ children }: DashboardSecurityGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Verificar si hay usuario en localStorage
        const savedUser = localStorage.getItem('ganaFacilUser');
        const isActivated = localStorage.getItem('ganafacil_activated');
        
        if (!savedUser || !isActivated) {
          setError('No tienes acceso al dashboard. Debes activar tu cuenta primero.');
          setIsChecking(false);
          return;
        }

        const userData = JSON.parse(savedUser);
        
        // Verificar si el usuario tiene datos básicos
        if (!userData.id || !userData.email) {
          setError('Tu cuenta no tiene datos válidos. Debes activar tu cuenta con un código válido.');
          setIsChecking(false);
          return;
        }

        // Si llegamos aquí, el usuario tiene acceso válido
        setHasAccess(true);
        setIsChecking(false);

      } catch (error) {
        console.error('Error verificando acceso al dashboard:', error);
        setError('Error verificando acceso. Intenta de nuevo.');
        setIsChecking(false);
      }
    };

    checkAccess();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Verificando acceso al dashboard...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-red-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full animate-pulse flex items-center justify-center">
                <Key className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            🔐 ACCESO DENEGADO
          </h1>
          <p className="text-gray-300 mb-6">
            {error || 'No tienes acceso al dashboard de GANA FÁCIL'}
          </p>
          
          <div className="space-y-4">
            <a
              href="/activate"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Key className="w-5 h-5" />
              <span>ACTIVAR CON CÓDIGO</span>
            </a>
            
            <a
              href="/"
              className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>VOLVER AL INICIO</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
