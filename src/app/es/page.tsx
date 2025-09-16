'use client';

import { useState } from 'react';
import { CheckCircle, Crown, Zap, Star, ArrowLeft, CreditCard, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PricingPageEs() {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: '$29',
      period: 'por mes',
      description: 'Perfecto para empezar',
      features: [
        'Predicciones para 5 sorteos',
        'Estadísticas detalladas',
        'Soporte por WhatsApp',
        'Notificaciones básicas'
      ],
      color: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: '$49',
      period: 'por mes',
      description: 'El más popular',
      features: [
        'Predicciones para 10 sorteos',
        'Análisis avanzado con IA',
        'Soporte prioritario 24/7',
        'Notificaciones instantáneas',
        'Historial completo de predicciones',
        'Acceso a estrategias exclusivas'
      ],
      color: 'from-purple-500 to-blue-600',
      popular: true
    },
    {
      id: 'pro',
      name: 'Plan Pro',
      price: '$79',
      period: 'por mes',
      description: 'Para profesionales',
      features: [
        'Predicciones ilimitadas',
        'IA avanzada con machine learning',
        'Soporte VIP personalizado',
        'Notificaciones en tiempo real',
        'Análisis de tendencias',
        'Estrategias personalizadas',
        'Acceso a beta features'
      ],
      color: 'from-gold to-yellow-500',
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
    if (!selectedPlanData) return;

    // Crear mensaje completo para WhatsApp con el plan seleccionado
    const whatsappMessage = `🎯 *GANA FÁCIL - SOLICITUD DE PAGO*\n\n` +
      `📋 *Plan Seleccionado:* ${selectedPlanData.name}\n` +
      `💰 *Precio:* ${selectedPlanData.price} ${selectedPlanData.period}\n` +
      `⭐ *Características:*\n` +
      `${selectedPlanData.features.map(feature => `• ${feature}`).join('\n')}\n\n` +
      `💳 *Métodos de Pago Disponibles:*\n` +
      `• PayPal\n` +
      `• Transferencia bancaria\n` +
      `• Zelle\n` +
      `• Cash App\n\n` +
      `📱 *Instrucciones de Pago:*\n` +
      `1. Realiza el pago por ${selectedPlanData.price}\n` +
      `2. Envía el comprobante de pago\n` +
      `3. Recibirás tu código de activación por WhatsApp\n` +
      `4. Accede a tu dashboard premium\n\n` +
      `🚀 *¡Comienza a ganar con predicciones inteligentes!*`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '+19295909116'; // Tu número de WhatsApp
    
    // Redirigir a WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Elige tu Plan
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Accede a predicciones inteligentes y maximiza tus posibilidades de ganar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-900 border-2 rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-gold transform scale-105 shadow-2xl' 
                  : 'border-gray-700 hover:border-gray-600'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gold text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    MÁS POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gold text-black hover:bg-yellow-400 shadow-lg'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <span className={plan.popular ? 'text-black font-bold' : 'text-white'}>
                  {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar Plan'}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gold mb-6 text-center">
            ¿Por qué elegir GanaFácil?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Seguro y Confiable</h4>
              <p className="text-gray-400">Tus datos están protegidos con encriptación de nivel bancario</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Resultados Rápidos</h4>
              <p className="text-gray-400">Predicciones instantáneas con tecnología de IA avanzada</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Alta Precisión</h4>
              <p className="text-gray-400">Algoritmos probados con más del 85% de precisión</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handlePayment}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl border-2 border-yellow-300"
          >
            <CreditCard className="w-5 h-5 text-white font-bold" />
            <span className="text-white font-bold text-lg">Proceder al Pago por WhatsApp</span>
          </button>
          
          <p className="text-sm text-gray-400 mt-4">
            <Clock className="w-4 h-4 inline mr-1" />
            Pago seguro procesado por WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
