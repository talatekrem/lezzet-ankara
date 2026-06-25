import { useState } from 'react';

import { openRestaurantLocation } from '../utils/maps';

export function useMapReminder() {
  const [visible, setVisible] = useState(false);
  const [pendingMapQuery, setPendingMapQuery] = useState<string | null>(null);

  function requestMapOpen(mapQuery: string) {
    setPendingMapQuery(mapQuery);
    setVisible(true);
  }

  function dismissReminder() {
    setVisible(false);
    setPendingMapQuery(null);
  }

  function confirmReminder() {
    const mapQuery = pendingMapQuery;

    setVisible(false);
    setPendingMapQuery(null);

    if (mapQuery) {
      void openRestaurantLocation(mapQuery);
    }
  }

  return {
    mapReminderVisible: visible,
    requestMapOpen,
    dismissMapReminder: dismissReminder,
    confirmMapReminder: confirmReminder,
  };
}
