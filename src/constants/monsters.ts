import i18n from '../i18n';
import type { MonsterType } from '../types';

export const MONSTER_I18N_KEY: Record<string, string> = {
  'ultra-zero-white': 'ultraZeroWhite',
  'original-green': 'originalGreen',
  'ultra-blue-hawaiian': 'ultraBlueHawaiian',
  'classic-zero-sugar': 'classicZeroSugar',
  'mango-loco': 'mangoLoco',
  'aussie-lemonade': 'aussieLemonade',
};

export const MONSTER_TYPES: readonly MonsterType[] = [
  {
    id: 'ultra-zero-white',
    color: '#ECF0F1',
    image: require('../../assets/monsters/ultra-zero-white.webp'),
    nutrition: { kcal: 5, caffeine: 150, sugar: 0, sodium: 200, volume: 500 },
  },
  {
    id: 'original-green',
    color: '#2ECC71',
    image: require('../../assets/monsters/original-green.webp'),
    nutrition: { kcal: 228, caffeine: 160, sugar: 55, sodium: 370, volume: 500 },
  },
  {
    id: 'ultra-blue-hawaiian',
    color: '#3498DB',
    image: require('../../assets/monsters/ultra-blue-hawaiian.webp'),
    nutrition: { kcal: 5, caffeine: 150, sugar: 0, sodium: 200, volume: 500 },
  },
  {
    id: 'classic-zero-sugar',
    color: '#BDC3C7',
    image: require('../../assets/monsters/classic-zero-sugar.webp'),
    nutrition: { kcal: 15, caffeine: 140, sugar: 0, sodium: 240, volume: 500 },
  },
  {
    id: 'mango-loco',
    color: '#F39C12',
    image: require('../../assets/monsters/mango-loco.webp'),
    nutrition: { kcal: 210, caffeine: 160, sugar: 50, sodium: 180, volume: 500 },
  },
  {
    id: 'aussie-lemonade',
    color: '#F7DC6F',
    image: require('../../assets/monsters/aussie-lemonade.webp'),
    nutrition: { kcal: 5, caffeine: 150, sugar: 0, sodium: 150, volume: 500 },
  },
];

export function getMonsterName(id: string): string {
  const key = MONSTER_I18N_KEY[id];
  if (key) return i18n.t(`monsters.${key}.name`);
  return id;
}
