import { MONSTER_TYPES } from '../constants/monsters';
import type { HistoryEntry } from '../types';

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
