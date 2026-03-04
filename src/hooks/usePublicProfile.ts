import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { buildAchievementList, type Achievement } from '../utils/achievementUtils';
import { calculateStreak } from '../utils/streakUtils';

export interface PublicProfileData {
  displayName: string;
  avatarUrl: string | null;
  total: number;
  streak: number;
  favoriteMonsterId: string | null;
  countByMonsterId: Record<string, number>;
  achievements: Achievement[];
  showAchievements: boolean;
  showStats: boolean;
}

export function usePublicProfile(userId: string | null): {
  data: PublicProfileData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const { t } = useTranslation();
  const [data, setData] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!userId) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function fetchProfile() {
      setLoading(true);
      setError(null);

      // 1. Perfil (display_name, avatar_url, show_achievements, show_stats)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('display_name, avatar_url, show_achievements, show_stats')
        .eq('id', userId)
        .single();

      if (cancelled) return;
      if (profileError || !profile) {
        const errMsg = profileError?.message ?? 'Perfil no encontrado';
        setError(errMsg);
        setLoading(false);
        return;
      }

      const showAchievements = profile.show_achievements !== false;
      const showStats = profile.show_stats !== false;
      const displayName = (profile.display_name as string) || 'Usuario';
      const avatarUrl = (profile.avatar_url as string) || null;

      // 2. Entries del usuario
      const { data: entries, error: entriesError } = await supabase
        .from('entries')
        .select('monster_id, date')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (cancelled) return;
      if (entriesError) {
        setError(entriesError.message);
        setLoading(false);
        return;
      }

      const rows = entries ?? [];
      const total = rows.length;

      // countByMonsterId
      const countByMonsterId: Record<string, number> = {};
      for (const r of rows) {
        const mid = r.monster_id as string;
        countByMonsterId[mid] = (countByMonsterId[mid] ?? 0) + 1;
      }
      const favoriteMonsterId =
        Object.keys(countByMonsterId).length > 0
          ? Object.entries(countByMonsterId).sort((a, b) => b[1] - a[1])[0][0]
          : null;

      // streak
      const mappedHistory = rows.map((r) => ({ id: '', monsterId: r.monster_id as string, date: r.date as string }));
      const streak = calculateStreak(mappedHistory);

      // 3. Logros
      const achievements: Achievement[] = showAchievements
        ? buildAchievementList(t, mappedHistory, total, streak, countByMonsterId)
        : [];

      if (!cancelled) {
        setData({
          displayName,
          avatarUrl,
          total,
          streak,
          favoriteMonsterId,
          countByMonsterId,
          achievements,
          showAchievements,
          showStats,
        });
      }

      setLoading(false);
    }

    fetchProfile();
    return () => { cancelled = true; };
  }, [userId, tick, t]);

  return { data, loading, error, refresh };
}
