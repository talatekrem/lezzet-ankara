import type { CategoryId } from '../types';

export type RootStackParamList = {
  Categories: undefined;
  Restaurants: {
    categoryId: CategoryId;
  };
};
