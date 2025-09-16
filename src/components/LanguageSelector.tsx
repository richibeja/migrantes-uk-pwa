'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  );
}