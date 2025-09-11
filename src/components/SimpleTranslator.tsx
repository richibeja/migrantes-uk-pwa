'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface SimpleTranslatorProps {
  onLanguageChange?: (language: string) => void;
}

export default function SimpleTranslator({ onLanguageChange }: SimpleTranslatorProps) {

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