# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y el proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

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

[1.0.0]: https://github.com/tu-usuario/monster-counter/releases/tag/v1.0.0
