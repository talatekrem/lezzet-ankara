import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Edge } from 'react-native-safe-area-context';

import { COLORS, SPACING } from '../../theme';

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
  },
  padded: {
    alignSelf: 'center',
    maxWidth: 430,
    paddingHorizontal: SPACING.xl,
    width: '100%',
  },
});
