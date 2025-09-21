// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'Gana Fácil',
  version: '1.0.0',
  description: 'PWA para apoyo a migrantes en Reino Unido',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'soporte@migrantes-uk.app',
  maxPredictionsPerUser: 10,
  predictionUpdateInterval: 3600000, // 1 hora
  referralReward: 1000, // Puntos por referido
  maintenanceMode: false,
};

// Lista simplificada de loterías
export const lotteries = [
  // Colombia
  { id: "baloto", name: "Baloto", country: "CO" },

  // Reino Unido
  { id: "lotto-uk", name: "Lotto UK", country: "UK" },
  { id: "euromillions-uk", name: "EuroMillions UK", country: "UK" },

  // Europa
  { id: "euromillones", name: "EuroMillions", country: "EU" },
  { id: "primitiva", name: "La Primitiva", country: "ES" },
  { id: "bonoloto", name: "Bonoloto", country: "ES" },

  // Estados Unidos
  { id: "powerball", name: "Powerball", country: "US" },
  { id: "mega-millions", name: "Mega Millions", country: "US" },
  { id: "florida-lotto", name: "Florida Lotto", country: "US" },
];

// Configuración detallada de loterías por país
export const LOTTERIES_BY_COUNTRY = {
  CO: {
    name: 'Colombia',
    timezone: 'America/Bogota',
    currency: 'COP',
    lotteries: [
      {
        id: 'baloto',
        name: 'Baloto',
        type: 'national',
        drawDays: ['lunes', 'miércoles', 'viernes', 'sábado'],
        drawTime: '21:00',
        numbersCount: 6,
        maxNumber: 45,
        bonusNumbers: 1,
        maxBonusNumber: 16,
        apiEndpoint: 'https://api.baloto.com',
      },
    ],
  },
  UK: {
    name: 'Reino Unido',
    timezone: 'Europe/London',
    currency: 'GBP',
    lotteries: [
      {
        id: 'lotto-uk',
        name: 'Lotto UK',
        type: 'national',
        drawDays: ['miércoles', 'sábado'],
        drawTime: '20:30',
        numbersCount: 6,
        maxNumber: 59,
        bonusNumbers: 1,
        maxBonusNumber: 59,
        apiEndpoint: 'https://api.national-lottery.co.uk',
      },
      {
        id: 'euromillions-uk',
        name: 'EuroMillions UK',
        type: 'international',
        drawDays: ['martes', 'viernes'],
        drawTime: '20:45',
        numbersCount: 5,
        maxNumber: 50,
        bonusNumbers: 2,
        maxBonusNumber: 12,
        apiEndpoint: 'https://api.national-lottery.co.uk',
      },
    ],
  },
  EU: {
    name: 'Europa',
    timezone: 'Europe/Paris',
    currency: 'EUR',
    lotteries: [
      {
        id: 'euromillones',
        name: 'EuroMillions',
        type: 'international',
        drawDays: ['martes', 'viernes'],
        drawTime: '21:00',
        numbersCount: 5,
        maxNumber: 50,
        bonusNumbers: 2,
        maxBonusNumber: 12,
        apiEndpoint: 'https://api.euromillones.com',
      },
    ],
  },
  ES: {
    name: 'España',
    timezone: 'Europe/Madrid',
    currency: 'EUR',
    lotteries: [
      {
        id: 'primitiva',
        name: 'La Primitiva',
        type: 'national',
        drawDays: ['lunes', 'jueves', 'sábado'],
        drawTime: '21:30',
        numbersCount: 6,
        maxNumber: 49,
        bonusNumbers: 1,
        maxBonusNumber: 49,
        apiEndpoint: 'https://api.primitiva.com',
      },
      {
        id: 'bonoloto',
        name: 'Bonoloto',
        type: 'national',
        drawDays: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        drawTime: '21:00',
        numbersCount: 6,
        maxNumber: 49,
        apiEndpoint: 'https://api.bonoloto.com',
      },
    ],
  },
  US: {
    name: 'Estados Unidos',
    timezone: 'America/New_York',
    currency: 'USD',
    lotteries: [
      {
        id: 'powerball',
        name: 'Powerball',
        type: 'national',
        drawDays: ['lunes', 'miércoles', 'sábado'],
        drawTime: '22:59',
        numbersCount: 5,
        maxNumber: 69,
        bonusNumbers: 1,
        maxBonusNumber: 26,
        apiEndpoint: 'https://api.powerball.com',
      },
      {
        id: 'mega-millions',
        name: 'Mega Millions',
        type: 'national',
        drawDays: ['martes', 'viernes'],
        drawTime: '23:00',
        numbersCount: 5,
        maxNumber: 70,
        bonusNumbers: 1,
        maxBonusNumber: 25,
        apiEndpoint: 'https://api.megamillions.com',
      },
      {
        id: 'florida-lotto',
        name: 'Florida Lotto',
        type: 'state',
        drawDays: ['lunes', 'miércoles', 'sábado'],
        drawTime: '22:59',
        numbersCount: 6,
        maxNumber: 53,
        apiEndpoint: 'https://api.flalottery.com',
      },
    ],
  },
};

