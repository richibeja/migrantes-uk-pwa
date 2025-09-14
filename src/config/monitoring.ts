/**
 * 📊 MONITORING CONFIG - Configuración de Monitoreo Avanzado
 * Configuración completa de monitoreo para Anbel IA
 */

export const MONITORING_CONFIG = {
  PROMETHEUS: {
    PORT: 9090,
    PATH: '/metrics',
    COLLECT_DEFAULT_METRICS: true,
    TIMEOUT: 10000
  },
  HEALTH_CHECKS: {
    INTERVAL: 30000, // 30 segundos
    TIMEOUT: 5000,
    THRESHOLD: 3
  },
  LOGGING: {
    LEVEL: process.env.LOG_LEVEL || 'info',
    FILE: {
      MAX_SIZE: '50m',
      MAX_FILES: '14d',
      ZIPPED_ARCHIVE: true
    },
    SLACK_WEBHOOK: process.env.SLACK_WEBHOOK_URL
  },
  ALERTS: {
    CPU_THRESHOLD: 80, // %
    MEMORY_THRESHOLD: 85, // %
    ERROR_RATE_THRESHOLD: 5, // %
    RESPONSE_TIME_THRESHOLD: 1000 // ms
  }
} as const;
