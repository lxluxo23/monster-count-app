# Monster Counter

App para registrar y llevar la cuenta de latas de **Monster Energy** por tipo. Desarrollada con React Native (Expo), sincronización en la nube con Supabase y datos guardados primero en tu dispositivo (offline-first).

![Expo](https://img.shields.io/badge/Expo-54-black?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-cloud%20sync-3ECF8E?logo=supabase)
![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android)

---

## Funcionalidades

### Inicio
- Grid de **6 sabores** de Monster con imágenes reales (Ultra Zero White, Original Green, Ultra Blue Hawaiian, Classic Zero Sugar, Mango Loco, Aussie Lemonade).
- Stats del día y total general (clicables para ver estadísticas detalladas).
- **Meta diaria** configurable (0-5 latas) con barra de progreso.
- Botón flotante (FAB) para añadir registros rápidamente.
- **Long press** en cualquier sabor para ver información nutricional completa.

### Escáner de Códigos de Barras
- Botón central elevado en el tab bar para escanear latas con la cámara.
- Soporta **130+ códigos** UPC/EAN de variantes regionales (Argentina, UK, Australia, etc.).
- Registro automático si el código coincide. Feedback visual al escanear.

### Historial
- Lista de todas las entradas con tipo, fecha/hora y fuente (manual/cámara).
- Swipe para eliminar (con sync a Supabase si está autenticado).

### Comunidad
- **9 logros** desbloqueables con progreso (primera lata, 10/50/100, racha 7/30 días, coleccionista, madrugador, noctámbulo).
- **Ranking global** de sabores más populares.
- **Top 10 bebedores** con medallas (respeta la privacidad de cada usuario).

### Estadísticas Detalladas
- KPIs: total, verificadas (cámara), días activos, promedio diario y semanal.
- Gráfico de barras de los últimos 7 días.
- Distribución horaria en 4 bloques (madrugada/mañana/tarde/noche).
- Tendencia de los últimos 6 meses.
- Récord personal (máximo en un día).
- Desglose por sabor con barras de progreso.

### Perfil
- Avatar y nombre editables (sincronizados con Google si está autenticado).
- Resumen rápido: total, favorito, racha de días consecutivos.
- Menú: Mis datos, Estadísticas, Ajustes, Cerrar sesión.

### Más
- **Internacionalización (i18n)**: español, inglés, portugués, chino simplificado y japonés. Detección automática del idioma del dispositivo.
- **Sincronización cloud**: offline-first con SQLite como fuente de verdad y Supabase como backend. Sync bidireccional al iniciar sesión.
- **Autenticación**: Google Sign-In nativo (bottom sheet del sistema, sin browser).
- **Notificaciones**: recordatorio diario configurable (presets de hora).
- **Privacidad**: toggles para ocultar nombre en ranking, logros y estadísticas.
- **Tema oscuro** nativo.
- **Rate limit**: máximo 2 registros cada 10 minutos (anti-spam).

---

## Stack Técnico

| Categoría | Tecnología |
|-----------|------------|
| Framework | React Native 0.81 + Expo 54 (New Architecture) |
| Lenguaje | TypeScript 5.9 (strict) |
| Base de datos local | expo-sqlite v16 (WAL mode) |
| Backend | Supabase (auth, DB, RLS) |
| Autenticación | @react-native-google-signin/google-signin v16 |
| Navegación | @react-navigation/bottom-tabs v7 |
| i18n | i18next + react-i18next + expo-localization |
| Notificaciones | expo-notifications |
| Escáner | expo-camera v17 |

---

## Requisitos

- **Node.js** 18+
- **npm** o **yarn**
- **Expo Go** (para probar en dispositivo) o emulador Android/iOS
- **EAS CLI** (para builds de producción): `npm install -g eas-cli`

---

## Instalación

```bash
git clone https://github.com/lxluxo23/monster-count-app.git
cd monster-count-app
npm install
```

Crea un archivo `.env` en la raíz con las variables de Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=tu_url
EXPO_PUBLIC_SUPABASE_KEY=tu_anon_key
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=tu_web_client_id
```

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo Expo |
| `npm run android` | Abre en emulador/dispositivo Android |
| `npm run ios` | Abre en simulador iOS (solo macOS) |
| `npm run web` | Abre en navegador |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run build:preview` | Build APK de prueba (EAS) |
| `npm run build:prod` | Build AAB de producción (EAS) |
| `npm run prebuild` | Genera proyecto nativo limpio |

---

## Estructura del Proyecto

```
├── src/
│   ├── App.tsx                    # Navegación (5 tabs + escáner central)
│   ├── components/                # StatCard, MonsterChip, HistoryCard, CustomTabBar
│   ├── constants/
│   │   ├── monsters.ts            # 6 tipos Monster + datos nutricionales
│   │   ├── barcodes.ts            # 130+ códigos UPC/EAN
│   │   └── env.ts                 # Variables de entorno
│   ├── contexts/
│   │   └── AuthContext.tsx         # Google Sign-In + session management
│   ├── db/
│   │   ├── migrations.ts          # Migraciones SQLite v1-v5
│   │   ├── schema.ts              # Constantes SQL
│   │   ├── sqliteHistoryRepository.ts
│   │   └── sqlitePreferencesRepository.ts
│   ├── hooks/                     # useHistory, useAchievements, useDailyGoal,
│   │                              # useNotifications, usePrivacy, useGlobalStats...
│   ├── i18n/
│   │   ├── index.ts               # Configuración i18next
│   │   └── locales/               # es, en, pt, zh, ja
│   ├── lib/
│   │   └── supabase.ts            # Cliente Supabase singleton
│   ├── screens/                   # Home, History, Comunidad, Profile,
│   │                              # Stats, Settings, Scanner, Detail modales
│   ├── services/
│   │   ├── syncService.ts         # Push/pull entries + pending deletes
│   │   ├── achievementSyncService.ts
│   │   └── notificationService.ts
│   ├── theme/                     # Colores, spacing
│   ├── types/                     # HistoryEntry, MonsterType, MonsterNutrition
│   └── utils/
│       └── achievementUtils.ts    # Cálculo de logros reutilizable
├── assets/                        # Iconos, splash, imágenes de Monster
├── docs/                          # Guías, migraciones SQL, capturas
├── privacy-site/                  # Sitio estático de política de privacidad
├── app.json                       # Configuración Expo (v1.5.1)
├── eas.json                       # Perfiles EAS Build
└── BUILD-INSTRUCTIONS.md          # Cómo compilar APK/AAB
```

---

## Arquitectura

- **Offline-first**: SQLite es la fuente de verdad; Supabase sincroniza en segundo plano.
- **Patrón Repository**: interfaces `IHistoryRepository` / `IPreferencesRepository` con implementaciones SQLite intercambiables.
- **Custom hooks**: toda la lógica de negocio encapsulada en hooks (`useHistory`, `useAchievements`, etc.).
- **AuthProvider > SQLiteProvider > AppContent**: jerarquía de contextos.
- **Sync bidireccional**: push con upsert (idempotente) + pull con INSERT OR IGNORE + pending deletes para reintentos offline.
- **RLS en Supabase**: cada usuario solo ve/modifica sus propios datos.

---

## Base de Datos SQLite

Archivo: `monster_counter.db` — Versión actual: **5** (WAL mode)

| Tabla | Descripción |
|-------|-------------|
| `entries` | Registros: id, monster_id, date, synced, source |
| `preferences` | Key-value: userName, dailyGoal, notificaciones, privacidad |
| `pending_deletes` | Cola de reintentos para deletes fallidos en Supabase |

---

## Documentación

- [Compilar para Android (EAS / local)](./BUILD-INSTRUCTIONS.md)
- [Capturas para Play Store](./docs/PLAY-STORE-SCREENSHOTS.md)
- [Changelog](./CHANGELOG.md)
- [Política de privacidad](./privacy-policy.html)
- [Contribuir](./CONTRIBUTING.md)
- [Seguridad](./SECURITY.md)

---

## Publicación

- **Android**: configurado para EAS Build (APK preview, AAB production). Ver [BUILD-INSTRUCTIONS.md](./BUILD-INSTRUCTIONS.md).
- **Package**: `com.monstercounter.app`
- **Versión actual**: 1.5.1 (versionCode 6)

---

## Licencia

Proyecto privado. Reservados todos los derechos.

---

## Repositorio

[https://github.com/lxluxo23/monster-count-app](https://github.com/lxluxo23/monster-count-app)
