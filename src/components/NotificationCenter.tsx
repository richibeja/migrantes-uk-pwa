'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Settings, X, Check, AlertCircle, Info, Zap } from 'lucide-react';
import { notificationService } from '@/lib/notifications';
import { NotificationConfig } from '@/types/firebase';

// Mock toast function
const toast = {
  success: (message: string) => console.log('✅', message),
  error: (message: string) => console.log('❌', message),
  info: (message: string) => console.log('ℹ️', message),
  warning: (message: string) => console.log('⚠️', message)
};

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
      case 'success': return <Check className="w-5 h-5 text-green-500" />;
  const [notifications, setNotifications] = useState<NotificationConfig[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [settings, setSettings] = useState({
    newPredictions: true,
    drawResults: true,
    highConfidence: true,
    specialOffers: true,
    maintenance: true,
    subscription: true
  });

  useEffect(() => {
    setIsSubscribed(notificationService.getSubscriptionStatus());
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Simular notificaciones históricas
    const mockNotifications: NotificationConfig[] = [
      {
        id: '1',
        userId: 'current-user',
        title: '🎯 Nuevas Predicciones Disponibles',
        message: 'Las predicciones para Powerball han sido actualizadas con 94% de confianza',
        type: 'info',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        userId: 'current-user',
        title: '🎉 ¡Números Ganadores!',
        message: '¡Felicitaciones! Hay números ganadores en Mega Millions',
        type: 'success',
        isRead: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        userId: 'current-user',
        title: '🔥 Predicción de Alta Confianza',
        message: '¡Predicción con 97% de confianza para EuroMillions!',
        type: 'warning',
        isRead: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        userId: 'current-user',
        title: '🎁 Oferta Especial',
        message: '¡50% de descuento en suscripción anual! Solo por tiempo limitado',
        type: 'info',
        isRead: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    setNotifications(mockNotifications);
  };

  const handleSubscribe = async () => {
    const success = await notificationService.subscribeToNotifications();
    if (success) {
      setIsSubscribed(true);
      toast.success('Notificaciones activadas correctamente');
    } else {
      toast.error('No se pudieron activar las notificaciones');
    }
  };

  const handleTestNotification = async () => {
    await notificationService.sendPushNotification({
      title: '🧪 Notificación de Prueba',
      message: '¡Las notificaciones están funcionando correctamente!',
      type: 'success'
    });
  };

  const handleSettingsChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // Aquí se guardarían las preferencias en localStorage o base de datos
    localStorage.setItem('notificationSettings', JSON.stringify({ ...settings, [key]: value }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <X className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      return date.toLocaleDateString('es-ES');
    } else if (hours > 0) {
      return `Hace ${hours}h`;
    } else {
      return `Hace ${minutes}m`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6" />
              <h2 className="text-xl font-bold">Centro de Notificaciones</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Estado de Suscripción */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">Notificaciones Push</h3>
                  <p className="text-sm text-gray-600">
                    {isSubscribed ? 'Activadas' : 'Desactivadas'}
                  </p>
                </div>
              </div>
              {!isSubscribed && (
                <button
                  onClick={handleSubscribe}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  Activar
                </button>
              )}
            </div>
          </div>

          {/* Notificaciones Recientes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Notificaciones Recientes</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 text-xs mt-1">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {formatTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuración */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Configuración</h3>
            <div className="space-y-3">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <button
                    onClick={() => handleSettingsChange(key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex space-x-3">
            <button
              onClick={handleTestNotification}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Probar Notificación
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
