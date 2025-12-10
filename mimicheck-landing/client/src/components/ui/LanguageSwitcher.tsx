/**
 * LanguageSwitcher Component
 *
 * A dropdown component for switching between supported languages.
 * Stores the selected language in localStorage for persistence.
 */

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
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

const STORAGE_KEY = "i18nextLng";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(
    SUPPORTED_LANGUAGES[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang) {
      const found = SUPPORTED_LANGUAGES.find(l => l.code === savedLang);
      if (found) {
        setCurrentLang(found);
        document.documentElement.lang = found.code;
        // Set RTL for Arabic
        if (found.code === "ar") {
          document.documentElement.dir = "rtl";
        } else {
          document.documentElement.dir = "ltr";
        }
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem(STORAGE_KEY, lang.code);
    document.documentElement.lang = lang.code;

    // Set RTL for Arabic
    if (lang.code === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }

    setIsOpen(false);

    // Reload page to apply language (simple approach without full i18n)
    // In production, you'd use a proper i18n library
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--framer-text-secondary)] hover:text-white transition-colors rounded-lg hover:bg-white/5"
        aria-label="Sprache wählen"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="uppercase text-xs">{currentLang.code}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 py-2 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 max-h-[320px] overflow-y-auto"
            role="listbox"
            aria-label="Verfügbare Sprachen"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  currentLang.code === lang.code
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
                role="option"
                aria-selected={currentLang.code === lang.code}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="uppercase font-bold text-xs w-6 text-gray-500">
                  {lang.code}
                </span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { LanguageSwitcher, SUPPORTED_LANGUAGES };
