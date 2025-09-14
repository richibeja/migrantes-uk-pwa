'use client';

import { useState } from 'react';
import { Globe, Check } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang.flag} {currentLang.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{language.flag}</span>
                <span className="text-gray-700 font-medium">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
