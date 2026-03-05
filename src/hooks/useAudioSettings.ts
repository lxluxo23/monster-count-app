import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';

const KEY_ENABLED = 'audioMoodEnabled';
const KEY_VOLUME = 'audioMoodVolume';

const DEFAULT_ENABLED = true;
const DEFAULT_VOLUME = 0.25;

/**
 * @param refreshKey – pass a changing value (e.g. modal `visible`) to force
 *                     a re-read from SQLite when the consumer becomes active.
 */
export function useAudioSettings(refreshKey?: unknown) {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);

  const [enabled, setEnabledState] = useState(DEFAULT_ENABLED);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([repo.get(KEY_ENABLED), repo.get(KEY_VOLUME)]).then(
      ([enabledVal, volumeVal]) => {
        if (cancelled) return;
        if (enabledVal !== null) setEnabledState(enabledVal === 'true');
        if (volumeVal !== null) setVolumeState(Number(volumeVal));
        setLoading(false);
      },
    );
    return () => { cancelled = true; };
  }, [repo, refreshKey]);

  const setEnabled = useCallback(
    async (value: boolean) => {
      setEnabledState(value);
      await repo.set(KEY_ENABLED, String(value));
    },
    [repo],
  );

  const setVolume = useCallback(
    async (value: number) => {
      setVolumeState(value);
      await repo.set(KEY_VOLUME, String(value));
    },
    [repo],
  );

  return { enabled, volume, setEnabled, setVolume, loading };
}
