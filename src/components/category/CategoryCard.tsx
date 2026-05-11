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
          height={16}
          width={16}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 76,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  cardPressed: {
    opacity: 0.78,
  },
  name: {
    ...TYPOGRAPHY.restaurantName,
    flex: 1,
    letterSpacing: 0.15,
    marginRight: SPACING.md,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSoft,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
});
