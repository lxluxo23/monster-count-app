# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y el proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [1.5.1] - 2026-02-26

### Corregido

- **Área segura** – La app ya no se superpone a los botones de navegación del móvil (gestos o botones virtuales). Se usa `SafeAreaProvider` y `useSafeAreaInsets` en el tab bar para respetar el área segura inferior.
- **Spam del escáner** – Al escanear un código que no es Monster, el mensaje de error ya no se repite constantemente. El escáner se bloquea hasta que el usuario pulse "Escanear de nuevo".
- **Feedback al registrar** – Al escanear correctamente una Monster, se muestra un overlay de éxito con el nombre del sabor durante 1,5 s antes de cerrar el modal.
- **Sincronización de eliminados** – Al borrar un registro, ahora se espera correctamente el delete en Supabase. Si falla (offline), se encola en `pending_deletes` y se reintenta en el próximo sync. Evita que los registros eliminados vuelvan al recargar la app.
- **Botón atrás en modales** – El botón atrás de Android cierra correctamente el perfil público, la info nutricional, Ajustes, el escáner y las estadísticas (uso de `onRequestClose` en lugar de `BackHandler`).

### Añadido

- **Códigos de barras** – Más de 100 códigos nuevos para variantes regionales (Argentina, UK, Australia, etc.): Ultra Zero White (+7), Original Green (+22), Ultra Blue Hawaiian (+1), Classic Zero Sugar (+8), Mango Loco (+58), Aussie Lemonade (+27).

### Base de datos

- **SQLite** – Migración v5: tabla `pending_deletes` para reintentar deletes fallidos en Supabase.

---

## [1.5.0] - 2026-02-26

### Añadido

- **Stats clicables** – Tocar "Hoy" o "Total" en Inicio abre el modal de estadísticas detalladas al instante.
- **Meta diaria** – Objetivo de latas al día configurable en Ajustes (0–5, 0 = desactivado). Barra de progreso en Inicio cuando la meta está activa. Mensaje "¡Meta cumplida!" al alcanzarla.
- **Escáner de códigos de barras** – Botón central elevado en el tab bar (estilo COPEC) que abre la cámara para escanear el código de la lata. Registro automático si el código está en la base de datos. Soporta UPC/EAN de los 6 sabores (Ultra Zero White, Original Green, Ultra Blue Hawaiian, Classic Zero Sugar, Mango Loco, Aussie Lemonade).
- **Campo `source` en entries** – Nuevo campo `manual` | `camera` para distinguir el origen del registro. Las marcaciones por cámara se consideran más verificables (lata física en mano). Visible en estadísticas como "Verificadas (cámara)".
- **Límite anti-trampos** – Máximo 2 registros cada 10 minutos (fijo en código, no configurable). Evita añadir demasiadas latas en poco tiempo.
- **Hint de long press** – Texto "Mantén pulsado para ver info nutricional" debajo del grid de Monsters.

### Cambiado

- **Jerarquía visual en Home** – Hero más compacto (título 26px, subtítulo 15px) para dar más protagonismo a las stats.
- **Grid uniforme** – Altura fija de 150px en los MonsterChips para un diseño consistente.
- **Tab bar personalizado** – `CustomTabBar` con 5 tabs: Inicio, Historial, [Escáner], Comunidad, Perfil. El botón central abre el escáner sin navegar.
- **Rate limit** – Eliminado de Ajustes; ahora siempre activo (2 en 10 min).

### Corregido

- **Migración SQLite v4** – Paso de reparación que comprueba si la columna `source` existe y la añade si falta. Evita el error "table entries has no column named source" en instalaciones donde la migración falló previamente.

### Base de datos

- **SQLite** – Migración v4: columna `source TEXT NOT NULL DEFAULT 'manual'` en `entries`.
- **Supabase** – Migración en `docs/supabase-migrations.sql` (sección 5): columna `source` en tabla `entries`.

### Dependencias

- `expo-camera` – Para escaneo de códigos de barras (UPC, EAN-13, etc.).

---

## [1.4.0] - 2026-02-24

