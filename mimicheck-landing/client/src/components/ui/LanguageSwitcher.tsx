/**
 * LanguageSwitcher Component - Uses i18n context
 */

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, SUPPORTED_LANGUAGES } from "@/i18n";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    SUPPORTED_LANGUAGES.find(l => l.code === language) ??
    SUPPORTED_LANGUAGES[0];

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--framer-text-secondary)] hover:text-white transition-colors rounded-lg hover:bg-white/5"
        aria-label="Sprache wählen"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang?.flag}</span>
        <span className="uppercase text-xs">{currentLang?.code}</span>
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
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  language === lang.code
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
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

export { LanguageSwitcher };
