'use client';

import { useState } from 'react';
import { CheckCircle, ArrowLeft, Shield, AlertTriangle, Key, User, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ActivateCodePage() {
  const [formData, setFormData] = useState({
    code: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar código
    if (!formData.code.trim()) {
      newErrors.code = 'Por favor ingresa tu código de activación';
    } else if (formData.code.trim().length < 4) {
      newErrors.code = 'El código debe tener al menos 4 caracteres';
    } else if (!/^[A-Za-z0-9]+$/.test(formData.code.trim())) {
      newErrors.code = 'El código debe contener solo letras y números';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor ingresa tu número de teléfono';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular verificación del código
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la lógica real de verificación del código
      console.log('Código de activación:', formData);
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error en la activación:', error);
      setErrors({ general: 'Error al activar la cuenta. Verifica tu código e intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">¡Cuenta Activada!</h1>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido activada exitosamente. Ahora tienes acceso completo a todas las funcionalidades de GanaFácil.
          </p>
          <div className="space-y-3">
            <Link 
              href="/dashboard" 
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all block text-center"
            >
              Ir al Dashboard
            </Link>
            <Link 
              href="/" 
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all block text-center"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <Link href="/activate-whatsapp" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver a Solicitar Código
          </Link>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Key className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold">GanaFácil</span>
          </div>
          <h1 className="text-xl font-bold mb-2">Activar Cuenta</h1>
          <p className="text-blue-100">Ingresa el código que recibiste por WhatsApp</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Código de Activación */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Activación *
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  maxLength={20}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-center text-2xl font-mono tracking-widest ${
                    errors.code 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                  placeholder="GANAFACIL"
                />
              </div>
              {errors.code && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.code}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email de la Cuenta *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                  placeholder="tu@email.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono de la Cuenta *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                  placeholder="+57 321 456 7890"
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Error general */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Activando Cuenta...
                </div>
              ) : (
                'Activar Cuenta'
              )}
            </button>
          </form>

          {/* Información adicional */}
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">¿No recibiste tu código?</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Si no recibiste el código por WhatsApp, puedes solicitarlo nuevamente.
                </p>
                <Link 
                  href="/activate-whatsapp" 
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Solicitar nuevo código →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
