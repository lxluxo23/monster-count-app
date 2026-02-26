import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';

const KEY_DAILY_GOAL = 'dailyGoal';
const DEFAULT_GOAL = 0; // 0 = desactivado

export function useDailyGoal(): {
  goal: number;
  setGoal: (value: number) => Promise<void>;
  loading: boolean;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);

  const [goal, setGoalState] = useState(DEFAULT_GOAL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    repo.get(KEY_DAILY_GOAL).then((val) => {
      if (cancelled) return;
      if (val !== null) setGoalState(Math.max(0, Number(val)));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const setGoal = useCallback(
    async (value: number) => {
      const clamped = Math.max(0, Math.min(10, Math.round(value)));
      setGoalState(clamped);
      await repo.set(KEY_DAILY_GOAL, String(clamped));
    },
    [repo]
  );

  return { goal, setGoal, loading };
}
