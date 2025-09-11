"use client";

import { useState } from 'react';
import { PAYMENT_PLANS, processPayment, activateSubscription } from '@/lib/payments';

interface SubscriptionPlansProps {
  onPlanSelect?: (planId: string) => void;
  currentPlan?: string;
}

export default function SubscriptionPlans({ onPlanSelect, currentPlan }: SubscriptionPlansProps) {
  return (
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'free') {
      onPlanSelect?.(planId);
      return;
    }

    setLoading(planId);
    setError('');

    try {
      const result = await processPayment(planId, 'paypal');
      
      if (result.success) {
        // Simular activación de suscripción
        const userId = 'user_' + Date.now();
        activateSubscription(userId, planId, result.transactionId!);
        
        onPlanSelect?.(planId);
        
        // Redirigir a PayPal
        if (result.redirectUrl) {
          window.open(result.redirectUrl, '_blank');
        }
      } else {
        setError(result.error || 'Error procesando el pago');
      }
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(null);
    }
  };

    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gold mb-4">
          🎯 Elige tu Plan de Predicciones
        </h2>
        <p className="text-xl text-gray-300">
          Accede a predicciones avanzadas y aumenta tus posibilidades de ganar
        </p>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-8 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PAYMENT_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
              plan.popular
                ? 'border-gold shadow-gold/30 shadow-2xl'
                : 'border-gray-600 hover:border-gold/50'
            } ${currentPlan === plan.id ? 'ring-2 ring-gold' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold text-black px-4 py-1 rounded-full text-sm font-bold">
                  MÁS POPULAR
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gold">${plan.price}</span>
                <span className="text-gray-400 ml-2">
                  {plan.duration === 7 ? '/semana' : plan.duration === 30 ? '/mes' : '/3 meses'}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="text-gold mr-3">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan(plan.id)}
              disabled={loading === plan.id || currentPlan === plan.id}
              className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                plan.id === 'free'
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : plan.popular
                  ? 'bg-gradient-to-r from-gold to-yellow-500 text-black hover:from-yellow-400 hover:to-gold'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''} ${
                currentPlan === plan.id ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading === plan.id ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Procesando...
                </span>
              ) : currentPlan === plan.id ? (
                'Plan Actual'
              ) : plan.id === 'free' ? (
                'Comenzar Gratis'
              ) : (
                'Seleccionar Plan'
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400 mb-4">
          🔒 Pagos 100% seguros procesados por PayPal y Stripe
        </p>
        <div className="flex justify-center space-x-8">
          <img src="/logos/paypal.png" alt="PayPal" className="h-8 opacity-60" />
          <img src="/logos/stripe.png" alt="Stripe" className="h-8 opacity-60" />
          <img src="/logos/visa.png" alt="Visa" className="h-8 opacity-60" />
          <img src="/logos/mastercard.png" alt="Mastercard" className="h-8 opacity-60" />
        </div>
      </div>
    </div>
  );
}
