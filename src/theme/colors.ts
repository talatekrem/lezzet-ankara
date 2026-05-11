// Design tokens: reuse these colors instead of hardcoding visual values.
export const COLORS = {
  background: '#16171D',
  surface: '#21222C',
  surfaceSoft: '#2A2B36',
  border: '#3A3B47',
  borderSoft: '#2D2E39',
  textPrimary: '#F8F5EC',
  textSecondary: '#C9C3B5',
  textMuted: '#8E8997',
  accentGoldStart: '#F5C147',
  accentGoldEnd: '#CF9717',
  accentGoldText: '#1A1205',
  danger: '#EF5B5B',
  success: '#5ECF88',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = keyof typeof COLORS;
