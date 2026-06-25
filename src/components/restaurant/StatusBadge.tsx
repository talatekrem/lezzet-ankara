import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, RADIUS, TYPOGRAPHY } from '../../theme';
import type { Restaurant } from '../../types';

const STATUS_LABELS: Record<Restaurant['status'], string> = {
  open: 'Açık',
  closed: 'Kapalı',
  unknown: 'Bilinmiyor',
};

type StatusBadgeProps = {
  status: Restaurant['status'];
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, styles[status]]}>
      <Text
        allowFontScaling={false}
        style={[styles.badgeText, styles[`${status}Text`]]}
      >
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
