/**
 * Dev-only: verifies every category restaurant list matches compareRestaurantsForDisplay order.
 *
 * Usage (from repo root):
 *   npx tsx scripts/verify-weighted-restaurant-ranking.ts
 * Full per-category dumps:
 *   npx tsx scripts/verify-weighted-restaurant-ranking.ts --verbose
 */

import type { Category } from '../src/types/category';
import { getRestaurantsByCategoryId } from '../src/data/index';
import { CATEGORIES } from '../src/data/categories';
import {
  compareRestaurantsForDisplay,
  restaurantDisplayScore,
} from '../src/utils/restaurantRanking';

function collectCategoriesWithRestaurantLists(
  nodes: Category[],
  out: Category[] = [],
): Category[] {
  for (const c of nodes) {
    if (c.restaurantIds.length > 0) {
      out.push(c);
    }
    if (c.subcategories?.length) {
      collectCategoriesWithRestaurantLists(c.subcategories, out);
    }
  }

  return out;
}

function verifyCategory(category: Category): {
  categoryId: string;
  violations: number;
  printed: string[];
} {
  const list = getRestaurantsByCategoryId(category.id);
  const violationMessages: string[] = [];
  const printed: string[] = [];

  printed.push(
    `\n=== ${category.id} (${category.name}) — ${list.length} restoran ===`,
  );

  for (let i = 0; i < list.length; i++) {
    const r = list[i]!;
    const score = restaurantDisplayScore(r);
    printed.push(
      `  ${String(i + 1).padStart(3)}. ${r.name} | ★ ${r.rating} | ${r.reviewCount} yorum | skor=${score.toFixed(5)}`,
    );
  }

  for (let i = 0; i < list.length - 1; i++) {
    const a = list[i]!;
    const b = list[i + 1]!;
    const cmp = compareRestaurantsForDisplay(a, b);
    if (cmp > 0) {
      violationMessages.push(
        `#${category.id}: sıra ${i + 1} » ${i + 2}: "${a.name}" liste önde ama comparator(a,b)=${cmp} > 0`,
      );
    }
  }

  return {
    categoryId: category.id,
    violations: violationMessages.length,
    printed,
  };
}

const categoriesWithRestaurants =
  collectCategoriesWithRestaurantLists(CATEGORIES);

console.log(
  `[verify-weighted-restaurant-ranking] ${categoriesWithRestaurants.length} kategori (restaurantIds dolu).\n`,
);

let totalViolations = 0;
const allPrinted: string[] = [];

for (const cat of categoriesWithRestaurants.sort((x, y) =>
  x.id.localeCompare(y.id, 'tr'),
)) {
  const result = verifyCategory(cat);
  allPrinted.push(...result.printed);
  totalViolations += result.violations;
}

if (process.argv.includes('--verbose')) {
  console.log(allPrinted.join('\n'));
}

if (totalViolations > 0) {
  console.error(`\nHATA: ${totalViolations} sıralama ihlali.`);
  process.exit(1);
}

console.log(
  `\nTamamlandı: tüm kategoriler ağırlıklı sıra + tie-break ile tutarlı (ihlal: 0).`,
);

/** Aspava / Kebap grubundaki "Kebap" alt başlığı */
const kebapSorted = getRestaurantsByCategoryId('kebap');
console.log('\n--- id=kebap: ağırlıklı puana göre ilk 5 ---');
for (let i = 0; i < Math.min(5, kebapSorted.length); i++) {
  const r = kebapSorted[i]!;
  console.log(
    `${i + 1}. ${r.name} | ${r.rating} | ${r.reviewCount} | skor=${restaurantDisplayScore(r).toFixed(5)}`,
  );
}
