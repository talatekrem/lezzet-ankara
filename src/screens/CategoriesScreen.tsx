import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import TitleUnderline from '../../assets/decor/title-underline.svg';
import { CategoryCard } from '../components/category/CategoryCard';
import { Screen } from '../components/layout/Screen';
import { getAllCategories } from '../data';
import type { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

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
        <TitleUnderline height={18} style={styles.underline} width={244} />
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
    paddingTop: SPACING.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.appTitle,
    color: COLORS.brandTitle,
    fontFamily: TYPOGRAPHY.screenTitle.fontFamily,
    fontSize: 30,
    letterSpacing: 7,
    lineHeight: 36,
    textAlign: 'center',
  },
  underline: {
    marginTop: SPACING.sm,
  },
  list: {
    gap: SPACING.md,
  },
});
