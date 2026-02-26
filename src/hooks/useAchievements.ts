import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MONSTER_TYPES } from '../constants/monsters';
import { getUnlockedAchievementIds } from '../utils/achievementUtils';
import type { HistoryEntry } from '../types';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  progress: number;       // 0–1
  progressLabel: string;  // e.g. "7 / 10"
}

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

  return useMemo(() => {
    const unlockedSet = new Set(getUnlockedAchievementIds(history, total, streak, countByMonsterId));
    const triedCount = MONSTER_TYPES.filter((m) => (countByMonsterId[m.id] ?? 0) > 0).length;
    const totalFlavors = MONSTER_TYPES.length;

    return [
      {
        id: 'primera-lata',
        title: t('achievements.firstCan.title'),
        description: t('achievements.firstCan.desc'),
        emoji: '🥤',
        unlocked: unlockedSet.has('primera-lata'),
        progress: Math.min(total / 1, 1),
        progressLabel: `${Math.min(total, 1)} / 1`,
      },
      {
        id: 'diez-latas',
        title: t('achievements.tenCans.title'),
        description: t('achievements.tenCans.desc'),
        emoji: '🎯',
        unlocked: unlockedSet.has('diez-latas'),
        progress: Math.min(total / 10, 1),
        progressLabel: `${Math.min(total, 10)} / 10`,
      },
      {
        id: 'cincuenta-latas',
        title: t('achievements.fiftyCans.title'),
        description: t('achievements.fiftyCans.desc'),
        emoji: '💪',
        unlocked: unlockedSet.has('cincuenta-latas'),
        progress: Math.min(total / 50, 1),
        progressLabel: `${Math.min(total, 50)} / 50`,
      },
      {
        id: 'cien-latas',
        title: t('achievements.hundredCans.title'),
        description: t('achievements.hundredCans.desc'),
        emoji: '🏆',
        unlocked: unlockedSet.has('cien-latas'),
        progress: Math.min(total / 100, 1),
        progressLabel: `${Math.min(total, 100)} / 100`,
      },
      {
        id: 'racha-7',
        title: t('achievements.streak7.title'),
        description: t('achievements.streak7.desc'),
        emoji: '🔥',
        unlocked: unlockedSet.has('racha-7'),
        progress: Math.min(streak / 7, 1),
        progressLabel: `${Math.min(streak, 7)} / 7`,
      },
      {
        id: 'racha-30',
        title: t('achievements.streak30.title'),
        description: t('achievements.streak30.desc'),
        emoji: '⚡',
        unlocked: unlockedSet.has('racha-30'),
        progress: Math.min(streak / 30, 1),
        progressLabel: `${Math.min(streak, 30)} / 30`,
      },
      {
        id: 'coleccionista',
        title: t('achievements.collector.title'),
        description: t('achievements.collector.desc', { count: totalFlavors }),
        emoji: '🌈',
        unlocked: unlockedSet.has('coleccionista'),
        progress: triedCount / totalFlavors,
        progressLabel: `${triedCount} / ${totalFlavors}`,
      },
      {
        id: 'madrugador',
        title: t('achievements.earlyBird.title'),
        description: t('achievements.earlyBird.desc'),
        emoji: '🌅',
        unlocked: unlockedSet.has('madrugador'),
        progress: unlockedSet.has('madrugador') ? 1 : 0,
        progressLabel: unlockedSet.has('madrugador') ? '1 / 1' : '0 / 1',
      },
      {
        id: 'noctambulo',
        title: t('achievements.withYourNoctulo.title'),
        description: t('achievements.withYourNoctulo.desc'),
        emoji: '🦇',
        unlocked: unlockedSet.has('noctambulo'),
        progress: unlockedSet.has('noctambulo') ? 1 : 0,
        progressLabel: unlockedSet.has('noctambulo') ? '1 / 1' : '0 / 1',
      },
    ];
  }, [history, total, streak, countByMonsterId, t]);
}
