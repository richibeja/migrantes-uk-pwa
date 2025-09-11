'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  onLanguageChange?: (language: string) => void;
}

export default function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  return (
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Obtener idioma guardado o detectar idioma del navegador
    const savedLanguage = localStorage.getItem('language') || 
      (navigator.language.startsWith('es') ? 'es' : 'en');
    setLanguage(savedLanguage);
    
    // Notificar cambio inicial
    if (onLanguageChange) {
      onLanguageChange(savedLanguage);
    }
  }, [onLanguageChange]);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    
    // Notificar cambio
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
    
    // Forzar re-render de la página
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const translations = {
    en: {
      'hero-title': 'Win Big with Lotto Predictions',
      'hero-subtitle': 'Discover winning lottery numbers using advanced algorithms and proven strategies. Join thousands of users who are already winning with our revolutionary Lotto prediction app.',
      'get-app': 'Get WIN EASY Lotto Now',
      'buy-now': 'BUY NOW - Get Instant Access',
      'features-title': 'Why Choose WIN EASY?',
      'features-subtitle': 'Advanced technology meets proven strategies',
      'testimonials-title': 'What Our Users Say',
      'testimonials-subtitle': 'Real stories from real winners',
      'faq-title': 'Frequently Asked Questions',
      'faq-subtitle': 'Everything you need to know',
      'final-cta': 'Ready to Start Winning?',
      'final-cta-subtitle': 'Join thousands of users who are already making money with WIN EASY'
    },
    es: {
      'hero-title': 'Gana Fácil con Predicciones de Loto',
      'hero-subtitle': 'Descubre números ganadores de lotería usando algoritmos avanzados y estrategias probadas. Únete a miles de usuarios que ya están ganando con nuestra revolucionaria app de predicciones de Loto.',
      'get-app': 'Obtén GANA FÁCIL Loto Ahora',
      'buy-now': 'COMPRAR AHORA - Acceso Instantáneo',
      'features-title': '¿Por qué elegir GANA FÁCIL?',
      'features-subtitle': 'Tecnología avanzada se encuentra con estrategias probadas',
      'testimonials-title': 'Lo que dicen nuestros usuarios',
      'testimonials-subtitle': 'Historias reales de ganadores reales',
      'faq-title': 'Preguntas Frecuentes',
      'faq-subtitle': 'Todo lo que necesitas saber',
      'final-cta': '¿Listo para empezar a ganar?',
      'final-cta-subtitle': 'Únete a miles de usuarios que ya están ganando dinero con GANA FÁCIL'
    }
  };

    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === 'en' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange('es')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === 'es' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ES
          </button>
        </div>
      </div>
    </div>
  );
}