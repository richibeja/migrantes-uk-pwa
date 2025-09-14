'use client';

import { useState } from 'react';
import { CreditCard, Smartphone, Shield, CheckCircle, ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentEnPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [paymentMethod, setPaymentMethod] = useState('whatsapp');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$3.99',
      originalPrice: '$7.99',
      discount: '50% OFF',
      features: [
        '10 predictions per month',
        'Anbel Algorithm',
        'WhatsApp Support',
        'Basic statistics access'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$11.99',
      originalPrice: '$19.99',
      discount: '40% OFF',
      features: [
        '50 predictions per month',
        '4 advanced algorithms',
        'Priority support',
        'Detailed statistics',
        'Unlimited AI chat',
        'Personalized predictions'
      ],
      popular: true
    },
    {
      id: 'vip',
      name: 'VIP Plan',
      price: '$28.99',
      originalPrice: '$49.99',
      discount: '42% OFF',
      features: [
        'Unlimited predictions',
        'All algorithms',
        'VIP 24/7 support',
        'Advanced analytics',
        'Real-time alerts',
        'Personal consultation'
      ],
      popular: false
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSuccess(true);
    setIsProcessing(false);
  };

  const generateWhatsAppLink = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    const message = `Hello, I want to activate my GanaFácil account with the ${plan?.name} (${plan?.price}). My email is: user@demo.com`;
    return `https://wa.me/573213349045?text=${encodeURIComponent(message)}`;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Processed!</h1>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. We will send you your activation code via WhatsApp within the next few minutes.
          </p>
          <div className="space-y-3">
            <Link 
              href="/activate-whatsapp-en" 
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all block text-center"
            >
              Receive Code via WhatsApp
            </Link>
            <Link 
              href="/page-en" 
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all block text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <Link href="/auth/register-en" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Registration
          </Link>
          <h1 className="text-2xl font-bold mb-2">Select Your Plan</h1>
          <p className="text-blue-100">Choose the plan that best fits your needs</p>
        </div>

        <div className="p-6">
          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">{plan.originalPrice}</span>
                    <div className="text-sm text-green-600 font-semibold">{plan.discount}</div>
                  </div>
                  
                  <ul className="space-y-2 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === 'whatsapp'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('whatsapp')}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Pay via WhatsApp</h4>
                    <p className="text-sm text-gray-600">Secure and fast payment</p>
                  </div>
                </div>
              </div>
              
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Credit Card</h4>
                    <p className="text-sm text-gray-600">Pay with card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800 mb-1">100% Secure Payment</h4>
                <p className="text-green-700 text-sm">
                  Your data is protected with SSL encryption. We do not store card information.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          {paymentMethod === 'whatsapp' ? (
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Smartphone className="h-6 w-6" />
              Pay via WhatsApp
            </a>
          ) : (
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-6 w-6" />
                  Pay with Card
                </>
              )}
            </button>
          )}

          {/* Status Info */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Activation Status</h4>
                <p className="text-yellow-700 text-sm">
                  Your account is <strong>pending activation</strong>. Once you complete the payment, 
                  you will receive your activation code via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
