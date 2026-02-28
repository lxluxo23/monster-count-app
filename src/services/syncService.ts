import type { SQLiteDatabase } from 'expo-sqlite';
import { supabase } from '../lib/supabase';
import { TABLE_ENTRIES, TABLE_PENDING_DELETES } from '../db/schema';

/**
 * Procesa los deletes pendientes: intenta borrar en Supabase y limpia la cola local.
 * Debe ejecutarse ANTES de pull para evitar que los registros eliminados vuelvan.
 */
export async function processPendingDeletes(
  db: SQLiteDatabase,
  userId: string
): Promise<{ processed: number }> {
  try {
    const rows = await db.getAllAsync<{ id: string }>(
      `SELECT id FROM ${TABLE_PENDING_DELETES}`
    );
    if (rows.length === 0) return { processed: 0 };

    let processed = 0;
    for (const { id } of rows) {
      const { error } = await supabase
        .from('entries')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (!error) {
        await db.runAsync(`DELETE FROM ${TABLE_PENDING_DELETES} WHERE id = ?`, id);
        processed++;
      }
    }
    return { processed };
  } catch (e) {
    const msg = String(e);
    if (__DEV__ && (msg.includes('no such table') || msg.includes('closed resource'))) {
      return { processed: 0 };
    }
    throw e;
  }
}

/**
 * Añade un id a la cola de deletes pendientes (cuando falla el delete en Supabase).
 */
export async function addPendingDelete(
  db: SQLiteDatabase,
  id: string
): Promise<void> {
  try {
    await db.runAsync(
      `INSERT OR IGNORE INTO ${TABLE_PENDING_DELETES} (id) VALUES (?)`,
      id
    );
  } catch (e) {
    const msg = String(e);
    if (__DEV__ && (msg.includes('no such table') || msg.includes('closed resource'))) {
      return;
    }
    throw e;
  }
}

/**
 * Descarga de Supabase los entries del usuario que no existen localmente.
 * Útil al instalar en un nuevo dispositivo o tras tiempo sin conectividad.
 * IMPORTANTE: ejecutar processPendingDeletes antes para no re-insertar eliminados.
 */
export async function pullEntriesFromSupabase(
  db: SQLiteDatabase,
  userId: string
): Promise<{ downloaded: number }> {
  const { data, error } = await supabase
    .from('entries')
    .select('id, monster_id, date, source')
    .eq('user_id', userId);

  if (error || !data || data.length === 0) return { downloaded: 0 };

  let downloaded = 0;
  for (const entry of data) {
    const source = (entry as { source?: string }).source ?? 'manual';
    const result = await db.runAsync(
      `INSERT OR IGNORE INTO ${TABLE_ENTRIES} (id, monster_id, date, synced, source) VALUES (?, ?, ?, 1, ?)`,
      entry.id,
      entry.monster_id,
      entry.date,
      source
    );
    if (result.changes > 0) downloaded++;
  }

  return { downloaded };
}

interface LocalEntry {
  id: string;
  monster_id: string;
  date: string;
  source?: string;
}

interface RemoteEntry {
  id: string;
  user_id: string;
  monster_id: string;
  date: string;
  source?: string;
}

/**
 * Sube al servidor todos los entries locales pendientes (synced = 0).
 * Es idempotente: si falla a mitad, el próximo intento re-sube los mismos entries sin duplicar.
 */
export async function syncPendingEntries(
  db: SQLiteDatabase,
  userId: string
): Promise<{ uploaded: number; errors: number }> {
  const pending = await db.getAllAsync<LocalEntry>(
    `SELECT id, monster_id, date, source FROM ${TABLE_ENTRIES} WHERE synced = 0 ORDER BY date ASC`
  );

  if (pending.length === 0) return { uploaded: 0, errors: 0 };

  const rows: RemoteEntry[] = pending.map((e) => ({
    id: e.id,
    user_id: userId,
    monster_id: e.monster_id,
    date: e.date,
    source: e.source ?? 'manual',
  }));

  const { error } = await supabase
    .from('entries')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[Sync] Error al subir entries:', error.message);
    return { uploaded: 0, errors: pending.length };
  }

  // Marcar como sincronizados en SQLite
  const placeholders = pending.map(() => '?').join(', ');
  await db.runAsync(
    `UPDATE ${TABLE_ENTRIES} SET synced = 1 WHERE id IN (${placeholders})`,
    ...pending.map((e) => e.id)
  );

  return { uploaded: pending.length, errors: 0 };
}
