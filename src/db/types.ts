import type { HistoryEntry, EntrySource } from '../types';

/**
 * Contrato del repositorio de historial.
 * Permite cambiar la implementación (SQLite ahora, API después) sin tocar la lógica de negocio.
 */
export interface IHistoryRepository {
  getAll(): Promise<HistoryEntry[]>;
  add(monsterId: string, source?: EntrySource): Promise<HistoryEntry>;
  remove(id: string): Promise<void>;
}

export interface IPreferencesRepository {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}
