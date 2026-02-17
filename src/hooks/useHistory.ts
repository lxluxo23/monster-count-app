import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqliteHistoryRepository } from '../db';
import type { HistoryEntry } from '../types';

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function useHistory(): {
  history: HistoryEntry[];
  loading: boolean;
  add: (monsterId: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  total: number;
  today: number;
  countByMonsterId: Record<string, number>;
  favoriteMonsterId: string | null;
} {
  const db = useSQLiteContext();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const repo = useMemo(() => createSqliteHistoryRepository(db), [db]);

  useEffect(() => {
    let cancelled = false;
    repo.getAll().then((list) => {
      if (!cancelled) {
        setHistory(list);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const add = useCallback(
    async (monsterId: string) => {
      const entry = await repo.add(monsterId);
      setHistory((prev: HistoryEntry[]) => [entry, ...prev]);
    },
    [repo]
  );

  const remove = useCallback(
    async (id: string) => {
      await repo.remove(id);
      setHistory((prev: HistoryEntry[]) => prev.filter((e) => e.id !== id));
    },
    [repo]
  );

  const now = new Date();
  const total = history.length;
  const today = history.filter((e: HistoryEntry) => isSameDay(new Date(e.date), now)).length;

  const countByMonsterId: Record<string, number> = {};
  for (const e of history) {
    countByMonsterId[e.monsterId] = (countByMonsterId[e.monsterId] ?? 0) + 1;
  }
  const favoriteMonsterId =
    Object.keys(countByMonsterId).length > 0
      ? Object.entries(countByMonsterId).sort((a, b) => b[1] - a[1])[0][0]
      : null;

  return { history, loading, add, remove, total, today, countByMonsterId, favoriteMonsterId };
}
