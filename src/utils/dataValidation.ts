import { CATEGORIES } from '../data/categories';
import { RESTAURANTS } from '../data/restaurants';
import type { Category, Restaurant, RestaurantId } from '../types';

const VALID_RESTAURANT_STATUSES = new Set<Restaurant['status']>([
  'open',
  'closed',
  'unknown',
]);

const LOWERCASE_KEBAB_CASE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertLowercaseKebabCaseId(id: string, label: string) {
  if (!LOWERCASE_KEBAB_CASE_PATTERN.test(id)) {
    throw new Error(
      `${label} "${id}" must use lowercase kebab-case letters and numbers only.`,
    );
  }
}

export function validateRestaurantRegistry(
  restaurants: Record<RestaurantId, Restaurant> = RESTAURANTS,
) {
  for (const [restaurantId, restaurant] of Object.entries(restaurants)) {
    assertLowercaseKebabCaseId(restaurantId, 'Restaurant id');

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
  const seenCategoryIds = new Set<string>();

  for (const category of categories) {
    assertLowercaseKebabCaseId(category.id, 'Category id');

    if (seenCategoryIds.has(category.id)) {
      throw new Error(`Duplicate category id "${category.id}" found.`);
    }

    seenCategoryIds.add(category.id);

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
