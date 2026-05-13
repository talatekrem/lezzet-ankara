import type { RestaurantId } from './restaurant';

export type CategoryId = string;

export interface Category {
  id: CategoryId;
  name: string;
  restaurantIds: RestaurantId[];
  description?: string;
  subcategories?: Category[];
}
