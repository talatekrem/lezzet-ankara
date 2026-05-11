import type { TextStyle } from 'react-native';

import { COLORS } from './colors';

// Design tokens: reuse these typography styles instead of hardcoding text styles.
export const FONT_FAMILY = {
  interRegular: 'Inter_18pt-Regular',
  interMedium: 'Inter_18pt-Medium',
  interSemiBold: 'Inter_18pt-SemiBold',
} as const;

export const TYPOGRAPHY = {
  appTitle: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.2,
    color: COLORS.textPrimary,
  },
  screenTitle: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.1,
    color: COLORS.textPrimary,
  },
  categoryLabel: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.7,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  restaurantName: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.05,
    color: COLORS.textPrimary,
  },
  meta: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.1,
    color: COLORS.textMuted,
  },
  buttonLabel: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: COLORS.accentGoldText,
  },
} satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof TYPOGRAPHY;
