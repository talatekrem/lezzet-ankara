import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MapIcon } from '../../icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';
import type { Restaurant } from '../../types';
import { getDisplayStatus } from '../../utils/restaurantStatus';
import { StatusBadge } from './StatusBadge';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onPress?: (restaurant: Restaurant) => void;
  onMapPress: (restaurant: Restaurant) => void;
  rank?: number;
};

const MAP_BUTTON_GRADIENT = [
  COLORS.accentGoldStart,
  COLORS.accentGoldEnd,
] as const;

/** Harita ikonu ile “Haritada Gör” metni arası (genel `sm`’den ayrı). */
const MAP_BUTTON_ICON_TEXT_GAP = 12;

export function RestaurantCard({
  restaurant,
  onPress,
  onMapPress,
  rank,
}: RestaurantCardProps) {
  const displayStatus = getDisplayStatus(restaurant);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        disabled={!onPress}
        onPress={() => onPress?.(restaurant)}
        style={({ pressed }) => [
          styles.headerPressable,
          pressed && onPress && styles.pressed,
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerMain}>
              <View style={styles.titleRow}>
                {rank != null ? (
                  <Text allowFontScaling={false} style={styles.rank}>
                    {rank}
                  </Text>
                ) : null}
                <Text allowFontScaling={false} numberOfLines={1} style={styles.name}>
                  {restaurant.name}
                </Text>
              </View>
            </View>

            <View style={styles.badgeWrap}>
              <StatusBadge status={displayStatus} />
            </View>
          </View>

          <View style={styles.metaRow}>
            <Text allowFontScaling={false} numberOfLines={1} style={styles.meta}>
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
            {restaurant.hours ? (
              <Text
                adjustsFontSizeToFit
                allowFontScaling={false}
                numberOfLines={1}
                minimumFontScale={0.85}
                style={styles.hoursText}
              >
                {restaurant.hours}
              </Text>
            ) : null}
          </View>

          {restaurant.note ? (
            <Text allowFontScaling={false} numberOfLines={1} style={styles.note}>
              {restaurant.note}
            </Text>
          ) : null}
        </View>
      </Pressable>

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
          <Text
            adjustsFontSizeToFit
            allowFontScaling={false}
            minimumFontScale={0.9}
            numberOfLines={1}
            style={styles.mapButtonText}
          >
            Haritada Gör
          </Text>
        </LinearGradient>
      </Pressable>
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
  headerPressable: {
    marginBottom: 18,
  },
  header: {},
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  headerMain: {
    flex: 1,
    minWidth: 0,
  },
  badgeWrap: {
    alignSelf: 'flex-start',
    flexShrink: 0,
    maxWidth: '38%',
    paddingTop: 1,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: 5,
    marginTop: 6,
  },
  hoursText: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    flexShrink: 0,
    fontFamily: TYPOGRAPHY.buttonLabel.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    maxWidth: '38%',
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  titleRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: SPACING.sm,
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
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 10,
    lineHeight: 14,
    minWidth: 0,
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
  mapButtonPressable: {
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  mapButton: {
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    flexDirection: 'row',
    gap: MAP_BUTTON_ICON_TEXT_GAP,
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 7,
  },
  mapButtonText: {
    ...TYPOGRAPHY.buttonLabel,
    flexShrink: 1,
    fontSize: 16,
    letterSpacing: 3,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.82,
  },
});
