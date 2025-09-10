import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'draw' | 'prediction' | 'system' | 'alert' | 'win';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  lotteryId?: string;
  data?: any;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Cargar notificaciones del localStorage al inicializar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lotteryNotifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
        setUnreadCount(parsed.filter((n: Notification) => !n.isRead).length);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }, []);

  // Guardar notificaciones en localStorage
  const saveNotifications = useCallback((newNotifications: Notification[]) => {
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.isRead).length);
    localStorage.setItem('lotteryNotifications', JSON.stringify(newNotifications));
  }, []);

  // Agregar nueva notificación
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, 50); // Mantener solo las últimas 50
      saveNotifications(updated);
      return updated;
    });

    // Mostrar notificación del navegador si está permitido
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: newNotification.id
      });
    }

    return newNotification.id;
  }, [saveNotifications]);

  // Marcar notificación como leída
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      );
      saveNotifications(updated);
      return updated;
    });
  }, [saveNotifications]);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }));
      saveNotifications(updated);
      return updated;
    });
  }, [saveNotifications]);

  // Eliminar notificación
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      saveNotifications(updated);
      return updated;
    });
  }, [saveNotifications]);

  // Limpiar notificaciones antiguas
  const clearOldNotifications = useCallback(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    setNotifications(prev => {
      const updated = prev.filter(n => 
        new Date(n.timestamp) > oneWeekAgo
      );
      saveNotifications(updated);
      return updated;
    });
  }, [saveNotifications]);

  // Solicitar permisos de notificación
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  // Notificaciones específicas para loterías
  const notifyDrawResult = useCallback((lotteryName: string, numbers: number[], jackpot: string) => {
    addNotification({
      type: 'draw',
      title: `🎯 ${lotteryName} - Resultado del Sorteo`,
      message: `Números ganadores: ${numbers.join(', ')} | Jackpot: ${jackpot}`,
      priority: 'high',
      lotteryId: lotteryName.toLowerCase().replace(' ', '-')
    });
  }, [addNotification]);

  const notifyNewPrediction = useCallback((lotteryName: string, method: string, confidence: number) => {
    addNotification({
      type: 'prediction',
      title: `🔮 Nueva Predicción - ${lotteryName}`,
      message: `Método: ${method} | Confianza: ${confidence}%`,
      priority: 'medium',
      lotteryId: lotteryName.toLowerCase().replace(' ', '-')
    });
  }, [addNotification]);

  const notifyWin = useCallback((lotteryName: string, matches: number, prize: string) => {
    addNotification({
      type: 'win',
      title: `🏆 ¡FELICIDADES! - ${lotteryName}`,
      message: `¡${matches} números acertados! Premio: ${prize}`,
      priority: 'high',
      lotteryId: lotteryName.toLowerCase().replace(' ', '-')
    });
  }, [addNotification]);

  const notifySystemUpdate = useCallback((message: string) => {
    addNotification({
      type: 'system',
      title: '⚙️ Actualización del Sistema',
      message,
      priority: 'low'
    });
  }, [addNotification]);

  const notifyAlert = useCallback((title: string, message: string) => {
    addNotification({
      type: 'alert',
      title: `⚠️ ${title}`,
      message,
      priority: 'high'
    });
  }, [addNotification]);

  // Limpiar notificaciones antiguas cada hora
  useEffect(() => {
    const interval = setInterval(clearOldNotifications, 60 * 60 * 1000); // 1 hora
    return () => clearInterval(interval);
  }, [clearOldNotifications]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearOldNotifications,
    requestNotificationPermission,
    notifyDrawResult,
    notifyNewPrediction,
    notifyWin,
    notifySystemUpdate,
    notifyAlert
  };
}
