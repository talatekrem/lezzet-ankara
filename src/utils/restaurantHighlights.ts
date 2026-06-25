import type { Restaurant } from '../types';

const HIGHLIGHTS_SPLIT_PATTERN = /\s*\/\s*/;

export function parseHighlightsFromNote(note?: string): string[] {
  if (!note?.trim()) {
    return [];
  }

  return note
    .split(HIGHLIGHTS_SPLIT_PATTERN)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export function getRestaurantHighlights(restaurant: Restaurant): string[] {
  if (restaurant.highlights.length > 0) {
    return restaurant.highlights;
  }

  return parseHighlightsFromNote(restaurant.note);
}
