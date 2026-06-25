import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoriesScreen } from '../screens/CategoriesScreen';
import { RestaurantsScreen } from '../screens/RestaurantsScreen';
import type { ExploreStackParamList } from './types';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={CategoriesScreen} name="Categories" />
      <Stack.Screen component={RestaurantsScreen} name="Restaurants" />
    </Stack.Navigator>
  );
}
