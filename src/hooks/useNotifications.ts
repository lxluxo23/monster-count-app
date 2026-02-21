import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelDailyReminder,
} from '../services/notificationService';

const KEY_ENABLED = 'notificationsEnabled';
const KEY_HOUR = 'notificationHour';
const DEFAULT_HOUR = 12;

export function useNotifications(): {
  enabled: boolean;
  hour: number;
  setEnabled: (value: boolean) => Promise<void>;
  setHour: (hour: number) => Promise<void>;
  loading: boolean;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);

  const [enabled, setEnabledState] = useState(false);
  const [hour, setHourState] = useState(DEFAULT_HOUR);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([repo.get(KEY_ENABLED), repo.get(KEY_HOUR)]).then(
      ([enabledVal, hourVal]) => {
        if (cancelled) return;
        if (enabledVal !== null) setEnabledState(enabledVal === 'true');
        if (hourVal !== null) setHourState(Number(hourVal));
        setLoading(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const setEnabled = useCallback(
    async (value: boolean) => {
      if (value) {
        const granted = await requestNotificationPermission();
        if (!granted) return;
        await scheduleDailyReminder(hour);
      } else {
        await cancelDailyReminder();
      }
      setEnabledState(value);
      await repo.set(KEY_ENABLED, String(value));
    },
    [repo, hour]
  );

  const setHour = useCallback(
    async (newHour: number) => {
      setHourState(newHour);
      await repo.set(KEY_HOUR, String(newHour));
      if (enabled) {
        await scheduleDailyReminder(newHour);
      }
    },
    [repo, enabled]
  );

  return { enabled, hour, setEnabled, setHour, loading };
}
