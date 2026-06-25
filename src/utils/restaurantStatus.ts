import type { Restaurant } from '../types';

export function getStatusFromHours(
  hours: string,
): Restaurant['status'] | undefined {
  const match = hours.match(/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/);

  if (!match) {
    return undefined;
  }

  const [, openHour, openMinute, closeHour, closeMinute] = match;
  const openMinutes = Number(openHour) * 60 + Number(openMinute);
  const closeMinutes = Number(closeHour) * 60 + Number(closeMinute);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isOpen =
    closeMinutes > openMinutes
      ? currentMinutes >= openMinutes && currentMinutes < closeMinutes
      : currentMinutes >= openMinutes || currentMinutes < closeMinutes;

  return isOpen ? 'open' : 'closed';
}

export function getDisplayStatus(restaurant: Restaurant): Restaurant['status'] {
  if (!restaurant.hours) {
    return restaurant.status;
  }

  const hoursStatus = getStatusFromHours(restaurant.hours);
  return hoursStatus ?? restaurant.status;
}

export function isRestaurantOpenNow(restaurant: Restaurant): boolean {
  return getDisplayStatus(restaurant) === 'open';
}
