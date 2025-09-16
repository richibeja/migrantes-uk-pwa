'use client';

import { useState } from 'react';
import { validateAndUseCode } from '@/lib/excel-codes';
import { toast, Toaster } from 'react-hot-toast';

export default function ActivateSimplePage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = async () => {
    if (!email.trim() || !code.trim()) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    if (attempts >= 3) {
      toast.error('Has excedido el límite de intentos. Intenta más tarde.');
      return;
    }

    setIsLoading(true);
    setAttempts(prev => prev + 1);

    try {
      const result = validateAndUseCode(code, email);
      
      if (result.success) {
        setIsActivated(true);
        toast.success(`¡Código activado! Tipo: ${result.type}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error al procesar la activación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setCode('');
    setAttempts(0);
    setIsActivated(false);
    toast.success('Formulario reseteado');
  };

  if (isActivated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
          <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">¡Activación Exitosa!</h1>
            <p className="mt-2 opacity-90">Tu código ha sido activado correctamente</p>
          </div>

          <div className="p-6">
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Detalles de la Activación</h3>
              <p className="text-sm text-green-700">
                <strong>Email:</strong> {email}<br />
                <strong>Código:</strong> {code}<br />
                <strong>Fecha:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Activar Otro Código
              </button>
              
              <a
                href="/admin-simple"
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors block text-center"
              >
                Ir al Panel de Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
          <h1 className="text-2xl font-bold">Activación de Código</h1>
          <p className="mt-2 opacity-90">Ingresa tu email y código de activación</p>
        </div>

        {/* Formulario */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Código de Activación
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                placeholder="Ej: GANAFACIL2024"
                required
              />
            </div>

            {attempts > 0 && (
              <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                Intentos restantes: {3 - attempts}
              </div>
            )}

            <button
              onClick={handleActivate}
              disabled={isLoading || attempts >= 3}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Activando...' : 'Activar Código'}
            </button>
          </div>

          {/* Códigos de ejemplo */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Códigos de prueba:</h3>
            <div className="space-y-1 text-xs">
              <div className="font-mono text-blue-700">GANAFACIL2024 (Premium)</div>
              <div className="font-mono text-blue-700">PREMIUM123 (Premium)</div>
              <div className="font-mono text-blue-700">VIP456 (VIP)</div>
              <div className="font-mono text-blue-700">BASIC789 (Básico)</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 text-center text-sm text-gray-600">
          ¿Necesitas ayuda? Contacta con soporte.
        </div>
      </div>
    </div>
  );
}
