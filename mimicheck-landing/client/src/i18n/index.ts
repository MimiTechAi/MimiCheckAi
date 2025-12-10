/**
 * i18n Configuration for MimiCheck Landing Page
 * Supports: de, en, tr, ar, ru, pl, es, pt, it
 */

import { createContext, useContext } from "react";

export type Language =
  | "de"
  | "en"
  | "tr"
  | "ar"
  | "ru"
  | "pl"
  | "es"
  | "pt"
  | "it";

export const SUPPORTED_LANGUAGES: {
  code: Language;
  label: string;
  flag: string;
}[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

export const RTL_LANGUAGES: Language[] = ["ar"];
export const STORAGE_KEY = "i18nextLng";

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
  isRTL: boolean;
}

export const I18nContext = createContext<I18nContextType | null>(null);

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
}
