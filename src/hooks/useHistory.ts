import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqliteHistoryRepository } from '../db';
import { syncPendingEntries, pullEntriesFromSupabase, processPendingDeletes, addPendingDelete } from '../services/syncService';
import { syncAchievementsToSupabase } from '../services/achievementSyncService';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { checkRateLimit } from './useRateLimit';
import type { HistoryEntry, EntrySource } from '../types';

export interface RateLimitConfig {
  enabled: boolean;
  maxPerWindow: number;
  windowMinutes: number;
}

export class RateLimitError extends Error {
  constructor(
    message: string,
    public readonly waitUntil: Date | null,
    public readonly waitMinutes: number = 0
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

// Clave de día en hora local para calcular rachas
function localDayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function useHistory(rateLimit?: RateLimitConfig): {
  history: HistoryEntry[];
  loading: boolean;
  add: (monsterId: string, source?: EntrySource) => Promise<void>;
  remove: (id: string) => Promise<void>;
  total: number;
  today: number;
  streak: number;
  countByMonsterId: Record<string, number>;
  favoriteMonsterId: string | null;
} {
  const db = useSQLiteContext();
  const { status, user } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const repo = useMemo(() => createSqliteHistoryRepository(db), [db]);

  // Carga inicial desde SQLite
  useEffect(() => {
    let cancelled = false;
    repo.getAll().then((list) => {
      if (!cancelled) setHistory(list);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [repo]);

  // Sync completo al autenticarse: primero baja, luego sube
  useEffect(() => {
    if (status !== 'authenticated' || !user) return;

    (async () => {
      // 1. Procesar deletes pendientes (eliminados localmente pero no en Supabase)
      await processPendingDeletes(db, user.id);

      // 2. Pull: descarga entries de la nube que no estén localmente
      const { downloaded } = await pullEntriesFromSupabase(db, user.id);

      // 3. Si llegaron nuevos datos, refrescar la lista local
      if (downloaded > 0) {
        const updated = await repo.getAll();
        setHistory(updated);
      }

      // 4. Push: sube los entries locales pendientes
      await syncPendingEntries(db, user.id);
    })().catch((err) => {
      if (__DEV__) console.warn('[Sync] Falló, se reintentará:', err);
    });
  }, [status, user, db, repo]);

  // Sync logros a Supabase (solo autenticados). Guests: cálculo local únicamente.
  useEffect(() => {
    if (status !== 'authenticated' || !user) return;

    const total = history.length;
    const todayCount = history.filter((e) => isSameDay(new Date(e.date), new Date())).length;
    const countByMonsterId: Record<string, number> = {};
    for (const e of history) {
      countByMonsterId[e.monsterId] = (countByMonsterId[e.monsterId] ?? 0) + 1;
    }
    const streak = (() => {
      const dayKeys = new Set(history.map((e) => localDayKey(new Date(e.date))));
      let count = 0;
      const ref = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(ref);
        d.setDate(d.getDate() - i);
        if (dayKeys.has(localDayKey(d))) count++;
        else break;
      }
      return count;
    })();

    void syncAchievementsToSupabase(user.id, history, total, streak, countByMonsterId);
  }, [status, user, history]);

  const add = useCallback(
    async (monsterId: string, source: EntrySource = 'manual') => {
      const enabled = rateLimit?.enabled ?? false;
      const maxPerWindow = rateLimit?.maxPerWindow ?? 2;
      const windowMinutes = rateLimit?.windowMinutes ?? 10;
      const { allowed, waitUntil } = checkRateLimit(
        history,
        enabled,
        maxPerWindow,
        windowMinutes
      );
      if (!allowed) {
        const mins = waitUntil
          ? Math.ceil((waitUntil.getTime() - Date.now()) / 60000)
          : windowMinutes;
        throw new RateLimitError('rateLimit.exceeded', waitUntil, mins);
      }
      const entry = await repo.add(monsterId, source);
      setHistory((prev: HistoryEntry[]) => [entry, ...prev]);
      if (status === 'authenticated' && user) {
        syncPendingEntries(db, user.id).catch(() => {});
      }
    },
    [repo, status, user, db, history, rateLimit]
  );

  const remove = useCallback(
    async (id: string) => {
      await repo.remove(id);
      setHistory((prev: HistoryEntry[]) => prev.filter((e) => e.id !== id));

      if (status === 'authenticated' && user) {
        const { error } = await supabase
          .from('entries')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) {
          if (__DEV__) console.warn('[Sync] Delete en Supabase falló, se reintentará:', error.message);
          await addPendingDelete(db, id);
        }
      }
    },
    [repo, status, user, db]
  );

  const now = new Date();
  const total = history.length;
  const today = history.filter((e: HistoryEntry) => isSameDay(new Date(e.date), now)).length;

  const countByMonsterId: Record<string, number> = {};
  for (const e of history) {
    countByMonsterId[e.monsterId] = (countByMonsterId[e.monsterId] ?? 0) + 1;
  }
  const favoriteMonsterId =
    Object.keys(countByMonsterId).length > 0
      ? Object.entries(countByMonsterId).sort((a, b) => b[1] - a[1])[0][0]
      : null;

  // Racha: días consecutivos (incluyendo hoy) con al menos un entry
  const streak = useMemo(() => {
    if (history.length === 0) return 0;
    const dayKeys = new Set(history.map((e) => localDayKey(new Date(e.date))));
    let count = 0;
    const ref = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(ref);
      d.setDate(d.getDate() - i);
      if (dayKeys.has(localDayKey(d))) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [history]);

  return { history, loading, add, remove, total, today, streak, countByMonsterId, favoriteMonsterId };
}
