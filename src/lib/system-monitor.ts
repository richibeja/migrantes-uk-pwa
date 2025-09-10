// Monitor del sistema para GANA FÁCIL
export interface SystemMetrics {
  timestamp: string;
  performance: {
    loadTime: number;
    memoryUsage: number;
    cpuUsage: number;
    networkLatency: number;
  };
  predictions: {
    total: number;
    successful: number;
    failed: number;
    averageConfidence: number;
    averageAccuracy: number;
  };
  apis: {
    powerball: { status: 'online' | 'offline' | 'error'; responseTime: number };
    megaMillions: { status: 'online' | 'offline' | 'error'; responseTime: number };
    euroMillions: { status: 'online' | 'offline' | 'error'; responseTime: number };
  };
  users: {
    active: number;
    total: number;
    newToday: number;
  };
  errors: {
    count: number;
    lastError: string | null;
    criticalErrors: number;
  };
}

export class SystemMonitor {
  private static instance: SystemMonitor;
  private metrics: SystemMetrics[] = [];
  private maxMetrics = 1000; // Mantener solo las últimas 1000 métricas
  private updateInterval: NodeJS.Timeout | null = null;

  static getInstance(): SystemMonitor {
    if (!SystemMonitor.instance) {
      SystemMonitor.instance = new SystemMonitor();
    }
    return SystemMonitor.instance;
  }

  // Iniciar monitoreo
  startMonitoring(intervalMs: number = 30000): void { // 30 segundos por defecto
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(() => {
      this.collectMetrics();
    }, intervalMs);

    console.log('🔍 Sistema de monitoreo iniciado');
  }

  // Detener monitoreo
  stopMonitoring(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    console.log('⏹️ Sistema de monitoreo detenido');
  }

  // Recopilar métricas
  private async collectMetrics(): Promise<void> {
    try {
      const metrics: SystemMetrics = {
        timestamp: new Date().toISOString(),
        performance: await this.getPerformanceMetrics(),
        predictions: await this.getPredictionMetrics(),
        apis: await this.getAPIMetrics(),
        users: await this.getUserMetrics(),
        errors: await this.getErrorMetrics()
      };

      this.metrics.push(metrics);

      // Mantener solo las últimas métricas
      if (this.metrics.length > this.maxMetrics) {
        this.metrics = this.metrics.slice(-this.maxMetrics);
      }

      // Verificar alertas
      this.checkAlerts(metrics);

    } catch (error) {
      console.error('Error recopilando métricas:', error);
    }
  }

  // Métricas de rendimiento
  private async getPerformanceMetrics(): Promise<any> {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const memory = (performance as any).memory;

    return {
      loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
      memoryUsage: memory ? memory.usedJSHeapSize : 0,
      cpuUsage: 0, // No disponible en navegador
      networkLatency: this.calculateNetworkLatency()
    };
  }

  // Métricas de predicciones
  private async getPredictionMetrics(): Promise<any> {
    const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    const successful = predictions.filter((p: any) => p.success).length;
    const total = predictions.length;

    return {
      total,
      successful,
      failed: total - successful,
      averageConfidence: predictions.reduce((sum: number, p: any) => sum + (p.confidence || 0), 0) / total || 0,
      averageAccuracy: predictions.reduce((sum: number, p: any) => sum + (p.accuracy || 0), 0) / total || 0
    };
  }

  // Métricas de APIs
  private async getAPIMetrics(): Promise<any> {
    const apis = ['powerball', 'megaMillions', 'euroMillions'];
    const results: any = {};

    for (const api of apis) {
      try {
        const start = Date.now();
        // Simular verificación de API
        await this.pingAPI(api);
        const responseTime = Date.now() - start;
        
        results[api] = {
          status: 'online' as const,
          responseTime
        };
      } catch (error) {
        results[api] = {
          status: 'error' as const,
          responseTime: 0
        };
      }
    }

    return results;
  }

  // Métricas de usuarios
  private async getUserMetrics(): Promise<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const today = new Date().toDateString();
    const newToday = users.filter((u: any) => 
      new Date(u.createdAt).toDateString() === today
    ).length;

