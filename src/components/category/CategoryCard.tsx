import { Pressable, StyleSheet, Text, View } from 'react-native';

import RightArrowIcon from '../../../assets/icons/right-arrow.svg';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';
import type { Category } from '../../types';

type CategoryCardProps = {
  category: Category;
  onPress?: (category: Category) => void;
};

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(category)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text numberOfLines={1} style={styles.name}>
        {category.name}
      </Text>
      <View style={styles.iconWrap}>
        <RightArrowIcon
          color={COLORS.accentGoldStart}
          height={22}
          width={22}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSoft,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 36,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardPressed: {
    opacity: 0.76,
  },
  name: {
    ...TYPOGRAPHY.restaurantName,
    flex: 1,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 16,
    letterSpacing: 2.3,
    lineHeight: 20,
    marginRight: SPACING.md,
  },
  iconWrap: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width: 26,
  },
});
