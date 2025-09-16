'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, ArrowLeft, CheckCircle, Clock, Phone, Mail, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function ActivateWhatsApp() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    if (plan) {
      setSelectedPlan(plan);
    }

    // Get pending user data
    const pendingUser = JSON.parse(localStorage.getItem('pendingUser') || '{}');
    if (pendingUser.email) {
      setUserData(pendingUser);
    }
  }, []);

  const handleWhatsAppActivation = () => {
    const whatsappNumber = '+19295909116';
    const planPrices = {
      gratis: 'GRATIS (3 días de prueba)',
      premium: '$79 (3 meses)',
      vip: '$149 (3 meses)'
    };
    
    const whatsappMessage = encodeURIComponent(
      '🎯 *SOLICITUD DE ACTIVACIÓN - GANA FÁCIL*\n\n' +
      '¡Hola! Quiero activar mi cuenta con el siguiente plan:\n\n' +
      '📋 *Detalles del Plan:*\n' +
      '• Plan: ' + selectedPlan.toUpperCase() + '\n' +
      '• Precio: ' + planPrices[selectedPlan as keyof typeof planPrices] + '\n' +
      '• Email: ' + (userData?.email || 'No proporcionado') + '\n' +
      '• Teléfono: ' + (userData?.phone || 'No proporcionado') + '\n\n' +
      'Por favor, envíame el código de activación y las instrucciones de pago.\n\n' +
      '¡Gracias!'
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const plans = {
    gratis: {
      name: 'Prueba Gratuita',
      price: 'GRATIS',
      originalPrice: '$39',
      duration: '3 días',
      features: [
        'Predicciones básicas (3 sorteos)',
        'Acceso a estadísticas básicas',
        'Soporte por WhatsApp',
        'Sin compromiso'
      ],
      color: 'bg-gray-600'
    },
    premium: {
      name: 'Plan Premium',
      price: '$79',
      originalPrice: '$119',
      duration: '3 meses',
      features: [
        'Predicciones para 10+ sorteos diarios',
        'Análisis avanzado con Anbel IA',
        'Soporte prioritario por WhatsApp',
        'Notificaciones en tiempo real',
        'Historial completo ilimitado',
        'Estrategias exclusivas',
        'Análisis de tendencias'
      ],
      color: 'bg-purple-600'
    },
    vip: {
      name: 'Plan VIP',
      price: '$149',
      originalPrice: '$199',
      duration: '3 meses',
      features: [
        'Predicciones ilimitadas',
        'IA avanzada con machine learning',
        'Soporte VIP personalizado',
        'Notificaciones ultra rápidas',
        'Análisis de tendencias en tiempo real',
        'Estrategias personalizadas',
        'Acceso a funciones beta'
      ],
      color: 'bg-yellow-600'
    }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gold mb-2">Activar por WhatsApp</h1>
          <p className="text-gray-300">
            Elige tu plan y actívate al instante a través de WhatsApp
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-gray-900 border-2 rounded-xl p-6 cursor-pointer transition-all ${
                selectedPlan === key 
                  ? 'border-gold bg-gray-800' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedPlan(key)}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gold mb-1">{plan.price}</div>
                <div className="text-sm text-gray-500 line-through">{plan.originalPrice}</div>
                <div className="text-sm text-gray-400">{plan.duration}</div>
              </div>
              
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Selected Plan Details */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Plan Seleccionado: {currentPlan.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gold mb-3">Información del Plan</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Precio:</span>
                  <span className="text-white font-semibold">{currentPlan.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duración:</span>
                  <span className="text-white">{currentPlan.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Precio Original:</span>
                  <span className="text-gray-500 line-through">{currentPlan.originalPrice}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gold mb-3">Qué Incluye</h4>
              <ul className="space-y-1">
                {currentPlan.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
                {currentPlan.features.length > 4 && (
                  <li className="text-sm text-gray-400">
                    +{currentPlan.features.length - 4} características más
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* User Information */}
        {userData && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-white mb-2">📋 Información de tu cuenta:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-400">Email: {userData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-400">Teléfono: {userData.phone}</span>
              </div>
            </div>
          </div>
        )}

        {/* Activation Button */}
        <div className="text-center">
          <button
            onClick={handleWhatsAppActivation}
            className={`${currentPlan.color} text-white font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto`}
          >
            <MessageCircle className="w-6 h-6" />
            Activar por WhatsApp
          </button>
          
          <p className="text-sm text-gray-400 mt-4">
            Serás redirigido a WhatsApp para completar tu activación
          </p>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gold" />
            Cómo funciona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold">1</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Selecciona Plan</h4>
              <p className="text-sm text-gray-400">
                Elige el plan que mejor se adapte a tus necesidades
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold">2</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Contacta WhatsApp</h4>
              <p className="text-sm text-gray-400">
                Envía tu solicitud de activación por WhatsApp
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold">3</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Actívate</h4>
              <p className="text-sm text-gray-400">
                Recibe tu código de activación y comienza a ganar
              </p>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
            <MessageCircle className="w-4 h-4 mr-2 text-gold" />
            ¿Necesitas Ayuda?
          </h3>
          <p className="text-xs text-gray-400 mb-2">
            Nuestro equipo de soporte está disponible 24/7 por WhatsApp para ayudarte con tu activación.
          </p>
          <p className="text-xs text-gray-400">
            WhatsApp: +1 (929) 590-9116
          </p>
        </div>
      </div>
    </div>
  );
}