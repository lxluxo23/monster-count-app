import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useColorScheme } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from '../i18n';
import { createSqlitePreferencesRepository } from '../db';

export type LanguageCode = 'auto' | 'es' | 'en' | 'pt' | 'zh' | 'ja';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => Promise<void>;
  currentLocale: string; // el locale realmente activo (ej: 'es' cuando es 'auto' y el sistema está en español)
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'auto',
  setLanguage: async () => {},
  currentLocale: 'es',
});

const KEY_LANGUAGE = 'appLanguage';

function detectSystemLanguage(): string {
  const locale = Localization.getLocales()[0]?.languageTag ?? 'es';
  if (locale.startsWith('zh')) return 'zh';
  if (locale.startsWith('ja')) return 'ja';
  if (locale.startsWith('pt')) return 'pt';
  if (locale.startsWith('en')) return 'en';
  return 'es';
}

export function LanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);
  const [language, setLanguageState] = useState<LanguageCode>('auto');
  const [currentLocale, setCurrentLocale] = useState<string>('es');
  const [initialized, setInitialized] = useState(false);

  // Cargar preferencia guardada al montar
  useEffect(() => {
    let cancelled = false;
    repo.get(KEY_LANGUAGE).then((value) => {
      if (cancelled) return;
      const savedLang = (value as LanguageCode) || 'auto';
      setLanguageState(savedLang);
      
      // Aplicar el idioma
      const locale = savedLang === 'auto' ? detectSystemLanguage() : savedLang;
      setCurrentLocale(locale);
      i18n.changeLanguage(locale);
      setInitialized(true);
    });
  }, [repo]);

  // Escuchar cambios del sistema cuando está en 'auto'
  useColorScheme(); // force re-render on system theme/language change
  useEffect(() => {
    if (language === 'auto' && initialized) {
      const locale = detectSystemLanguage();
      setCurrentLocale(locale);
      i18n.changeLanguage(locale);
    }
  }, [language, initialized]);

  const setLanguage = async (code: LanguageCode) => {
    setLanguageState(code);
    await repo.set(KEY_LANGUAGE, code);
    const locale = code === 'auto' ? detectSystemLanguage() : code;
    setCurrentLocale(locale);
    i18n.changeLanguage(locale);
  };

  const value = useMemo(() => ({ language, setLanguage, currentLocale }), [language, currentLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
