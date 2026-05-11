import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'alinazik',
    name: 'Alinazik',
    description: 'Yogurtlu patlican tabaniyla servis edilen kebap lezzetleri.',
    restaurantIds: ['masabasi'],
  },
  {
    id: 'beyti',
    name: 'Beyti',
    description: 'Lavas, sos ve yogurtla tamamlanan klasik kebap tabaklari.',
    restaurantIds: ['masabasi'],
  },
  {
    id: 'kofte',
    name: 'Kofte',
    restaurantIds: ['example-kofte'],
  },
  {
    id: 'lahmacun',
    name: 'Lahmacun',
    restaurantIds: ['example-lahmacun'],
  },
];
