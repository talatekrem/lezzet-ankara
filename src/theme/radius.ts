// Design tokens: reuse these radii instead of hardcoding corner values.
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof RADIUS;
