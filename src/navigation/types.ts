import type { NavigatorScreenParams } from '@react-navigation/native';

import type { CategoryId, RestaurantId } from '../types';

export type ExploreStackParamList = {
  Categories: undefined;
  Restaurants: {
    categoryId: CategoryId;
  };
};

export type MainTabParamList = {
  Explore: NavigatorScreenParams<ExploreStackParamList> | undefined;
  Search: undefined;
  Favorites: undefined;
  About: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  RestaurantDetail: {
    restaurantId: RestaurantId;
    categoryId?: CategoryId;
    rank?: number;
  };
};
