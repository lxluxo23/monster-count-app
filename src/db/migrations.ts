import type { SQLiteDatabase } from 'expo-sqlite';
import { DATABASE_VERSION, CREATE_TABLE_SQL } from './schema';

/**
 * Inicializa la base de datos y aplica migraciones.
 * Se ejecuta una sola vez al abrir la app (onInit del SQLiteProvider).
 */
export async function migrateDb(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentVersion === 0) {
    await db.execAsync(CREATE_TABLE_SQL);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