    return {
      active: users.filter((u: any) => u.isActive).length,
      total: users.length,
      newToday
    };
  }

  // Métricas de errores
  private async getErrorMetrics(): Promise<any> {
    const errors = JSON.parse(localStorage.getItem('errors') || '[]');
    const criticalErrors = errors.filter((e: any) => e.level === 'critical').length;
    const lastError = errors.length > 0 ? errors[errors.length - 1].message : null;

    return {
      count: errors.length,
      lastError,
      criticalErrors
    };
  }

  // Calcular latencia de red
  private calculateNetworkLatency(): number {
    const connection = (navigator as any).connection;
    if (connection) {
      return connection.rtt || 0;
    }
    return 0;
  }

  // Ping a API
  private async pingAPI(api: string): Promise<void> {
    // Simular ping a API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% de éxito
          resolve();
        } else {
          reject(new Error(`API ${api} no disponible`));
        }
      }, Math.random() * 1000);
    });
  }

  // Verificar alertas
  private checkAlerts(metrics: SystemMetrics): void {
    // Alerta de memoria alta
    if (metrics.performance.memoryUsage > 100 * 1024 * 1024) { // 100MB
      this.sendAlert('high_memory', 'Uso de memoria alto detectado');
    }

    // Alerta de tiempo de carga alto
    if (metrics.performance.loadTime > 3000) { // 3 segundos
      this.sendAlert('slow_load', 'Tiempo de carga lento detectado');
    }

    // Alerta de API offline
    Object.entries(metrics.apis).forEach(([api, status]) => {
      if (status.status === 'offline' || status.status === 'error') {
        this.sendAlert('api_offline', `API ${api} no disponible`);
      }
    });

    // Alerta de errores críticos
    if (metrics.errors.criticalErrors > 0) {
      this.sendAlert('critical_errors', `${metrics.errors.criticalErrors} errores críticos detectados`);
    }
  }

  // Enviar alerta
  private sendAlert(type: string, message: string): void {
    console.warn(`🚨 ALERTA [${type}]: ${message}`);
    
    // Guardar en localStorage
    const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
    alerts.push({
      type,
      message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('alerts', JSON.stringify(alerts));

    // Enviar notificación si está disponible
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('GANA FÁCIL - Alerta del Sistema', {
        body: message,
        icon: '/favicon.ico'
      });
    }
  }

  // Obtener métricas recientes
  getRecentMetrics(hours: number = 24): SystemMetrics[] {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    return this.metrics.filter(m => 
      new Date(m.timestamp).getTime() > cutoff
    );
  }

  // Obtener resumen de métricas
  getMetricsSummary(): any {
    if (this.metrics.length === 0) {
      return null;
    }

    const recent = this.getRecentMetrics(1); // Última hora
    const latest = this.metrics[this.metrics.length - 1];

    return {
      latest,
      recent: {
        count: recent.length,
        averageLoadTime: recent.reduce((sum, m) => sum + m.performance.loadTime, 0) / recent.length,
        averageMemoryUsage: recent.reduce((sum, m) => sum + m.performance.memoryUsage, 0) / recent.length,
        totalPredictions: recent.reduce((sum, m) => sum + m.predictions.total, 0),
        successfulPredictions: recent.reduce((sum, m) => sum + m.predictions.successful, 0),
        totalErrors: recent.reduce((sum, m) => sum + m.errors.count, 0)
      },
      health: this.calculateHealthScore(latest)
    };
  }

  // Calcular puntuación de salud
  private calculateHealthScore(metrics: SystemMetrics): number {
    let score = 100;

    // Penalizar por memoria alta
    if (metrics.performance.memoryUsage > 50 * 1024 * 1024) { // 50MB
      score -= 20;
    }

    // Penalizar por tiempo de carga alto
    if (metrics.performance.loadTime > 2000) { // 2 segundos
      score -= 15;
    }

    // Penalizar por APIs offline
    Object.values(metrics.apis).forEach(api => {
      if (api.status !== 'online') {
        score -= 10;
      }
    });

    // Penalizar por errores
    score -= metrics.errors.criticalErrors * 5;
    score -= Math.min(metrics.errors.count * 0.1, 20);

    return Math.max(0, Math.min(100, score));
  }

  // Exportar métricas
  exportMetrics(): string {
    return JSON.stringify(this.metrics, null, 2);
  }

  // Limpiar métricas antiguas
  cleanup(): void {
    const cutoff = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 días
    this.metrics = this.metrics.filter(m => 
      new Date(m.timestamp).getTime() > cutoff
    );
  }
}

// Instancia global
export const systemMonitor = SystemMonitor.getInstance();

// Hook para React
export const useSystemMonitor = () => {
  return systemMonitor;
};
