import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CategoryCard } from '../components/category/CategoryCard';
import { Screen } from '../components/layout/Screen';
import { ScreenHeader } from '../components/layout/ScreenHeader';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { RestaurantFilters } from '../components/restaurant/RestaurantFilters';
import { AppAlert } from '../components/ui/AppAlert';
import {
  categoryHasRestaurants,
  getCategoryById,
  getRestaurantsByCategoryId,
} from '../data';
import { useMapReminder } from '../hooks/useMapReminder';
import type { ExploreStackParamList, RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import type { Restaurant } from '../types';
import { isRestaurantOpenNow } from '../utils/restaurantStatus';

type RestaurantsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ExploreStackParamList, 'Restaurants'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function RestaurantsScreen({
  navigation,
  route,
}: RestaurantsScreenProps) {
  const { categoryId } = route.params;
  const category = getCategoryById(categoryId);
  const restaurants = getRestaurantsByCategoryId(categoryId);
  const title = category?.name.toLocaleUpperCase('tr-TR') ?? 'KATEGORİ';
  const subcategories = (category?.subcategories ?? []).filter(
    categoryHasRestaurants,
  );
  const hasSubcategories = subcategories.length > 0;
  const shouldShowRanks = !hasSubcategories && restaurants.length > 4;
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const {
    mapReminderVisible,
    requestMapOpen,
    dismissMapReminder,
    confirmMapReminder,
  } = useMapReminder();

  const districts = useMemo(
    () =>
      [...new Set(restaurants.map((restaurant) => restaurant.district))]
        .filter(Boolean)
        .sort((left, right) => left.localeCompare(right, 'tr')),
    [restaurants],
  );

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      if (selectedDistrict && restaurant.district !== selectedDistrict) {
        return false;
      }

      if (openNowOnly && !isRestaurantOpenNow(restaurant)) {
        return false;
      }

      return true;
    });
  }, [openNowOnly, restaurants, selectedDistrict]);

  function openRestaurant(restaurant: Restaurant, index: number) {
    navigation.navigate('RestaurantDetail', {
      restaurantId: restaurant.id,
      categoryId,
      rank: shouldShowRanks ? index + 1 : undefined,
    });
  }

  return (
    <>
      <Screen
        scroll
        contentContainerStyle={styles.content}
        edges={['top', 'left', 'right']}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ScreenHeader
          onBack={navigation.goBack}
          subtitle={category?.description}
          title={title}
        />

        {!hasSubcategories && restaurants.length > 0 ? (
          <RestaurantFilters
            districts={districts}
            openNowOnly={openNowOnly}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            onOpenNowChange={setOpenNowOnly}
          />
        ) : null}

        <View style={styles.list}>
          {hasSubcategories ? (
            subcategories.map((subcategory) => (
              <CategoryCard
                category={subcategory}
                key={subcategory.id}
                onPress={() =>
                  navigation.push('Restaurants', {
                    categoryId: subcategory.id,
                  })
                }
              />
            ))
          ) : filteredRestaurants.length === 0 ? (
            <View style={styles.emptyState}>
              <Text allowFontScaling={false} style={styles.emptyTitle}>
                Sonuç bulunamadı
              </Text>
              <Text allowFontScaling={false} style={styles.emptyBody}>
                Filtreleri değiştirerek tekrar deneyin.
              </Text>
            </View>
          ) : (
            filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                onMapPress={(item) => requestMapOpen(item.mapQuery)}
                onPress={(item) => openRestaurant(item, index)}
                rank={shouldShowRanks ? index + 1 : undefined}
                restaurant={restaurant}
              />
            ))
          )}
        </View>
      </Screen>

      <AppAlert
        cancelLabel="Vazgeç"
        confirmLabel="Haritada Aç"
        message="Yola çıkmadan önce mekânı arayarak açılış ve kapanış saatlerini teyit etmenizi rica ederiz."
        onCancel={dismissMapReminder}
        onConfirm={confirmMapReminder}
        title="HATIRLATMA"
        visible={mapReminderVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  list: {
    gap: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.restaurantName,
    color: COLORS.screenTitle,
    fontSize: 18,
    textAlign: 'center',
  },
  emptyBody: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
