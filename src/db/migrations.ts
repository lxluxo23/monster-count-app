import type { SQLiteDatabase } from 'expo-sqlite';
import {
  DATABASE_VERSION,
  CREATE_ENTRIES_SQL,
  CREATE_PREFERENCES_SQL,
  MIGRATE_V3_ADD_SYNCED_SQL,
} from './schema';

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

  if (currentVersion < 3) {
    // Instalaciones nuevas: CREATE_ENTRIES_SQL ya incluye la columna synced.
    // Instalaciones existentes (v1/v2): ALTER TABLE la añade.
    // SQLite no soporta "ADD COLUMN IF NOT EXISTS", así que usamos try/catch.
    try {
      await db.execAsync(MIGRATE_V3_ADD_SYNCED_SQL);
    } catch {
      // Columna ya existe (fresh install que pasó por el bloque v1 arriba). OK.
    }
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
