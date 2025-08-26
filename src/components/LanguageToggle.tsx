"use client";

import { useI18n } from "./I18nProvider";

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={t('toggle.language')}>
      <span className="text-gray-400 text-xs" aria-hidden="true">🌍 {t("toggle.language")}:</span>
      <button
        onClick={() => setLang("es")}
        aria-label={t('toggle.language') + ' ES'}
        aria-pressed={lang === 'es'}
        className={`px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-gold/50 ${lang === "es" ? "border-gold text-gold" : "border-gray-600 text-gray-300"}`}
      >
        {t("lang.es")}
      </button>
      <button
        onClick={() => setLang("en")}
        aria-label={t('toggle.language') + ' EN'}
        aria-pressed={lang === 'en'}
        className={`px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-gold/50 ${lang === "en" ? "border-gold text-gold" : "border-gray-600 text-gray-300"}`}
      >
        {t("lang.en")}
      </button>
    </div>
  );
}


