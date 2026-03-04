import { useMemo } from 'react';
import { MONSTER_TYPES } from '../constants/monsters';
import { localDayKey } from '../utils/dateUtils';
import type { HistoryEntry } from '../types';

const CAFFEINE_LIMIT = 400; // mg

interface CaffeineWarning {
  caffeineToday: number;
  isOverLimit: boolean;
}

export function useCaffeineWarning(history: HistoryEntry[]): CaffeineWarning {
  return useMemo(() => {
    const todayKey = localDayKey(new Date());
    const caffeineByMonster = new Map(
      MONSTER_TYPES.map((m) => [m.id, m.nutrition?.caffeine ?? 0]),
    );

    let caffeineToday = 0;
    for (const entry of history) {
      if (localDayKey(new Date(entry.date)) === todayKey) {
        caffeineToday += caffeineByMonster.get(entry.monsterId) ?? 0;
      }
    }

    return { caffeineToday, isOverLimit: caffeineToday > CAFFEINE_LIMIT };
  }, [history]);
}
