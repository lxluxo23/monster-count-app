/**
 * Clave de día en hora local para calcular rachas y agrupar entries.
 * Formato: YYYY-MM-DD (zero-padded).
 */
export function localDayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
