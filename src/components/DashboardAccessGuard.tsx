'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, AlertCircle, Loader2 } from 'lucide-react';
import { dashboardAccessSystem } from '@/lib/dashboard-access';

interface DashboardAccessGuardProps {
  children: React.ReactNode;
}

export default function DashboardAccessGuard({ children }: DashboardAccessGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Verificar sesión de dashboard
        const sessionCheck = dashboardAccessSystem.isDashboardSessionValid();
        
        if (sessionCheck.valid) {
          // Sesión válida
          setHasAccess(true);
          setIsChecking(false);
          return;
        }

        // No hay sesión válida, verificar usuario en localStorage
        const savedUser = localStorage.getItem('ganaFacilUser');
        
        if (!savedUser) {
          setError('No tienes acceso al dashboard. Debes activar tu cuenta primero.');
          setIsChecking(false);
          return;
        }

        const userData = JSON.parse(savedUser);
        
        // Verificar si el usuario tiene acceso al dashboard
        const accessCheck = dashboardAccessSystem.hasDashboardAccess(userData.id);
        
        if (!accessCheck.hasAccess) {
          setError('Tu acceso al dashboard ha expirado o no es válido.');
          setIsChecking(false);
          return;
        }
        
        // Crear nueva sesión
        dashboardAccessSystem.createDashboardSession(userData.id);
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
          <p className="text-white text-xl">Verificando acceso...</p>
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
                <AlertCircle className="w-4 h-4 text-white" />
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
              <Shield className="w-5 h-5" />
              <span>ACTIVAR CUENTA</span>
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
