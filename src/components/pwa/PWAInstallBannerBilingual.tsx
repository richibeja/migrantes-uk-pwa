'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface PWAInstallBannerBilingualProps {
  isVisible: boolean;
  onClose: () => void;
  language: 'es' | 'en';
}

export default function PWAInstallBannerBilingual({ 
  isVisible, 
  onClose, 
  language = 'es' 
}: PWAInstallBannerBilingualProps) {
  const { isInstallable, isInstalled, installPWA } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  // Traducciones
  const translations = {
    es: {
      title: '¡Instala GanaFácil!',
      description: 'Instala la app para acceso rápido, notificaciones y funcionamiento offline',
      installButton: 'Instalar App',
      installing: 'Instalando...',
      mobile: 'Móvil',
      desktop: 'Desktop',
      offline: 'Offline'
    },
    en: {
      title: 'Install GanaFácil!',
      description: 'Install the app for quick access, notifications and offline functionality',
      installButton: 'Install App',
      installing: 'Installing...',
      mobile: 'Mobile',
      desktop: 'Desktop',
      offline: 'Offline'
    }
  };

  const t = translations[language];

  // No mostrar si ya está instalado o no es instalable
  if (isInstalled || !isInstallable || !isVisible) {
    return null;
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installPWA();
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Download className="h-6 w-6" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1">{t.title}</h3>
            <p className="text-sm opacity-90 mb-3">
              {t.description}
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isInstalling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    {t.installing}
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    {t.installButton}
                  </>
                )}
              </button>
              
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="flex items-center gap-4 text-xs opacity-80">
            <div className="flex items-center gap-1">
              <Smartphone className="h-3 w-3" />
              <span>{t.mobile}</span>
            </div>
            <div className="flex items-center gap-1">
              <Monitor className="h-3 w-3" />
              <span>{t.desktop}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{t.offline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
