import { toast } from 'react-hot-toast';

export interface NotificationConfig {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export class NotificationService {
  private static instance: NotificationService;
  private notifications: NotificationConfig[] = [];
  private isSubscribed = false;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Suscribirse a notificaciones push
   */
  async subscribeToNotifications(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.isSubscribed = true;
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.isSubscribed = true;
        return true;
      }
    }

    return false;
  }

  /**
   * Enviar notificación push
   */
  async sendPushNotification(config: Omit<NotificationConfig, 'id'>): Promise<void> {
    if (!this.isSubscribed) {
      // Fallback a toast si no hay permisos
      this.showToast(config);
      return;
    }

    const notification = new Notification(config.title, {
      body: config.message,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      tag: 'lottery-prediction',
      requireInteraction: true,
      silent: false,
    });

    notification.onclick = () => {
      window.focus();
      if (config.action) {
        config.action.onClick();
      }
      notification.close();
    };

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      notification.close();
    }, 5000);
  }

  /**
   * Mostrar toast como fallback
   */
  private showToast(config: Omit<NotificationConfig, 'id'>): void {
    const toastOptions = {
      duration: config.duration || 4000,
    };

    switch (config.type) {
      case 'success':
        toast.success(config.message, toastOptions);
        break;
      case 'warning':
        toast.error(config.message, toastOptions);
        break;
      case 'error':
        toast.error(config.message, toastOptions);
        break;
      case 'info':
        toast(config.message, toastOptions);
        break;
    }
  }

  /**
   * Notificaciones específicas para predicciones
   */
  async notifyNewPredictions(lotteryName: string): Promise<void> {
    await this.sendPushNotification({
      title: '🎯 Nuevas Predicciones Disponibles',
      message: `¡Las predicciones para ${lotteryName} han sido actualizadas!`,
      type: 'info',
      action: {
        label: 'Ver Predicciones',
        onClick: () => window.location.href = '/dashboard'
      }
    });
  }

  async notifyDrawResults(lotteryName: string, hasWins: boolean): Promise<void> {
    const message = hasWins 
      ? `¡Felicitaciones! Hay números ganadores en ${lotteryName}`
      : `Los resultados de ${lotteryName} están disponibles`;

    await this.sendPushNotification({
      title: hasWins ? '🎉 ¡Números Ganadores!' : '📊 Resultados Disponibles',
      message,
      type: hasWins ? 'success' : 'info',
      action: {
        label: 'Ver Resultados',
        onClick: () => window.location.href = '/dashboard?tab=results'
      }
    });
  }

  async notifyHighConfidencePrediction(lotteryName: string, confidence: number): Promise<void> {
    await this.sendPushNotification({
      title: '🔥 Predicción de Alta Confianza',
      message: `¡Predicción con ${confidence}% de confianza para ${lotteryName}!`,
      type: 'warning',
      action: {
        label: 'Ver Ahora',
        onClick: () => window.location.href = '/dashboard'
      }
    });
  }

  async notifyMaintenanceMode(): Promise<void> {
    await this.sendPushNotification({
      title: '🔧 Mantenimiento Programado',
      message: 'La app estará en mantenimiento por 30 minutos. Las predicciones seguirán funcionando.',
      type: 'info'
    });
  }

  async notifySubscriptionExpiring(daysLeft: number): Promise<void> {
    await this.sendPushNotification({
      title: '⏰ Suscripción por Vencer',
      message: `Tu suscripción expira en ${daysLeft} días. Renueva para mantener el acceso.`,
      type: 'warning',
      action: {
        label: 'Renovar',
        onClick: () => window.location.href = '/activate'
      }
    });
  }

  /**
   * Notificaciones de marketing
   */
  async notifySpecialOffer(offer: string): Promise<void> {
    await this.sendPushNotification({
      title: '🎁 Oferta Especial',
      message: offer,
      type: 'info',
      action: {
        label: 'Ver Oferta',
        onClick: () => window.location.href = '/activate'
      }
    });
  }

  async notifyNewLottery(lotteryName: string): Promise<void> {
    await this.sendPushNotification({
      title: '🆕 Nueva Lotería Agregada',
      message: `¡Ahora puedes obtener predicciones para ${lotteryName}!`,
      type: 'info',
      action: {
        label: 'Explorar',
        onClick: () => window.location.href = '/dashboard'
      }
    });
  }

  /**
   * Programar notificaciones recurrentes
   */
  scheduleRecurringNotifications(): void {
    // Notificación diaria de predicciones
    setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      
      // Enviar a las 9 AM y 6 PM
      if (hour === 9 || hour === 18) {
        this.notifyNewPredictions('todas las loterías');
      }
    }, 60 * 60 * 1000); // Cada hora

    // Notificación semanal de estadísticas
    setInterval(() => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      // Lunes a las 10 AM
      if (day === 1 && hour === 10) {
        this.sendPushNotification({
          title: '📈 Estadísticas Semanales',
          message: 'Revisa tu rendimiento de predicciones de la semana pasada.',
          type: 'info',
          action: {
            label: 'Ver Estadísticas',
            onClick: () => window.location.href = '/dashboard?tab=stats'
          }
        });
      }
    }, 60 * 60 * 1000); // Cada hora
  }

  /**
   * Obtener estado de suscripción
   */
  getSubscriptionStatus(): boolean {
    return this.isSubscribed;
  }

  /**
   * Limpiar notificaciones
   */
  clearNotifications(): void {
    this.notifications = [];
  }
}

// Instancia singleton
export const notificationService = NotificationService.getInstance();
