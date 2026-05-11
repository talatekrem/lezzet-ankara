import type { Restaurant, RestaurantId } from '../types';

export const RESTAURANTS: Record<RestaurantId, Restaurant> = {
  masabasi: {
    id: 'masabasi',
    name: 'Masabasi',
    district: 'Cankaya',
    rating: 4.7,
    reviewCount: 1280,
    status: 'open',
    mapQuery: 'Masabasi Ankara',
    note: 'Ankara kebap ve ocakbasi mutfagi',
  },
  'example-kofte': {
    id: 'example-kofte',
    name: 'Example Kofte',
    district: 'Kizilay',
    rating: 4.4,
    reviewCount: 420,
    status: 'unknown',
    mapQuery: 'Example Kofte Ankara',
    note: 'Izgara kofte odakli klasik lezzetler',
  },
  'example-lahmacun': {
    id: 'example-lahmacun',
    name: 'Example Lahmacun',
    district: 'Bahcelievler',
    rating: 4.5,
    reviewCount: 610,
    status: 'closed',
    mapQuery: 'Example Lahmacun Ankara',
    note: 'Tas firin lahmacun ve pide',
  },
};
