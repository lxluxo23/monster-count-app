/**
 * Paleta y tokens de color de la app.
 * Un solo lugar para mantener consistencia (DRY).
 */
export const colors = {
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
} as const;

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

export type ColorKey = keyof typeof colors;