// Métodos de predicción
export const PREDICTION_METHODS = [
  {
    name: 'Método Anbel',
    description: 'Algoritmo basado en patrones matemáticos y secuencias numéricas',
    weight: 0.35,
    minConfidence: 75,
    maxConfidence: 95,
  },
  {
    name: 'Método Probabilístico',
    description: 'Análisis estadístico de frecuencias y probabilidades',
    weight: 0.25,
    minConfidence: 70,
    maxConfidence: 90,
  },
  {
    name: 'Método Histórico',
    description: 'Análisis de patrones históricos y tendencias',
    weight: 0.20,
    minConfidence: 65,
    maxConfidence: 85,
  },
  {
    name: 'Método Filtrado Cruzado',
    description: 'Combinación inteligente de múltiples algoritmos',
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

// Mensajes de la aplicación
export const MESSAGES = {
  activation: {
    success: '¡Código activado exitosamente! Ahora puedes acceder a las predicciones.',
    invalid: 'Código inválido o ya utilizado. Verifica tu código e intenta nuevamente.',
    expired: 'El código ha expirado. Solicita uno nuevo al administrador.',
    error: 'Error al procesar la activación. Intenta nuevamente.',
    required: 'Por favor ingresa un código de activación',
    maxAttempts: 'Has excedido el número máximo de intentos. Intenta en 5 minutos.',
  },
  auth: {
    required: 'Necesitas activar tu código para acceder a esta funcionalidad',
    expired: 'Tu sesión ha expirado. Por favor activa tu código nuevamente.',
    adminRequired: 'Acceso restringido. Solo administradores pueden acceder.',
    invalidCredentials: 'Credenciales incorrectas',
  },
  predictions: {
    loading: 'Analizando patrones y generando números ganadores...',
    noData: 'No hay predicciones disponibles en este momento.',
    error: 'Error al cargar las predicciones. Intenta nuevamente.',
    updating: 'Actualizando predicciones...',
    locked: 'Las predicciones están bloqueadas hasta el próximo sorteo.',
  },
  admin: {
    codeGenerated: 'Código de activación generado exitosamente',
    codeDeleted: 'Código eliminado correctamente',
    userActivated: 'Usuario activado correctamente',
    userDeactivated: 'Usuario desactivado correctamente',
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

// Configuración de localización
export const LOCALE_CONFIG = {
  default: 'en',
  supported: ['en', 'es'],
  fallback: 'en',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  currencyFormat: {
    style: 'currency',
    currency: 'USD',
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

// Códigos de activación válidos para el sistema
export const VALID_ACTIVATION_CODES = [
  // Códigos locales visibles en la pantalla de activación
  'GANAFACIL', 'LOTERIA', 'SUERTE', 'FORTUNA',
  'GANA2025POWER001',
  'GANA2025MEGA002',
  'GANA2025EURO003',
  'GANA2025UK004',
  'GANA2025SPAIN005',
  'DEMO2025TEST001',  // Código de prueba
  'FREE2025TRIAL001', // Código gratuito
  'VIP2025ACCESS001'  // Código VIP
];

// Mensajes de activación
export const ACTIVATION_MESSAGES = {
  required: "Por favor, ingresa un código de activación.",
  invalid: "Código de activación inválido. Por favor, verifica e intenta nuevamente.",
  success: "¡Código activado exitosamente! Redirigiendo al dashboard...",
  locked: "Cuenta bloqueada temporalmente por múltiples intentos fallidos.",
  error: "Error al activar el código. Por favor, intenta nuevamente."
};
