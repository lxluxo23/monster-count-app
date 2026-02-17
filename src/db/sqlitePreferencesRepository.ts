import type { SQLiteDatabase } from 'expo-sqlite';
import type { IPreferencesRepository } from './types';
import { TABLE_PREFERENCES } from './schema';

export function createSqlitePreferencesRepository(db: SQLiteDatabase): IPreferencesRepository {
  return {
    async get(key: string): Promise<string | null> {
      const row = await db.getFirstAsync<{ value: string }>(
        `SELECT value FROM ${TABLE_PREFERENCES} WHERE key = ?`,
        key
      );
      return row?.value ?? null;
    },

    async set(key: string, value: string): Promise<void> {
      await db.runAsync(
        `INSERT OR REPLACE INTO ${TABLE_PREFERENCES} (key, value) VALUES (?, ?)`,
        key,
        value
      );
    },
  };
}
