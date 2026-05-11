import { StyleSheet, Text, View } from 'react-native';

import { CategoryCard } from '../components/category/CategoryCard';
import { Screen } from '../components/layout/Screen';
import { getAllCategories } from '../data';
import { SPACING, TYPOGRAPHY } from '../theme';

const categories = getAllCategories();

export function CategoriesScreen() {
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
          <CategoryCard category={category} key={category.id} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.appTitle,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.meta,
  },
  list: {
    gap: SPACING.md,
  },
});
