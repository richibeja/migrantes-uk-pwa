'use client';

import { useState, useEffect } from 'react';
import { Check, Key, ArrowRight, AlertCircle, Shield, Users, Crown, Loader2, Link, Mail } from 'lucide-react';
import { simpleActivationSystem } from '@/lib/simple-activation';
import { enlacesUnicosSimple } from '@/lib/enlaces-unicos-simple';
import { codigosUnicosSeguros } from '@/lib/codigos-unicos-seguros';
import { codigosSimples } from '@/lib/codigos-simples';
import { frontendCodeSystem } from '@/lib/frontend-code-system';

export default function ActivatePage() {
  const [code, setCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [activationMethod, setActivationMethod] = useState<'link' | 'code'>('link');

  // Verificar si hay token en la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      setActivationMethod('link');
      handleUniqueLinkActivation(token);
    }
    // NO verificar si ya está activado automáticamente
    // El usuario debe ingresar un código para activar
  }, []);

  const handleUniqueLinkActivation = async (token: string) => {
    setIsLoading(true);
    setError('');

    try {
      const result = enlacesUnicosSimple.validarYUsarEnlace(token);
      
      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      setIsActivated(true);
      setUserInfo({
        name: result.userData!.name,
        email: result.userData!.email,
        phone: ''
      });
      
      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      setError('Error al activar la cuenta. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const codeToValidate = code.toUpperCase();
      let result = null;
      let userData = null;

      // 1. Primero intentar con el sistema frontend
      result = frontendCodeSystem.validateCode(codeToValidate);
      
      if (result.valid) {
        userData = result.userData;
      } else {
        // 2. Si no funciona, intentar con códigos del admin (localStorage)
        const adminCodes = JSON.parse(localStorage.getItem('ganaFacilActivationCodes') || '[]');
        const adminCode = adminCodes.find((c: any) => c.code === codeToValidate && !c.used);
        
        if (adminCode) {
          // Marcar como usado
          adminCode.used = true;
          adminCode.usedAt = new Date().toISOString();
          adminCode.usedBy = 'usuario@ganafacil.com';
          localStorage.setItem('ganaFacilActivationCodes', JSON.stringify(adminCodes));
          
          // Crear datos de usuario
          userData = {
            id: `user_${Date.now()}`,
            email: adminCode.email,
            name: adminCode.email.split('@')[0],
            plan: adminCode.plan,
            activated: true,
            activatedAt: new Date().toISOString(),
            method: 'admin_code',
            code: codeToValidate
          };
          
          // Guardar en localStorage
          localStorage.setItem('ganaFacilUser', JSON.stringify(userData));
          localStorage.setItem('ganafacil_activated', 'true');
          
          result = { valid: true, message: 'Cuenta activada exitosamente' };
        }
      }

      if (result && result.valid && userData) {
        setIsActivated(true);
        setUserInfo({
          name: userData.name,
          email: userData.email,
          phone: ''
        });
        
        // Redirigir al dashboard después de 2 segundos
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setError(result?.message || 'Código no válido');
      }
      
    } catch (error) {
      console.error('Error validating code:', error);
      setError('Error al validar el código. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isActivated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Check className="w-16 h-16 text-green-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            🎉 ¡CUENTA ACTIVADA!
          </h1>
          <p className="text-gray-300 mb-6">
            Bienvenido a GANA FÁCIL, {userInfo.name || 'Usuario'}
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Redirigiendo al dashboard en unos segundos...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Shield className="w-16 h-16 text-purple-400" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse flex items-center justify-center">
              <Key className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          🔐 ACTIVAR CUENTA
        </h1>
        <p className="text-gray-300 mb-8">
          Activa tu acceso a GANA FÁCIL
        </p>

        {/* Selector de método de activación */}
        <div className="mb-6">
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActivationMethod('link')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activationMethod === 'link'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Link className="w-4 h-4 inline mr-2" />
              Enlace Único
            </button>
            <button
              onClick={() => setActivationMethod('code')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activationMethod === 'code'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4 inline mr-2" />
              Código
            </button>
          </div>
        </div>

        {activationMethod === 'link' ? (
          <div className="space-y-4">
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
              <h3 className="text-blue-400 font-bold mb-2">🔗 Activación por Enlace</h3>
              <p className="text-blue-200 text-sm">
                Si recibiste un enlace único por email, haz clic en él para activar tu cuenta automáticamente.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                ¿No tienes enlace? Usa el método de código
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCodeActivation} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Código de Activación
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingresa tu código"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
              <h3 className="text-yellow-400 font-bold mb-2">💡 Código de Prueba</h3>
              <p className="text-yellow-200 text-sm">
                Usa el código: <span className="font-mono font-bold">GANAFACIL</span>
              </p>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-red-200 text-sm">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Activando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Activar Acceso
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            ¿Necesitas ayuda? Contacta soporte
          </p>
        </div>
      </div>
    </div>
  );
}