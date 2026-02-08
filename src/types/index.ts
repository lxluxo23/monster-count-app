/**
 * Entrada del historial: una lata registrada.
 */
export interface HistoryEntry {
  id: string;
  monsterId: string;
  date: string; // ISO
}

import type { ImageSourcePropType } from 'react-native';

/**
 * Tipo de Monster (sabor/variante).
 * Para poner foto: añade la imagen en assets/monsters/ (ej. classic.png) y usa:
 * image: require('../../assets/monsters/classic.png')
 */
export interface MonsterType {
  id: string;
  name: string;
  color: string;
  /** Imagen local: require('../../assets/monsters/tu-imagen.png') */
  image?: ImageSourcePropType;
}
