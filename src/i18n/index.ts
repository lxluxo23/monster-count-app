import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import pt from './locales/pt';
import zh from './locales/zh';
import ja from './locales/ja';

const locale = Localization.getLocales()[0]?.languageTag ?? 'es';
const lang = locale.startsWith('zh') ? 'zh' : locale.startsWith('ja') ? 'ja' : locale.startsWith('pt') ? 'pt' : locale.startsWith('en') ? 'en' : 'es';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    pt: { translation: pt },
    zh: { translation: zh },
    ja: { translation: ja },
  },
  lng: lang,
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;
