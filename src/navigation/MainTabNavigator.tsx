import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import {
  AboutTabIcon,
  HomeTabIcon,
  ListTabIcon,
  SearchTabIcon,
} from '../components/navigation/TabIcons';
import { AboutScreen } from '../screens/AboutScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { COLORS, FONT_FAMILY } from '../theme';
import { ExploreStack } from './ExploreStack';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accentGoldStart,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        component={ExploreStack}
        name="Explore"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <HomeTabIcon color={color} focused={focused} size={size} />
          ),
          tabBarLabel: 'Ana ekran',
        }}
      />
      <Tab.Screen
        component={SearchScreen}
        name="Search"
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, focused, size }) => (
            <SearchTabIcon color={color} focused={focused} size={size} />
          ),
          tabBarLabel: 'Ara',
        }}
      />
      <Tab.Screen
        component={FavoritesScreen}
        name="Favorites"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <ListTabIcon color={color} focused={focused} size={size} />
          ),
          tabBarLabel: 'Listem',
        }}
      />
      <Tab.Screen
        component={AboutScreen}
        name="About"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <AboutTabIcon color={color} focused={focused} size={size} />
          ),
          tabBarLabel: 'Hakkında',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.borderSoft,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
    paddingTop: 4,
  },
  tabBarIcon: {
    marginBottom: -2,
  },
  tabBarLabel: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
});
