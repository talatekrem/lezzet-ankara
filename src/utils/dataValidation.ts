import { CATEGORIES } from '../data/categories';
import { RESTAURANTS } from '../data/restaurants';
import type { Category, Restaurant, RestaurantId } from '../types';

const VALID_RESTAURANT_STATUSES = new Set<Restaurant['status']>([
  'open',
  'closed',
  'unknown',
]);

export function validateRestaurantRegistry(
  restaurants: Record<RestaurantId, Restaurant> = RESTAURANTS,
) {
  for (const [restaurantId, restaurant] of Object.entries(restaurants)) {
    if (restaurant.id !== restaurantId) {
      throw new Error(
        `Restaurant registry key "${restaurantId}" does not match restaurant.id "${restaurant.id}".`,
      );
    }

    if (!restaurant.name.trim()) {
      throw new Error(`Restaurant "${restaurantId}" is missing a name.`);
    }

    if (!restaurant.district.trim()) {
      throw new Error(`Restaurant "${restaurantId}" is missing a district.`);
    }

    if (!restaurant.mapQuery.trim()) {
      throw new Error(`Restaurant "${restaurantId}" is missing a mapQuery.`);
    }

    if (restaurant.rating < 0 || restaurant.rating > 5) {
      throw new Error(
        `Restaurant "${restaurantId}" has invalid rating "${restaurant.rating}". Expected a value between 0 and 5.`,
      );
    }

    if (restaurant.reviewCount < 0) {
      throw new Error(
        `Restaurant "${restaurantId}" has invalid reviewCount "${restaurant.reviewCount}". Expected 0 or greater.`,
      );
    }

    if (!VALID_RESTAURANT_STATUSES.has(restaurant.status)) {
      throw new Error(
        `Restaurant "${restaurantId}" has invalid status "${restaurant.status}". Expected open, closed, or unknown.`,
      );
    }
  }
}

export function validateCategoryMemberships(
  categories: Category[] = CATEGORIES,
  restaurants: Record<RestaurantId, Restaurant> = RESTAURANTS,
) {
  for (const category of categories) {
    const seenRestaurantIds = new Set<RestaurantId>();

    for (const restaurantId of category.restaurantIds) {
      if (!restaurants[restaurantId]) {
        throw new Error(
          `Category "${category.id}" references missing restaurant "${restaurantId}".`,
        );
      }

      if (seenRestaurantIds.has(restaurantId)) {
        throw new Error(
          `Category "${category.id}" contains duplicate restaurant "${restaurantId}".`,
        );
      }

      seenRestaurantIds.add(restaurantId);
    }
  }
}

export function validateAppData() {
  validateRestaurantRegistry();
  validateCategoryMemberships();
}
