// CONFIGURACIÓN DE BASE DE DATOS - PRODUCCIÓN
export const DATABASE_CONFIG = {
  HOST: process.env.DB_HOST || 'localhost',
  PORT: parseInt(process.env.DB_PORT || '5432'),
  NAME: process.env.DB_NAME || 'ganafacil_prod',
  USER: process.env.DB_USER || 'anbel_user',
  PASSWORD: process.env.DB_PASSWORD || '',
  SSL: process.env.NODE_ENV === 'production',
  POOL: {
    MIN: 2,
    MAX: 10,
    IDLE_TIMEOUT: 30000
  }
};

export const REDIS_CONFIG = {
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: parseInt(process.env.REDIS_PORT || '6379'),
  PASSWORD: process.env.REDIS_PASSWORD || '',
  DB: parseInt(process.env.REDIS_DB || '0'),
  RETRY_DELAY: 1000,
  MAX_RETRIES: 3
};

export const TABLES = {
  PREDICTIONS: 'predictions',
  HISTORICAL_DRAWS: 'historical_draws',
  USERS: 'users',
  ACTIVATIONS: 'activations',
  ANALYTICS: 'analytics'
};
