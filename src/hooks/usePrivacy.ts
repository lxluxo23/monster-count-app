import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const KEY_SHOW_IN_RANKING = 'showInRanking';
const KEY_SHOW_ACHIEVEMENTS = 'showAchievements';
const KEY_SHOW_STATS = 'showStats';

export function usePrivacy(): {
  showInRanking: boolean;
  setShowInRanking: (value: boolean) => Promise<void>;
  showAchievements: boolean;
  setShowAchievements: (value: boolean) => Promise<void>;
  showStats: boolean;
  setShowStats: (value: boolean) => Promise<void>;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);
  const { status, user } = useAuth();

  const [showInRanking, setShowInRankingState] = useState(true);
  const [showAchievements, setShowAchievementsState] = useState(true);
  const [showStats, setShowStatsState] = useState(true);

  // 1. Carga inicial desde SQLite
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      repo.get(KEY_SHOW_IN_RANKING),
      repo.get(KEY_SHOW_ACHIEVEMENTS),
      repo.get(KEY_SHOW_STATS),
    ]).then(([r, a, s]) => {
      if (!cancelled) {
        if (r !== null) setShowInRankingState(r === 'true');
        if (a !== null) setShowAchievementsState(a === 'true');
        if (s !== null) setShowStatsState(s === 'true');
      }
    });
    return () => { cancelled = true; };
  }, [repo]);

  // 2. Al autenticarse: sincroniza con Supabase profiles
  useEffect(() => {
    if (status !== 'authenticated' || !user) return;
    let cancelled = false;

    (async () => {
      const { data } = await supabase
        .from('profiles')
        .select('show_in_ranking, show_achievements, show_stats')
        .eq('id', user.id)
        .single();

      if (cancelled) return;

      if (data) {
        if (data.show_in_ranking !== null && data.show_in_ranking !== undefined) {
          const val = data.show_in_ranking as boolean;
          setShowInRankingState(val);
          await repo.set(KEY_SHOW_IN_RANKING, String(val));
        }
        if (data.show_achievements !== null && data.show_achievements !== undefined) {
          const val = data.show_achievements as boolean;
          setShowAchievementsState(val);
          await repo.set(KEY_SHOW_ACHIEVEMENTS, String(val));
        }
        if (data.show_stats !== null && data.show_stats !== undefined) {
          const val = data.show_stats as boolean;
          setShowStatsState(val);
          await repo.set(KEY_SHOW_STATS, String(val));
        }
      }
    })().catch(() => {});

    return () => { cancelled = true; };
  }, [status, user, repo]);

  // 3. Guardar: SQLite + Supabase si autenticado
  const upsertPrivacy = useCallback(
    async (ranking: boolean, achievements: boolean, stats: boolean) => {
      if (status !== 'authenticated' || !user) return;
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        show_in_ranking: ranking,
        show_achievements: achievements,
        show_stats: stats,
      });
      if (__DEV__ && error) {
        console.warn('[Privacy] Error al guardar en Supabase:', error.message);
      }
    },
    [status, user]
  );

  const setShowInRanking = useCallback(
    async (value: boolean) => {
      setShowInRankingState(value);
      await repo.set(KEY_SHOW_IN_RANKING, String(value));
      upsertPrivacy(value, showAchievements, showStats);
    },
    [repo, upsertPrivacy, showAchievements, showStats]
  );

  const setShowAchievements = useCallback(
    async (value: boolean) => {
      setShowAchievementsState(value);
      await repo.set(KEY_SHOW_ACHIEVEMENTS, String(value));
      upsertPrivacy(showInRanking, value, showStats);
    },
    [repo, upsertPrivacy, showInRanking, showStats]
  );

  const setShowStats = useCallback(
    async (value: boolean) => {
      setShowStatsState(value);
      await repo.set(KEY_SHOW_STATS, String(value));
      upsertPrivacy(showInRanking, showAchievements, value);
    },
    [repo, upsertPrivacy, showInRanking, showAchievements]
  );

  return {
    showInRanking,
    setShowInRanking,
    showAchievements,
    setShowAchievements,
    showStats,
    setShowStats,
  };
}
