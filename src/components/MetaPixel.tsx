'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq_loaded?: boolean;
  }
}

const META_PIXEL_ID = '1274220217443134';

export default function MetaPixel() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !isMounted) return;

    // Prevent multiple initializations
    if (window._fbq_loaded) {
      console.log('🔄 Meta Pixel ya está cargado, disparando PageView');
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
      return;
    }

    console.log('🚀 Inicializando Meta Pixel...');
    
    // Test de conectividad y envío forzado
    const forcePixelLoad = () => {
      console.log('🧪 Iniciando test de pixel directo...');
      
      // Método 1: Imagen pixel con parámetros detallados
      const img1 = document.createElement('img');
      img1.width = 1;
      img1.height = 1;
      img1.style.display = 'none';
      img1.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1&cd[page_title]=${encodeURIComponent(document.title)}&cd[page_url]=${encodeURIComponent(window.location.href)}`;
      
      img1.onload = () => {
        console.log('✅ Imagen pixel PageView enviada correctamente');
      };
      img1.onerror = () => {
        console.log('❌ Error enviando imagen pixel');
      };
      
      document.body.appendChild(img1);
      
      // Método 2: Evento Lead después de 2 segundos
      setTimeout(() => {
        const img2 = document.createElement('img');
        img2.width = 1;
        img2.height = 1;
        img2.style.display = 'none';
        img2.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=Lead&noscript=1&cd[content_name]=Test%20Directo&cd[value]=97&cd[currency]=USD`;
        
        img2.onload = () => {
          console.log('✅ Imagen pixel Lead enviada correctamente');
        };
        img2.onerror = () => {
          console.log('❌ Error enviando imagen pixel Lead');
        };
        
        document.body.appendChild(img2);
      }, 2000);
    };
    
    // Ejecutar test inmediatamente
    forcePixelLoad();

    // Initialize Meta Pixel
    const initMetaPixel = () => {
      // Create fbq function with better error handling
      window.fbq = window.fbq || function() {
        try {
          (window.fbq.q = window.fbq.q || []).push(arguments);
          console.log('📊 Meta Pixel event queued:', arguments[0], arguments[1]);
        } catch (error) {
          console.error('❌ Error en Meta Pixel:', error);
        }
      };
      
      // Set version and properties
      window.fbq.version = '2.0';
      window.fbq.queue = window.fbq.queue || [];
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;

      // Create and load script with multiple fallbacks
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      
      script.onload = () => {
        console.log('✅ Script de Facebook cargado exitosamente');
        window._fbq_loaded = true;
        
        // Initialize pixel after script loads
        try {
          window.fbq('init', META_PIXEL_ID);
          window.fbq('track', 'PageView');
          console.log('✅ Meta Pixel inicializado:', META_PIXEL_ID);
        } catch (error) {
          console.error('❌ Error inicializando pixel:', error);
        }
      };
      
      script.onerror = () => {
        console.error('❌ Error cargando script de Facebook - Probando fallback...');
        
        // Fallback: Usar pixel tracking directo
        const img = document.createElement('img');
        img.width = 1;
        img.height = 1;
        img.style.display = 'none';
        img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
        document.body.appendChild(img);
        
        console.log('📸 Fallback pixel image enviado');
      };
      
      // Insert script
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    // Initialize pixel
    initMetaPixel();

  }, [isMounted]);

  // Don't render anything until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    );
  }

  return (
    <>
      {/* Meta Pixel noscript fallback */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Utility functions for tracking events with better error handling
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ trackEvent llamado en servidor, ignorando');
    return;
  }

  if (!window.fbq) {
    console.error('❌ Meta Pixel no está cargado. Evento no enviado:', eventName);
    return;
  }

  try {
    window.fbq('track', eventName, parameters);
    console.log('✅ Meta Pixel event enviado:', eventName, parameters);
    
    // También enviar a dataLayer para Google Analytics si está disponible
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'fb_pixel_event',
        fb_event_name: eventName,
        fb_event_parameters: parameters
      });
    }
  } catch (error) {
    console.error('❌ Error enviando evento Meta Pixel:', error);
  }
};

export const trackCustomEvent = (eventName: string, parameters?: any) => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ trackCustomEvent llamado en servidor, ignorando');
    return;
  }

  if (!window.fbq) {
    console.error('❌ Meta Pixel no está cargado. Evento personalizado no enviado:', eventName);
    return;
  }

  try {
    window.fbq('trackCustom', eventName, parameters);
    console.log('✅ Meta Pixel custom event enviado:', eventName, parameters);
  } catch (error) {
    console.error('❌ Error enviando evento personalizado Meta Pixel:', error);
  }
};

// Nueva función para verificar si el pixel está funcionando
export const isPixelLoaded = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window.fbq && window._fbq_loaded);
};

// Nueva función para obtener estadísticas del pixel
export const getPixelStats = () => {
  if (typeof window === 'undefined') return null;
  
  return {
    loaded: isPixelLoaded(),
    pixelId: META_PIXEL_ID,
    fbqAvailable: !!window.fbq,
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: new Date().toISOString()
  };
};

