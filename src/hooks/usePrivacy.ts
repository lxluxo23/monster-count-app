import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const KEY_SHOW_IN_RANKING = 'showInRanking';

export function usePrivacy(): {
  showInRanking: boolean;
  setShowInRanking: (value: boolean) => Promise<void>;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);
  const { status, user } = useAuth();

  const [showInRanking, setShowInRankingState] = useState(true);

  // 1. Carga inicial desde SQLite
  useEffect(() => {
    let cancelled = false;
    repo.get(KEY_SHOW_IN_RANKING).then((value) => {
      if (!cancelled && value !== null) {
        setShowInRankingState(value === 'true');
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
        .select('show_in_ranking')
        .eq('id', user.id)
        .single();

      if (cancelled) return;

      if (data && data.show_in_ranking !== null && data.show_in_ranking !== undefined) {
        const val = data.show_in_ranking as boolean;
        setShowInRankingState(val);
        await repo.set(KEY_SHOW_IN_RANKING, String(val));
      }
    })().catch(() => {});

    return () => { cancelled = true; };
  }, [status, user, repo]);

  // 3. Guardar: SQLite + Supabase si autenticado
  const setShowInRanking = useCallback(
    async (value: boolean) => {
      setShowInRankingState(value);
      await repo.set(KEY_SHOW_IN_RANKING, String(value));
      if (status === 'authenticated' && user) {
        await supabase
          .from('profiles')
          .upsert({ id: user.id, show_in_ranking: value });
      }
    },
    [repo, status, user]
  );

  return { showInRanking, setShowInRanking };
}
