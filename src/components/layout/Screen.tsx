import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Edge } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';

const BACKGROUND_GRADIENT = [
  COLORS.background,
  COLORS.backgroundSoft,
  COLORS.background,
] as const;

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, 'contentContainerStyle' | 'style'>;
};

export function Screen({
  children,
  scroll = false,
  padded = true,
  edges = ['top', 'right', 'bottom', 'left'],
  style,
  contentContainerStyle,
  scrollViewProps,
}: ScreenProps) {
  const contentStyle = [
    styles.content,
    padded && styles.padded,
    contentContainerStyle,
  ];

  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <LinearGradient colors={BACKGROUND_GRADIENT} style={styles.gradient}>
        {scroll ? (
          <ScrollView
            contentContainerStyle={contentStyle}
            style={styles.scroll}
            {...scrollViewProps}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={contentStyle}>{children}</View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  padded: {
    paddingHorizontal: SPACING.xl,
  },
});
