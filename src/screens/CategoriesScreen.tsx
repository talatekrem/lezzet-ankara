import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { CategoryCard } from '../components/category/CategoryCard';
import { Screen } from '../components/layout/Screen';
import { getAllCategories } from '../data';
import type { RootStackParamList } from '../navigation/types';
import { SPACING, TYPOGRAPHY } from '../theme';

const categories = getAllCategories();

type CategoriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Categories'
>;

export function CategoriesScreen({ navigation }: CategoriesScreenProps) {
  return (
    <Screen
      scroll
      contentContainerStyle={styles.content}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>LEZZET ANKARA</Text>
        <Text style={styles.subtitle}>Ankara&apos;da ne yemek istiyorsun?</Text>
      </View>

      <View style={styles.list}>
        {categories.map((category) => (
          <CategoryCard
            category={category}
            key={category.id}
            onPress={() =>
              navigation.navigate('Restaurants', { categoryId: category.id })
            }
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.appTitle,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.meta,
  },
  list: {
    gap: SPACING.sm,
  },
});
