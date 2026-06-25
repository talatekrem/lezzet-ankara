import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';

type RestaurantFiltersProps = {
  districts: string[];
  selectedDistrict: string | null;
  openNowOnly: boolean;
  onDistrictChange: (district: string | null) => void;
  onOpenNowChange: (openNowOnly: boolean) => void;
};

export function RestaurantFilters({
  districts,
  selectedDistrict,
  openNowOnly,
  onDistrictChange,
  onOpenNowChange,
}: RestaurantFiltersProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: openNowOnly }}
        onPress={() => onOpenNowChange(!openNowOnly)}
        style={({ pressed }) => [
          styles.openNowButton,
          openNowOnly && styles.openNowButtonActive,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.openNowContent}>
          <View
            style={[
              styles.statusDot,
              openNowOnly && styles.statusDotActive,
            ]}
          />
          <Text
            allowFontScaling={false}
            style={[
              styles.openNowText,
              openNowOnly && styles.openNowTextActive,
            ]}
          >
            Şu an açık olanlar
          </Text>
        </View>
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.districtRow}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: selectedDistrict == null }}
          onPress={() => onDistrictChange(null)}
          style={({ pressed }) => [
            styles.chip,
            selectedDistrict == null && styles.chipActive,
            pressed && styles.pressed,
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.chipText,
              selectedDistrict == null && styles.chipTextActive,
            ]}
          >
            Tümü
          </Text>
        </Pressable>

        {districts.map((district) => {
          const isSelected = selectedDistrict === district;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={district}
              onPress={() => onDistrictChange(isSelected ? null : district)}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.chipActive,
                pressed && styles.pressed,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[styles.chipText, isSelected && styles.chipTextActive]}
              >
                {district}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  openNowButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  openNowButtonActive: {
    backgroundColor: COLORS.goldGlowSoft,
    borderColor: COLORS.accentGoldStart,
    shadowOpacity: 0.14,
  },
  openNowContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  statusDot: {
    backgroundColor: 'transparent',
    borderColor: COLORS.textMuted,
    borderRadius: 5,
    borderWidth: 1.5,
    height: 10,
    width: 10,
  },
  statusDotActive: {
    backgroundColor: COLORS.badgeOpenText,
    borderColor: COLORS.badgeOpenText,
  },
  openNowText: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.categoryLabel.fontFamily,
    fontSize: 12,
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  openNowTextActive: {
    color: COLORS.categoryText,
  },
  districtRow: {
    gap: SPACING.sm,
    paddingRight: SPACING.sm,
  },
  chip: {
    backgroundColor: COLORS.badgeSubtle,
    borderColor: COLORS.badgeMutedBorder,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: COLORS.goldGlowSoft,
    borderColor: COLORS.borderGoldSoft,
  },
  chipText: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.categoryLabel.fontFamily,
    fontSize: 12,
    letterSpacing: 0.8,
  },
  chipTextActive: {
    color: COLORS.categoryText,
  },
  pressed: {
    opacity: 0.78,
  },
});
