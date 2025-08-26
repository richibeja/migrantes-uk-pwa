"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DICTS, Dictionary, Language } from "@/i18n/dictionaries";

type I18nContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  // Initial detection: localStorage -> navigator -> default ES
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "es" || stored === "en") {
        setLangState(stored);
        return;
      }
      const nav = (navigator?.language || navigator?.languages?.[0] || "es").toLowerCase();
      if (nav.startsWith("en")) setLangState("en"); else setLangState("es");
    } catch {
      setLangState("es");
    }
  }, []);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
    try { document.cookie = `lang=${l}; path=/; max-age=${60*60*24*365}`; } catch {}
  }, []);

  const t = useCallback((key: string) => {
    const dict = DICTS[lang] || DICTS.es;
    return dict[key] ?? key;
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}


