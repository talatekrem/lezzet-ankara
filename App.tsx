import { requireOptionalNativeModule } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { FavoritesProvider } from './src/context/FavoritesContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS, FONT_FAMILY } from './src/theme';

/** Keep native splash visible at least this long on cold start. */
const MIN_SPLASH_DURATION_MS = 2000;

void SplashScreen.preventAutoHideAsync();

export default function App() {
  const splashHiddenRef = useRef(false);
  const splashStartedAtRef = useRef(Date.now());
  const [fontsLoaded, fontError] = useFonts({
    [FONT_FAMILY.interRegular]: require('./assets/fonts/inter/Inter_18pt-Regular.ttf'),
    [FONT_FAMILY.interMedium]: require('./assets/fonts/inter/Inter_18pt-Medium.ttf'),
    [FONT_FAMILY.interSemiBold]: require('./assets/fonts/inter/Inter_18pt-SemiBold.ttf'),
  });

  useEffect(() => {
    void SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    const DevMenuPreferences = requireOptionalNativeModule<{
      setPreferencesAsync?: (prefs: { showFloatingActionButton: boolean }) => Promise<void>;
    }>('DevMenuPreferences');
    void DevMenuPreferences?.setPreferencesAsync?.({
      showFloatingActionButton: false,
    });
  }, []);

  const hideSplashOnce = useCallback(async () => {
    if (splashHiddenRef.current) {
      return;
    }
    splashHiddenRef.current = true;

    const elapsed = Date.now() - splashStartedAtRef.current;
    const remaining = MIN_SPLASH_DURATION_MS - elapsed;
    if (remaining > 0) {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, remaining);
      });
    }

    await SplashScreen.hideAsync();
  }, []);

  const onAppLayout = useCallback(() => {
    if (fontsLoaded) {
      void hideSplashOnce();
    }
  }, [fontsLoaded, hideSplashOnce]);

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    // Keep a mounted root view so Fast Refresh does not full-reload in a loop.
    return <View style={styles.fontLoading} />;
  }

  return (
    <View style={styles.root} onLayout={onAppLayout}>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  fontLoading: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
