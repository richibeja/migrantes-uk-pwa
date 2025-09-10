// Sistema de pagos real para Hotmart
export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: number; // días
  features: string[];
  popular?: boolean;
}

export const PAYMENT_PLANS: PaymentPlan[] = [
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
    features: [
      'Todo del Plan Premium',
      'Acceso beta a nuevas funciones',
      'Consultoría personalizada',
      'Predicciones VIP exclusivas',
      'Soporte directo por WhatsApp'
    ]
  }
];

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

// Simulación de procesamiento de pago
export const processPayment = async (
  planId: string,
  paymentMethod: 'paypal' | 'stripe' | 'card'
): Promise<PaymentResult> => {
  try {
    const plan = PAYMENT_PLANS.find(p => p.id === planId);
    if (!plan) {
      return { success: false, error: 'Plan no encontrado' };
    }

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      transactionId,
      redirectUrl: paymentMethod === 'paypal' 
        ? `https://paypal.com/checkout?txn=${transactionId}`
        : `https://stripe.com/checkout?txn=${transactionId}`
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
};

// Verificar estado de suscripción
export const checkSubscriptionStatus = (userId: string): {
  isActive: boolean;
  plan: string;
  expiresAt: string;
  features: string[];
} => {
  // Simular verificación desde base de datos
  const stored = localStorage.getItem(`subscription_${userId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
    isActive: false,
    plan: 'free',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    features: PAYMENT_PLANS[0].features
  };
};

// Activar suscripción
export const activateSubscription = (
  userId: string, 
  planId: string, 
  transactionId: string
): void => {
  const plan = PAYMENT_PLANS.find(p => p.id === planId);
  if (!plan) return;
  
  const subscription = {
    isActive: true,
    plan: planId,
    expiresAt: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000).toISOString(),
    features: plan.features,
    transactionId,
    activatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(`subscription_${userId}`, JSON.stringify(subscription));
};
