// Design tokens: reuse these colors instead of hardcoding visual values.
export const COLORS = {
  background: '#0B0D15',
  backgroundSoft: '#16171D',
  surface: '#12141E',
  surfaceSoft: '#171923',
  border: '#2C2B32',
  borderSoft: '#242630',
  borderGoldSoft: 'rgba(245, 193, 71, 0.16)',
  goldGlowSoft: 'rgba(245, 193, 71, 0.07)',
  textPrimary: '#F8F5EC',
  textSecondary: '#B6B0A2',
  textMuted: '#777381',
  accentGoldStart: '#F5C147',
  accentGoldEnd: '#CF9717',
  accentGoldText: '#1A1205',
  danger: '#EF5B5B',
  success: '#5ECF88',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = keyof typeof COLORS;
