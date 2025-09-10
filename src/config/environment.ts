// Configuración de variables de entorno para GANA FÁCIL
export const ENV_CONFIG = {
  // Firebase
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
  },

  // PayPal
  paypal: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    secret: process.env.PAYPAL_SECRET || '',
    mode: process.env.NEXT_PUBLIC_PAYPAL_MODE || 'sandbox'
  },

  // Stripe
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
  },

  // App
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  },

  // APIs Externas
  apis: {
    lotteryApiKey: process.env.LOTTERY_API_KEY || '',
    rapidApiKey: process.env.RAPIDAPI_KEY || ''
  },

  // Admin
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'ganafacil2025'
  },

  // Notificaciones
  notifications: {
    vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY || ''
  },

  // Traducción
  translation: {
    libreTranslateUrl: process.env.NEXT_PUBLIC_LIBRETRANSLATE_URL || 'https://libretranslate.com/translate'
  }
};

// Verificar configuración
export const validateConfig = () => {
  const errors: string[] = [];

  // Verificar Firebase
  if (!ENV_CONFIG.firebase.apiKey) {
    errors.push('NEXT_PUBLIC_FIREBASE_API_KEY es requerido');
  }
  if (!ENV_CONFIG.firebase.projectId) {
    errors.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID es requerido');
  }

  // Verificar PayPal (opcional para desarrollo)
  if (ENV_CONFIG.paypal.mode === 'production' && !ENV_CONFIG.paypal.clientId) {
    errors.push('NEXT_PUBLIC_PAYPAL_CLIENT_ID es requerido para producción');
  }

  // Verificar Stripe (opcional)
  if (ENV_CONFIG.stripe.publishableKey && !ENV_CONFIG.stripe.secretKey) {
    errors.push('STRIPE_SECRET_KEY es requerido si se usa Stripe');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Configuración de desarrollo vs producción
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// URLs de APIs de loterías
export const LOTTERY_API_URLS = {
  powerball: 'https://data.ny.gov/resource/5xaw-6ayf.json',
  megaMillions: 'https://data.ny.gov/resource/5xaw-6ayf.json',
  euromillions: 'https://api.euromillions.com/api/v1',
  baloto: 'https://api.baloto.com/api/v1',
  lottoUk: 'https://api.national-lottery.co.uk/api/v1'
};

// Configuración de caché
export const CACHE_CONFIG = {
  lotteryResults: 2 * 60 * 1000, // 2 minutos
  predictions: 5 * 60 * 1000, // 5 minutos
  userData: 10 * 60 * 1000, // 10 minutos
  subscriptionStatus: 30 * 60 * 1000 // 30 minutos
};

// Configuración de límites
export const LIMITS_CONFIG = {
  maxPredictionsPerDay: 10,
  maxApiCallsPerMinute: 60,
  maxRetries: 3,
  timeout: 10000 // 10 segundos
};
