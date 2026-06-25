import { Share } from 'react-native';

import type { Restaurant } from '../types';

type ShareRestaurantOptions = {
  restaurant: Restaurant;
  categoryLabel?: string;
};

export async function shareRestaurant({
  restaurant,
  categoryLabel,
}: ShareRestaurantOptions) {
  const lines = [restaurant.name];

  if (categoryLabel) {
    lines.push(categoryLabel);
  }

  if (restaurant.note) {
    lines.push(restaurant.note);
  }

  if (restaurant.district) {
    lines.push(restaurant.district);
  }

  lines.push(restaurant.mapQuery);

  await Share.share({
    message: lines.join('\n'),
  });
}
