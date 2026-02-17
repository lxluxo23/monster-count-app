import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createSqlitePreferencesRepository } from '../db';

const KEY_USER_NAME = 'userName';
const DEFAULT_USER_NAME = 'Usuario';

export function usePreferences(): {
  userName: string;
  setUserName: (name: string) => Promise<void>;
  loading: boolean;
} {
  const db = useSQLiteContext();
  const repo = useMemo(() => createSqlitePreferencesRepository(db), [db]);

  const [userName, setUserNameState] = useState(DEFAULT_USER_NAME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    repo.get(KEY_USER_NAME).then((value) => {
      if (!cancelled && value) {
        setUserNameState(value);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const setUserName = useCallback(
    async (name: string) => {
      setUserNameState(name);
      await repo.set(KEY_USER_NAME, name);
    },
    [repo]
  );

  return { userName, setUserName, loading };
}
