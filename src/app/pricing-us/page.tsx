'use client';

import { useState } from 'react';
import { Check, Star, Shield, Lock, Zap, Crown, ArrowRight, Brain, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { formatCurrencyUS, formatPercentageUS } from '@/utils/usFormatting';

const US_PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 4.99,
    originalPrice: 9.99,
    discount: 50,
    period: 'month',
    description: 'Perfect for beginners',
    features: [
      'Daily predictions for 3 lottery games',
      'Basic AI analysis',
      'Email support',
      'Mobile app access',
      '7-day free trial'
    ],
    limitations: [
      'Limited to 3 games',
      'Basic statistics only'
    ],
    popular: false,
    color: 'blue',
    icon: Brain
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 14.99,
    originalPrice: 29.99,
    discount: 50,
    period: 'month',
    description: 'Most popular choice',
    features: [
      'Daily predictions for 10+ lottery games',
      'Advanced AI analysis with Anbel',
      'Priority support',
      'Real-time notifications',
      'Detailed statistics & trends',
      'Pattern recognition',
      '14-day free trial',
      'Cancel anytime'
    ],
    limitations: [],
    popular: true,
    color: 'purple',
    icon: Crown
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    period: 'month',
    description: 'For serious players',
    features: [
      'Unlimited lottery games',
      'Premium AI analysis',
      '24/7 priority support',
      'Custom prediction algorithms',
      'Advanced analytics dashboard',
      'Historical data access',
      'API access',
      '30-day free trial',
      'Money-back guarantee'
    ],
    limitations: [],
    popular: false,
    color: 'gold',
    icon: Zap
  }
];

const US_FEATURES = [
  {
    icon: Shield,
    title: 'US Legal Compliance',
    description: 'Fully compliant with US federal and state regulations'
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Bank-level encryption and privacy protection'
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Instant notifications and live predictions'
  },
  {
    icon: Brain,
    title: 'Advanced AI',
    description: 'Powered by Anbel AI with 94.5% accuracy'
  }
];

const US_TESTIMONIALS = [
  {
    name: 'Michael Johnson',
    location: 'California, CA',
    rating: 5,
    text: 'GanaFácil has helped me understand lottery patterns better. The AI predictions are surprisingly accurate!',
    plan: 'Premium'
  },
  {
    name: 'Sarah Williams',
    location: 'Texas, TX',
    rating: 5,
    text: 'The US-specific features and compliance make me feel safe using this platform. Highly recommended!',
    plan: 'Pro'
  },
  {
    name: 'David Chen',
    location: 'New York, NY',
    rating: 5,
    text: 'Great value for money. The free trial let me test everything before committing. Excellent service!',
    plan: 'Basic'
  }
];

export default function PricingPageUS() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const getPlanPrice = (plan: typeof US_PRICING_PLANS[0]) => {
    if (billingPeriod === 'yearly') {
      return {
        price: plan.price * 10, // 2 months free
        originalPrice: plan.originalPrice * 12,
        period: 'year'
      };
    }
    return {
      price: plan.price,
      originalPrice: plan.originalPrice,
      period: plan.period
    };
  };

  const getSavings = (plan: typeof US_PRICING_PLANS[0]) => {
    const { price, originalPrice } = getPlanPrice(plan);
    return originalPrice - price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="h-12 w-12 text-green-400" />
            <span className="text-4xl font-bold">GanaFácil</span>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">US Market</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Get access to intelligent lottery predictions powered by Anbel AI. 
            All plans include free trials and are fully compliant with US regulations.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg ${billingPeriod === 'monthly' ? 'text-white' : 'text-blue-200'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                billingPeriod === 'yearly' ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-0'
              }`} />
            </button>
            <span className={`text-lg ${billingPeriod === 'yearly' ? 'text-white' : 'text-blue-200'}`}>
              Yearly
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Save 2 months!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {US_PRICING_PLANS.map((plan) => {
            const { price, originalPrice, period } = getPlanPrice(plan);
            const savings = getSavings(plan);
            const IconComponent = plan.icon;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    plan.color === 'blue' ? 'bg-blue-100' :
                    plan.color === 'purple' ? 'bg-purple-100' :
                    'bg-yellow-100'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${
                      plan.color === 'blue' ? 'text-blue-600' :
                      plan.color === 'purple' ? 'text-purple-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatCurrencyUS(price)}
                      </span>
                      <span className="text-gray-500">/{period}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg text-gray-400 line-through">
                        {formatCurrencyUS(originalPrice)}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                        {formatPercentageUS(plan.discount)} OFF
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <p className="text-sm text-green-600 font-semibold mt-2">
                        Save {formatCurrencyUS(savings)} per year!
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Start Free Trial
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  {plan.id === 'basic' && '7-day free trial'}
                  {plan.id === 'premium' && '14-day free trial'}
                  {plan.id === 'pro' && '30-day free trial'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GanaFácil?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for the US market with compliance, security, and advanced AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {US_FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our US Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users across the United States
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {US_TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonial.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust GanaFácil for intelligent lottery predictions. 
            Start your free trial today - no credit card required!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register-us"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/activate-whatsapp-en"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Activate via WhatsApp
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Compliance */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">US Legal Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Federal Compliance</h4>
                <p className="text-gray-300">
                  Compliant with US federal laws and regulations regarding online services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">State Regulations</h4>
                <p className="text-gray-300">
                  Respects individual state laws and restrictions on lottery-related services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Privacy Protection</h4>
                <p className="text-gray-300">
                  Follows US privacy laws including CCPA and COPPA compliance.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              *Predictions are for entertainment purposes only. Please gamble responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
