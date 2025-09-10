'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getRealSubscriptionStatus } from '@/lib/payments-real';
import { 
  Crown, 
  Star, 
  Zap, 
  Gift, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface SubscriptionStatus {
  isActive: boolean;
  plan: string;
  expiresAt: string;
  features: string[];
  subscriptionId?: string;
}

export default function RealTimeSubscriptionStatus() {
  const { user, isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscriptionStatus = async () => {
    if (!isAuthenticated || !user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const status = await getRealSubscriptionStatus(user.id);
      setSubscription(status);
    } catch (err) {
      console.error('Error cargando estado de suscripción:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptionStatus();
  }, [isAuthenticated, user]);

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return <Gift className="w-5 h-5" />;
      case 'basic':
        return <Zap className="w-5 h-5" />;
      case 'premium':
        return <Star className="w-5 h-5" />;
      case 'vip':
        return <Crown className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free':
        return 'from-gray-500 to-gray-600';
      case 'basic':
        return 'from-blue-500 to-blue-600';
      case 'premium':
        return 'from-purple-500 to-purple-600';
      case 'vip':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPlanName = (planId: string) => {
    switch (planId) {
      case 'free':
        return 'Plan Gratuito';
      case 'basic':
        return 'Plan Básico';
      case 'premium':
        return 'Plan Premium';
      case 'vip':
        return 'Plan VIP';
      default:
        return 'Plan Desconocido';
    }
  };

  const formatExpirationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'Expirado';
    } else if (diffDays === 0) {
      return 'Expira hoy';
    } else if (diffDays === 1) {
      return 'Expira mañana';
    } else {
      return `Expira en ${diffDays} días`;
    }
  };

  const getExpirationColor = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'text-red-500';
    } else if (diffDays <= 3) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-red-800">Error de Suscripción</h3>
        </div>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button
          onClick={loadSubscriptionStatus}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reintentar</span>
        </button>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <div className="text-center">
          <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-800 mb-2">Sin Suscripción</h3>
          <p className="text-gray-600 text-sm mb-4">
            No se encontró información de suscripción
          </p>
          <button
            onClick={loadSubscriptionStatus}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getPlanColor(subscription.plan)} text-white`}>
            {getPlanIcon(subscription.plan)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{getPlanName(subscription.plan)}</h3>
            <div className="flex items-center space-x-2">
              {subscription.isActive ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Clock className="w-4 h-4 text-yellow-500" />
              )}
              <span className={`text-sm font-medium ${subscription.isActive ? 'text-green-600' : 'text-yellow-600'}`}>
                {subscription.isActive ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={loadSubscriptionStatus}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Información de expiración */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estado:</span>
          <span className={`text-sm font-medium ${getExpirationColor(subscription.expiresAt)}`}>
            {formatExpirationDate(subscription.expiresAt)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Fecha de expiración:</span>
          <span className="text-sm text-gray-800">
            {new Date(subscription.expiresAt).toLocaleDateString('es-ES')}
          </span>
        </div>
      </div>

      {/* Características del plan */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Características incluidas:</h4>
        <div className="space-y-1">
          {subscription.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex space-x-3">
        {!subscription.isActive && (
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Actualizar Plan
          </button>
        )}
        
        {subscription.isActive && subscription.plan !== 'vip' && (
          <button className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
            Upgrade
          </button>
        )}
        
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
          Ver Detalles
        </button>
      </div>

      {/* Información adicional */}
      {subscription.subscriptionId && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            ID de Suscripción: {subscription.subscriptionId}
          </div>
        </div>
      )}
    </div>
  );
}
