import type { MonsterType } from '../types';

export const MONSTER_TYPES: readonly MonsterType[] = [
  {
    id: 'ultra-zero-white',
    name: 'Monster Ultra Zero White',
    color: '#ECF0F1',
    image: require('../../assets/monsters/ultra-zero-white.webp'),
  },
  {
    id: 'original-green',
    name: 'Monster Original Green OG',
    color: '#2ECC71',
    image: require('../../assets/monsters/original-green.webp'),
  },
  {
    id: 'ultra-blue-hawaiian',
    name: 'Monster Ultra Blue Hawaiian',
    color: '#3498DB',
    image: require('../../assets/monsters/ultra-blue-hawaiian.webp'),
  },
  {
    id: 'classic-zero-sugar',
    name: 'Monster Energy Classic Zero Sugar',
    color: '#BDC3C7',
    image: require('../../assets/monsters/classic-zero-sugar.webp'),
  },
  {
    id: 'mango-loco',
    name: 'Juice Monster Mango Loco',
    color: '#F39C12',
    image: require('../../assets/monsters/mango-loco.webp'),
  },
];

export function getMonsterName(id: string): string {
  return MONSTER_TYPES.find((m) => m.id === id)?.name ?? id;
}
