// Application Configuration
export const APP_CONFIG = {
  name: 'Gana Fácil',
  version: '1.0.0',
  description: 'AI-Powered Lottery Predictions for UK, Europe & USA',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://ganafacil.app',
  supportEmail: 'support@ganafacil.app',
  maxPredictionsPerUser: 10,
  predictionUpdateInterval: 3600000, // 1 hour
  referralReward: 1000, // Points per referral
  maintenanceMode: false,
  targetMarket: 'UK', // Primary market: United Kingdom
  defaultCurrency: 'GBP',
  defaultLanguage: 'en', // ENGLISH ONLY
  timezone: 'Europe/London',
  forceEnglish: true, // Force English for all users
};

// ============================================
// LOTERÍAS DE PRODUCCIÓN - SOLO REALES
// Enfocado en Reino Unido, Europa y USA
// ============================================
export const lotteries = [
  // Reino Unido
  { id: "uk-lotto", name: "UK National Lottery", country: "UK", region: "UK", enabled: true },
  { id: "thunderball", name: "Thunderball", country: "UK", region: "UK", enabled: true },
  { id: "set-for-life", name: "Set For Life", country: "UK", region: "UK", enabled: true },

  // Europa (incluye UK)
  { id: "euromillions", name: "EuroMillions", country: "EU", region: "Europe", enabled: true },
  { id: "euromillions-hotpicks", name: "EuroMillions HotPicks", country: "UK", region: "Europe", enabled: true },

  // Estados Unidos (disponibles en UK)
  { id: "powerball", name: "Powerball", country: "US", region: "USA", enabled: true },
  { id: "mega-millions", name: "Mega Millions", country: "US", region: "USA", enabled: true },
];

// ============================================
// CONFIGURACIÓN DE LOTERÍAS POR REGIÓN
// Solo loterías REALES disponibles en Reino Unido
// ============================================
export const LOTTERIES_BY_COUNTRY = {
  UK: {
    name: 'United Kingdom',
    timezone: 'Europe/London',
    currency: 'GBP',
    lotteries: [
      {
        id: 'uk-lotto',
        name: 'UK National Lottery',
        type: 'national',
        drawDays: ['Wednesday', 'Saturday'],
        drawTime: '20:30',
        numbersCount: 6,
        maxNumber: 59,
        bonusNumbers: 1,
        maxBonusNumber: 59,
        apiEndpoint: 'https://www.national-lottery.co.uk/results/api',
      },
      {
        id: 'thunderball',
        name: 'Thunderball',
        type: 'national',
        drawDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
        drawTime: '20:00',
        numbersCount: 5,
        maxNumber: 39,
        bonusNumbers: 1,
        maxBonusNumber: 14,
        apiEndpoint: 'https://www.national-lottery.co.uk/results/thunderball/api',
      },
      {
        id: 'set-for-life',
        name: 'Set For Life',
        type: 'national',
        drawDays: ['Monday', 'Thursday'],
        drawTime: '20:00',
        numbersCount: 5,
        maxNumber: 47,
        bonusNumbers: 1,
        maxBonusNumber: 10,
        apiEndpoint: 'https://www.national-lottery.co.uk/results/set-for-life/api',
      },
    ],
  },
  EU: {
    name: 'Europe',
    timezone: 'Europe/Paris',
    currency: 'EUR', // Se puede convertir a GBP para UK
    lotteries: [
      {
        id: 'euromillions',
        name: 'EuroMillions',
        type: 'international',
        drawDays: ['Tuesday', 'Friday'],
        drawTime: '20:45',
        numbersCount: 5,
        maxNumber: 50,
        bonusNumbers: 2,
        maxBonusNumber: 12,
        apiEndpoint: 'https://www.euro-millions.com/api/results',
      },
    ],
  },
  US: {
    name: 'United States',
    timezone: 'America/New_York',
    currency: 'USD', // Se puede convertir a GBP para UK
    lotteries: [
      {
        id: 'powerball',
        name: 'Powerball',
        type: 'national',
        drawDays: ['Monday', 'Wednesday', 'Saturday'],
        drawTime: '22:59',
        numbersCount: 5,
        maxNumber: 69,
        bonusNumbers: 1,
        maxBonusNumber: 26,
        apiEndpoint: 'https://data.ny.gov/resource/5xaw-6ayf.json',
      },
      {
        id: 'mega-millions',
        name: 'Mega Millions',
        type: 'national',
        drawDays: ['Tuesday', 'Friday'],
        drawTime: '23:00',
        numbersCount: 5,
        maxNumber: 70,
        bonusNumbers: 1,
        maxBonusNumber: 25,
        apiEndpoint: 'https://data.ny.gov/resource/5xaw-6ayf.json',
      },
    ],
  },
};

// Prediction Methods - ENGLISH
export const PREDICTION_METHODS = [
  {
    name: 'Anbel Method',
    description: 'Algorithm based on mathematical patterns and numerical sequences',
    weight: 0.35,
    minConfidence: 75,
    maxConfidence: 95,
  },
  {
    name: 'Probabilistic Method',
    description: 'Statistical analysis of frequencies and probabilities',
    weight: 0.25,
    minConfidence: 70,
    maxConfidence: 90,
  },
  {
    name: 'Historical Method',
    description: 'Analysis of historical patterns and trends',
    weight: 0.20,
    minConfidence: 65,
    maxConfidence: 85,
  },
  {
    name: 'Cross-Filter Method',
    description: 'Intelligent combination of multiple algorithms',
    weight: 0.20,
    minConfidence: 80,
    maxConfidence: 98,
  },
];

