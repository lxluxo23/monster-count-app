/**
 * Paleta y tokens de color de la app.
 * Soporta modo oscuro y claro.
 */

export interface ColorPalette {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  primary: string;
  primaryDark: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  disabled: string;
  white: string;
  black: string;
}

export const darkColors: ColorPalette = {
  background: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceElevated: '#252525',
  border: '#222',
  primary: '#2ECC71',
  primaryDark: '#27AE60',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  textMuted: '#888888',
  disabled: '#333333',
  white: '#FFFFFF',
  black: '#000000',
};

export const lightColors: ColorPalette = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceElevated: '#EEEEEE',
  border: '#DDDDDD',
  primary: '#2ECC71',
  primaryDark: '#27AE60',
  text: '#1A1A1A',
  textSecondary: '#555555',
  textMuted: '#888888',
  disabled: '#CCCCCC',
  white: '#FFFFFF',
  black: '#000000',
};

/** @deprecated Usa useTheme() en su lugar. Mantenido para compatibilidad temporal. */
export const colors = darkColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 9999,
} as const;

export type ColorKey = keyof ColorPalette;
