// Design tokens: reuse these spacing values instead of hardcoding layout gaps.
export const SPACING = {
  xs: 4,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type SpacingToken = keyof typeof SPACING;
