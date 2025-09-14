'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle, Shield, AlertTriangle, Phone, User, ArrowLeft, Clock, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ActivateWhatsApp() {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: ''
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

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as +57 XXX XXX XXXX
    if (phoneNumber.length >= 10) {
      return `+57 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 6) {
      return `+57 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
    } else if (phoneNumber.length >= 3) {
      return `+57 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length > 0) {
      return `+57 ${phoneNumber}`;
    }
    return phoneNumber;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre completo';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor ingresa tu número de WhatsApp';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'El número debe tener al menos 10 dígitos';
    }

    // Validar email (opcional pero si se proporciona debe ser válido)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Por favor ingresa un email válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "573213349045"; // Número sin el símbolo +
    // Generar código de activación
    const activationCode = Math.floor(100000 + Math.random() * 900000);
    const message = `🎉 ¡Hola ${formData.name || 'Usuario'}! 

Tu cuenta GanaFácil está lista para activarse.

📱 Código de Activación: ${activationCode}
🔗 Página de Activación: https://gana-facil-ep1tz724y-ganafacils-projects.vercel.app/activate-code

✅ Pasos para activar:
1. Ve a la página de activación
2. Ingresa tu código: ${activationCode}
3. ¡Disfruta de tus predicciones!

Mi número: ${formData.phone || 'No proporcionado'}${formData.email ? ` y mi email: ${formData.email}` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular proceso de envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generar enlace de WhatsApp
      const whatsappLink = generateWhatsAppLink();
      
      // Abrir WhatsApp
      window.open(whatsappLink, '_blank');
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error en el envío:', error);
      setErrors({ general: 'Error al procesar la solicitud. Por favor intenta de nuevo.' });
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">¡Solicitud Enviada!</h1>
          <p className="text-gray-600 mb-6">
            Tu solicitud de pago ha sido enviada a WhatsApp. 
            Nuestro equipo te contactará para procesar el pago y enviarte tu código de activación.
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
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all block text-center"
            >
              Volver al Inicio
            </Link>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setFormData({ phone: '', name: '', email: '' });
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Nueva Solicitud
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al Inicio
          </Link>
          <div className="flex items-center justify-center gap-3 mb-3">
            <MessageCircle className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold">GanaFácil</span>
          </div>
          <h1 className="text-xl font-bold mb-2">Activación por WhatsApp</h1>
          <p className="text-green-100">Solicita tu código de verificación directamente por WhatsApp</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* WhatsApp Info */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6 flex items-start gap-4">
            <MessageCircle className="h-8 w-8 text-green-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 mb-2">Contacta por WhatsApp</h3>
              <p className="text-green-700 text-sm">
                Nuestro equipo te atenderá inmediatamente para enviarte tu código de activación
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Proceso de Activación</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Completa tu información</h4>
                  <p className="text-gray-600 text-sm">Ingresa tu número de WhatsApp para recibir el código</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Recibe el código por WhatsApp</h4>
                  <p className="text-gray-600 text-sm">Te enviaremos un mensaje con tu código de verificación de 6 dígitos</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Activa tu cuenta</h4>
                  <p className="text-gray-600 text-sm">Ingresa el código en la aplicación para completar tu registro</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                  }`}
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Número de WhatsApp *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFormData(prev => ({ ...prev, phone: formatted }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                  }`}
                  placeholder="+57 321 334 9045"
                  maxLength={18}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico (Opcional)
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
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

            {/* Error general */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando Solicitud...
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  Contactar por WhatsApp
                </>
              )}
            </button>
          </form>

          {/* Security Info */}
          <div className="mt-6 space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Nota de Seguridad</h4>
                  <p className="text-yellow-700 text-sm">
                    El código de verificación es personal e intransferible. No lo compartas con nadie.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Lock className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Protección de Cuenta</h4>
                  <p className="text-red-700 text-sm">
                    WhatsApp te notificará si alguien intenta registrar tu número. Nunca compartas tu código de verificación.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">¿Problemas con la activación?</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Usa un número de teléfono válido</li>
                    <li>• Ten conexión a Internet estable</li>
                    <li>• Verifica que no tienes aplicaciones que bloqueen llamadas o SMS</li>
                    <li>• Asegúrate de haber desactivado el modo avión</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}