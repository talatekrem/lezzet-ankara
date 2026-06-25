import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getRestaurantById } from '../data';
import type { Restaurant, RestaurantId } from '../types';
import { compareRestaurantsForDisplay } from '../utils/restaurantRanking';

const FAVORITES_STORAGE_KEY = '@lezzet-ankara/favorites';

type FavoritesContextValue = {
  favoriteIds: RestaurantId[];
  favoriteRestaurants: Restaurant[];
  isFavorite: (restaurantId: RestaurantId) => boolean;
  toggleFavorite: (restaurantId: RestaurantId) => void;
  isReady: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<RestaurantId[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (!isMounted) {
          return;
        }

        if (stored) {
          const parsed = JSON.parse(stored) as RestaurantId[];
          setFavoriteIds(Array.isArray(parsed) ? parsed : []);
        }
      } catch {
        if (isMounted) {
          setFavoriteIds([]);
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    void loadFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  const persistFavorites = useCallback(async (nextIds: RestaurantId[]) => {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextIds));
  }, []);

  const toggleFavorite = useCallback(
    (restaurantId: RestaurantId) => {
      setFavoriteIds((current) => {
        const next = current.includes(restaurantId)
          ? current.filter((id) => id !== restaurantId)
          : [...current, restaurantId];

        void persistFavorites(next);
        return next;
      });
    },
    [persistFavorites],
  );

  const isFavorite = useCallback(
    (restaurantId: RestaurantId) => favoriteIds.includes(restaurantId),
    [favoriteIds],
  );

  const favoriteRestaurants = useMemo(
    () =>
      favoriteIds
        .map((id) => getRestaurantById(id))
        .filter((restaurant): restaurant is Restaurant => restaurant != null)
        .sort(compareRestaurantsForDisplay),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      favoriteRestaurants,
      isFavorite,
      toggleFavorite,
      isReady,
    }),
    [favoriteIds, favoriteRestaurants, isFavorite, toggleFavorite, isReady],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
}
