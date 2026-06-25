import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { Screen } from '../components/layout/Screen';
import { ScreenHeader } from '../components/layout/ScreenHeader';
import { AppAlert } from '../components/ui/AppAlert';
import { useFavorites } from '../context/FavoritesContext';
import { useMapReminder } from '../hooks/useMapReminder';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import type { Restaurant } from '../types';

type FavoritesScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Favorites'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const { favoriteRestaurants, isReady } = useFavorites();
  const {
    mapReminderVisible,
    requestMapOpen,
    dismissMapReminder,
    confirmMapReminder,
  } = useMapReminder();

  function openRestaurant(restaurant: Restaurant) {
    navigation.navigate('RestaurantDetail', {
      restaurantId: restaurant.id,
    });
  }

  return (
    <>
      <Screen scroll contentContainerStyle={styles.content} edges={['top', 'left', 'right']}>
        <ScreenHeader title="LİSTEM" />

        {!isReady ? (
          <Text allowFontScaling={false} style={styles.emptyText}>
            Yükleniyor...
          </Text>
        ) : favoriteRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text allowFontScaling={false} style={styles.emptyTitle}>
              Henüz kayıtlı mekân yok
            </Text>
            <Text allowFontScaling={false} style={styles.emptyBody}>
              Mekân detayından veya listeden favorilere ekleyebilirsiniz.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {favoriteRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                onMapPress={(item) => requestMapOpen(item.mapQuery)}
                onPress={openRestaurant}
                restaurant={restaurant}
              />
            ))}
          </View>
        )}
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
  emptyText: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
