'use client';

import { useI18n } from '@/components/I18nProvider';
import LanguageToggle from '@/components/LanguageToggle';

export default function LanguageToggleWrapper() {
  const { currentLanguage, changeLanguage } = useI18n();

  return (
    <LanguageToggle
      currentLanguage={currentLanguage}
      onLanguageChange={changeLanguage}
    />
  );
}
