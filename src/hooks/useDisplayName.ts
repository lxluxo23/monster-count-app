import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const KEY_USER_NAME = 'userName';
const DEFAULT_NAME = 'Usuario';

/**
 * Gestiona el display_name del usuario.
 * - Guest: lee/escribe solo en SQLite.
 * - Autenticado: sincroniza con profiles.display_name en Supabase.
 *   Al primer login, inicializa el perfil con el nombre de Google.
 */
export function useDisplayName(): {
  displayName: string;
  setDisplayName: (name: string) => Promise<void>;
  loading: boolean;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);
  const { status, user } = useAuth();

  const [displayName, setDisplayNameState] = useState(DEFAULT_NAME);
  const [loading, setLoading] = useState(true);

  // 1. Carga inicial desde SQLite (rápido, sin red)
  useEffect(() => {
    let cancelled = false;
    repo.get(KEY_USER_NAME).then((value) => {
      if (!cancelled && value) setDisplayNameState(value);
      setLoading(false);
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
        .select('display_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (cancelled) return;

      const avatarUrl = (user.user_metadata?.picture ?? user.user_metadata?.avatar_url) as string | undefined;

      if (data?.display_name) {
        // Ya tiene nombre en Supabase → úsalo
        setDisplayNameState(data.display_name);
        await repo.set(KEY_USER_NAME, data.display_name);
        // Sincronizar avatar_url de Google si no está en profiles
        if (avatarUrl && !data.avatar_url) {
          await supabase.from('profiles').upsert({ id: user.id, avatar_url: avatarUrl });
        }
      } else {
        // Primer login: inicializar con nombre y avatar de Google
        const googleName =
          (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          DEFAULT_NAME;
        await supabase.from('profiles').upsert({
          id: user.id,
          display_name: googleName,
          ...(avatarUrl && { avatar_url: avatarUrl }),
        });
        if (!cancelled) setDisplayNameState(googleName);
        await repo.set(KEY_USER_NAME, googleName);
      }
    })().catch(() => {});

    return () => { cancelled = true; };
  }, [status, user, repo]);

  // 3. Guardar: SQLite + Supabase si autenticado
  const setDisplayName = useCallback(
    async (name: string) => {
      setDisplayNameState(name);
      await repo.set(KEY_USER_NAME, name);
      if (status === 'authenticated' && user) {
        const avatarUrl = (user.user_metadata?.picture ?? user.user_metadata?.avatar_url) as string | undefined;
        await supabase.from('profiles').upsert({
          id: user.id,
          display_name: name,
          ...(avatarUrl && { avatar_url: avatarUrl }),
        });
      }
    },
    [repo, status, user]
  );

  return { displayName, setDisplayName, loading };
}
