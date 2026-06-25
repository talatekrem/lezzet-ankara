import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { SearchTabIcon } from '../components/navigation/TabIcons';
import { Screen } from '../components/layout/Screen';
import { searchRestaurants } from '../data';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Restaurant } from '../types';

type SearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function SearchScreen({ navigation }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const results = useMemo(() => searchRestaurants(query), [query]);

  function handleSearchPress() {
    inputRef.current?.blur();
    Keyboard.dismiss();
  }

  function handleClearPress() {
    setQuery('');
    inputRef.current?.focus();
  }

  function openRestaurant(restaurant: Restaurant) {
    navigation.navigate('RestaurantDetail', {
      restaurantId: restaurant.id,
    });
  }

  return (
    <Screen
      scroll
      contentContainerStyle={styles.content}
      edges={['top', 'left', 'right']}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
    >
      <View style={styles.searchBar}>
        <View style={styles.searchLeading}>
          <SearchTabIcon color={COLORS.textMuted} focused={false} size={18} />
        </View>

        <TextInput
          ref={inputRef}
          allowFontScaling={false}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Restoran, yemek veya semt"
          placeholderTextColor={COLORS.textMuted}
          returnKeyType="search"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearchPress}
        />

        {query.length > 0 ? (
          <Pressable
            accessibilityLabel="Aramayı temizle"
            accessibilityRole="button"
            hitSlop={8}
            onPress={handleClearPress}
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.pressed,
            ]}
          >
            <Text allowFontScaling={false} style={styles.clearButtonText}>
              ×
            </Text>
          </Pressable>
        ) : null}
      </View>

      {query.trim().length === 0 ? null : results.length === 0 ? (
        <View style={styles.emptyState}>
          <Text allowFontScaling={false} style={styles.emptyTitle}>
            Sonuç bulunamadı
          </Text>
          <Text allowFontScaling={false} style={styles.emptyBody}>
            Farklı bir anahtar kelime deneyin.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {results.map((restaurant) => (
            <Pressable
              accessibilityRole="button"
              key={restaurant.id}
              onPress={() => openRestaurant(restaurant)}
              style={({ pressed }) => [styles.resultCard, pressed && styles.pressed]}
            >
              <Text allowFontScaling={false} numberOfLines={1} style={styles.resultName}>
                {restaurant.name}
              </Text>
              <Text allowFontScaling={false} numberOfLines={1} style={styles.resultMeta}>
                {restaurant.district} / puan {restaurant.rating.toFixed(1)} / yorum{' '}
                {restaurant.reviewCount}
              </Text>
              {restaurant.note ? (
                <Text allowFontScaling={false} numberOfLines={1} style={styles.resultNote}>
                  {restaurant.note}
                </Text>
              ) : null}
            </Pressable>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    minHeight: 46,
    overflow: 'hidden',
  },
  searchLeading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: SPACING.md,
  },
  input: {
    color: COLORS.textPrimary,
    flex: 1,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 15,
    minWidth: 0,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 12,
  },
  clearButton: {
    alignItems: 'center',
    backgroundColor: COLORS.badgeSubtle,
    borderColor: COLORS.badgeMutedBorder,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    height: 24,
    justifyContent: 'center',
    marginRight: SPACING.md,
    width: 24,
  },
  clearButtonText: {
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.meta.fontFamily,
    fontSize: 17,
    lineHeight: 18,
    marginTop: -1,
  },
  emptyState: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.restaurantName,
    color: COLORS.screenTitle,
    fontSize: 18,
    textAlign: 'center',
  },
  emptyBody: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  list: {
    gap: SPACING.md,
  },
  resultCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderGoldSoft,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 12,
  },
  resultName: {
    ...TYPOGRAPHY.restaurantName,
    color: COLORS.categoryText,
    fontSize: 16,
    marginBottom: 4,
  },
  resultMeta: {
    ...TYPOGRAPHY.meta,
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 15,
  },
  resultNote: {
    ...TYPOGRAPHY.meta,
    color: COLORS.restaurantNote,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
  },
  pressed: {
    opacity: 0.78,
  },
});
