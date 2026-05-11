import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Screen } from './src/components/layout/Screen';
import { FONT_FAMILY, TYPOGRAPHY } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash may already be controlled by the native runtime during fast refresh.
});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    [FONT_FAMILY.interRegular]: require('./assets/fonts/inter/Inter_18pt-Regular.ttf'),
    [FONT_FAMILY.interMedium]: require('./assets/fonts/inter/Inter_18pt-Medium.ttf'),
    [FONT_FAMILY.interSemiBold]: require('./assets/fonts/inter/Inter_18pt-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Screen contentContainerStyle={styles.content}>
      <Text style={[TYPOGRAPHY.appTitle, styles.title]}>LEZZET ANKARA</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
