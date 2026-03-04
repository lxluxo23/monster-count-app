import { localDayKey } from './dateUtils';

interface EntryWithDate {
  date: string;
}

/**
 * Calcula la racha de días consecutivos (incluyendo hoy) con al menos un entry.
 */
export function calculateStreak(history: EntryWithDate[]): number {
  if (history.length === 0) return 0;
  const dayKeys = new Set(history.map((e) => localDayKey(new Date(e.date))));
  let count = 0;
  const ref = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(ref);
    d.setDate(d.getDate() - i);
    if (dayKeys.has(localDayKey(d))) {
      count++;
    } else {
      break;
    }
  }
  return count;
}
