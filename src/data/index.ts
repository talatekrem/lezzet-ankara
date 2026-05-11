import { CATEGORIES } from './categories';
import { RESTAURANTS } from './restaurants';
import type { Category, CategoryId, Restaurant, RestaurantId } from '../types';

export function getRestaurantById(id: RestaurantId): Restaurant | undefined {
  return RESTAURANTS[id];
}

export function getRestaurantsByCategoryId(categoryId: CategoryId): Restaurant[] {
  const category = getCategoryById(categoryId);

  if (!category) {
    return [];
  }

  return category.restaurantIds.map((restaurantId) => {
    const restaurant = RESTAURANTS[restaurantId];

    if (!restaurant) {
      throw new Error(
        `Category "${category.id}" references missing restaurant "${restaurantId}".`,
      );
    }

    return restaurant;
  });
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export { CATEGORIES, RESTAURANTS };
