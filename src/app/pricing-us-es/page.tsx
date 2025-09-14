'use client';

import { useState } from 'react';
import { Check, Star, Shield, Lock, Zap, Crown, ArrowRight, Brain, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { formatCurrencyUS, formatPercentageUS } from '@/utils/usFormatting';

const US_PRICING_PLANS_ES = [
  {
    id: 'basic',
    name: 'Plan Básico',
    price: 4.99,
    originalPrice: 9.99,
    discount: 50,
    period: 'mes',
    description: 'Perfecto para principiantes',
    features: [
      'Predicciones diarias para 3 juegos de lotería',
      'Análisis básico de IA',
      'Soporte por email',
      'Acceso a aplicación móvil',
      'Prueba gratuita de 7 días'
    ],
    limitations: [
      'Limitado a 3 juegos',
      'Solo estadísticas básicas'
    ],
    popular: false,
    color: 'blue',
    icon: Brain
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    price: 14.99,
    originalPrice: 29.99,
    discount: 50,
    period: 'mes',
    description: 'Opción más popular',
    features: [
      'Predicciones diarias para 10+ juegos de lotería',
      'Análisis avanzado de IA con Anbel',
      'Soporte prioritario',
      'Notificaciones en tiempo real',
      'Estadísticas detalladas y tendencias',
      'Reconocimiento de patrones',
      'Prueba gratuita de 14 días',
      'Cancela en cualquier momento'
    ],
    limitations: [],
    popular: true,
    color: 'purple',
    icon: Crown
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    period: 'mes',
    description: 'Para jugadores serios',
    features: [
      'Juegos de lotería ilimitados',
      'Análisis premium de IA',
      'Soporte prioritario 24/7',
      'Algoritmos de predicción personalizados',
      'Panel de análisis avanzado',
      'Acceso a datos históricos',
      'Acceso a API',
      'Prueba gratuita de 30 días',
      'Garantía de devolución de dinero'
    ],
    limitations: [],
    popular: false,
    color: 'gold',
    icon: Zap
  }
];

const US_FEATURES_ES = [
  {
    icon: Shield,
    title: 'Cumplimiento Legal US',
    description: 'Totalmente compatible con regulaciones federales y estatales de EE.UU.'
  },
  {
    icon: Lock,
    title: 'Seguro y Privado',
    description: 'Encriptación de nivel bancario y protección de privacidad'
  },
  {
    icon: Zap,
    title: 'Actualizaciones en Tiempo Real',
    description: 'Notificaciones instantáneas y predicciones en vivo'
  },
  {
    icon: Brain,
    title: 'IA Avanzada',
    description: 'Potenciado por Anbel IA con 94.5% de precisión'
  }
];

const US_TESTIMONIALS_ES = [
  {
    name: 'María González',
    location: 'California, CA',
    rating: 5,
    text: 'GanaFácil me ha ayudado a entender mejor los patrones de lotería. ¡Las predicciones de IA son sorprendentemente precisas!',
    plan: 'Premium'
  },
  {
    name: 'Carlos Rodríguez',
    location: 'Texas, TX',
    rating: 5,
    text: 'Las características específicas para EE.UU. y el cumplimiento me hacen sentir seguro usando esta plataforma. ¡Altamente recomendado!',
    plan: 'Pro'
  },
  {
    name: 'Ana Martínez',
    location: 'Florida, FL',
    rating: 5,
    text: 'Excelente relación calidad-precio. La prueba gratuita me permitió probar todo antes de comprometerme. ¡Servicio excelente!',
    plan: 'Básico'
  }
];

export default function PricingPageUSEs() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const getPlanPrice = (plan: typeof US_PRICING_PLANS_ES[0]) => {
    if (billingPeriod === 'yearly') {
      return {
        price: plan.price * 10, // 2 meses gratis
        originalPrice: plan.originalPrice * 12,
        period: 'año'
      };
    }
    return {
      price: plan.price,
      originalPrice: plan.originalPrice,
      period: plan.period
    };
  };

  const getSavings = (plan: typeof US_PRICING_PLANS_ES[0]) => {
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
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Mercado US</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Elige Tu Plan
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Obtén acceso a predicciones inteligentes de lotería potenciadas por Anbel IA. 
            Todos los planes incluyen pruebas gratuitas y son totalmente compatibles con las regulaciones de EE.UU.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg ${billingPeriod === 'monthly' ? 'text-white' : 'text-blue-200'}`}>
              Mensual
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
              Anual
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ¡Ahorra 2 meses!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {US_PRICING_PLANS_ES.map((plan) => {
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
                      MÁS POPULAR
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
                        {formatPercentageUS(plan.discount)} DESCUENTO
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <p className="text-sm text-green-600 font-semibold mt-2">
                        ¡Ahorra {formatCurrencyUS(savings)} por año!
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
                  Iniciar Prueba Gratuita
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  {plan.id === 'basic' && 'Prueba gratuita de 7 días'}
                  {plan.id === 'premium' && 'Prueba gratuita de 14 días'}
                  {plan.id === 'pro' && 'Prueba gratuita de 30 días'}
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
              ¿Por Qué Elegir GanaFácil?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Construido específicamente para el mercado estadounidense con cumplimiento, seguridad y tecnología de IA avanzada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {US_FEATURES_ES.map((feature, index) => {
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
              Lo Que Dicen Nuestros Clientes de EE.UU.
            </h2>
            <p className="text-xl text-gray-600">
              Únete a miles de usuarios satisfechos en todo Estados Unidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {US_TESTIMONIALS_ES.map((testimonial, index) => (
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
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que confían en GanaFácil para predicciones inteligentes de lotería. 
            ¡Comienza tu prueba gratuita hoy - no se requiere tarjeta de crédito!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register-us-es"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              Iniciar Prueba Gratuita
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/activate-whatsapp"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Activar por WhatsApp
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Compliance */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Cumplimiento Legal de EE.UU.</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Cumplimiento Federal</h4>
                <p className="text-gray-300">
                  Compatible con las leyes y regulaciones federales de EE.UU. sobre servicios en línea.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Regulaciones Estatales</h4>
                <p className="text-gray-300">
                  Respeta las leyes y restricciones estatales individuales sobre servicios relacionados con lotería.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Protección de Privacidad</h4>
                <p className="text-gray-300">
                  Sigue las leyes de privacidad de EE.UU. incluyendo cumplimiento de CCPA y COPPA.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              *Las predicciones son solo para entretenimiento. Por favor juega responsablemente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
