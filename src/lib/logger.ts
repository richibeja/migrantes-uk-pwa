// ============================================
// SISTEMA DE LOGGING SIMPLE PARA PRODUCCIÓN
// ============================================

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class SimpleLogger {
  private isProduction = process.env.NODE_ENV === 'production';
  private enableLogs = process.env.ENABLE_CONSOLE_LOGS === 'true';

  private log(level: LogLevel, message: string, data?: any) {
    // En producción, solo registrar errores y warnings
    if (this.isProduction && !this.enableLogs) {
      if (level === 'error' || level === 'warn') {
        const entry: LogEntry = {
          level,
          message,
          data,
          timestamp: new Date().toISOString(),
        };
        
        // En producción real, aquí enviarías a un servicio como Sentry
        console[level](JSON.stringify(entry));
      }
      return;
    }

    // En desarrollo, mostrar todos los logs
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    if (data) {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        prefix,
        message,
        data
      );
    } else {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        prefix,
        message
      );
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, error?: any) {
    this.log('error', message, error);
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }
}

// Exportar instancia única
export const logger = new SimpleLogger();

// Export default para compatibilidad
export default logger;





