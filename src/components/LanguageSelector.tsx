'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { i18n } from '@/lib/i18n';

export default function LanguageSelector() {
) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  return (
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLanguage(i18n.getCurrentLanguage());
    
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.getCurrentLanguage());
    };
    
    i18n.addListener(handleLanguageChange);
    
      i18n.removeListener(handleLanguageChange);
    };
  }, []);

  const handleLanguageChange = async (lang: string) => {
    const success = await i18n.changeLanguage(lang);
    if (success) {
      setIsOpen(false);
    }
  };

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang.flag} {currentLang.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
                {currentLanguage === lang.code && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
