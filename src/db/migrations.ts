import type { SQLiteDatabase } from 'expo-sqlite';
import { DATABASE_VERSION, CREATE_ENTRIES_SQL, CREATE_PREFERENCES_SQL } from './schema';

/**
 * Inicializa la base de datos y aplica migraciones.
 * Se ejecuta una sola vez al abrir la app (onInit del SQLiteProvider).
 */
export async function migrateDb(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`PRAGMA journal_mode = 'wal'`);

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentVersion < 1) {
    await db.execAsync(CREATE_ENTRIES_SQL);
  }

  if (currentVersion < 2) {
    await db.execAsync(CREATE_PREFERENCES_SQL);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
