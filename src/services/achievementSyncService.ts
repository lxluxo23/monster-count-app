import { supabase } from '../lib/supabase';
import { getUnlockedAchievementIds } from '../utils/achievementUtils';
import type { HistoryEntry } from '../types';

/**
 * Sincroniza los logros desbloqueados a Supabase (user_achievements).
 * Solo para usuarios autenticados. Los guests usan solo SQLite y cálculo local.
 *
 * - Backfill: al hacer login, los logros ya obtenidos se calculan del historial y se insertan.
 * - En tiempo real: al añadir una lata y desbloquear uno nuevo, se sube al instante.
 */
export async function syncAchievementsToSupabase(
  userId: string,
  history: HistoryEntry[],
  total: number,
  streak: number,
  countByMonsterId: Record<string, number>
): Promise<{ synced: number }> {
  const unlockedIds = getUnlockedAchievementIds(history, total, streak, countByMonsterId);
  if (unlockedIds.length === 0) return { synced: 0 };

  const rows = unlockedIds.map((achievement_id) => ({
    user_id: userId,
    achievement_id: achievement_id,
  }));

  const { error } = await supabase.from('user_achievements').upsert(rows, {
    onConflict: 'user_id,achievement_id',
    ignoreDuplicates: true,
  });

  if (error) {
    if (__DEV__) console.warn('[AchievementSync] Error:', error.message);
    return { synced: 0 };
  }

  return { synced: rows.length };
}
