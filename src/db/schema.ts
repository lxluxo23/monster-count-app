export const DATABASE_VERSION = 4;
export const TABLE_ENTRIES = 'entries';
export const TABLE_PREFERENCES = 'preferences';

export const CREATE_ENTRIES_SQL = `
  CREATE TABLE IF NOT EXISTS ${TABLE_ENTRIES} (
    id TEXT PRIMARY KEY NOT NULL,
    monster_id TEXT NOT NULL,
    date TEXT NOT NULL,
    synced INTEGER NOT NULL DEFAULT 0,
    source TEXT NOT NULL DEFAULT 'manual'
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

// Migración v4: añade columna source para distinguir manual vs cámara
export const MIGRATE_V4_ADD_SOURCE_SQL = `
  ALTER TABLE ${TABLE_ENTRIES} ADD COLUMN source TEXT NOT NULL DEFAULT 'manual';
`;
