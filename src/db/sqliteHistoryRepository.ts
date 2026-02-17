import type { SQLiteDatabase } from 'expo-sqlite';
import type { HistoryEntry } from '../types';
import type { IHistoryRepository } from './types';
import { TABLE_ENTRIES } from './schema';

/**
 * Implementación del repositorio de historial usando SQLite.
 * Responsabilidad única: persistencia en base de datos local.
 */
export function createSqliteHistoryRepository(db: SQLiteDatabase): IHistoryRepository {
  return {
    async getAll(): Promise<HistoryEntry[]> {
      const rows = await db.getAllAsync<{ id: string; monster_id: string; date: string }>(
        `SELECT id, monster_id, date FROM ${TABLE_ENTRIES} ORDER BY date DESC`
      );
      return rows.map((row) => ({
        id: row.id,
        monsterId: row.monster_id,
        date: row.date,
      }));
    },

    async add(monsterId: string): Promise<HistoryEntry> {
      const id = Date.now().toString();
      const date = new Date().toISOString();
      await db.runAsync(
        `INSERT INTO ${TABLE_ENTRIES} (id, monster_id, date) VALUES (?, ?, ?)`,
        id,
        monsterId,
        date
      );
      return { id, monsterId, date };
    },

    async remove(id: string): Promise<void> {
      await db.runAsync(`DELETE FROM ${TABLE_ENTRIES} WHERE id = ?`, id);
    },
  };
}
