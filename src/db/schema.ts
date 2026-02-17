export const DATABASE_VERSION = 2;
export const TABLE_ENTRIES = 'entries';
export const TABLE_PREFERENCES = 'preferences';

export const CREATE_ENTRIES_SQL = `
  CREATE TABLE IF NOT EXISTS ${TABLE_ENTRIES} (
    id TEXT PRIMARY KEY NOT NULL,
    monster_id TEXT NOT NULL,
    date TEXT NOT NULL
  );
`;

export const CREATE_PREFERENCES_SQL = `
  CREATE TABLE IF NOT EXISTS ${TABLE_PREFERENCES} (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
`;
