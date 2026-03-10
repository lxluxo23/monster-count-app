import i18n from '../i18n';
import type { MonsterType } from '../types';

export const MONSTER_I18N_KEY: Record<string, string> = {
  'ultra-zero-white': 'ultraZeroWhite',
  'original-green': 'originalGreen',
  'ultra-blue-hawaiian': 'ultraBlueHawaiian',
  'classic-zero-sugar': 'classicZeroSugar',
  'mango-loco': 'mangoLoco',
  'aussie-lemonade': 'aussieLemonade',
  'ultra-peachy-keen': 'ultraPeachyKeen',
  'ultra-paradise': 'ultraParadise',
  'ultra-golden-pineapple': 'ultraGoldenPineapple',
  'juice-ripper': 'juiceRipper',
  'juice-pipeline-punch': 'juicePipelinePunch',
  'juice-pacific-punch': 'juicePacificPunch',
  'juice-bad-apple': 'juiceBadApple',
  'juice-khaotic': 'juiceKhaotic',
  'ultra-violet': 'ultraViolet',
  'ultra-rosa': 'ultraRosa',
  'ultra-watermelon': 'ultraWatermelon',
  'ultra-strawberry-dreams': 'ultraStrawberryDreams',
  'ultra-fiesta-mango': 'ultraFiestaMango',
};