### Añadido

- **Sistema de internacionalización (i18n)** – Integración de `i18next` + `react-i18next` + `expo-localization`. Archivos de locale para Español (es), Inglés (en) y Portugués (pt). Todos los textos de la app (tabs, pantallas, logros, meses, días, notificaciones, nombres de monsters, etc.) externalizados y traducidos a los tres idiomas.
- **Modal de detalle de Monster** – Nuevo `MonsterDetailModal` accesible con _long press_ sobre cualquier chip en la pantalla Inicio. Muestra imagen, descripción, "leyenda" del producto e información nutricional completa (volumen, calorías, cafeína, azúcar, sodio) con aviso de consumo máximo recomendado.
- **Datos nutricionales** – Nuevo tipo `MonsterNutrition` (kcal, caffeine mg, sugar g, sodium mg, volume ml) añadido a `MonsterType` y rellenado para los 6 sabores disponibles.
- **Privacidad en el ranking** – Nueva sección en Ajustes (solo usuarios autenticados) con un toggle para ocultar el nombre del Top bebedores de la comunidad. Persiste en SQLite y se sincroniza con la columna `show_in_ranking` de `profiles` en Supabase.
- **Top bebedores en Comunidad** – Ranking de usuarios con más latas registradas (top 10), con medallas 🥇🥈🥉 y barra de progreso relativa. Sólo aparecen usuarios con `show_in_ranking = true`.
- **Long press en MonsterChip** – Nuevo prop `onLongPress` con `delayLongPress: 400` para abrir el modal de detalle.

### Corregido

- **Notificaciones Android silenciosas** – En Android 8+ (API 26) todas las notificaciones locales requieren un canal explícito. `notificationService.ts` nunca llamaba a `setNotificationChannelAsync`, por lo que el SO descartaba silenciosamente los recordatorios diarios. Se añade `ensureAndroidChannel()` que crea el canal `daily-reminder` con importancia `HIGH` antes de solicitar permiso o programar cualquier notificación.
- **Eliminación no sincronizada** – Al borrar un entry localmente (`remove()` en `useHistory`), la entrada también se elimina de la tabla `entries` de Supabase cuando el usuario está autenticado.

### Cambiado

- **Nombres de Monster localizados** – `getMonsterName()` ahora lee de i18n (`monsters.<key>.name`) en lugar de la constante `name` hardcodeada en el objeto; `name` se elimina de `MonsterType`.
- **`usePreferences` → `useDisplayName`** – Hook refactorizado con lógica de sincronización bidireccional con `profiles.display_name` en Supabase (carga inicial SQLite → sync al autenticarse → escritura simultánea local + cloud).
- **Menú de Perfil tipado** – Las acciones del menú usan el tipo `MenuAction` (`'edit' | 'stats' | 'settings' | 'logout'`) en lugar de strings de etiqueta, eliminando comparaciones frágiles.
- **Formato de fecha localizado en Historial** – `formatDate()` detecta el idioma activo y pasa el locale correspondiente (`pt-BR`, `en`, `es`) a `Intl.DateTimeFormat`.
- **Estadísticas i18n** – Etiquetas de días de la semana, meses y bloques horarios en `useStats` y `StatsScreen` provienen del sistema de traducciones.
- **Logros i18n** – Títulos y descripciones de los 9 logros en `useAchievements` provienen de las traducciones.
- Los usuarios con `show_in_ranking = false` quedan excluidos de la query de `profiles` en `useGlobalStats`.

### Dependencias

- `i18next` ^25.8.13
- `react-i18next` ^16.5.4
- `expo-localization` ~17.0.8

---

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

[1.5.0]: https://github.com/lxluxo23/monster-count-app/releases/tag/v1.5.0
[1.4.0]: https://github.com/lxluxo23/monster-count-app/releases/tag/v1.4.0
[1.3.0]: https://github.com/lxluxo23/monster-count-app/releases/tag/v1.3.0
[1.0.0]: https://github.com/lxluxo23/monster-count-app/releases/tag/v1.0.0
