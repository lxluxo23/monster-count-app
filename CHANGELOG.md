# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y el proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [1.3.0] - 2026-02-21

### Añadido

- **Pestaña Comunidad** – Nueva 4ª pestaña con dos secciones:
  - *Logros*: 9 achievements locales (primera lata, 10/50/100 latas, rachas de 7 y 30 días, coleccionista, madrugador, noctámbulo) con barra de progreso por cada uno.
  - *Comunidad*: ranking global de sabores y total de latas registradas por todos los usuarios (Supabase).
- **Estadísticas detalladas** – Pantalla fullscreen accesible desde Perfil con:
  - 4 KPIs: total, días activos, media por día activo, media semanal.
  - Column chart de los últimos 7 días.
  - Distribución horaria en 4 bloques (Madrugada / Mañana / Tarde / Noche).
  - Tendencia mensual de los últimos 6 meses.
  - Récord personal (máximo en un día).
  - Desglose de consumo por sabor con barras de color.
- **Notificaciones diarias** – Recordatorio diario configurable via `expo-notifications`. Toggle y presets de hora (9:00 / 12:00 / 18:00 / 21:00) en el modal de Ajustes. Persiste en SQLite.
- **Modal de Ajustes real** – Reemplaza los Alert.alert anteriores; bottom-sheet con sección de notificaciones y sección Acerca de.
- **Racha de días consecutivos** – Calculada en local a partir del historial SQLite; visible en Perfil.
- **Sync pull** – Al autenticarse, descarga desde Supabase los entries del usuario que no estén localmente (`INSERT OR IGNORE`). Útil en dispositivos nuevos.
- **Nuevo sabor: Monster Energy Aussie Lemonade** – 6º tipo disponible.

### Corregido

- **Bug sync rollback** – `pullEntriesFromSupabase` usaba `withTransactionAsync` que podía lanzar `cannot rollback - no transaction is active` al competir con la carga inicial. Reemplazado por inserts secuenciales directos.

### Dependencias

- `expo-notifications` ~0.29 añadida para notificaciones locales programadas.

---

## [1.0.0] - 2026-02-08

### Añadido

- **App Monster Counter** – Aplicación React Native (Expo) para registrar latas de Monster Energy.
- **Pantalla Inicio** – Selector de tipos de Monster (Ultra Zero White, Original Green OG, Ultra Blue Hawaiian, Classic Zero Sugar, Mango Loco), estadísticas Hoy/Total y FAB para añadir al contador.
- **Pantalla Historial** – Lista de registros con tipo y fecha/hora.
- **Pantalla Perfil** – Resumen (total, hoy, Monster favorito), menú (Mis datos, Notificaciones, Estadísticas detalladas, Acerca de, Ajustes), edición de nombre y modal de estadísticas por tipo.
- **Persistencia local** – SQLite (expo-sqlite) con tabla `entries` y migraciones; repositorio desacoplado para posible backend futuro.
- **TypeScript** – Tipado estricto, tipos en `src/types`, tema y constantes centralizados.
- **Tema oscuro** – Paleta en `src/theme` (colores, spacing, radius).
- **Imágenes por Monster** – Soporte de imagen por tipo en `assets/monsters/` (webp) y chips con foto en la UI.
- **Configuración para Play Store** – app.json (package, versionCode), eas.json (perfiles preview/production), política de privacidad y sitio estático (privacy-site con Docker/Nginx).
- **Documentación** – BUILD-INSTRUCTIONS.md (EAS/Android), docs/PLAY-STORE-SCREENSHOTS.md, assets/README para iconos y monsters.

### Dependencias

- expo ~54, react-native 0.81.5, react 19.1.0
- expo-sqlite ~16.0.10, @react-navigation/native y bottom-tabs 7.0.0
- TypeScript ~5.9.2

---

[1.3.0]: https://github.com/lxluxo23/monster-count-app/releases/tag/v1.3.0
[1.0.0]: https://github.com/lxluxo23/monster-count-app/releases/tag/v1.0.0
