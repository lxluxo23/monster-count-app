import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { MONSTER_TYPES } from '../constants/monsters';
import { getUnlockedAchievementIds } from '../utils/achievementUtils';
import type { Achievement } from './useAchievements';

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
      const history = rows.map((r) => ({ id: '', monsterId: r.monster_id, date: r.date }));
      const dayKeys = new Set(history.map((e) => localDayKey(new Date(e.date))));
      let streak = 0;
      const ref = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(ref);
        d.setDate(d.getDate() - i);
        if (dayKeys.has(localDayKey(d))) streak++;
        else break;
      }

      // 3. Logros (desde user_achievements si show_achievements, o calcular desde entries)
      let achievements: Achievement[] = [];

      if (showAchievements) {
        const unlockedIds = new Set(
          getUnlockedAchievementIds(history, total, streak, countByMonsterId)
        );
        const triedCount = MONSTER_TYPES.filter((m) => (countByMonsterId[m.id] ?? 0) > 0).length;
        const totalFlavors = MONSTER_TYPES.length;

        const achList: Achievement[] = [
          { id: 'primera-lata', title: t('achievements.firstCan.title'), description: t('achievements.firstCan.desc'), emoji: '🥤', unlocked: unlockedIds.has('primera-lata'), progress: Math.min(total / 1, 1), progressLabel: `${Math.min(total, 1)} / 1` },
          { id: 'diez-latas', title: t('achievements.tenCans.title'), description: t('achievements.tenCans.desc'), emoji: '🎯', unlocked: unlockedIds.has('diez-latas'), progress: Math.min(total / 10, 1), progressLabel: `${Math.min(total, 10)} / 10` },
          { id: 'cincuenta-latas', title: t('achievements.fiftyCans.title'), description: t('achievements.fiftyCans.desc'), emoji: '💪', unlocked: unlockedIds.has('cincuenta-latas'), progress: Math.min(total / 50, 1), progressLabel: `${Math.min(total, 50)} / 50` },
          { id: 'cien-latas', title: t('achievements.hundredCans.title'), description: t('achievements.hundredCans.desc'), emoji: '🏆', unlocked: unlockedIds.has('cien-latas'), progress: Math.min(total / 100, 1), progressLabel: `${Math.min(total, 100)} / 100` },
          { id: 'racha-7', title: t('achievements.streak7.title'), description: t('achievements.streak7.desc'), emoji: '🔥', unlocked: unlockedIds.has('racha-7'), progress: Math.min(streak / 7, 1), progressLabel: `${Math.min(streak, 7)} / 7` },
          { id: 'racha-30', title: t('achievements.streak30.title'), description: t('achievements.streak30.desc'), emoji: '⚡', unlocked: unlockedIds.has('racha-30'), progress: Math.min(streak / 30, 1), progressLabel: `${Math.min(streak, 30)} / 30` },
          { id: 'coleccionista', title: t('achievements.collector.title'), description: t('achievements.collector.desc', { count: totalFlavors }), emoji: '🌈', unlocked: unlockedIds.has('coleccionista'), progress: triedCount / totalFlavors, progressLabel: `${triedCount} / ${totalFlavors}` },
          { id: 'madrugador', title: t('achievements.earlyBird.title'), description: t('achievements.earlyBird.desc'), emoji: '🌅', unlocked: unlockedIds.has('madrugador'), progress: unlockedIds.has('madrugador') ? 1 : 0, progressLabel: unlockedIds.has('madrugador') ? '1 / 1' : '0 / 1' },
          { id: 'noctambulo', title: t('achievements.withYourNoctulo.title'), description: t('achievements.withYourNoctulo.desc'), emoji: '🦇', unlocked: unlockedIds.has('noctambulo'), progress: unlockedIds.has('noctambulo') ? 1 : 0, progressLabel: unlockedIds.has('noctambulo') ? '1 / 1' : '0 / 1' },
        ];
        achievements = achList;
      }

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

function localDayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
