/**
 * I18n Provider Component
 * Manages language state and provides translation function
 */

import { useState, useEffect, useCallback, type ReactNode } from "react";
import {
  I18nContext,
  type Language,
  RTL_LANGUAGES,
  STORAGE_KEY,
} from "./index";
import { translations } from "./translations";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>("de");

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
      applyLanguage(saved);
    }
  }, []);

  const applyLanguage = (lang: Language) => {
    document.documentElement.lang = lang;
    const isRTL = RTL_LANGUAGES.includes(lang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    if (isRTL) {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  };

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
  }, []);

  const t = useCallback(
    (key: string): string | string[] => {
      const keys = key.split(".");
      let value: unknown = translations[language];
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return value as string[];
      return key;
    },
    [language]
  );

  const isRTL = RTL_LANGUAGES.includes(language);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}
