import { useMemo } from 'react';
import { MONSTER_TYPES } from '../constants/monsters';
import type { HistoryEntry } from '../types';

interface WeeklySummary {
  thisWeekCans: number;
  lastWeekCans: number;
  caffeineThisWeek: number;
  /** Percentage change: positive = more this week */
  change: number;
  hasData: boolean;
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? 6 : day - 1; // Monday-based
  d.setDate(d.getDate() - diff);
  return d;
}

export function useWeeklySummary(history: HistoryEntry[]): WeeklySummary {
  return useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const lastWeekStart = new Date(weekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const caffeineMap = new Map(MONSTER_TYPES.map((m) => [m.id, m.nutrition?.caffeine ?? 0]));

    let thisWeekCans = 0;
    let lastWeekCans = 0;
    let caffeineThisWeek = 0;

    for (const entry of history) {
      const entryDate = new Date(entry.date);
      if (entryDate >= weekStart) {
        thisWeekCans++;
        caffeineThisWeek += caffeineMap.get(entry.monsterId) ?? 0;
      } else if (entryDate >= lastWeekStart && entryDate < weekStart) {
        lastWeekCans++;
      }
    }

    const change =
      lastWeekCans > 0
        ? Math.round(((thisWeekCans - lastWeekCans) / lastWeekCans) * 100)
        : thisWeekCans > 0
          ? 100
          : 0;

    return {
      thisWeekCans,
      lastWeekCans,
      caffeineThisWeek,
      change,
      hasData: thisWeekCans > 0,
    };
  }, [history]);
}
