# Monster Counter

App para registrar y llevar la cuenta de latas de **Monster Energy** por tipo. Desarrollada con React Native (Expo) y datos guardados solo en tu dispositivo.

![Expo](https://img.shields.io/badge/Expo-54-black?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

---

## Características

- **Inicio**: elegir tipo de Monster (Ultra Zero White, Original Green OG, Ultra Blue Hawaiian, Classic Zero Sugar, Mango Loco), ver totales del día y total general, y añadir registros con un botón flotante (FAB).
- **Historial**: lista de todas las entradas con tipo y fecha/hora.
- **Perfil**: resumen (total, hoy, Monster favorito), menú (Mis datos, Notificaciones, Estadísticas detalladas, Acerca de, Ajustes), editar nombre y ver estadísticas por tipo.
- **Persistencia local**: SQLite con `expo-sqlite`; los datos no se envían a ningún servidor.
- **Tema oscuro** y chips con imagen por tipo de Monster.

---

## Requisitos

- **Node.js** 18+
- **npm** o **yarn**
- **Expo Go** (para probar en dispositivo) o emulador Android/iOS

---

## Instalación

```bash
git clone https://github.com/lxluxo23/monster-count-app.git
cd monster-count-app
npm install
```

---

## Scripts

| Comando | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor de desarrollo Expo |
| `npm run android` | Abre en emulador/dispositivo Android |
| `npm run ios` | Abre en simulador iOS (solo macOS) |
| `npm run web` | Abre en navegador |

---

## Estructura del proyecto

```
├── src/
│   ├── App.tsx           # Navegación (tabs)
│   ├── components/       # StatCard, MonsterChip, HistoryCard, PrimaryButton
│   ├── constants/        # monsters.ts (tipos y imágenes)
│   ├── db/               # SQLite: schema, migrations, repositorio
│   ├── hooks/            # useHistory
│   ├── screens/          # Home, History, Profile
│   ├── theme/            # colores, spacing
│   └── types/            # tipos globales
├── assets/               # iconos, splash, imágenes por Monster
├── docs/                 # guías (capturas Play Store, etc.)
├── privacy-site/         # sitio estático de política de privacidad (Docker)
├── app.json              # configuración Expo
├── eas.json              # perfiles EAS Build
└── BUILD-INSTRUCTIONS.md  # cómo compilar APK/AAB
```

---

## Documentación

- [Compilar para Android (EAS / local)](./BUILD-INSTRUCTIONS.md)
- [Capturas para Play Store](./docs/PLAY-STORE-SCREENSHOTS.md)
- [Changelog](./CHANGELOG.md)
- [Política de privacidad](./privacy-policy.html) (los datos solo se guardan en el dispositivo)

---

## Publicación

- **Android**: configurado para EAS Build (APK preview, AAB production). Ver [BUILD-INSTRUCTIONS.md](./BUILD-INSTRUCTIONS.md).
- **Package**: `com.monstercounter.app`

---

## Licencia

Proyecto privado. Reservados todos los derechos.

---

## Repositorio

[https://github.com/lxluxo23/monster-count-app](https://github.com/lxluxo23/monster-count-app)
