import type { Restaurant } from '../types';

/**
 * Maps / Google için tipik kümelenmede ortalanmış bir başlangıç puanı.
 * Gösterilen skor bununla küçük örnekleri yumuşatır; çok yorumda gerçek puana yaklaşır.
 */
const GLOBAL_PRIOR_RATING = 4.08;

/** Sanal “yorum ağırlığı”: bu kadar yoruma yaklaşık denk güvenirlik kazanılır (~IMDb-formülü). */
const PRIOR_REVIEW_WEIGHT = 180;

/**
 * Listedeki sıralama için tek sayısal skor (gösterilmez — sadece sort).
 */
export function restaurantDisplayScore(restaurant: Restaurant): number {
  const v = Math.max(0, restaurant.reviewCount);
  const r = restaurant.rating;
  const m = PRIOR_REVIEW_WEIGHT;
  return (v / (v + m)) * r + (m / (v + m)) * GLOBAL_PRIOR_RATING;
}

export function compareRestaurantsForDisplay(a: Restaurant, b: Restaurant): number {
  const weightedDiff = restaurantDisplayScore(b) - restaurantDisplayScore(a);
  if (weightedDiff !== 0) {
    return weightedDiff;
  }

  const reviewDiff = b.reviewCount - a.reviewCount;
  if (reviewDiff !== 0) {
    return reviewDiff;
  }

  const ratingDiff = b.rating - a.rating;
  if (ratingDiff !== 0) {
    return ratingDiff;
  }

  return a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' });
}
