import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Languages that use Right-to-Left text direction
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

/**
 * Hook to manage document direction based on current language
 * Automatically sets dir="rtl" for Arabic and other RTL languages
 */
export function useLanguageDirection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    const isRTL = RTL_LANGUAGES.includes(currentLang);
    
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    // Add/remove RTL class for additional styling hooks
    if (isRTL) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [i18n.language]);

  return {
    isRTL: RTL_LANGUAGES.includes(i18n.language),
    direction: RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr',
    language: i18n.language
  };
}

export default useLanguageDirection;
