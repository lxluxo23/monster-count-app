import { useMemo } from 'react';
import { MONSTER_TYPES } from '../constants/monsters';
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
  return useMemo(() => {
    const hasMadrugador = history.some((e) => new Date(e.date).getHours() < 8);
    const hasNoctambulo = history.some((e) => new Date(e.date).getHours() >= 23);
    const triedCount = MONSTER_TYPES.filter((m) => (countByMonsterId[m.id] ?? 0) > 0).length;
    const totalFlavors = MONSTER_TYPES.length;

    return [
      {
        id: 'primera-lata',
        title: 'Primera lata',
        description: 'Registra tu primera lata de Monster',
        emoji: '🥤',
        unlocked: total >= 1,
        progress: Math.min(total / 1, 1),
        progressLabel: `${Math.min(total, 1)} / 1`,
      },
      {
        id: 'diez-latas',
        title: '10 latas',
        description: 'Acumula 10 latas registradas',
        emoji: '🎯',
        unlocked: total >= 10,
        progress: Math.min(total / 10, 1),
        progressLabel: `${Math.min(total, 10)} / 10`,
      },
      {
        id: 'cincuenta-latas',
        title: '50 latas',
        description: 'Acumula 50 latas registradas',
        emoji: '💪',
        unlocked: total >= 50,
        progress: Math.min(total / 50, 1),
        progressLabel: `${Math.min(total, 50)} / 50`,
      },
      {
        id: 'cien-latas',
        title: '100 latas',
        description: 'Acumula 100 latas registradas',
        emoji: '🏆',
        unlocked: total >= 100,
        progress: Math.min(total / 100, 1),
        progressLabel: `${Math.min(total, 100)} / 100`,
      },
      {
        id: 'racha-7',
        title: 'Racha de 7 días',
        description: '7 días seguidos con al menos un Monster',
        emoji: '🔥',
        unlocked: streak >= 7,
        progress: Math.min(streak / 7, 1),
        progressLabel: `${Math.min(streak, 7)} / 7`,
      },
      {
        id: 'racha-30',
        title: 'Racha de 30 días',
        description: '30 días seguidos con al menos un Monster',
        emoji: '⚡',
        unlocked: streak >= 30,
        progress: Math.min(streak / 30, 1),
        progressLabel: `${Math.min(streak, 30)} / 30`,
      },
      {
        id: 'coleccionista',
        title: 'Coleccionista',
        description: `Prueba los ${totalFlavors} sabores de Monster`,
        emoji: '🌈',
        unlocked: triedCount >= totalFlavors,
        progress: triedCount / totalFlavors,
        progressLabel: `${triedCount} / ${totalFlavors}`,
      },
      {
        id: 'madrugador',
        title: 'Madrugador',
        description: 'Registra un Monster antes de las 8:00',
        emoji: '🌅',
        unlocked: hasMadrugador,
        progress: hasMadrugador ? 1 : 0,
        progressLabel: hasMadrugador ? '1 / 1' : '0 / 1',
      },
      {
        id: 'noctambulo',
        title: 'Noctámbulo',
        description: 'Registra un Monster después de las 23:00',
        emoji: '🌙',
        unlocked: hasNoctambulo,
        progress: hasNoctambulo ? 1 : 0,
        progressLabel: hasNoctambulo ? '1 / 1' : '0 / 1',
      },
    ];
  }, [history, total, streak, countByMonsterId]);
}
