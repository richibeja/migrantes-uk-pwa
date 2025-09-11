'use client';

import { useState, useEffect } from 'react';
import { Check, Key, ArrowRight, AlertCircle, Shield, Users, Crown, Loader2, Link, Mail, Download, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function ActivatePage() {
  const { activateCode, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    plan: ''
  });
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [showCodes, setShowCodes] = useState(false);

  const MAX_INTENTOS = 3;

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated]); // Removed router dependency

  const activarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validar email
      if (!email.includes('@') || !email.includes('.')) {
        setError('Por favor ingresa un email válido');
        setIsLoading(false);
        return;
      }

      // Verificar límite de intentos
      if (intentosFallidos >= MAX_INTENTOS) {
        setError('Demasiados intentos fallidos. Intenta más tarde.');
        setIsLoading(false);
        return;
      }

      // Simular delay de validación
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Usar el sistema unificado de autenticación
      const result = activateCode(code, email, email.split('@')[0]);

      if (!result.success) {
        setError(result.message);
        setIntentosFallidos(prev => prev + 1);
        setIsLoading(false);
        return;
      }

      // Activación exitosa
      setIsActivated(true);
      setUserInfo({
        name: email.split('@')[0],
        email: email,
        plan: 'premium' // Se obtendrá del sistema unificado
      });

      // Redirigir después de 3 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (error) {
      console.error('Error activating code:', error);
      setError('Error al activar el código. Intenta de nuevo.');
      setIntentosFallidos(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  // Códigos de prueba disponibles
  const codigosPrueba = [
    { code: 'GANAFACIL', plan: 'Premium', desc: 'Código principal' },
    { code: 'PREMIUM123', plan: 'Premium', desc: 'Código premium' },
    { code: 'VIP456', plan: 'VIP', desc: 'Código VIP' },
    { code: 'BASIC789', plan: 'Básico', desc: 'Código básico' },
    { code: 'DEMO2024', plan: 'Básico', desc: 'Código demo' }
  ];

  if (isActivated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-800/50 rounded-2xl p-8 text-center border border-gray-600/50">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gold mb-4">¡CUENTA ACTIVADA!</h1>
            <p className="text-gray-300 mb-6">
              Bienvenido a GANA FÁCIL, <strong>{userInfo.name}</strong>
            </p>
            
            <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
              <div className="text-gold font-bold text-xl mb-2">Plan: {userInfo.plan.toUpperCase()}</div>
              <div className="text-gray-300 text-sm">Acceso completo al sistema</div>
            </div>
            
            <div className="text-gray-400 text-sm mb-6">
              Redirigiendo al dashboard en unos segundos...
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 bg-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
              >
                Ir al Dashboard Ahora
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Ir al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🔑</div>
              <div>
                <h1 className="text-3xl font-bold text-gold">ACTIVAR CUENTA</h1>
                <p className="text-gray-300">Activa tu acceso a GANA FÁCIL</p>
              </div>
            </div>
            
            <a
              href="/"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Volver al Inicio
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-600/50">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Código de Activación</h2>
              <p className="text-gray-300">Ingresa tu código para acceder al sistema</p>
            </div>

            <form onSubmit={activarCodigo} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Código de Activación
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                  placeholder="GANAFACIL"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gold to-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Activando...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Activar Acceso</span>
                  </>
                )}
              </button>
            </form>

            {/* Códigos de prueba */}
            <div className="mt-8">
              <button
                onClick={() => setShowCodes(!showCodes)}
                className="w-full text-center text-gold hover:text-yellow-400 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>💡 Códigos de Prueba</span>
              </button>
              
              {showCodes && (
                <div className="mt-4 space-y-2">
                  {codigosPrueba.map((codigo) => (
                    <div key={codigo.code} className="bg-gray-700/50 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <div className="text-white font-mono">{codigo.code}</div>
                        <div className="text-gray-400 text-sm">{codigo.desc}</div>
                      </div>
                      <div className="text-gold text-sm font-bold">{codigo.plan}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Información adicional */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                ¿Necesitas ayuda? Contacta soporte
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="/activate-simple"
                  className="text-gold hover:text-yellow-400 transition-colors text-sm"
                >
                  Sistema Simple
                </a>
                <a
                  href="/admin-simple"
                  className="text-gold hover:text-yellow-400 transition-colors text-sm"
                >
                  Admin Simple
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>GANA FÁCIL</strong> - Sistema de Activación
            </p>
            <p className="text-xs mt-1">
              Sistema unificado de autenticación
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}