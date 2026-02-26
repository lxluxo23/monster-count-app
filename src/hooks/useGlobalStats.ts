import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { MONSTER_TYPES } from '../constants/monsters';

export interface MonsterRankEntry {
  monsterId: string;
  count: number;
}

export interface UserRankEntry {
  userId: string;
  displayName: string;
  count: number;
}

export interface GlobalStats {
  rankingByMonster: MonsterRankEntry[];
  rankingByUser: UserRankEntry[];
  totalCommunityLatas: number;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useGlobalStats(): GlobalStats {
  const [rankingByMonster, setRankingByMonster] = useState<MonsterRankEntry[]>([]);
  const [rankingByUser, setRankingByUser] = useState<UserRankEntry[]>([]);
  const [totalCommunityLatas, setTotalCommunityLatas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      setLoading(true);
      setError(null);

      // Fetch entries con monster_id y user_id
      const { data, error: sbError } = await supabase
        .from('entries')
        .select('monster_id, user_id');

      if (cancelled) return;

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return;
      }

      const rows = data ?? [];

      // Aggregate por monster
      const monsterCountMap: Record<string, number> = {};
      // Aggregate por user
      const userCountMap: Record<string, number> = {};

      for (const row of rows) {
        const mid = row.monster_id as string;
        monsterCountMap[mid] = (monsterCountMap[mid] ?? 0) + 1;

        const uid = row.user_id as string;
        if (uid) userCountMap[uid] = (userCountMap[uid] ?? 0) + 1;
      }

      const total = Object.values(monsterCountMap).reduce((s, n) => s + n, 0);

      const monsterRanking = MONSTER_TYPES.map((m) => ({
        monsterId: m.id,
        count: monsterCountMap[m.id] ?? 0,
      })).sort((a, b) => b.count - a.count);

      setRankingByMonster(monsterRanking);
      setTotalCommunityLatas(total);

      // Fetch profiles: display_name + show_in_ranking (para respetar privacidad)
      const userIds = Object.keys(userCountMap);
      const profileMap: Record<string, { displayName: string; showInRanking: boolean }> = {};

      if (userIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, display_name, show_in_ranking')
          .in('id', userIds);

        for (const p of profiles ?? []) {
          const showInRanking = p.show_in_ranking !== false; // default true si null
          profileMap[p.id] = {
            displayName: (p.display_name as string) || 'Usuario',
            showInRanking,
          };
        }
      }

      if (!cancelled) {
        // Solo incluir usuarios con show_in_ranking = true (excluir si no hay perfil o está en false)
        const userRanking = Object.entries(userCountMap)
          .filter(([uid]) => profileMap[uid]?.showInRanking === true)
          .map(([uid, count]) => ({
            userId: uid,
            displayName: profileMap[uid]?.displayName ?? 'Usuario',
            count,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        setRankingByUser(userRanking);
      }

      setLoading(false);
    }

    fetchStats();
    return () => { cancelled = true; };
  }, [tick]);

  return { rankingByMonster, rankingByUser, totalCommunityLatas, loading, error, refresh };
}
