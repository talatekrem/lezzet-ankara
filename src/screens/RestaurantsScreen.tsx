import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import RightArrowIcon from '../../assets/icons/right-arrow.svg';
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

        <View style={styles.headerText}>
          <Text style={styles.title}>{category?.name ?? 'Kategori'}</Text>
          {category?.description ? (
            <Text style={styles.subtitle}>{category.description}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.list}>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            onMapPress={handleMapPress}
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
    paddingTop: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    width: 40,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  headerText: {
    gap: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
  },
  subtitle: {
    ...TYPOGRAPHY.meta,
  },
  list: {
    gap: SPACING.md,
  },
  pressed: {
    opacity: 0.72,
  },
});
