export type RestaurantId = string;

export interface Restaurant {
  id: RestaurantId;
  name: string;
  district: string;
  rating: number;
  reviewCount: number;
  status: 'open' | 'closed' | 'unknown';
  mapQuery: string;
  note?: string;
}
