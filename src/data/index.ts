import {
  categoryHasRestaurants,
  getBrowsableCategories,
  getCategoryLabelsForRestaurant,
  getCategoryPathLabel,
} from './categoryBrowse';
import { CATEGORIES } from './categories';
import { RESTAURANTS } from './restaurants';
import { searchRestaurants } from './search';
import type { Category, CategoryId, Restaurant, RestaurantId } from '../types';
import { compareRestaurantsForDisplay } from '../utils/restaurantRanking';

export {
  categoryHasRestaurants,
  getBrowsableCategories,
  getCategoryLabelsForRestaurant,
  getCategoryPathLabel,
  searchRestaurants,
};

export function getRestaurantById(id: RestaurantId): Restaurant | undefined {
  return RESTAURANTS[id];
}

/**
 * Kategorideki (ya da alt kategorideki) `restaurantIds` sırasını yok sayar;
 * dönen liste her zaman `compareRestaurantsForDisplay` ile ağırlıklı puana göre
 * azalan sırada sıralanır (`restaurantRanking` formülü).
 */
export function getRestaurantsByCategoryId(categoryId: CategoryId): Restaurant[] {
  const category = getCategoryById(categoryId);

  if (!category) {
    return [];
  }

  const list = category.restaurantIds.map((restaurantId) => {
    const restaurant = RESTAURANTS[restaurantId];

    if (!restaurant) {
      throw new Error(
        `Category "${category.id}" references missing restaurant "${restaurantId}".`,
      );
    }

    return restaurant;
  });

  return [...list].sort(compareRestaurantsForDisplay);
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return findCategoryById(CATEGORIES, id);
}

export function getAllCategories(): Category[] {
  return getBrowsableCategories();
}

function findCategoryById(
  categories: Category[],
  id: CategoryId,
): Category | undefined {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }

    const subcategory = category.subcategories
      ? findCategoryById(category.subcategories, id)
      : undefined;

    if (subcategory) {
      return subcategory;
    }
  }

  return undefined;
}

export { CATEGORIES, RESTAURANTS };
