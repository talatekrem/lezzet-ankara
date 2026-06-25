import { CATEGORIES } from './categories';
import type { Category, CategoryId } from '../types';
import type { RestaurantId } from '../types';

export function categoryHasRestaurants(category: Category): boolean {
  if (category.restaurantIds.length > 0) {
    return true;
  }

  return category.subcategories?.some(categoryHasRestaurants) ?? false;
}

function filterBrowsableSubcategories(category: Category): Category {
  if (!category.subcategories) {
    return category;
  }

  return {
    ...category,
    subcategories: category.subcategories
      .filter(categoryHasRestaurants)
      .map(filterBrowsableSubcategories),
  };
}

export function getBrowsableCategories(): Category[] {
  return CATEGORIES.filter(categoryHasRestaurants).map(
    filterBrowsableSubcategories,
  );
}

function collectCategoryLabels(
  categories: Category[],
  restaurantId: RestaurantId,
  labels: string[],
) {
  for (const category of categories) {
    if (category.restaurantIds.includes(restaurantId)) {
      labels.push(category.name);
    }

    if (category.subcategories) {
      collectCategoryLabels(category.subcategories, restaurantId, labels);
    }
  }
}

export function getCategoryLabelsForRestaurant(
  restaurantId: RestaurantId,
): string[] {
  const labels: string[] = [];
  collectCategoryLabels(CATEGORIES, restaurantId, labels);
  return labels;
}

function findCategoryPath(
  categories: Category[],
  categoryId: CategoryId,
  path: string[],
): string[] | undefined {
  for (const category of categories) {
    const nextPath = [...path, category.name];

    if (category.id === categoryId) {
      return nextPath;
    }

    if (category.subcategories) {
      const nested = findCategoryPath(category.subcategories, categoryId, nextPath);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
}

export function getCategoryPathLabel(categoryId: CategoryId): string | undefined {
  const path = findCategoryPath(CATEGORIES, categoryId, []);
  return path?.join(' / ');
}
