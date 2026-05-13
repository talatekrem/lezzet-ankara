import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import { CategoryCard } from '../components/category/CategoryCard';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { Screen } from '../components/layout/Screen';
import { getCategoryById, getRestaurantsByCategoryId } from '../data';
import type { RootStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Restaurant } from '../types';
import { openRestaurantLocation } from '../utils/maps';

type RestaurantsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Restaurants'
>;

export function RestaurantsScreen({
  navigation,
  route,
}: RestaurantsScreenProps) {
  const { categoryId } = route.params;
  const category = getCategoryById(categoryId);
  const restaurants = getRestaurantsByCategoryId(categoryId);
  const title = category?.name.toLocaleUpperCase('tr-TR') ?? 'KATEGORİ';
  const subcategories = category?.subcategories ?? [];
  const hasSubcategories = subcategories.length > 0;
  const shouldShowRanks = !hasSubcategories && restaurants.length > 4;

  function handleMapPress(restaurant: Restaurant) {
    void openRestaurantLocation(restaurant.mapQuery);
  }

  return (
    <Screen
      scroll
      contentContainerStyle={styles.content}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Back to categories"
          accessibilityRole="button"
          onPress={navigation.goBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <RightArrowIcon height={16} style={styles.backIcon} width={16} />
        </Pressable>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          {category?.description ? (
            <Text style={styles.subtitle}>{category.description}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.list}>
        {hasSubcategories
          ? subcategories.map((subcategory) => (
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
          : restaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                onMapPress={handleMapPress}
                rank={shouldShowRanks ? index + 1 : undefined}
                restaurant={restaurant}
              />
            ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.md,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    height: 38,
    justifyContent: 'center',
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    width: 38,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  titleWrap: {
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.screenTitle,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 24,
    letterSpacing: 7,
    lineHeight: 30,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.meta,
    letterSpacing: 0.25,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  list: {
    gap: SPACING.md,
  },
  pressed: {
    opacity: 0.78,
  },
});
