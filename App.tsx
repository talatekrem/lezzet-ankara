import { requireOptionalNativeModule } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AppNavigator } from './src/navigation/AppNavigator';
import { FONT_FAMILY } from './src/theme';
import { validateAppData } from './src/utils/dataValidation';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash may already be controlled by the native runtime during fast refresh.
});

if (__DEV__) {
  validateAppData();
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    [FONT_FAMILY.interRegular]: require('./assets/fonts/inter/Inter_18pt-Regular.ttf'),
    [FONT_FAMILY.interMedium]: require('./assets/fonts/inter/Inter_18pt-Medium.ttf'),
    [FONT_FAMILY.interSemiBold]: require('./assets/fonts/inter/Inter_18pt-SemiBold.ttf'),
  });

  useEffect(() => {
    const DevMenuPreferences = requireOptionalNativeModule<{
      setPreferencesAsync?: (prefs: { showFloatingActionButton: boolean }) => Promise<void>;
    }>('DevMenuPreferences');
    void DevMenuPreferences?.setPreferencesAsync?.({
      showFloatingActionButton: false,
    });
  }, []);

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

  return <AppNavigator />;
}
