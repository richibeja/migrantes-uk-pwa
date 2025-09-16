'use client';

import { useState, useEffect } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    // Detectar idioma del navegador
    const browserLang = navigator.language || navigator.languages?.[0] || 'es';
    const isEnglish = browserLang.startsWith('en');
    setLanguage(isEnglish ? 'en' : 'es');
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return { language, toggleLanguage };
}
