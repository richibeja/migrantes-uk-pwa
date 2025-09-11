'use client';

import { useState, useEffect } from 'react';

export default function LanguageIndicator() {
) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  return (

  useEffect(() => {
    // Función para detectar el idioma actual
    const detectLanguage = () => {
      // Verificar si Google Translate ha cambiado el idioma
      const htmlElement = document.documentElement;
      const lang = htmlElement.lang || htmlElement.getAttribute('data-lang') || 'es';
      setCurrentLanguage(lang);
    };

    // Observar cambios en el atributo lang del HTML
    const observer = new MutationObserver(detectLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'data-lang']
    });

    // Detectar idioma inicial
    detectLanguage();

    // Verificar cambios cada 2 segundos (por si acaso)
    const interval = setInterval(detectLanguage, 2000);

      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'es': 'Español',
      'en': 'English',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'ru': 'Русский',
      'ja': '日本語',
      'ko': '한국어',
      'zh-CN': '中文',
      'ar': 'العربية'
    };
    return languages[code] || code;
  };

  const getLanguageFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      'es': '🇪🇸',
      'en': '🇺🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'it': '🇮🇹',
      'pt': '🇵🇹',
      'ru': '🇷🇺',
      'ja': '🇯🇵',
      'ko': '🇰🇷',
      'zh-CN': '🇨🇳',
      'ar': '🇸🇦'
    };
    return flags[code] || '🌐';
  };

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-600/30">
      <span className="text-lg">{getLanguageFlag(currentLanguage)}</span>
      <span className="text-gray-300 text-sm font-medium">
        {getLanguageName(currentLanguage)}
      </span>
    </div>
  );
}
