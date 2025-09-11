'use client';

import { useState } from 'react';
import { Check, Star, Zap, Crown, Gift } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/types/subscriptions';

interface SubscriptionPlansProps {
  currentPlanId?: string;
  onSelectPlan: (planId: string) => void;
  showAnnual?: boolean;
}

export default function SubscriptionPlans({ 
  currentPlanId, 
  onSelectPlan, 
  showAnnual = true 
}: SubscriptionPlansProps) {
        return <Gift className="w-6 h-6" />;
  const [isAnnual, setIsAnnual] = useState(showAnnual);

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'gratis':
      case 'basico':
        return <Zap className="w-6 h-6" />;
      case 'premium':
        return <Star className="w-6 h-6" />;
      case 'vip':
        return <Crown className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  const getPlanColor = (plan: SubscriptionPlan) => {
    switch (plan.color) {
      case 'blue':
        return 'from-blue-600 to-blue-700';
      case 'purple':
        return 'from-purple-600 to-purple-700';
      case 'gold':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getPrice = (plan: SubscriptionPlan) => {
    return isAnnual ? plan.precioAnual : plan.precio;
  };

  const getPriceText = (plan: SubscriptionPlan) => {
    if (plan.precio === 0) return 'Gratis';
    
    const price = getPrice(plan);
    const period = isAnnual ? '/año' : '/mes';
    const discount = isAnnual && plan.precioAnual < (plan.precio * 12) 
      ? ` (${Math.round((1 - plan.precioAnual / (plan.precio * 12)) * 100)}% descuento)`
      : '';
    
    return `$${price}${period}${discount}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Elige tu Plan Perfecto
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Desbloquea el poder de las predicciones inteligentes
        </p>
        
        {/* Toggle Anual/Mensual */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
            Mensual
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-gold' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
            Anual
          </span>
          {isAnnual && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              ¡Ahorra hasta 17%!
            </span>
          )}
        </div>
      </div>

      {/* Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
              plan.popular 
                ? 'border-gold shadow-2xl shadow-gold/20' 
                : 'border-gray-700 hover:border-gray-600'
            } ${
              currentPlanId === plan.id 
                ? 'ring-2 ring-gold ring-opacity-50' 
                : ''
            }`}
          >
            {/* Badge Popular */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  Más Popular
                </span>
              </div>
            )}

            {/* Header del Plan */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${getPlanColor(plan)} text-white mb-4`}>
                {getPlanIcon(plan.id)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.nombre}</h3>
              <div className="text-3xl font-bold text-white mb-1">
                {getPriceText(plan)}
              </div>
              {plan.precio > 0 && (
                <p className="text-gray-400 text-sm">
                  {isAnnual ? 'Facturado anualmente' : 'Facturado mensualmente'}
                </p>
              )}
            </div>

            {/* Beneficios */}
            <div className="space-y-3 mb-8">
              {plan.beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{beneficio}</span>
                </div>
              ))}
            </div>

            {/* Botón de Acción */}
            <button
              onClick={() => onSelectPlan(plan.id)}
              disabled={currentPlanId === plan.id}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                currentPlanId === plan.id
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-gradient-to-r from-gold to-yellow-400 text-black hover:from-yellow-400 hover:to-gold'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              {currentPlanId === plan.id ? 'Plan Actual' : 'Seleccionar Plan'}
            </button>

            {/* Límites */}
            <div className="mt-4 text-center text-xs text-gray-500">
              {plan.limiteClubs === -1 ? 'Clubs ilimitados' : `${plan.limiteClubs} clubs máximo`}
              {plan.limiteMiembros !== -1 && (
                <span> • {plan.limiteMiembros} miembros por club</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Garantía */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <Check className="w-5 h-5 text-green-400" />
          <span>Garantía de 30 días • Cancela en cualquier momento</span>
        </div>
      </div>
    </div>
  );
}
