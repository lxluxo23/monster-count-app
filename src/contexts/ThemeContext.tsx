import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';
import { darkColors, lightColors, type ColorPalette } from '../theme/colors';

export type ThemeMode = 'dark' | 'light' | 'system';

interface ThemeContextValue {
  colors: ColorPalette;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  mode: 'dark',
  isDark: true,
  setMode: () => {},
});

const KEY_THEME_MODE = 'themeMode';

export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    repo.get(KEY_THEME_MODE).then((value) => {
      if (value === 'dark' || value === 'light' || value === 'system') {
        setModeState(value);
      }
    });
  }, [repo]);

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      repo.set(KEY_THEME_MODE, newMode);
    },
    [repo],
  );

  const isDark = mode === 'dark' || (mode === 'system' && systemScheme !== 'light');
  const colors = isDark ? darkColors : lightColors;

  const value = useMemo(() => ({ colors, mode, isDark, setMode }), [colors, mode, isDark, setMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
