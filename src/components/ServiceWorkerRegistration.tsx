"use client";

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegistration() {
  // Evitar registro del Service Worker en desarrollo para no interferir con HMR
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  
  // Service Worker reactivado con configuración corregida
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      // Registrar Service Worker con parámetro de versión para forzar actualización
      const version = Date.now(); // Usar timestamp para forzar actualización
      const swRegistration = await navigator.serviceWorker.register(`/sw.js?v=${version}`, {
        scope: '/',
      });
      console.log('✅ Service Worker registrado correctamente:', swRegistration);
      
      setRegistration(swRegistration);

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
