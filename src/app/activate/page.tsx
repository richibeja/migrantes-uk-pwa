'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, ArrowLeft, Key, Shield, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ActivatePage() {
  const [activationCode, setActivationCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleActivation = async () => {
    if (!activationCode.trim()) {
      alert('Por favor ingresa tu código de activación');
      return;
    }

    setIsActivating(true);
    
    // Simular activación
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validar código contra el localStorage
    const pendingUser = JSON.parse(localStorage.getItem('pendingUser') || '{}');
    const isValidCode = pendingUser.activationCode === activationCode;
    
    if (isValidCode && pendingUser.email) {
      // Marcar como activado
      const activatedUser = {
        ...pendingUser,
        isActivated: true,
        activatedAt: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(activatedUser));
      localStorage.removeItem('pendingUser');
      
      setActivationStatus('success');
    } else {
      setActivationStatus('error');
    }
    
    setIsActivating(false);
  };

  const handleWhatsAppSupport = () => {
    const whatsappNumber = '+19295909116';
    const whatsappMessage = encodeURIComponent(
      '🔑 *SOPORTE DE ACTIVACIÓN*\n\n' +
      'Hola, necesito ayuda con mi código de activación.\n\n' +
      '📋 *Información:*\n' +
      '• Código ingresado: ' + activationCode + '\n' +
      '• Problema: No puedo activar mi cuenta\n\n' +
      'Por favor, envíame un nuevo código o ayúdame a resolver este problema.'
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  if (activationStatus === 'success') {
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gold mb-4">¡Activación Exitosa!</h1>
          <p className="text-gray-300 mb-6">
            Tu cuenta ha sido activada correctamente. Ya puedes acceder a todas las funciones premium.
          </p>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">🎉 ¡Bienvenido a Gana Fácil Premium!</h3>
            <p className="text-gray-400 text-sm">
              Ahora tienes acceso a predicciones inteligentes, análisis avanzado y soporte prioritario.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-block bg-gold text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors mb-4"
          >
            Ir al Dashboard
          </Link>
          
          <p className="text-xs text-gray-500">
            Tu suscripción está activa y lista para usar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Key className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gold mb-2">Activar Cuenta</h1>
          <p className="text-gray-300">
            Ingresa el código de activación que recibiste por WhatsApp
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">
              Código de Activación
            </label>
            <input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
              placeholder="Ej: ABC123"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-lg font-mono tracking-widest focus:outline-none focus:border-gold"
              maxLength={10}
            />
          </div>

          {activationStatus === 'error' && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-400 text-sm">
                  Código inválido. Verifica que sea correcto o solicita uno nuevo.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleActivation}
            disabled={isActivating || !activationCode.trim()}
            className="w-full bg-gold text-black font-semibold py-3 rounded-lg disabled:opacity-60 hover:bg-yellow-400 transition-colors mb-4"
          >
            {isActivating ? 'Activando...' : 'Activar Cuenta'}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              ¿No recibiste tu código o tienes problemas?
            </p>
            
            <button
              onClick={handleWhatsAppSupport}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar por WhatsApp
            </button>
          </div>
        </div>

        <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-gold" />
            Información Importante
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• El código se envía por WhatsApp después del pago</li>
            <li>• Verifica tu carpeta de spam si no lo recibes</li>
            <li>• El código es válido por 24 horas</li>
            <li>• Contacta soporte si tienes problemas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}