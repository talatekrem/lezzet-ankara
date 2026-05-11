export const CATEGORY_IDS = [
  'alinazik',
  'beyti',
  'kofte',
  'lahmacun',
] as const;

export type CategoryIdValue = (typeof CATEGORY_IDS)[number];
