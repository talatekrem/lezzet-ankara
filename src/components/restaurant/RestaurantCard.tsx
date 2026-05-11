import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';
import type { Restaurant } from '../../types';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onMapPress: (restaurant: Restaurant) => void;
};

const STATUS_LABELS: Record<Restaurant['status'], string> = {
  open: 'Open',
  closed: 'Closed',
  unknown: 'Unknown',
};

const MAP_BUTTON_GRADIENT = [
  COLORS.accentGoldStart,
  COLORS.accentGoldEnd,
] as const;

export function RestaurantCard({
  restaurant,
  onMapPress,
}: RestaurantCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.name}>
            {restaurant.name}
          </Text>
          <StatusBadge status={restaurant.status} />
        </View>

        <Text style={styles.district}>{restaurant.district}</Text>
        <Text style={styles.meta}>
          {restaurant.rating.toFixed(1)} rating / {restaurant.reviewCount} reviews
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => onMapPress(restaurant)}
        style={({ pressed }) => [
          styles.mapButtonPressable,
          pressed && styles.pressed,
        ]}
      >
        <LinearGradient colors={MAP_BUTTON_GRADIENT} style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Map</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

function StatusBadge({ status }: Pick<Restaurant, 'status'>) {
  return (
    <View style={[styles.badge, styles[status]]}>
      <Text style={[styles.badgeText, styles[`${status}Text`]]}>
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'stretch',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: SPACING.md,
    minHeight: 108,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  name: {
    ...TYPOGRAPHY.restaurantName,
    flex: 1,
    letterSpacing: 0.1,
  },
  district: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  meta: {
    ...TYPOGRAPHY.meta,
  },
  badge: {
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  open: {
    borderColor: COLORS.success,
  },
  closed: {
    borderColor: COLORS.danger,
  },
  unknown: {
    borderColor: COLORS.border,
  },
  badgeText: {
    ...TYPOGRAPHY.meta,
    fontFamily: TYPOGRAPHY.buttonLabel.fontFamily,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.25,
  },
  openText: {
    color: COLORS.success,
  },
  closedText: {
    color: COLORS.danger,
  },
  unknownText: {
    color: COLORS.textMuted,
  },
  mapButtonPressable: {
    alignSelf: 'center',
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  mapButton: {
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    justifyContent: 'center',
    minWidth: 64,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  mapButtonText: {
    ...TYPOGRAPHY.buttonLabel,
  },
  pressed: {
    opacity: 0.78,
  },
});
