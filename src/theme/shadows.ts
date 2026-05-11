import type { ViewStyle } from 'react-native';

import { COLORS } from './colors';

// Design tokens: reuse these shadows instead of hardcoding elevation styles.
export const SHADOWS = {
  card: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 2,
  },
  button: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 2,
  },
  glowGold: {
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 3,
  },
} satisfies Record<string, ViewStyle>;

export type ShadowToken = keyof typeof SHADOWS;
