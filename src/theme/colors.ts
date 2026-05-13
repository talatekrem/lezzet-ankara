// Design tokens: reuse these colors instead of hardcoding visual values.
export const COLORS = {
  background: '#16171D',
  backgroundSoft: '#0B0D15',
  surface: '#1B1C24',
  surfaceSoft: '#1B1C24',
  border: '#2C2B32',
  borderSoft: '#242630',
  borderGoldSoft: '#8D6E24',
  goldGlowSoft: 'rgba(245, 193, 71, 0.07)',
  brandTitle: '#9B6E03',
  screenTitle: '#BAB197',
  textPrimary: '#F8F5EC',
  textSecondary: '#B6B0A2',
  categoryText: '#D1CABD',
  restaurantNote: '#AD9C75',
  textMuted: '#777381',
  badgeSubtle: 'rgba(182, 176, 162, 0.07)',
  accentGoldStart: '#F5C147',
  accentGoldEnd: '#CF9717',
  accentGoldText: '#1A1205',
  danger: '#EF5B5B',
  success: '#5ECF88',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = keyof typeof COLORS;
