import { RESTAURANTS } from './restaurants';
import { getCategoryLabelsForRestaurant } from './categoryBrowse';
import type { Restaurant } from '../types';
import { compareRestaurantsForDisplay } from '../utils/restaurantRanking';
import { normalizeForSearch } from '../utils/searchNormalize';

export function searchRestaurants(query: string): Restaurant[] {
  const normalizedQuery = normalizeForSearch(query.trim());

  if (!normalizedQuery) {
    return [];
  }

  return Object.values(RESTAURANTS)
    .filter((restaurant) => {
      const categoryLabels = getCategoryLabelsForRestaurant(restaurant.id).join(
        ' ',
      );
      const haystack = normalizeForSearch(
        [
          restaurant.name,
          restaurant.district,
          restaurant.note ?? '',
          restaurant.highlights.join(' '),
          categoryLabels,
        ].join(' '),
      );

      return haystack.includes(normalizedQuery);
    })
    .sort(compareRestaurantsForDisplay);
}
