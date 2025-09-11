'use client';

import { useState } from 'react';

export default function GoogleTranslate() {
  return (
  const [currentLanguage, setCurrentLanguage] = useState('es');

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    
    // Abrir Google Translate externo para el idioma seleccionado
    const currentUrl = window.location.href;
    const translateUrl = `https://translate.google.com/translate?u=${encodeURIComponent(currentUrl)}&sl=es&tl=${languageCode}`;
    window.open(translateUrl, '_blank');
  };

    <div className="google-translate-container">
      <div className="relative group">
        <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm">
          <span>🌐</span>
          <span>{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
          <span className="hidden sm:inline">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
          <span>▼</span>
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center space-x-3 ${
                  currentLanguage === language.code ? 'text-gold bg-gray-700' : 'text-gray-300'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
