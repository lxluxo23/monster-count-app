import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';

const KEY_ENABLED = 'rateLimitEnabled';
const KEY_MAX = 'rateLimitMax';
const KEY_WINDOW = 'rateLimitWindowMinutes';
const DEFAULT_ENABLED = false;
const DEFAULT_MAX = 2;
const DEFAULT_WINDOW = 10;

export function useRateLimit(): {
  enabled: boolean;
  maxPerWindow: number;
  windowMinutes: number;
  setEnabled: (value: boolean) => Promise<void>;
  setMaxPerWindow: (value: number) => Promise<void>;
  setWindowMinutes: (value: number) => Promise<void>;
  loading: boolean;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);

  const [enabled, setEnabledState] = useState(DEFAULT_ENABLED);
  const [maxPerWindow, setMaxState] = useState(DEFAULT_MAX);
  const [windowMinutes, setWindowState] = useState(DEFAULT_WINDOW);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      repo.get(KEY_ENABLED),
      repo.get(KEY_MAX),
      repo.get(KEY_WINDOW),
    ]).then(([e, m, w]) => {
      if (cancelled) return;
      if (e !== null) setEnabledState(e === 'true');
      if (m !== null) setMaxState(Math.max(1, Math.min(10, Number(m))));
      if (w !== null) setWindowState(Math.max(1, Math.min(60, Number(w))));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [repo]);

  const setEnabled = useCallback(
    async (value: boolean) => {
      setEnabledState(value);
      await repo.set(KEY_ENABLED, String(value));
    },
    [repo]
  );

  const setMaxPerWindow = useCallback(
    async (value: number) => {
      const clamped = Math.max(1, Math.min(10, Math.round(value)));
      setMaxState(clamped);
      await repo.set(KEY_MAX, String(clamped));
    },
    [repo]
  );

  const setWindowMinutes = useCallback(
    async (value: number) => {
      const clamped = Math.max(1, Math.min(60, Math.round(value)));
      setWindowState(clamped);
      await repo.set(KEY_WINDOW, String(clamped));
    },
    [repo]
  );

  return {
    enabled,
    maxPerWindow,
    windowMinutes,
    setEnabled,
    setMaxPerWindow,
    setWindowMinutes,
    loading,
  };
}

/** Comprueba si se puede añadir según el rate limit. Retorna { allowed, recentCount, waitUntil } */
export function checkRateLimit(
  history: { date: string }[],
  enabled: boolean,
  maxPerWindow: number,
  windowMinutes: number
): { allowed: boolean; recentCount: number; waitUntil: Date | null } {
  if (!enabled) return { allowed: true, recentCount: 0, waitUntil: null };

  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMinutes * 60 * 1000);
  const recent = history.filter((e) => new Date(e.date) >= cutoff);
  const recentCount = recent.length;

  if (recentCount >= maxPerWindow) {
    const oldestInWindow = recent[recent.length - 1];
    const oldestDate = new Date(oldestInWindow.date);
    const waitUntil = new Date(oldestDate.getTime() + windowMinutes * 60 * 1000);
    return { allowed: false, recentCount, waitUntil };
  }

  return { allowed: true, recentCount, waitUntil: null };
}
