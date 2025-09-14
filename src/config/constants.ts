/**
 * 🚀 CONFIGURACIÓN CRÍTICA DE ANBEL IA
 * Constantes y configuraciones del sistema de superinteligencia
 */

export const LOTTERY_APIS = {
  POWERBALL: {
    REAL_TIME: 'wss://data.powerball.com/ws',
    HISTORICAL: 'https://data.powerball.com/api/historical',
    API_KEY: process.env.POWERBALL_API_KEY,
    UPDATE_INTERVAL: 10000 // 10 segundos
  },
  MEGA_MILLIONS: {
    REAL_TIME: 'wss://data.megamillions.com/ws',
    HISTORICAL: 'https://data.megamillions.com/api/historical',
    API_KEY: process.env.MEGAMILLIONS_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  EURO_MILLIONS: {
    REAL_TIME: 'wss://data.euromillions.com/ws',
    HISTORICAL: 'https://data.euromillions.com/api/historical',
    API_KEY: process.env.EUROMILLIONS_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  BALOTO: {
    REAL_TIME: 'wss://data.baloto.com/ws',
    HISTORICAL: 'https://data.baloto.com/api/historical',
    API_KEY: process.env.BALOTO_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  LOTTO_6_49: {
    REAL_TIME: 'wss://data.lotto649.com/ws',
    HISTORICAL: 'https://data.lotto649.com/api/historical',
    API_KEY: process.env.LOTTO649_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  MEGA_SENA: {
    REAL_TIME: 'wss://data.megasena.com/ws',
    HISTORICAL: 'https://data.megasena.com/api/historical',
    API_KEY: process.env.MEGASENA_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  UK_NATIONAL: {
    REAL_TIME: 'wss://data.national-lottery.co.uk/ws',
    HISTORICAL: 'https://data.national-lottery.co.uk/api/historical',
    API_KEY: process.env.UK_NATIONAL_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  EL_GORDO: {
    REAL_TIME: 'wss://data.elgordo.com/ws',
    HISTORICAL: 'https://data.elgordo.com/api/historical',
    API_KEY: process.env.EL_GORDO_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  LOTERIA_NACIONAL_MX: {
    REAL_TIME: 'wss://data.loteria-nacional.mx/ws',
    HISTORICAL: 'https://data.loteria-nacional.mx/api/historical',
    API_KEY: process.env.LOTERIA_NACIONAL_MX_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  LOTTO_AMERICA: {
    REAL_TIME: 'wss://data.lottoamerica.com/ws',
    HISTORICAL: 'https://data.lottoamerica.com/api/historical',
    API_KEY: process.env.LOTTO_AMERICA_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  CASH4LIFE: {
    REAL_TIME: 'wss://data.cash4life.com/ws',
    HISTORICAL: 'https://data.cash4life.com/api/historical',
    API_KEY: process.env.CASH4LIFE_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  LUCKY_FOR_LIFE: {
    REAL_TIME: 'wss://data.luckyforlife.com/ws',
    HISTORICAL: 'https://data.luckyforlife.com/api/historical',
    API_KEY: process.env.LUCKY_FOR_LIFE_API_KEY,
    UPDATE_INTERVAL: 10000
  },
  PICK_6: {
    REAL_TIME: 'wss://data.pick6.com/ws',
    HISTORICAL: 'https://data.pick6.com/api/historical',
    API_KEY: process.env.PICK_6_API_KEY,
    UPDATE_INTERVAL: 10000
  }
} as const;

export const ML_CONFIG = {
  ENSEMBLE_WEIGHTS: [0.35, 0.25, 0.15, 0.10, 0.08, 0.07],
  TRAINING_INTERVAL: 3600000, // 1 hora
  PREDICTION_THRESHOLD: 0.85,
  CONFIDENCE_LEVELS: {
    HIGH: 0.92,
    MEDIUM: 0.85,
    LOW: 0.75
  },
  ALGORITHMS: {
    ENSEMBLE_ML: {
      EPOCHS: 100,
      BATCH_SIZE: 32,
      LEARNING_RATE: 0.001,
      DROPOUT: 0.2
    },
    DEEP_LSTM: {
      LAYERS: 4,
      NEURONS: 128,
      SEQUENCE_LENGTH: 10,
      DROPOUT: 0.2
    },
    MONTE_CARLO: {
      SIMULATIONS: 10000,
      CONVERGENCE_THRESHOLD: 0.95,
      MAX_ITERATIONS: 1000
    },
    BAYESIAN_OPT: {
      ITERATIONS: 100,
      ACQUISITION_FUNCTION: 'EI',
      KERNEL: 'RBF'
    },
    PATTERN_RECOGNITION: {
      MIN_PATTERN_LENGTH: 3,
      CONFIDENCE_THRESHOLD: 0.8,
      COMPLEXITY_LEVEL: 'HIGH'
    },
    TEMPORAL_ANALYSIS: {
      TIME_WINDOWS: ['daily', 'weekly', 'monthly'],
      SEASONALITY: true,
      TREND_ANALYSIS: true
    }
  }
} as const;

export const SYSTEM_CONFIG = {
  MAX_PREDICTION_THREADS: 8,
  MODEL_UPDATE_INTERVAL: 3600000,
  PREDICTION_CONFIDENCE_THRESHOLD: 0.85,
  CACHE_TTL: 300000, // 5 minutos
  MAX_HISTORICAL_DATA: 10000,
  PERFORMANCE_MONITORING_INTERVAL: 60000, // 1 minuto
  LEARNING_CYCLE_INTERVAL: 3600000, // 1 hora
  REAL_TIME_UPDATE_INTERVAL: 10000 // 10 segundos
} as const;

export const DATABASE_CONFIG = {
  MONGODB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ganafacil',
    DATABASE: 'ganafacil',
    COLLECTIONS: {
      PREDICTIONS: 'predictions',
      HISTORICAL_DATA: 'historical_data',
      PERFORMANCE_METRICS: 'performance_metrics',
      USER_DATA: 'user_data',
      PATTERNS: 'patterns'
    }
  },
  REDIS: {
    URL: process.env.REDIS_URL || 'redis://localhost:6379',
    TTL: 3600, // 1 hora
    KEYS: {
      PREDICTIONS: 'predictions:',
      REAL_TIME_DATA: 'realtime:',
      CACHE: 'cache:',
      SESSIONS: 'sessions:'
    }
  }
} as const;

export const API_ENDPOINTS = {
  PREDICTIONS: '/api/predictions',
  HISTORICAL: '/api/historical',
  REAL_TIME: '/api/realtime',
  PERFORMANCE: '/api/performance',
  LEARNING: '/api/learning',
  ANBEL_CHAT: '/api/anbel/chat',
  ANBEL_PROCESS: '/api/anbel/process'
} as const;

export const ERROR_CODES = {
  PREDICTION_FAILED: 'PREDICTION_FAILED',
  ALGORITHM_ERROR: 'ALGORITHM_ERROR',
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  TRAINING_FAILED: 'TRAINING_FAILED',
  VALIDATION_FAILED: 'VALIDATION_FAILED'
} as const;

export const SUCCESS_MESSAGES = {
  PREDICTION_GENERATED: 'Predicción generada exitosamente',
  MODEL_TRAINED: 'Modelo entrenado exitosamente',
  DATA_UPDATED: 'Datos actualizados exitosamente',
  CONNECTION_ESTABLISHED: 'Conexión establecida exitosamente',
  LEARNING_CYCLE_COMPLETED: 'Ciclo de aprendizaje completado'
} as const;

export const LOTTERY_TYPES = [
  'POWERBALL',
  'MEGA_MILLIONS',
  'EURO_MILLIONS',
  'BALOTO',
  'LOTTO_6_49',
  'MEGA_SENA',
  'UK_NATIONAL',
  'EL_GORDO',
  'LOTERIA_NACIONAL_MX',
  'LOTTO_AMERICA',
  'CASH4LIFE',
  'LUCKY_FOR_LIFE',
  'PICK_6'
] as const;

export const ALGORITHM_TYPES = [
  'ENSEMBLE_ML',
  'DEEP_LSTM',
  'MONTE_CARLO',
  'BAYESIAN_OPT',
  'PATTERN_RECOGNITION',
  'TEMPORAL_ANALYSIS'
] as const;

export default {
  LOTTERY_APIS,
  ML_CONFIG,
  SYSTEM_CONFIG,
  DATABASE_CONFIG,
  API_ENDPOINTS,
  ERROR_CODES,
  SUCCESS_MESSAGES,
  LOTTERY_TYPES,
  ALGORITHM_TYPES
};