// Configuración de códigos de activación
export const ACTIVATION_CONFIG = {
  codeLength: 20,
  maxAttempts: 3,
  lockoutDuration: 300000, // 5 minutos
  expirationDays: 30,
  maxCodesPerAdmin: 100,
};

// Configuración de administrador
export const ADMIN_CONFIG = {
  username: process.env.ADMIN_USERNAME || 'admin',
  defaultPassword: 'ganafacil2025',
  sessionDuration: 86400000, // 24 horas
  maxLoginAttempts: 5,
  lockoutDuration: 900000, // 15 minutos
};

// Application Messages - ENGLISH ONLY
export const MESSAGES = {
  activation: {
    success: 'Code activated successfully! You can now access predictions.',
    invalid: 'Invalid or already used code. Please verify and try again.',
    expired: 'The code has expired. Request a new one from the administrator.',
    error: 'Error processing activation. Please try again.',
    required: 'Please enter an activation code',
    maxAttempts: 'You have exceeded the maximum number of attempts. Try again in 5 minutes.',
  },
  auth: {
    required: 'You need to activate your code to access this feature',
    expired: 'Your session has expired. Please activate your code again.',
    adminRequired: 'Restricted access. Only administrators can access.',
    invalidCredentials: 'Invalid credentials',
  },
  predictions: {
    loading: 'Analyzing patterns and generating winning numbers...',
    noData: 'No predictions available at this time.',
    error: 'Error loading predictions. Please try again.',
    updating: 'Updating predictions...',
    locked: 'Predictions are locked until the next draw.',
  },
  admin: {
    codeGenerated: 'Activation code generated successfully',
    codeDeleted: 'Code deleted successfully',
    userActivated: 'User activated successfully',
    userDeactivated: 'User deactivated successfully',
  },
};

// Colores del tema
export const COLORS = {
  gold: {
    50: '#fffbf0',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#FFD700',
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    DEFAULT: '#0F0F0F',
  },
  black: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// Rutas de la aplicación
export const ROUTES = {
  home: '/',
  activate: '/activate',
  dashboard: '/dashboard',
  admin: '/admin',
  profile: '/profile',
  predictions: '/predictions',
  statistics: '/statistics',
  referrals: '/referrals',
};

// Configuración de PWA
export const PWA_CONFIG = {
  name: 'Gana Fácil',
  shortName: 'Gana Fácil',
  description: 'PWA para apoyo a migrantes en Reino Unido',
  themeColor: '#FFD700',
  backgroundColor: '#000000',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  startUrl: '/',
};

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  title: 'Gana Fácil',
  icon: '/icons/icon-192x192.png',
  badge: '/icons/icon-192x192.png',
  vibrate: [200, 100, 200],
  requireInteraction: false,
  silent: false,
};

// Configuración de API
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
};

// Configuración de base de datos
export const DB_CONFIG = {
  collections: {
    users: 'users',
    predictions: 'predictions',
    lotteries: 'lotteries',
    results: 'results',
    activationCodes: 'activationCodes',
    adminUsers: 'adminUsers',
    notifications: 'notifications',
    referrals: 'referrals',
    statistics: 'statistics',
  },
  indexes: [
    { collection: 'users', field: 'code', unique: true },
    { collection: 'predictions', field: 'lotteryId' },
    { collection: 'activationCodes', field: 'code', unique: true },
  ],
};

// Configuración de seguridad
export const SECURITY_CONFIG = {
  bcryptRounds: 12,
  jwtExpiration: '24h',
  refreshTokenExpiration: '7d',
  maxSessionsPerUser: 3,
  passwordMinLength: 8,
  passwordRequirements: {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  },
};

// Localization Configuration - ENGLISH ONLY
export const LOCALE_CONFIG = {
  default: 'en',
  supported: ['en'], // Only English
  fallback: 'en',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  currencyFormat: {
    style: 'currency',
    currency: 'GBP', // UK market
  },
};

// Configuración de caché
export const CACHE_CONFIG = {
  predictions: 3600000, // 1 hora
  lotteryResults: 86400000, // 24 horas
  userData: 300000, // 5 minutos
  countryData: 604800000, // 1 semana
};

// Configuración de límites
export const LIMITS = {
  maxPredictionsPerDay: 5,
  maxReferralsPerUser: 10,
  maxNotificationsPerUser: 50,
  maxLoginAttempts: 5,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxConcurrentRequests: 10,
};

// ============================================
// CÓDIGOS DE ACTIVACIÓN - PRODUCCIÓN
// NOTA: En producción, estos se gestionan desde Firebase
// Estos son solo para desarrollo local
// ============================================
export const VALID_ACTIVATION_CODES =
  process.env.NODE_ENV === 'production'
    ? [] // En producción se validan contra Firebase
    : [
        // Solo para desarrollo local
        'DEV2025TEST001',
        'LOCAL2025DEMO001',
      ];

// Activation Messages - ENGLISH
export const ACTIVATION_MESSAGES = {
  required: "Please enter an activation code.",
  invalid: "Invalid activation code. Please verify and try again.",
  success: "Code activated successfully! Redirecting to dashboard...",
  locked: "Account temporarily locked due to multiple failed attempts.",
  error: "Error activating code. Please try again."
};
