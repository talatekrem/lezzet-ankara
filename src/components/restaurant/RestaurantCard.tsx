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
        style={({ pressed }) => [styles.mapButton, pressed && styles.pressed]}
      >
        <Text style={styles.mapButtonText}>Map</Text>
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
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  main: {
    flex: 1,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  name: {
    ...TYPOGRAPHY.restaurantName,
    flex: 1,
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
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  open: {
    backgroundColor: COLORS.surfaceSoft,
    borderColor: COLORS.success,
  },
  closed: {
    backgroundColor: COLORS.surfaceSoft,
    borderColor: COLORS.danger,
  },
  unknown: {
    backgroundColor: COLORS.surfaceSoft,
    borderColor: COLORS.border,
  },
  badgeText: {
    ...TYPOGRAPHY.meta,
    fontSize: 11,
    lineHeight: 14,
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
  mapButton: {
    backgroundColor: COLORS.surfaceSoft,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  mapButtonText: {
    ...TYPOGRAPHY.buttonLabel,
    color: COLORS.accentGoldStart,
  },
  pressed: {
    opacity: 0.72,
  },
});
