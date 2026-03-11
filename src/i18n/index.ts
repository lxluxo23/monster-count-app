import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import pt from './locales/pt';
import zh from './locales/zh';
import ja from './locales/ja';
import de from './locales/de';
import pl from './locales/pl';
import fr from './locales/fr';
import hr from './locales/hr';
import hi from './locales/hi';

const locale = Localization.getLocales()[0]?.languageTag ?? 'en';
const lang = locale.startsWith('zh')
  ? 'zh'
  : locale.startsWith('ja')
    ? 'ja'
    : locale.startsWith('pt')
      ? 'pt'
      : locale.startsWith('es')
        ? 'es'
        : locale.startsWith('de')
          ? 'de'
          : locale.startsWith('pl')
            ? 'pl'
            : locale.startsWith('fr')
              ? 'fr'
              : locale.startsWith('hr')
                ? 'hr'
                : locale.startsWith('hi')
                  ? 'hi'
                  : 'en';

// eslint-disable-next-line import/no-named-as-default-member -- i18n default export is correct
i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    pt: { translation: pt },
    zh: { translation: zh },
    ja: { translation: ja },
    de: { translation: de },
    pl: { translation: pl },
    fr: { translation: fr },
    hr: { translation: hr },
    hi: { translation: hi },
  },
  lng: lang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
