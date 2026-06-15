import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../theme';

const CONFIRM_GRADIENT = [COLORS.accentGoldStart, COLORS.accentGoldEnd] as const;

type AppAlertProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onDismiss?: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
};

export function AppAlert({
  visible,
  title,
  message,
  confirmLabel = 'Tamam',
  onConfirm,
  onDismiss,
  cancelLabel,
  onCancel,
}: AppAlertProps) {
  const hasSecondaryAction = cancelLabel != null && onCancel != null;

  function handleDismiss() {
    if (hasSecondaryAction) {
      onCancel();
      return;
    }

    (onDismiss ?? onConfirm)();
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleDismiss}
      transparent
      visible={visible}
    >
      <View style={styles.backdrop}>
        <View accessibilityRole="alert" style={styles.card}>
          <Text allowFontScaling={false} style={styles.title}>
            {title}
          </Text>
          <Text allowFontScaling={false} style={styles.message}>
            {message}
          </Text>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.confirmPressable,
                pressed && styles.confirmPressed,
              ]}
            >
              <LinearGradient colors={CONFIRM_GRADIENT} style={styles.confirmButton}>
                <Text allowFontScaling={false} style={styles.confirmLabel}>
                  {confirmLabel}
                </Text>
              </LinearGradient>
            </Pressable>

            {hasSecondaryAction ? (
              <Pressable
                accessibilityRole="button"
                onPress={onCancel}
                style={({ pressed }) => [
                  styles.cancelPressable,
                  pressed && styles.cancelPressed,
                ]}
              >
                <Text allowFontScaling={false} style={styles.cancelLabel}>
                  {cancelLabel}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(11, 13, 21, 0.82)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    maxWidth: 340,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    shadowColor: COLORS.accentGoldStart,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    width: '100%',
  },
  title: {
    ...TYPOGRAPHY.restaurantName,
    color: COLORS.screenTitle,
    fontSize: 17,
    letterSpacing: 2,
    lineHeight: 22,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  message: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  actions: {
    gap: SPACING.sm,
  },
  confirmPressable: {
    alignSelf: 'stretch',
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  confirmButton: {
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 8,
  },
  confirmLabel: {
    ...TYPOGRAPHY.buttonLabel,
    fontSize: 16,
    letterSpacing: 3,
    lineHeight: 20,
  },
  confirmPressed: {
    opacity: 0.82,
  },
  cancelPressable: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.badgeSubtle,
    borderColor: COLORS.badgeMutedBorder,
    borderRadius: RADIUS.pill,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  cancelLabel: {
    ...TYPOGRAPHY.meta,
    color: COLORS.categoryText,
    fontFamily: TYPOGRAPHY.categoryLabel.fontFamily,
    fontSize: 15,
    letterSpacing: 1.6,
    lineHeight: 20,
  },
  cancelPressed: {
    backgroundColor: 'rgba(182, 176, 162, 0.14)',
    opacity: 0.88,
  },
});
