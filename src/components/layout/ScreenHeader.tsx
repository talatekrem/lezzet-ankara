import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

import { RightArrowIcon } from '../../icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  titleStyle?: StyleProp<TextStyle>;
};

export function ScreenHeader({ onBack, title, subtitle, titleStyle }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable
          accessibilityLabel="Geri"
          accessibilityRole="button"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <RightArrowIcon height={16} style={styles.backIcon} width={16} />
        </Pressable>
      ) : null}

      <View style={[styles.titleWrap, !onBack && styles.titleWrapCentered]}>
        <Text allowFontScaling={false} style={[styles.title, titleStyle]}>
          {title}
        </Text>
        {subtitle ? (
          <Text allowFontScaling={false} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.md,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    height: 38,
    justifyContent: 'center',
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    width: 38,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  titleWrap: {
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  titleWrapCentered: {
    marginTop: 0,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.screenTitle,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 24,
    letterSpacing: 4,
    lineHeight: 30,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.meta,
    letterSpacing: 0.25,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
});