export const MONSTER_TYPES: readonly MonsterType[] = [
  {
    id: 'ultra-zero-white',
    color: '#ECF0F1',
    image: require('../../assets/monsters/ultra-zero-white.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 }, // Sodio ajustado a estándar Ultra
    audio: [
      3650206152, // Snow Strippers - Under Your Spell 
      3598936822, // PureMiND, HARDSTYLE CVNT, Agartha - Down Under
      2967537321, // Pastel Ghost - Iris
    ],
  },
  {
    id: 'original-green',
    color: '#2ECC71',
    image: require('../../assets/monsters/original-green.webp'),
    nutrition: { kcal: 237, caffeine: 160, sugar: 55, sodium: 380, volume: 500 }, // Leve ajuste en kcal totales
    audio: [
      94613616, // Limp Bizkit - Break Stuff
      676162, // Linkin Park - One Step Closer
      15177096, // Rage Against The Machine - Killing In The Name
      859699 // System Of A Down - Chop Suey!
    ],
  },
  {
    id: 'ultra-blue-hawaiian',
    color: '#3498DB',
    image: require('../../assets/monsters/ultra-blue-hawaiian.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 },
    audio: [
      4286051, // Empire Of The Sun - Walking On A Dream
      15546835, // Foster The People - Houdini
      92198180, // M83 - Midnight City
      4231436, // Bag Raiders - Shooting Stars
    ],
  },
  {
    id: 'classic-zero-sugar',
    color: '#BDC3C7',
    image: require('../../assets/monsters/classic-zero-sugar.webp'),
    nutrition: { kcal: 15, caffeine: 150, sugar: 0, sodium: 230, volume: 500 }, // Cafeína estandarizada a 150mg
    audio: [
      131744046, // New Order - Blue Monday
      68515055, // Depeche Mode - Enjoy The Silence
      4255662, // Soft Cell - Tainted Love
      3152080, // The Human League - Don't You Want Me 
    ],
  },
  {
    id: 'mango-loco',
    color: '#F39C12',
    image: require('../../assets/monsters/mango-loco.webp'),
    nutrition: { kcal: 240, caffeine: 160, sugar: 59, sodium: 230, volume: 500 }, // Mango Loco es más denso en azúcar/kcal
    audio: [
      1741494287, // Bad Bunny - Moscow Mule
      903698352, // J Balvin - Amarillo
      98876126, //Major Lazer, MØ, DJ Snake - Lean On (feat. MØ & DJ Snake)
      82241402, // Santana, Rob Thomas - Smooth (feat. Rob Thomas)
    ],
  },
  {
    id: 'aussie-lemonade',
    color: '#F7DC6F',
    image: require('../../assets/monsters/aussie-lemonade.webp'),
    nutrition: { kcal: 105, caffeine: 160, sugar: 24, sodium: 330, volume: 500 }, // Sodio ajustado
    audio: [
      103052662, // Tame Impala - The Less I Know The Better
      3598936822, // PureMiND, HARDSTYLE CVNT, Agartha - Down Under
      779266672, // Skegss - Up In The Clouds
      1182053, // Wolfmother - Joker & The Thief

    ],
  },
  {
    id: 'ultra-peachy-keen',
    color: '#FADBD8',
    image: require('../../assets/monsters/ultra-peachy-keen.webp'),
    nutrition: { kcal: 10, caffeine: 150, sugar: 0, sodium: 320, volume: 500 }, // Bajado a 10 kcal (estándar Ultra)
    audio: [
      872345332, // Tame Impala - Lost In Yesterday
      830336922, // Harry Styles - Watermelon Sugar
      1040154662, // Glass Animals - Heat Waves
      670812 // The Doors - Peace Frog
    ],
  },
  {
    id: 'ultra-paradise',
    color: '#82E0AA',
    image: require('../../assets/monsters/ultra-paradise.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 }, // Estandarizado con la línea Ultra
    audio: [
      106314290, // Kygo, Conrad Sewell - Firestone
      4286053, // Empire Of The Sun - We Are The People
      88936747 // Calvin Harris - Summer
    ],
  },
  {
    id: 'ultra-golden-pineapple',
    color: '#F4D03F',
    image: require('../../assets/monsters/ultra-golden-pineapple.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 },
    audio: [
      67238728, // Daft Punk - Give Life Back to Music
      1475651602, // Purple Disco Machine, Sophie and the Giants - Hypnotized
      145426932 // Jamiroquai - Cloud 9
    ],
  },
  {
    id: 'juice-ripper',
    color: '#E74C3C',
    image: require('../../assets/monsters/juice-ripper.webp'),
    nutrition: { kcal: 210, caffeine: 160, sugar: 50, sodium: 100, volume: 500 }, // Ripper varía mucho, estos son valores de la versión Juice actual
    audio: [
      137233986, // The Offspring - The Kids Aren't Alright
      797718, // Pendulum - Propane Nightmares
      125173830 // blink-182 - First Date
    ],
  },
  {
    id: 'juice-pipeline-punch',
    color: '#E67E22',
    image: require('../../assets/monsters/juice-pipeline-punch.webp'),
    nutrition: { kcal: 225, caffeine: 160, sugar: 46, sodium: 100, volume: 500 },
    audio: [
      539765022, // Jack Johnson - Upside Down
      1211140052, // Sticky Fingers - How To Fly
      2493802811 // Surfaces - Sunday Best
    ],
  },
  {
    id: 'juice-pacific-punch',
    color: '#E74C3C',
    image: require('../../assets/monsters/juice-pacific-punch.webp'),
    nutrition: { kcal: 210, caffeine: 160, sugar: 50, sodium: 100, volume: 500 },
    audio: [
      378381821, // The Interrupters - Take Back The Power
      772020, //Dropkick Murphys - I'm Shipping Up To Boston
      1480210192 // Rumjacks - An Irish Pub Song
    ],
  },
  {
    id: 'juice-bad-apple',
    color: '#27AE60',
    image: require('../../assets/monsters/juice-bad-apple.webp'),
    nutrition: { kcal: 210, caffeine: 160, sugar: 50, sodium: 100, volume: 500 },
    audio: [
      70322130, // Arctic Monkeys - Do I Wanna Know?
      82917986, //Royal Blood - Out of the Black
      1092290482 //The White Stripes - Apple Blossom
    ],
  },
  {
    id: 'juice-khaotic',
    color: '#8E44AD',
    image: require('../../assets/monsters/juice-khaotic.webp'),
    nutrition: { kcal: 210, caffeine: 160, sugar: 50, sodium: 100, volume: 500 },
    audio: [
      3131286, //Beastie Boys - Sabotage
      14628999, //Linkin Park - Faint

    ],
  },
  {
    id: 'ultra-violet',
    color: '#9B59B6',
    image: require('../../assets/monsters/ultra-violet.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 },
    audio: [
      4858204, // Prince - Purple Rain 
      64920072, // Kavinsky - Nightcall
      819736552 //The Weeknd - Blinding Lights
    ],
  },
  {
    id: 'ultra-rosa',
    color: '#F8BBD9',
    image: require('../../assets/monsters/ultra-rosa.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 },
    audio: [
      797228462, // Doja Cat - Say So
      1124841682, // Dua Lipa - Levitating
      1148585682 // Kali Uchis - Telepatía
    ],
  },
  {
    id: 'ultra-watermelon',
    color: '#E91E63',
    image: require('../../assets/monsters/ultra-watermelon.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 },
    audio: [
      830336922, // Harry Styles - Watermelon Sugar
      602456552, //Post Malone - Sunflower
      1087667882
    ],
  },
  {
    id: 'ultra-strawberry-dreams',
    color: '#FFCDD2',
    image: require('../../assets/monsters/ultra-strawberry-dreams.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 },
    audio: [
      728760222, // Bakar - Hell N Back
      3420418861, //Clairo - Sofia
      2579890802 //Men I Trust - Show Me How
    ],
  },
  {
    id: 'ultra-fiesta-mango',
    color: '#FF9800',
    image: require('../../assets/monsters/ultra-fiesta-mango.webp'),
    nutrition: { kcal: 11, caffeine: 150, sugar: 0, sodium: 370, volume: 500 },
    audio: [
      1741494297, //Bad Bunny - Después de la Playa
      1415334812, //J Balvin - In Da Getto
      60842360 // Swedish House Mafia - Don't You Worry Child
    ],
  },
];
export function getMonsterName(id: string): string {
  const key = MONSTER_I18N_KEY[id];
  if (key) return i18n.t(`monsters.${key}.name`);
  return id;
}
