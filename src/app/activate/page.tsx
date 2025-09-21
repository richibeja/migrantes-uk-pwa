'use client';

import { useState } from 'react';
// import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, Key, Brain, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

export default function ActivatePage() {
  const [activationCode, setActivationCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleActivation = async () => {
    if (!activationCode.trim()) {
      setErrorMessage('Por favor ingresa tu código de activación');
      setActivationStatus('error');
      return;
    }

    setIsActivating(true);
    setActivationStatus('idle');
    setErrorMessage('');

    try {
      // Simular proceso de activación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verificar código (en producción, verificar contra base de datos)
      if (activationCode.startsWith('ANBEL') && activationCode.length >= 10) {
        // Activación exitosa
        setActivationStatus('success');
        
        // Guardar activación en localStorage
        const activationData = {
          code: activationCode,
          email: userEmail,
          activatedAt: new Date(),
          status: 'active',
          plan: 'vip'
        };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('anbel_activation', JSON.stringify(activationData));
        }
        
      } else {
        throw new Error('Código de activación inválido');
      }
      
    } catch (error) {
      setActivationStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error de activación');
    } finally {
      setIsActivating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleActivation();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">🎯 Activar Anbel IA</h1>
            <p className="text-gray-300">Ingresa tu código de activación de Hotmart</p>
          </div>

          {activationStatus === 'idle' && (
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  📧 Email de compra (opcional)
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Activation Code Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  🔑 Código de Activación
                </label>
                <input
                  type="text"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-mono text-center tracking-wider"
                  placeholder="ANBEL123ABC456"
                  maxLength={20}
                />
                <p className="text-xs text-gray-400 mt-2">
                  El código empieza con "ANBEL" y lo recibiste por email
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 text-center"
                >
                  <XCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-red-400">{errorMessage}</p>
                </div>
              )}

              {/* Activate Button */}
              <button
                onClick={handleActivation}
                disabled={isActivating || !activationCode.trim()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isActivating || !activationCode.trim()
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black transform hover:scale-105 shadow-xl'
                }`}
              >
                {isActivating ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Activando...
                  </div>
                ) : (
                  '🚀 Activar Mi Cuenta'
                )}
              </button>
            </div>
          )}

          {/* Success State */}
          {activationStatus === 'success' && (
            <div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">
                  🎉 ¡Activación Exitosa!
                </h2>
                <p className="text-gray-300">
                  Tu cuenta de Anbel IA Ultra ha sido activada correctamente
                </p>
              </div>

              <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">✅ Ahora tienes acceso a:</h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center text-gray-300">
                    <Brain className="w-5 h-5 text-yellow-400 mr-2" />
                    <span>Anbel IA Ultra con 6 algoritmos</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                    <span>Predicciones ilimitadas</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Crown className="w-5 h-5 text-yellow-400 mr-2" />
                    <span>Funciones VIP completas</span>
                  </div>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-xl font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
              >
                🎯 Ir al Dashboard
              </Link>
            </div>
          )}

          {/* Error State */}
          {activationStatus === 'error' && (
            <div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-red-400 mb-2">
                  ❌ Error de Activación
                </h2>
                <p className="text-gray-300 mb-4">
                  {errorMessage}
                </p>
              </div>

              <button
                onClick={() => {
                  setActivationStatus('idle');
                  setErrorMessage('');
                }}
                className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl transition-all duration-300"
              >
                🔄 Intentar de Nuevo
              </button>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-600">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">¿Necesitas ayuda?</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
                >
                  📱 WhatsApp
                </a>
                <a
                  href="mailto:soporte@ganafacil.com"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
                >
                  📧 Email
                </a>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}