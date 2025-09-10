// Sistema de pagos REAL para Gana Fácil
import { loadScript } from '@paypal/react-paypal-js';

export interface RealPaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: number; // días
  features: string[];
  popular?: boolean;
  stripePriceId?: string;
  paypalPlanId?: string;
}

export const REAL_PAYMENT_PLANS: RealPaymentPlan[] = [
  {
    id: 'free',
    name: 'Plan Gratuito',
    price: 0,
    currency: 'USD',
    duration: 7,
    features: [
      '3 predicciones por día',
      '2 loterías disponibles',
      'Soporte básico',
      'Sin historial'
    ]
  },
  {
    id: 'basic',
    name: 'Plan Básico',
    price: 9.97,
    currency: 'USD',
    duration: 30,
    stripePriceId: 'price_basic_monthly',
    paypalPlanId: 'P-5ML4271244454362WXNWU5NQ',
    features: [
      'Predicciones ilimitadas',
      'Todas las loterías',
      'Historial completo',
      'Notificaciones push',
      'Soporte prioritario'
    ]
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    price: 19.97,
    currency: 'USD',
    duration: 30,
    popular: true,
    stripePriceId: 'price_premium_monthly',
    paypalPlanId: 'P-5ML4271244454362WXNWU5NQ',
    features: [
      'Todo del Plan Básico',
      'Análisis avanzado',
      'Predicciones exclusivas',
      'Soporte 24/7',
      'Garantía de devolución'
    ]
  },
  {
    id: 'vip',
    name: 'Plan VIP',
    price: 49.97,
    currency: 'USD',
    duration: 90,
    stripePriceId: 'price_vip_quarterly',
    paypalPlanId: 'P-5ML4271244454362WXNWU5NQ',
    features: [
      'Todo del Plan Premium',
      'Acceso beta a nuevas funciones',
      'Consultoría personalizada',
      'Predicciones VIP exclusivas',
      'Soporte directo por WhatsApp'
    ]
  }
];

export interface RealPaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
  paymentMethod: 'paypal' | 'stripe' | 'card';
  planId: string;
  amount: number;
  currency: string;
}

export interface PaymentWebhookData {
  eventType: string;
  transactionId: string;
  planId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'failed' | 'refunded';
  timestamp: string;
}

// Configuración de PayPal Real
export const PAYPAL_REAL_CONFIG = {
  mode: process.env.NEXT_PUBLIC_PAYPAL_MODE || 'sandbox', // 'sandbox' o 'production'
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  currency: 'USD',
  intent: 'capture' as const,
  vault: false
};

// Configuración de Stripe Real
export const STRIPE_REAL_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  currency: 'usd'
};

// Clase para manejar pagos reales
export class RealPaymentManager {
  private paypalSDK: any = null;

  async initializePayPal(): Promise<boolean> {
    try {
      if (typeof window !== 'undefined' && !this.paypalSDK) {
        this.paypalSDK = await loadScript({
          'client-id': PAYPAL_REAL_CONFIG.clientId,
          currency: PAYPAL_REAL_CONFIG.currency,
          intent: PAYPAL_REAL_CONFIG.intent,
          vault: PAYPAL_REAL_CONFIG.vault
        });
      }
      return !!this.paypalSDK;
    } catch (error) {
      console.error('Error inicializando PayPal:', error);
      return false;
    }
  }

  async processPayPalPayment(planId: string): Promise<RealPaymentResult> {
    try {
      const plan = REAL_PAYMENT_PLANS.find(p => p.id === planId);
      if (!plan) {
        return {
          success: false,
          error: 'Plan no encontrado',
          paymentMethod: 'paypal',
          planId,
          amount: 0,
          currency: 'USD'
        };
      }

      if (plan.price === 0) {
        return {
          success: true,
          transactionId: `free_${Date.now()}`,
          paymentMethod: 'paypal',
          planId,
          amount: 0,
          currency: 'USD'
        };
      }

      const isInitialized = await this.initializePayPal();
      if (!isInitialized) {
        return {
          success: false,
          error: 'PayPal no está disponible',
          paymentMethod: 'paypal',
          planId,
          amount: plan.price,
          currency: plan.currency
        };
      }

      // Crear orden de PayPal
      const order = await this.createPayPalOrder(plan);
      if (!order) {
        return {
          success: false,
          error: 'Error creando orden de PayPal',
          paymentMethod: 'paypal',
          planId,
          amount: plan.price,
          currency: plan.currency
        };
      }

      return {
        success: true,
        transactionId: order.id,
        redirectUrl: order.links?.find((link: any) => link.rel === 'approve')?.href,
        paymentMethod: 'paypal',
        planId,
        amount: plan.price,
        currency: plan.currency
      };

    } catch (error) {
      console.error('Error procesando pago PayPal:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        paymentMethod: 'paypal',
        planId,
        amount: 0,
        currency: 'USD'
      };
    }
  }

