import { MONSTER_TYPES } from '../constants/monsters';
import type { HistoryEntry } from '../types';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  progress: number; // 0–1
  progressLabel: string; // e.g. "7 / 10"
}

/**
 * Calcula qué logros están desbloqueados según el historial local.
 * Usado tanto para la UI (useAchievements) como para sincronizar con Supabase.
 * Guests: solo cálculo local. Autenticados: cálculo + sync a user_achievements.
 */
export function getUnlockedAchievementIds(
  history: HistoryEntry[],
  total: number,
  streak: number,
  countByMonsterId: Record<string, number>
): string[] {
  const hasMadrugador = history.some((e) => new Date(e.date).getHours() < 8);
  const hasNoctambulo = history.some((e) => new Date(e.date).getHours() >= 23);
  const triedCount = MONSTER_TYPES.filter((m) => (countByMonsterId[m.id] ?? 0) > 0).length;
  const totalFlavors = MONSTER_TYPES.length;

  const unlocked: string[] = [];

  if (total >= 1) unlocked.push('primera-lata');
  if (total >= 10) unlocked.push('diez-latas');
  if (total >= 50) unlocked.push('cincuenta-latas');
  if (total >= 100) unlocked.push('cien-latas');
  if (streak >= 7) unlocked.push('racha-7');
  if (streak >= 30) unlocked.push('racha-30');
  if (triedCount >= totalFlavors) unlocked.push('coleccionista');
  if (hasMadrugador) unlocked.push('madrugador');
  if (hasNoctambulo) unlocked.push('noctambulo');

  return unlocked;
}

/**
 * Construye la lista completa de logros con títulos i18n, progreso, etc.
 * Reutilizable en useAchievements y usePublicProfile.
 */
export function buildAchievementList(
  t: (key: string, opts?: Record<string, unknown>) => string,
  history: { date: string }[],
  total: number,
  streak: number,
  countByMonsterId: Record<string, number>
): Achievement[] {
  const unlockedSet = new Set(
    getUnlockedAchievementIds(history as HistoryEntry[], total, streak, countByMonsterId)
  );
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
}
