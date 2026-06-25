import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RestaurantDetailScreen } from '../screens/RestaurantDetailScreen';
import { COLORS } from '../theme';
import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: COLORS.background,
    border: COLORS.borderSoft,
    card: COLORS.background,
    primary: COLORS.accentGoldStart,
    text: COLORS.textPrimary,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={MainTabNavigator} name="MainTabs" />
        <Stack.Screen
          component={RestaurantDetailScreen}
          name="RestaurantDetail"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
