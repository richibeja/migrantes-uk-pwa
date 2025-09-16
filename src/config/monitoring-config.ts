// CONFIGURACIÓN DE MONITOREO - PRODUCCIÓN
export const MONITORING_CONFIG = {
  PROMETHEUS: {
    PORT: parseInt(process.env.PROMETHEUS_PORT || '9090'),
    PATH: '/metrics',
    COLLECT_DEFAULT_METRICS: true
  },
  
  HEALTH_CHECKS: {
    INTERVAL: 30000,
    TIMEOUT: 5000,
    ENDPOINTS: [
      '/api/health',
      '/api/predictions',
      '/api/historical'
    ]
  },
  
  ALERTS: {
    SLACK_WEBHOOK: process.env.SLACK_WEBHOOK_URL,
    DISCORD_WEBHOOK: process.env.DISCORD_WEBHOOK_URL,
    EMAIL: process.env.ALERT_EMAIL,
    
    THRESHOLDS: {
      CPU_USAGE: 80,
      MEMORY_USAGE: 85,
      ERROR_RATE: 5,
      RESPONSE_TIME: 2000
    }
  },
  
  LOGGING: {
    LEVEL: process.env.LOG_LEVEL || 'info',
    FILE: {
      MAX_SIZE: '50m',
      MAX_FILES: '14d',
      ZIPPED_ARCHIVE: true
    }
  }
};
