/**
 * Mapeo de códigos de barras (UPC/EAN) a monster_id.
 * Normalizamos quitando ceros a la izquierda para comparar.
 * Fuentes: upcitemdb.com, Open Food Facts, variantes regionales.
 */
const RAW_MAP: Record<string, string> = {
  // Ultra Zero White
  '70847012474': 'ultra-zero-white',
  '070847012474': 'ultra-zero-white',
  '70847021964': 'ultra-zero-white',
  '070847021964': 'ultra-zero-white',
  // Original Green
  '70847811169': 'original-green',
  '070847811169': 'original-green',
  // Ultra Blue Hawaiian
  '70847016205': 'ultra-blue-hawaiian',
  '070847016205': 'ultra-blue-hawaiian',
  // Classic Zero Sugar
  '70847000037': 'classic-zero-sugar',
  '070847000037': 'classic-zero-sugar',
  '70847000044': 'classic-zero-sugar',
  '070847000044': 'classic-zero-sugar',
  // Mango Loco
  '70847029014': 'mango-loco',
  '070847029014': 'mango-loco',
  '70847029007': 'mango-loco',
  '070847029007': 'mango-loco',
  // Aussie Lemonade (EAN)
  '5060947548602': 'aussie-lemonade',
};

function normalizeBarcode(data: string): string {
  return data.replace(/^0+/, '') || data;
}

export function barcodeToMonsterId(data: string): string | null {
  const normalized = normalizeBarcode(data);
  return RAW_MAP[normalized] ?? RAW_MAP[data] ?? null;
}
