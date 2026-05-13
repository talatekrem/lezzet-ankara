import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import MapIcon from '../../../assets/icons/map.svg';
import { COLORS, FONT_FAMILY, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';
import type { Restaurant } from '../../types';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onMapPress: (restaurant: Restaurant) => void;
  rank?: number;
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
  rank,
}: RestaurantCardProps) {
  const displayStatus = getDisplayStatus(restaurant);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerMain}>
            <View style={styles.titleRow}>
              {rank != null ? (
                <Text style={styles.rank}>{rank}</Text>
              ) : null}
              <Text numberOfLines={1} style={styles.name}>
                {restaurant.name}
              </Text>
            </View>

            <Text numberOfLines={1} style={styles.meta}>
              {restaurant.district ? (
                <>
                  <Text>{restaurant.district}</Text>
                  <Text>{' / '}</Text>
                </>
              ) : null}
              <Text>puan </Text>
              <Text style={styles.metaHighlight}>
                {restaurant.rating.toFixed(1)}
              </Text>
              <Text>{' / yorum '}</Text>
              <Text style={styles.metaHighlight}>
                {restaurant.reviewCount}
              </Text>
            </Text>
          </View>

          <View style={styles.statusColumn}>
            <StatusBadge status={displayStatus} />
            {restaurant.hours ? (
              <>
                <View style={styles.hoursSpacer} />
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  minimumFontScale={0.85}
                  style={styles.hoursText}
                >
                  {restaurant.hours}
                </Text>
              </>
            ) : null}
          </View>
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
          <MapIcon height={20} width={20} />
          <Text style={styles.mapButtonText}>Haritada Gör</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

function getDisplayStatus(restaurant: Restaurant): Restaurant['status'] {
  if (!restaurant.hours) {
    return restaurant.status;
  }

  const hoursStatus = getStatusFromHours(restaurant.hours);
  return hoursStatus ?? restaurant.status;
}

function getStatusFromHours(hours: string): Restaurant['status'] | undefined {
  const match = hours.match(/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/);

  if (!match) {
    return undefined;
  }

  const [, openHour, openMinute, closeHour, closeMinute] = match;
  const openMinutes = Number(openHour) * 60 + Number(openMinute);
  const closeMinutes = Number(closeHour) * 60 + Number(closeMinute);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isOpen =
    closeMinutes > openMinutes
      ? currentMinutes >= openMinutes && currentMinutes < closeMinutes
      : currentMinutes >= openMinutes || currentMinutes < closeMinutes;

  return isOpen ? 'open' : 'closed';
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
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.035,
    shadowRadius: 9,
  },
  header: {
    marginBottom: 18,
  },
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: 5,
  },
  headerMain: {
    flex: 1,
    minWidth: 0,
  },
  statusColumn: {
    alignItems: 'flex-end',
    flexShrink: 0,
    maxWidth: '38%',
    paddingTop: 1,
  },
  hoursSpacer: {
    height: 7,
  },
  hoursText: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    fontFamily: TYPOGRAPHY.buttonLabel.fontFamily,
    fontSize: 10,
    lineHeight: 13,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
    maxWidth: '100%',
  },
  titleRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: 6,
  },
  rank: {
    color: COLORS.restaurantNote,
    flexShrink: 0,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 13,
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.35,
    lineHeight: 16,
  },
  name: {
    ...TYPOGRAPHY.restaurantName,
    flex: 1,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.35,
  },
  meta: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    flexShrink: 1,
    fontSize: 10,
    lineHeight: 14,
  },
  metaHighlight: {
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.buttonLabel.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    fontVariant: ['tabular-nums'],
  },
  note: {
    ...TYPOGRAPHY.meta,
    color: COLORS.restaurantNote,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.badgeSubtle,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  open: {
    backgroundColor: COLORS.badgeOpenTint,
    borderColor: COLORS.badgeOpenBorder,
  },
  closed: {
    backgroundColor: COLORS.badgeClosedTint,
    borderColor: COLORS.badgeClosedBorder,
  },
  unknown: {
    backgroundColor: COLORS.badgeSubtle,
    borderColor: COLORS.badgeMutedBorder,
  },
  badgeText: {
    ...TYPOGRAPHY.meta,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.38,
  },
  openText: {
    color: COLORS.badgeOpenText,
  },
  closedText: {
    color: COLORS.badgeClosedText,
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
    gap: SPACING.sm,
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 7,
  },
  mapButtonText: {
    ...TYPOGRAPHY.buttonLabel,
    fontSize: 18,
    letterSpacing: 4,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.82,
  },
});
