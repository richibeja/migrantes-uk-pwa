"use client";

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegistration() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const swRegistration = await navigator.serviceWorker.register('/sw.js');
      setRegistration(swRegistration);
      console.log('Service Worker registrado:', swRegistration);

      // Verificar si hay una nueva versión disponible
      swRegistration.addEventListener('updatefound', () => {
        const newWorker = swRegistration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nueva versión disponible, pero no mostrar botón
              console.log('Nueva versión disponible');
            }
          });
        }
      });

      // Verificar si ya hay un Service Worker activo
      if (navigator.serviceWorker.controller) {
        console.log('Service Worker activo');
      }

    } catch (error) {
      console.error('Error registrando Service Worker:', error);
    }
  };

  // Componente simplificado sin botones fijos
  return null;
}
