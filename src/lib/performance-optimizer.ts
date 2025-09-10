// Optimizador de rendimiento para GANA FÁCIL
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private cache: Map<string, any> = new Map();
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Cache inteligente
  setCache(key: string, value: any, ttl: number = 300000): void { // 5 minutos por defecto
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.value;
  }

  // Debounce para evitar llamadas excesivas
  debounce<T extends (...args: any[]) => any>(
    key: string,
    func: T,
    delay: number = 300
  ): T {
    return ((...args: any[]) => {
      const existingTimer = this.debounceTimers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(() => {
        func(...args);
        this.debounceTimers.delete(key);
      }, delay);

      this.debounceTimers.set(key, timer);
    }) as T;
  }

  // Throttle para limitar frecuencia
  throttle<T extends (...args: any[]) => any>(
    key: string,
    func: T,
    limit: number = 1000
  ): T {
    let inThrottle: boolean;
    
    return ((...args: any[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }

  // Lazy loading de componentes
  lazyLoad(importFn: () => Promise<any>): Promise<any> {
    return importFn().catch(error => {
      console.error('Error en lazy loading:', error);
      return null;
    });
  }

  // Optimización de imágenes
  optimizeImage(src: string, width?: number, height?: number): string {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', '80'); // Calidad 80%
    params.set('f', 'webp'); // Formato WebP
    
    return `${src}?${params.toString()}`;
  }

  // Compresión de datos
  compressData(data: any): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error('Error comprimiendo datos:', error);
      return '';
    }
  }

  // Descompresión de datos
  decompressData(compressed: string): any {
    try {
      return JSON.parse(compressed);
    } catch (error) {
      console.error('Error descomprimiendo datos:', error);
      return null;
    }
  }

  // Preload de recursos críticos
  preloadResource(url: string, type: 'script' | 'style' | 'image' | 'font'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    document.head.appendChild(link);
  }

  // Prefetch de recursos no críticos
  prefetchResource(url: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  // Limpieza de memoria
  cleanup(): void {
    // Limpiar cache expirado
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.expiry) {
        this.cache.delete(key);
      }
    }

    // Limpiar timers
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
  }

  // Métricas de rendimiento
  getPerformanceMetrics(): any {
    return {
      cacheSize: this.cache.size,
      activeTimers: this.debounceTimers.size,
      memoryUsage: (performance as any).memory ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      } : null
    };
  }
}

// Instancia global
export const performanceOptimizer = PerformanceOptimizer.getInstance();

// Hook para React
export const usePerformanceOptimizer = () => {
  return performanceOptimizer;
};
