'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Calendar, Download, AlertCircle, Check, Crown, Zap, Gift } from 'lucide-react';
import { SUBSCRIPTION_PLANS, UserSubscription } from '@/types/subscriptions';
import { getCurrentPlan, isSubscriptionActive, getDiasRestantes, isInTrial } from '@/utils/permissions';

export default function SubscriptionManagerClient() {
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Mock data for development
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
    // Redirect to Hotmart/Stripe for payment
    console.log('Upgrading to plan:', planId);
    // In production: window.location.href = `https://hotmart.com/checkout/${planId}`;
  };

  const handleCancel = () => {
    // Process cancellation
    console.log('Cancelling subscription');
    // In production: call API to cancel
  };

  const handleDownloadInvoice = () => {
    // Download invoice
    console.log('Downloading invoice');
    // In production: generate and download PDF
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Loading subscription...</p>
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
              <h1 className="text-3xl font-bold text-gold">My Subscription</h1>
              <p className="text-gray-400 mt-1">Manage your plan and billing</p>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="/account/subscriptions"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🇪🇸 Español
              </a>
              <button
                onClick={() => setShowUpgrade(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Change Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
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
                      {isTrial ? 'Trial period' : 'Active plan'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    ${currentPlan?.precio}/month
                  </div>
                  <div className="text-gray-400 text-sm">
                    {isTrial ? 'Free for 7 days' : 'Billed monthly'}
                  </div>
                </div>
              </div>

              {/* Subscription Status */}
              <div className="mb-6">
                {isActive ? (
                  <div className="flex items-center space-x-2 text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">
                      {isTrial 
                        ? `Trial period - ${diasRestantes} days remaining`
                        : `Active - Renewal in ${diasRestantes} days`
                      }
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Subscription expired</span>
                  </div>
                )}
              </div>

              {/* Plan Benefits */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Included benefits:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentPlan?.beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  {currentPlan?.id === 'gratis' ? 'Start Trial' : 'Change Plan'}
                </button>
                {currentPlan?.id !== 'gratis' && (
                  <button
                    onClick={handleCancel}
                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Payment Information */}
            <div className="bg-gray-800/90 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Information</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Payment Method</div>
                  <div className="text-white font-medium">
                    {currentSubscription?.metodoPago === 'hotmart' ? 'Hotmart' : 'Stripe'}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Next Billing</div>
                  <div className="text-white font-medium">
                    {currentSubscription?.fechaFin.toLocaleDateString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Auto Renewal</div>
                  <div className="text-white font-medium">
                    {currentSubscription?.renovacionAutomatica ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadInvoice}
                className="w-full mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </button>
            </div>

            {/* Payment History */}
            <div className="bg-gray-800/90 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent History</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Basic Plan</div>
                    <div className="text-gray-400 text-sm">January 1, 2025</div>
                  </div>
                  <div className="text-green-400 font-semibold">$9.99</div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Basic Plan</div>
                    <div className="text-gray-400 text-sm">December 1, 2024</div>
                  </div>
                  <div className="text-green-400 font-semibold">$9.99</div>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-white font-medium">Trial Period</div>
                    <div className="text-gray-400 text-sm">November 1, 2024</div>
                  </div>
                  <div className="text-gray-400 font-semibold">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Change Plan</h2>
              <button
                onClick={() => setShowUpgrade(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Subscription Plans Component would go here */}
            <div className="text-center py-12">
              <p className="text-gray-400">Subscription plans component here...</p>
              <button
                onClick={() => setShowUpgrade(false)}
                className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
