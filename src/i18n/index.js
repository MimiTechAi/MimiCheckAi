import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
  de: { translation: {
    appTitle: 'Nebenkosten-Knacker',
    nav: { onboarding: 'Profil vervollständigen' },
    upload: { title: 'Upload', progress: 'Analyse läuft…' },
    abrechnungen: { title: 'Abrechnungen', filter: 'Filter' },
    notifications: { title: 'Benachrichtigungen', empty: 'Keine Meldungen' }
  }},
  en: { translation: {
    appTitle: 'Service Charge Cracker',
    nav: { onboarding: 'Complete profile' },
    upload: { title: 'Upload', progress: 'Analyzing…' },
    abrechnungen: { title: 'Statements', filter: 'Filter' },
    notifications: { title: 'Notifications', empty: 'No messages' }
  }},
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    supportedLngs: ['de','en'],
    interpolation: { escapeValue: false },
    detection: { order: ['querystring','localStorage','navigator'] },
  });

export default i18n;
