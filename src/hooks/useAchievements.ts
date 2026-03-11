import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { buildAchievementList, type Achievement } from '../utils/achievementUtils';
import type { HistoryEntry } from '../types';

export type { Achievement };

interface AchievementsInput {
  history: HistoryEntry[];
  total: number;
  streak: number;
  countByMonsterId: Record<string, number>;
}

export function useAchievements({
  history,
  total,
  streak,
  countByMonsterId,
}: AchievementsInput): Achievement[] {
  const { t } = useTranslation();

  return useMemo(
    () => buildAchievementList(t, history, total, streak, countByMonsterId),
    [history, total, streak, countByMonsterId, t]
  );
}
