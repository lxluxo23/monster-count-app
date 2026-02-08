export const DATABASE_VERSION = 1;
export const TABLE_ENTRIES = 'entries';

export const CREATE_TABLE_SQL = `
  PRAGMA journal_mode = 'wal';
  CREATE TABLE IF NOT EXISTS ${TABLE_ENTRIES} (
    id TEXT PRIMARY KEY NOT NULL,
    monster_id TEXT NOT NULL,
    date TEXT NOT NULL
  );
`;
