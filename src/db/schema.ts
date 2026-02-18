export const DATABASE_VERSION = 3;
export const TABLE_ENTRIES = 'entries';
export const TABLE_PREFERENCES = 'preferences';

export const CREATE_ENTRIES_SQL = `
  CREATE TABLE IF NOT EXISTS ${TABLE_ENTRIES} (
    id TEXT PRIMARY KEY NOT NULL,
    monster_id TEXT NOT NULL,
    date TEXT NOT NULL,
    synced INTEGER NOT NULL DEFAULT 0
  );
`;

export const CREATE_PREFERENCES_SQL = `
  CREATE TABLE IF NOT EXISTS ${TABLE_PREFERENCES} (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
`;

// Migración v3: añade columna synced a instalaciones existentes (v1/v2)
export const MIGRATE_V3_ADD_SYNCED_SQL = `
  ALTER TABLE ${TABLE_ENTRIES} ADD COLUMN synced INTEGER NOT NULL DEFAULT 0;
`;
