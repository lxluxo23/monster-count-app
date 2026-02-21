import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { MONSTER_TYPES } from '../constants/monsters';

export interface MonsterRankEntry {
  monsterId: string;
  count: number;
}

export interface GlobalStats {
  rankingByMonster: MonsterRankEntry[];
  totalCommunityLatas: number;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useGlobalStats(): GlobalStats {
  const [rankingByMonster, setRankingByMonster] = useState<MonsterRankEntry[]>([]);
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

      const { data, error: sbError } = await supabase
        .from('entries')
        .select('monster_id');

      if (cancelled) return;

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return;
      }

      // Aggregate client-side
      const countMap: Record<string, number> = {};
      for (const row of data ?? []) {
        const id = row.monster_id as string;
        countMap[id] = (countMap[id] ?? 0) + 1;
      }

      const total = Object.values(countMap).reduce((s, n) => s + n, 0);

      // Build ranking ordered by count desc, all known monster types included
      const ranking = MONSTER_TYPES.map((m) => ({
        monsterId: m.id,
        count: countMap[m.id] ?? 0,
      })).sort((a, b) => b.count - a.count);

      setRankingByMonster(ranking);
      setTotalCommunityLatas(total);
      setLoading(false);
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return { rankingByMonster, totalCommunityLatas, loading, error, refresh };
}
