import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoriesScreen } from '../screens/CategoriesScreen';
import { RestaurantsScreen } from '../screens/RestaurantsScreen';
import { COLORS } from '../theme';
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
      <Stack.Navigator
        initialRouteName="Categories"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={CategoriesScreen} name="Categories" />
        <Stack.Screen component={RestaurantsScreen} name="Restaurants" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
