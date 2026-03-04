import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelDailyReminder,
  scheduleWeeklySummary,
  cancelWeeklySummary,
} from '../services/notificationService';

const KEY_ENABLED = 'notificationsEnabled';
const KEY_HOUR = 'notificationHour';
const KEY_WEEKLY = 'weeklySummaryEnabled';
const DEFAULT_HOUR = 12;

export function useNotifications(): {
  enabled: boolean;
  hour: number;
  setEnabled: (value: boolean) => Promise<void>;
  setHour: (hour: number) => Promise<void>;
  weeklyEnabled: boolean;
  setWeeklyEnabled: (value: boolean) => Promise<void>;
  loading: boolean;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);

  const [enabled, setEnabledState] = useState(false);
  const [hour, setHourState] = useState(DEFAULT_HOUR);
  const [weeklyEnabled, setWeeklyEnabledState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([repo.get(KEY_ENABLED), repo.get(KEY_HOUR), repo.get(KEY_WEEKLY)]).then(
      ([enabledVal, hourVal, weeklyVal]) => {
        if (cancelled) return;
        if (enabledVal !== null) setEnabledState(enabledVal === 'true');
        if (hourVal !== null) setHourState(Number(hourVal));
        if (weeklyVal !== null) setWeeklyEnabledState(weeklyVal === 'true');
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

  const setWeeklyEnabled = useCallback(
    async (value: boolean) => {
      if (value) {
        const granted = await requestNotificationPermission();
        if (!granted) return;
        await scheduleWeeklySummary();
      } else {
        await cancelWeeklySummary();
      }
      setWeeklyEnabledState(value);
      await repo.set(KEY_WEEKLY, String(value));
    },
    [repo]
  );

  return { enabled, hour, setEnabled, setHour, weeklyEnabled, setWeeklyEnabled, loading };
}
