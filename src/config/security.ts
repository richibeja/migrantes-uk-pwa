/**
 * 🛡️ SECURITY CONFIG - Configuración de Seguridad Avanzada
 * Configuración completa de seguridad para Anbel IA
 */

export const SECURITY_CONFIG = {
  JWT: {
    SECRET: process.env.JWT_SECRET || 'super_mega_secret_anbel_ia_key_2024',
    EXPIRES_IN: '24h',
    ALGORITHM: 'HS512'
  },
  RATE_LIMITING: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutos
    MAX_REQUESTS: 100, // límite por IP
    MESSAGE: 'Demasiadas solicitudes desde esta IP'
  },
  CORS: {
    ORIGIN: [
      'https://ganafacil.com',
      'https://app.ganafacil.com',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    CREDENTIALS: true
  },
  ENCRYPTION: {
    ALGORITHM: 'aes-256-gcm',
    IV_LENGTH: 16,
    SALT_ROUNDS: 12
  },
  API_KEYS: {
    REQUIRED_FOR: ['/api/predict', '/api/historical', '/api/real-time'],
    VALID_KEYS: new Set([
      process.env.API_KEY_1,
      process.env.API_KEY_2,
      process.env.API_KEY_3
    ])
  }
} as const;