  private async createPayPalOrder(plan: RealPaymentPlan): Promise<any> {
    try {
      const response = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.price,
          currency: plan.currency,
          description: `Gana Fácil - ${plan.name}`
        })
      });

      if (!response.ok) {
        throw new Error('Error creando orden de PayPal');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creando orden PayPal:', error);
      return null;
    }
  }

  async processStripePayment(planId: string, paymentMethodId: string): Promise<RealPaymentResult> {
    try {
      const plan = REAL_PAYMENT_PLANS.find(p => p.id === planId);
      if (!plan) {
        return {
          success: false,
          error: 'Plan no encontrado',
          paymentMethod: 'stripe',
          planId,
          amount: 0,
          currency: 'USD'
        };
      }

      if (plan.price === 0) {
        return {
          success: true,
          transactionId: `free_${Date.now()}`,
          paymentMethod: 'stripe',
          planId,
          amount: 0,
          currency: 'USD'
        };
      }

      const response = await fetch('/api/payments/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          amount: Math.round(plan.price * 100), // Stripe usa centavos
          currency: plan.currency.toLowerCase(),
          paymentMethodId
        })
      });

      if (!response.ok) {
        throw new Error('Error creando payment intent');
      }

      const result = await response.json();
      
      return {
        success: result.success,
        transactionId: result.paymentIntentId,
        error: result.error,
        paymentMethod: 'stripe',
        planId,
        amount: plan.price,
        currency: plan.currency
      };

    } catch (error) {
      console.error('Error procesando pago Stripe:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        paymentMethod: 'stripe',
        planId,
        amount: 0,
        currency: 'USD'
      };
    }
  }

  async verifyPayment(transactionId: string, paymentMethod: 'paypal' | 'stripe'): Promise<boolean> {
    try {
      const response = await fetch(`/api/payments/${paymentMethod}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId })
      });

      if (!response.ok) {
        return false;
      }

      const result = await response.json();
      return result.verified === true;

    } catch (error) {
      console.error('Error verificando pago:', error);
      return false;
    }
  }

  async activateSubscription(
    userId: string,
    planId: string,
    transactionId: string,
    paymentMethod: 'paypal' | 'stripe'
  ): Promise<boolean> {
    try {
      const plan = REAL_PAYMENT_PLANS.find(p => p.id === planId);
      if (!plan) return false;

      const subscription = {
        userId,
        planId,
        transactionId,
        paymentMethod,
        isActive: true,
        activatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000).toISOString(),
        features: plan.features,
        amount: plan.price,
        currency: plan.currency
      };

      // Guardar en Firestore
      const response = await fetch('/api/subscriptions/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      });

      return response.ok;

    } catch (error) {
      console.error('Error activando suscripción:', error);
      return false;
    }
  }

  async getSubscriptionStatus(userId: string): Promise<{
    isActive: boolean;
    plan: string;
    expiresAt: string;
    features: string[];
  }> {
    try {
      const response = await fetch(`/api/subscriptions/status?userId=${userId}`);
      if (!response.ok) {
        return {
          isActive: false,
          plan: 'free',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          features: REAL_PAYMENT_PLANS[0].features
        };
      }

      return await response.json();

    } catch (error) {
      console.error('Error obteniendo estado de suscripción:', error);
      return {
        isActive: false,
        plan: 'free',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        features: REAL_PAYMENT_PLANS[0].features
      };
    }
  }
}

// Instancia global
export const realPaymentManager = new RealPaymentManager();

// Funciones de conveniencia
export const processRealPayment = async (
  planId: string,
  paymentMethod: 'paypal' | 'stripe' = 'paypal',
  paymentMethodId?: string
): Promise<RealPaymentResult> => {
  if (paymentMethod === 'paypal') {
    return await realPaymentManager.processPayPalPayment(planId);
  } else {
    if (!paymentMethodId) {
      return {
        success: false,
        error: 'Payment method ID requerido para Stripe',
        paymentMethod: 'stripe',
        planId,
        amount: 0,
        currency: 'USD'
      };
    }
    return await realPaymentManager.processStripePayment(planId, paymentMethodId);
  }
};

export const activateRealSubscription = async (
  userId: string,
  planId: string,
  transactionId: string,
  paymentMethod: 'paypal' | 'stripe'
): Promise<boolean> => {
  return await realPaymentManager.activateSubscription(userId, planId, transactionId, paymentMethod);
};

export const getRealSubscriptionStatus = async (userId: string) => {
  return await realPaymentManager.getSubscriptionStatus(userId);
};
