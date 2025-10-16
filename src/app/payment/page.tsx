'use client';

import { useState } from 'react';
import { CreditCard, Smartphone, Shield, CheckCircle, ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentEnPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '£39',
      originalPrice: '£59',
      discount: '34% OFF',
      duration: '3 months',
      features: [
        'Predictions for 5 daily draws',
        'AI-powered analysis',
        'Email support',
        'Basic statistics',
        'Mobile app access',
        '90-day history'
      ],
      popular: false,
      hotmartLink: 'https://pay.hotmart.com/YOUR_BASIC_PRODUCT_ID'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '£79',
      originalPrice: '£119',
      discount: '34% OFF',
      duration: '3 months',
      features: [
        'Predictions for 10+ daily draws',
        'All 4 advanced algorithms',
        'Priority email support',
        'Detailed statistics',
        'Unlimited AI chat',
        'Personalized predictions',
        'Real-time notifications'
      ],
      popular: true,
      hotmartLink: 'https://pay.hotmart.com/YOUR_PREMIUM_PRODUCT_ID'
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '£149',
      originalPrice: '£199',
      discount: '25% OFF',
      duration: '3 months',
      features: [
        'Unlimited predictions',
        'All algorithms + beta features',
        'VIP 24/7 support',
        'Advanced analytics',
        'Real-time alerts',
        'Personal consultation',
        'API access'
      ],
      popular: false,
      hotmartLink: 'https://pay.hotmart.com/YOUR_PRO_PRODUCT_ID'
    }
  ];

  const handleHotmartPayment = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan && plan.hotmartLink) {
      // Redirect to Hotmart checkout
      window.location.href = plan.hotmartLink;
    } else {
      // Fallback to payment configuration page
      alert('Please configure your Hotmart product links in the payment page code.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Purchase Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Check your email inbox for your login credentials and activation instructions.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">📧 Check Your Email</h3>
            <p className="text-sm text-blue-700">
              We've sent you a welcome email with:
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
              <li>✓ Your login credentials</li>
              <li>✓ Getting started guide</li>
              <li>✓ How to access predictions</li>
              <li>✓ Support contact</li>
            </ul>
          </div>
          <div className="space-y-3">
            <Link 
              href="/auth/login-en" 
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all block text-center"
            >
              Login Now
            </Link>
            <Link 
              href="/" 
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all block text-center"
            >
              Back to Home
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Didn't receive the email? Check your spam folder or contact: support@ganafacil.app
          </p>
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
                    <div className="text-xs text-gray-500 mt-1">{plan.duration}</div>
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

          {/* How It Works */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              How Activation Works
            </h3>
            <div className="space-y-3 text-sm text-blue-800">
              <p className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Click "Buy with Hotmart" below and complete secure payment</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Receive welcome email with login instructions (instant)</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <span>Login to your account and start getting AI predictions</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                <span>Get predictions for all 7 lotteries (UK, Europe & USA)</span>
              </p>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800 mb-1">100% Secure Payment via Hotmart</h4>
                <p className="text-green-700 text-sm">
                  Your data is protected with SSL encryption. Hotmart processes all payments securely. 30-day money-back guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Button - Hotmart Only */}
          <button
            onClick={handleHotmartPayment}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-5 px-6 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all flex items-center justify-center gap-3 text-xl shadow-lg transform hover:scale-105"
          >
            <CreditCard className="h-7 w-7" />
            Buy with Hotmart - {plans.find(p => p.id === selectedPlan)?.price}
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            ⚡ Instant email activation • 💰 30-day money-back guarantee • 🔒 Secure Hotmart checkout
          </p>

          {/* What Happens Next */}
          <div className="mt-6 bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-800 mb-1">What Happens Next?</h4>
                <p className="text-purple-700 text-sm">
                  After payment, you'll receive an email with your login credentials within 5 minutes. 
                  Check your inbox and spam folder. Need help? Contact: support@ganafacil.app
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
