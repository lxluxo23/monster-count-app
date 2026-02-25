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
export interface MonsterNutrition {
  kcal: number;
  caffeine: number; // mg
  sugar: number;    // g
  sodium: number;   // mg
  volume: number;   // ml
}

export interface MonsterType {
  id: string;
  name?: string;
  color: string;
  /** Imagen local: require('../../assets/monsters/tu-imagen.png') */
  image?: ImageSourcePropType;
  description?: string;
  legend?: string;
  nutrition?: MonsterNutrition;
}
