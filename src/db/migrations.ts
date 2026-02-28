import type { SQLiteDatabase } from 'expo-sqlite';
import {
  DATABASE_VERSION,
  TABLE_ENTRIES,
  TABLE_PENDING_DELETES,
  CREATE_ENTRIES_SQL,
  CREATE_PREFERENCES_SQL,
  MIGRATE_V3_ADD_SYNCED_SQL,
  MIGRATE_V4_ADD_SOURCE_SQL,
  MIGRATE_V5_PENDING_DELETES_SQL,
} from './schema';

/**
 * Comprueba si la tabla entries tiene la columna source.
 * SQLite: PRAGMA table_info(entries) devuelve las columnas.
 */
async function hasSourceColumn(db: SQLiteDatabase): Promise<boolean> {
  try {
    const rows = await db.getAllAsync<{ name: string }>(`PRAGMA table_info(${TABLE_ENTRIES})`);
    return rows.some((r) => r.name === 'source');
  } catch {
    return false;
  }
}

/**
 * Inicializa la base de datos y aplica migraciones.
 * Se ejecuta una sola vez al abrir la app (onInit del SQLiteProvider).
 */
export async function migrateDb(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`PRAGMA journal_mode = 'wal'`);

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion < 1) {
    await db.execAsync(CREATE_ENTRIES_SQL);
  }

  if (currentVersion < 2) {
    await db.execAsync(CREATE_PREFERENCES_SQL);
  }

  if (currentVersion < 3) {
    try {
      await db.execAsync(MIGRATE_V3_ADD_SYNCED_SQL);
    } catch {
      // Columna ya existe. OK.
    }
  }

  if (currentVersion < 4) {
    try {
      await db.execAsync(MIGRATE_V4_ADD_SOURCE_SQL);
    } catch {
      // Columna ya existe. OK.
    }
  }

  // Reparación: si la columna source no existe (p. ej. migración falló antes),
  // añadirla ahora. Evita el error "table entries has no column named source".
  if (!(await hasSourceColumn(db))) {
    try {
      await db.execAsync(MIGRATE_V4_ADD_SOURCE_SQL);
    } catch {
      // Ignorar si falla (tabla vacía o ya existe).
    }
  }

  if (currentVersion < 5) {
    await db.execAsync(MIGRATE_V5_PENDING_DELETES_SQL);
  }

  // Reparación: si pending_deletes no existe (p. ej. migración falló), crearla
  try {
    await db.getFirstAsync(`SELECT 1 FROM ${TABLE_PENDING_DELETES} LIMIT 1`);
  } catch {
    await db.execAsync(MIGRATE_V5_PENDING_DELETES_SQL);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
