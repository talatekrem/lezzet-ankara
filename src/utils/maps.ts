import { Linking, Platform } from 'react-native';

export async function openRestaurantLocation(mapQuery: string) {
  const encodedQuery = encodeURIComponent(mapQuery);
  const url = Platform.select({
    ios: `http://maps.apple.com/?q=${encodedQuery}`,
    android: `geo:0,0?q=${encodedQuery}`,
    default: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`,
  });

  await Linking.openURL(url);
}
