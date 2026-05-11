import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';
import type { Restaurant } from '../../types';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onMapPress: (restaurant: Restaurant) => void;
};

const STATUS_LABELS: Record<Restaurant['status'], string> = {
  open: 'Açık',
  closed: 'Kapalı',
  unknown: 'Bilinmiyor',
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
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.name}>
            {restaurant.name}
          </Text>
          <StatusBadge status={restaurant.status} />
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>{restaurant.district}</Text>
          <Text style={styles.meta}>puan : {restaurant.rating.toFixed(1)}</Text>
          <Text style={styles.meta}>yorum : {restaurant.reviewCount}</Text>
        </View>

        {restaurant.note ? (
          <Text numberOfLines={1} style={styles.note}>
            {restaurant.note}
          </Text>
        ) : null}
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
          <MapIcon />
          <Text style={styles.mapButtonText}>Haritada Gör</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

function MapIcon() {
  return (
    <Svg fill="none" height={28} viewBox="0 0 32 32" width={28}>
      <Path
        d="M5 7.5L12.5 4L20 7.5L27 4.5V24.5L20 27.5L12.5 24L5 27.5V7.5Z"
        stroke={COLORS.accentGoldText}
        strokeLinejoin="round"
        strokeWidth={2.2}
      />
      <Path
        d="M12.5 4V24M20 7.5V27.5"
        stroke={COLORS.accentGoldText}
        strokeLinecap="round"
        strokeWidth={2.2}
      />
      <Rect
        height={26}
        opacity={0.001}
        stroke={COLORS.accentGoldText}
        width={26}
        x={3}
        y={3}
      />
    </Svg>
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
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: 34,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 13,
  },
  header: {
    marginBottom: SPACING.lg,
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
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xs,
  },
  meta: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  note: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 15,
  },
  badge: {
    backgroundColor: 'rgba(182, 176, 162, 0.09)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  open: {
    borderColor: COLORS.success,
  },
  closed: {
    borderColor: COLORS.danger,
  },
  unknown: {
    backgroundColor: 'rgba(182, 176, 162, 0.09)',
  },
  badgeText: {
    ...TYPOGRAPHY.meta,
    fontFamily: TYPOGRAPHY.buttonLabel.fontFamily,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.4,
  },
  openText: {
    color: COLORS.success,
  },
  closedText: {
    color: COLORS.danger,
  },
  unknownText: {
    color: COLORS.textSecondary,
  },
  mapButtonPressable: {
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  mapButton: {
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
  },
  mapButtonText: {
    ...TYPOGRAPHY.buttonLabel,
    fontSize: 22,
    letterSpacing: 5,
    lineHeight: 28,
  },
  pressed: {
    opacity: 0.82,
  },
});
