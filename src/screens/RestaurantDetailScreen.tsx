import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MapIcon } from '../icons';
import { Screen } from '../components/layout/Screen';
import { ScreenHeader } from '../components/layout/ScreenHeader';
import { HeartIcon, ShareIcon } from '../components/restaurant/DetailActionIcons';
import {
  DistrictMetaIcon,
  HoursMetaIcon,
  RatingMetaIcon,
  ReviewMetaIcon,
} from '../components/restaurant/DetailMetaIcons';
import { StatusBadge } from '../components/restaurant/StatusBadge';
import { AppAlert } from '../components/ui/AppAlert';
import { useFavorites } from '../context/FavoritesContext';
import {
  getCategoryLabelsForRestaurant,
  getCategoryPathLabel,
  getRestaurantById,
} from '../data';
import { useMapReminder } from '../hooks/useMapReminder';
import type { RootStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { getRestaurantHighlights } from '../utils/restaurantHighlights';
import { getDisplayStatus } from '../utils/restaurantStatus';
import { shareRestaurant } from '../utils/restaurantShare';

const PRIMARY_GRADIENT = [COLORS.accentGoldStart, COLORS.accentGoldEnd] as const;
const META_ICON_COLOR = COLORS.restaurantNote;

type RestaurantDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RestaurantDetail'
>;

type DetailMetaRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function DetailMetaRow({ icon, label, value }: DetailMetaRowProps) {
  return (
    <View style={styles.metaRow}>
      <View style={styles.metaIconWrap}>{icon}</View>
      <Text allowFontScaling={false} style={styles.metaLabel}>
        {label}
      </Text>
      <Text allowFontScaling={false} style={styles.metaValue}>
        {value}
      </Text>
    </View>
  );
}

export function RestaurantDetailScreen({
  navigation,
  route,
}: RestaurantDetailScreenProps) {
  const { restaurantId, categoryId, rank } = route.params;
  const restaurant = getRestaurantById(restaurantId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    mapReminderVisible,
    requestMapOpen,
    dismissMapReminder,
    confirmMapReminder,
  } = useMapReminder();
  const [favoriteAlertVisible, setFavoriteAlertVisible] = useState(false);
  const [favoriteAlertTitle, setFavoriteAlertTitle] = useState('');
  const [favoriteAlertMessage, setFavoriteAlertMessage] = useState('');

  if (!restaurant) {
    return (
      <Screen scroll contentContainerStyle={styles.content}>
        <ScreenHeader onBack={navigation.goBack} title="MEKÂN" />
        <Text allowFontScaling={false} style={styles.emptyText}>
          Mekân bulunamadı.
        </Text>
      </Screen>
    );
  }

  const item = restaurant;
  const displayStatus = getDisplayStatus(item);
  const categoryPath = categoryId ? getCategoryPathLabel(categoryId) : undefined;
  const categoryLabels = getCategoryLabelsForRestaurant(item.id);
  const highlights = getRestaurantHighlights(item);
  const favorite = isFavorite(item.id);

  function handleFavoritePress() {
    const adding = !favorite;

    toggleFavorite(item.id);
    setFavoriteAlertTitle(adding ? 'LİSTEME EKLENDİ' : 'LİSTEDEN ÇIKARILDI');
    setFavoriteAlertMessage(
      adding
        ? `${item.name} listenize eklendi. Listem sekmesinden ulaşabilirsiniz.`
        : `${item.name} listenizden çıkarıldı.`,
    );
    setFavoriteAlertVisible(true);
  }

  async function handleShare() {
    await shareRestaurant({
      restaurant: item,
      categoryLabel: categoryPath ?? categoryLabels[0],
    });
  }

  return (
    <>
      <Screen scroll contentContainerStyle={styles.content}>
        <ScreenHeader
          onBack={navigation.goBack}
          title={item.name.toLocaleUpperCase('tr-TR')}
          titleStyle={styles.detailTitle}
        />

        <View style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              {rank != null ? (
                <Text allowFontScaling={false} style={styles.rank}>
                  #{rank}
                </Text>
              ) : null}
              <StatusBadge status={displayStatus} />
            </View>

            <View style={styles.actionIcons}>
              <Pressable
                accessibilityLabel={
                  favorite ? 'Listemden çıkar' : 'Listeme ekle'
                }
                accessibilityRole="button"
                accessibilityState={{ selected: favorite }}
                onPress={handleFavoritePress}
                style={({ pressed }) => [
                  styles.iconButton,
                  favorite && styles.iconButtonActive,
                  pressed && styles.pressed,
                ]}
              >
                <HeartIcon
                  color={
                    favorite ? COLORS.accentGoldStart : COLORS.textSecondary
                  }
                  filled={favorite}
                />
              </Pressable>

              <Pressable
                accessibilityLabel="Paylaş"
                accessibilityRole="button"
                onPress={() => void handleShare()}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.pressed,
                ]}
              >
                <ShareIcon color={COLORS.textSecondary} />
              </Pressable>
            </View>
          </View>

          <View style={styles.metaBlock}>
            <DetailMetaRow
              icon={<DistrictMetaIcon color={META_ICON_COLOR} />}
              label="Semt"
              value={item.district}
            />
            <DetailMetaRow
              icon={<RatingMetaIcon color={META_ICON_COLOR} />}
              label="Puan"
              value={item.rating.toFixed(1)}
            />
            <DetailMetaRow
              icon={<ReviewMetaIcon color={META_ICON_COLOR} />}
              label="Yorum"
              value={item.reviewCount.toLocaleString('tr-TR')}
            />
            {item.hours ? (
              <DetailMetaRow
                icon={<HoursMetaIcon color={META_ICON_COLOR} />}
                label="Saatler"
                value={item.hours}
              />
            ) : null}
          </View>

          {highlights.length > 0 ? (
            <View style={styles.highlightsSection}>
              <Text allowFontScaling={false} style={styles.sectionTitle}>
                Öne çıkan lezzetler
              </Text>
              <View style={styles.highlightList}>
                {highlights.map((highlight) => (
                  <Text
                    allowFontScaling={false}
                    key={highlight}
                    style={styles.highlightItem}
                  >
                    {highlight}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            onPress={() => requestMapOpen(item.mapQuery)}
            style={({ pressed }) => [
              styles.primaryPressable,
              pressed && styles.pressed,
            ]}
          >
            <LinearGradient colors={PRIMARY_GRADIENT} style={styles.primaryButton}>
              <MapIcon height={20} width={20} />
              <Text allowFontScaling={false} style={styles.primaryButtonText}>
                Haritada Aç
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </Screen>

      <AppAlert
        confirmLabel="Tamam"
        message={favoriteAlertMessage}
        onConfirm={() => setFavoriteAlertVisible(false)}
        title={favoriteAlertTitle}
        visible={favoriteAlertVisible}
      />

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
  detailTitle: {
    fontSize: 20,
    letterSpacing: 3.2,
    lineHeight: 26,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.035,
    shadowRadius: 9,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  titleLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    gap: SPACING.sm,
    minWidth: 0,
  },
  actionIcons: {
    flexDirection: 'row',
    flexShrink: 0,
    gap: SPACING.sm,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: COLORS.badgeSubtle,
    borderColor: COLORS.badgeMutedBorder,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  iconButtonActive: {
    backgroundColor: COLORS.goldGlowSoft,
    borderColor: COLORS.borderGoldSoft,
  },
  rank: {
    color: COLORS.restaurantNote,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 14,
    letterSpacing: 0.35,
  },
  metaBlock: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  metaIconWrap: {
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  metaLabel: {
    ...TYPOGRAPHY.categoryLabel,
    color: COLORS.restaurantNote,
    fontSize: 11,
    letterSpacing: 1.4,
    minWidth: 52,
  },
  metaValue: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textPrimary,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  highlightsSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.categoryLabel,
    color: COLORS.restaurantNote,
    fontSize: 11,
    letterSpacing: 1.6,
    marginBottom: SPACING.sm,
  },
  highlightList: {
    gap: 8,
  },
  highlightItem: {
    ...TYPOGRAPHY.meta,
    color: COLORS.categoryText,
    fontSize: 14,
    lineHeight: 20,
  },
  primaryPressable: {
    borderRadius: RADIUS.pill,
    marginTop: SPACING.xs,
    overflow: 'hidden',
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.buttonLabel,
    fontSize: 16,
    letterSpacing: 3,
  },
  emptyText: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.82,
  },
});
