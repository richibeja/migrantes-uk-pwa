'use client';

import { useState } from 'react';
import { CheckCircle, Crown, Zap, Star, ArrowLeft, CreditCard, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PricingPageEn() {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$29',
      period: 'per month',
      description: 'Perfect to start',
      features: [
        'Predictions for 5 draws',
        'Detailed statistics',
        'WhatsApp support',
        'Basic notifications'
      ],
      color: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$49',
      period: 'per month',
      description: 'Most popular',
      features: [
        'Predictions for 10 draws',
        'Advanced AI analysis',
        'Priority 24/7 support',
        'Instant notifications',
        'Complete prediction history',
        'Access to exclusive strategies'
      ],
      color: 'from-purple-500 to-blue-600',
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$79',
      period: 'per month',
      description: 'For professionals',
      features: [
        'Unlimited predictions',
        'Advanced AI with machine learning',
        'VIP personalized support',
        'Real-time notifications',
        'Trend analysis',
        'Personalized strategies',
        'Access to beta features'
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

    // Create complete WhatsApp message with selected plan
    const whatsappMessage = `🎯 *GANA FÁCIL - PAYMENT REQUEST*\n\n` +
      `📋 *Selected Plan:* ${selectedPlanData.name}\n` +
      `💰 *Price:* ${selectedPlanData.price} ${selectedPlanData.period}\n` +
      `⭐ *Features:*\n` +
      `${selectedPlanData.features.map(feature => `• ${feature}`).join('\n')}\n\n` +
      `💳 *Available Payment Methods:*\n` +
      `• PayPal\n` +
      `• Bank transfer\n` +
      `• Zelle\n` +
      `• Cash App\n\n` +
      `📱 *Payment Instructions:*\n` +
      `1. Make payment for ${selectedPlanData.price}\n` +
      `2. Send payment proof\n` +
      `3. You'll receive your activation code via WhatsApp\n` +
      `4. Access your premium dashboard\n\n` +
      `🚀 *Start winning with intelligent predictions!*`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '+19295909116'; // Your WhatsApp number
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Access intelligent predictions and maximize your chances of winning
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
                    MOST POPULAR
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
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gold mb-6 text-center">
            Why choose GanaFácil?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Secure and Reliable</h4>
              <p className="text-gray-400">Your data is protected with bank-level encryption</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Fast Results</h4>
              <p className="text-gray-400">Instant predictions with advanced AI technology</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-gold mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">High Accuracy</h4>
              <p className="text-gray-400">Proven algorithms with over 85% accuracy</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handlePayment}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl border-2 border-yellow-300"
          >
            <CreditCard className="w-5 h-5 text-white font-bold" />
            <span className="text-white font-bold text-lg">Proceed to Payment via WhatsApp</span>
          </button>
          
          <p className="text-sm text-gray-400 mt-4">
            <Clock className="w-4 h-4 inline mr-1" />
            Secure payment processed via WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
