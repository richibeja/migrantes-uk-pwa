'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Calendar, Download, AlertCircle, Check, Crown, Zap, Gift } from 'lucide-react';
import { SUBSCRIPTION_PLANS, UserSubscription } from '@/types/subscriptions';
import { getCurrentPlan, isSubscriptionActive, getDiasRestantes, isInTrial } from '@/utils/permissions';

export default function SubscriptionManagerClient() {
    return (
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Datos de ejemplo para desarrollo
  useEffect(() => {
    const mockSubscription: UserSubscription = {
      userId: 'user1',
      planId: 'basico',
      estado: 'activa',
      fechaInicio: new Date('2024-12-01'),
      fechaFin: new Date('2025-01-01'),
      metodoPago: 'hotmart',
      transaccionId: 'HTM123456789',
      renovacionAutomatica: true
    };

    setTimeout(() => {
      setCurrentSubscription(mockSubscription);
      setIsLoading(false);
    }, 1000);
  }, []);

  const currentPlan = getCurrentPlan({ 
    id: 'user1', 
    planId: currentSubscription?.planId || 'gratis' 
  });

  const diasRestantes = getDiasRestantes(currentSubscription);
  const isActive = isSubscriptionActive(currentSubscription);
  const isTrial = isInTrial(currentSubscription);

  const handleUpgrade = (planId: string) => {
    // Redirigir a Hotmart/Stripe para el pago
    console.log('Upgrading to plan:', planId);
    // En producción: window.location.href = `https://hotmart.com/checkout/${planId}`;
  };

  const handleCancel = () => {
    // Procesar cancelación
    console.log('Cancelling subscription');
    // En producción: llamar API para cancelar
  };

  const handleDownloadInvoice = () => {
    // Descargar factura
    console.log('Downloading invoice');
    // En producción: generar y descargar PDF
  };

  if (isLoading) {
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Cargando suscripción...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gold">Mi Suscripción</h1>
              <p className="text-gray-400 mt-1">Gestiona tu plan y facturación</p>
            </div>
            <button
              onClick={() => setShowUpgrade(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Cambiar Plan
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Actual */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/90 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {currentPlan?.id === 'vip' && <Crown className="w-8 h-8 text-gold" />}
                  {currentPlan?.id === 'premium' && <Zap className="w-8 h-8 text-purple-400" />}
                  {currentPlan?.id === 'basico' && <Zap className="w-8 h-8 text-blue-400" />}
                  {currentPlan?.id === 'gratis' && <Gift className="w-8 h-8 text-gray-400" />}
                  <div>
                    <h2 className="text-2xl font-bold text-white">{currentPlan?.nombre}</h2>
                    <p className="text-gray-400">
                      {isTrial ? 'Período de prueba' : 'Plan activo'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    ${currentPlan?.precio}/mes
                  </div>
                  <div className="text-gray-400 text-sm">
                    {isTrial ? 'Gratis por 7 días' : 'Facturado mensualmente'}
                  </div>
                </div>
              </div>

              {/* Estado de la suscripción */}
              <div className="mb-6">
                {isActive ? (
                  <div className="flex items-center space-x-2 text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">
                      {isTrial 
                        ? `Período de prueba - ${diasRestantes} días restantes`
                        : `Activa - Renovación en ${diasRestantes} días`
                      }
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Suscripción expirada</span>
                  </div>
                )}
              </div>

              {/* Beneficios del plan */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Beneficios incluidos:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentPlan?.beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  {currentPlan?.id === 'gratis' ? 'Comenzar Prueba' : 'Cambiar Plan'}
                </button>
                {currentPlan?.id !== 'gratis' && (
                  <button
                    onClick={handleCancel}
                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Información de Pago */}
            <div className="bg-gray-800/90 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Información de Pago</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Método de Pago</div>
                  <div className="text-white font-medium">
                    {currentSubscription?.metodoPago === 'hotmart' ? 'Hotmart' : 'Stripe'}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Próxima Facturación</div>
                  <div className="text-white font-medium">
                    {currentSubscription?.fechaFin.toLocaleDateString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Renovación Automática</div>
                  <div className="text-white font-medium">
                    {currentSubscription?.renovacionAutomatica ? 'Activada' : 'Desactivada'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadInvoice}
                className="w-full mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Factura</span>
              </button>
            </div>

            {/* Historial de Pagos */}
            <div className="bg-gray-800/90 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Historial Reciente</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Plan Básico</div>
                    <div className="text-gray-400 text-sm">1 de enero, 2025</div>
                  </div>
                  <div className="text-green-400 font-semibold">$9.99</div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Plan Básico</div>
                    <div className="text-gray-400 text-sm">1 de diciembre, 2024</div>
                  </div>
                  <div className="text-green-400 font-semibold">$9.99</div>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-white font-medium">Período de Prueba</div>
                    <div className="text-gray-400 text-sm">1 de noviembre, 2024</div>
                  </div>
                  <div className="text-gray-400 font-semibold">Gratis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Upgrade */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Cambiar Plan</h2>
              <button
                onClick={() => setShowUpgrade(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Aquí iría el componente SubscriptionPlans */}
            <div className="text-center py-12">
              <p className="text-gray-400">Componente de planes aquí...</p>
              <button
                onClick={() => setShowUpgrade(false)}
                className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
