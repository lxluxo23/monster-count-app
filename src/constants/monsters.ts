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
    audio: [3650206152, 3598936822],
  },
  {
    id: 'original-green',
    color: '#2ECC71',
    image: require('../../assets/monsters/original-green.webp'),
    nutrition: { kcal: 228, caffeine: 160, sugar: 55, sodium: 370, volume: 500 },
    audio: [94613616],
  },
  {
    id: 'ultra-blue-hawaiian',
    color: '#3498DB',
    image: require('../../assets/monsters/ultra-blue-hawaiian.webp'),
    nutrition: { kcal: 5, caffeine: 150, sugar: 0, sodium: 200, volume: 500 },
    audio: [4286051],
  },
  {
    id: 'classic-zero-sugar',
    color: '#BDC3C7',
    image: require('../../assets/monsters/classic-zero-sugar.webp'),
    nutrition: { kcal: 15, caffeine: 140, sugar: 0, sodium: 240, volume: 500 },
    audio: [131744046],
  },
  {
    id: 'mango-loco',
    color: '#F39C12',
    image: require('../../assets/monsters/mango-loco.webp'),
    nutrition: { kcal: 210, caffeine: 160, sugar: 50, sodium: 180, volume: 500 },
    audio: [1741494287],
  },
  {
    id: 'aussie-lemonade',
    color: '#F7DC6F',
    image: require('../../assets/monsters/aussie-lemonade.webp'),
    nutrition: { kcal: 105, caffeine: 155, sugar: 24, sodium: 175, volume: 500 },
    audio: [809405282,3598936822],
  },
];

export function getMonsterName(id: string): string {
  const key = MONSTER_I18N_KEY[id];
  if (key) return i18n.t(`monsters.${key}.name`);
  return id;
}
