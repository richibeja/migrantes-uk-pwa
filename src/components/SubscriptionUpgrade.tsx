'use client';

import React, { useState } from 'react';
import { 
  Crown, 
  Zap, 
  Star, 
  Check, 
  X, 
  ArrowRight,
  Lock,
  Unlock,
  TrendingUp,
  Bell,
  BarChart3,
  Ticket,
  Headphones
} from 'lucide-react';
import { subscriptionService, SubscriptionPlan } from '@/lib/subscription';

interface SubscriptionUpgradeProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (planId: string) => void;
  currentAction?: string;
}

export default function SubscriptionUpgrade({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  currentAction 
}: SubscriptionUpgradeProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = subscriptionService.getPlans();
  const currentPlan = subscriptionService.getCurrentPlan();
  const status = subscriptionService.getStatus();

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      const success = await subscriptionService.subscribe(selectedPlan);
      if (success) {
        onUpgrade(selectedPlan);
        onClose();
      }
    } catch (error) {
      console.error('Upgrade error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('Predicciones')) return <Zap className="w-5 h-5" />;
    if (feature.includes('Loterías')) return <Star className="w-5 h-5" />;
    if (feature.includes('Actualización')) return <TrendingUp className="w-5 h-5" />;
    if (feature.includes('Notificaciones')) return <Bell className="w-5 h-5" />;
    if (feature.includes('Estadísticas')) return <BarChart3 className="w-5 h-5" />;
    if (feature.includes('Boletos')) return <Ticket className="w-5 h-5" />;
    if (feature.includes('Soporte')) return <Headphones className="w-5 h-5" />;
    return <Check className="w-5 h-5" />;
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'free': return <Lock className="w-6 h-6" />;
      case 'premium': return <Crown className="w-6 h-6" />;
      case 'pro': return <Star className="w-6 h-6" />;
      default: return <Check className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'free': return 'text-gray-500';
      case 'premium': return 'text-yellow-500';
      case 'pro': return 'text-purple-500';
      default: return 'text-blue-500';
    }
  };

  const getPlanBgColor = (planType: string) => {
    switch (planType) {
      case 'free': return 'bg-gray-100';
      case 'premium': return 'bg-yellow-100';
      case 'pro': return 'bg-purple-100';
      default: return 'bg-blue-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Upgrade tu Suscripción</h2>
                <p className="text-yellow-100">
                  {currentAction ? `Para usar: ${currentAction}` : 'Desbloquea todas las funciones'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Current Plan Status */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Plan Actual</h3>
                <p className="text-gray-600">{status.planName}</p>
                {status.daysRemaining > 0 && (
                  <p className="text-sm text-gray-500">
                    {status.daysRemaining} días restantes
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getPlanBgColor(currentPlan?.type || 'free')}`}>
                  {getPlanIcon(currentPlan?.type || 'free')}
                  <span className={`font-semibold ${getPlanColor(currentPlan?.type || 'free')}`}>
                    {currentPlan?.type === 'free' ? 'Gratuito' : currentPlan?.type === 'premium' ? 'Premium' : 'Pro'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 border-2 transition-all cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.type === 'free' ? 'opacity-75' : ''}`}
                onClick={() => plan.type !== 'free' && setSelectedPlan(plan.id)}
              >
                {plan.type === 'pro' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex items-center space-x-2 mb-4 ${getPlanColor(plan.type)}`}>
                    {getPlanIcon(plan.type)}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600">/mes</span>
                    )}
                  </div>

                  {plan.type === 'free' && (
                    <div className="text-sm text-gray-500">
                      Plan actual
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-green-500">
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900 text-sm">Limitaciones:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    {plan.limitations.maxPredictionsPerDay === -1 ? (
                      <p>• Predicciones ilimitadas</p>
                    ) : (
                      <p>• {plan.limitations.maxPredictionsPerDay} predicciones/día</p>
                    )}
                    {plan.limitations.maxLotteries === -1 ? (
                      <p>• Todas las loterías</p>
                    ) : (
                      <p>• {plan.limitations.maxLotteries} loterías</p>
                    )}
                    <p>• Actualización cada {plan.limitations.updateInterval}s</p>
                    <p>• Notificaciones: {plan.limitations.notifications ? 'Sí' : 'No'}</p>
                    <p>• Estadísticas: {plan.limitations.statistics ? 'Sí' : 'No'}</p>
                  </div>
                </div>

                {/* Action Button */}
                {plan.type === 'free' ? (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Plan Actual
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      selectedPlan === plan.id
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar'}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Upgrade Benefits */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              ¿Por qué upgrade?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Predicciones en Tiempo Real</h4>
                    <p className="text-sm text-gray-600">
                      Actualizaciones cada 10 segundos vs cada hora
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Más Loterías</h4>
                    <p className="text-sm text-gray-600">
                      Acceso a 9 loterías internacionales vs 3
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bell className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Notificaciones Push</h4>
                    <p className="text-sm text-gray-600">
                      Recibe alertas de nuevas predicciones
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Estadísticas Avanzadas</h4>
                    <p className="text-sm text-gray-600">
                      Analiza tu rendimiento y mejora
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Ticket className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Boletos Digitales</h4>
                    <p className="text-sm text-gray-600">
                      Registra y gestiona tus jugadas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Headphones className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Soporte Prioritario</h4>
                    <p className="text-sm text-gray-600">
                      Respuesta rápida a tus consultas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpgrade}
              disabled={isProcessing || selectedPlan === 'free'}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <span>Upgrade Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Guarantee */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              ✅ Garantía de 30 días • ✅ Cancelación en cualquier momento • ✅ Sin compromisos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
