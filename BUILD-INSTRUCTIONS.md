# 📱 Compilar Monster Counter para Android

## Prerrequisitos

1. **Cuenta de Expo** (gratis): https://expo.dev/signup
2. **Android Studio** instalado (opcional, solo si quieres compilar localmente)
3. **Java JDK 17+** instalado

---

## Método 1: EAS Build (Recomendado - en la nube)

### Paso 1: Instalar EAS CLI

```bash
npm install -g eas-cli
```

### Paso 2: Login en Expo

```bash
eas login
```

### Paso 3: Configurar el proyecto

```bash
eas build:configure
```

### Paso 4: Generar APK para probar (preview)

```bash
eas build --platform android --profile preview
```

Este comando crea un **APK** que puedes instalar directamente en tu móvil para probar.

### Paso 5: Generar AAB para Play Store (production)

```bash
eas build --platform android --profile production
```

Este comando crea un **App Bundle (AAB)** optimizado para subir a Google Play Store.

**Notas:**

- El build se hace en servidores de Expo (gratis con límites)
- Te pedirá crear una keystore (di que sí, Expo la gestiona)
- Tarda 10-20 minutos
- Al terminar, te da un link para descargar el APK/AAB

---

## Método 2: Compilación local con Android Studio

### Paso 1: Generar carpeta android

```bash
npx expo prebuild --platform android
```

### Paso 2: Abrir en Android Studio

1. Abre Android Studio
2. File → Open → Selecciona la carpeta `android` del proyecto
3. Espera a que sincronice Gradle

### Paso 3: Compilar APK

En Android Studio:

- Build → Build Bundle(s) / APK(s) → Build APK(s)
- El APK estará en: `android\app\build\outputs\apk\release\app-release.apk`

### Paso 4: Compilar AAB para Play Store

En Android Studio:

- Build → Build Bundle(s) / APK(s) → Build Bundle(s)
- El AAB estará en: `android\app\build\outputs\bundle\release\app-release.aab`

**Importante:** Para compilar en release necesitas una keystore. Sigue la [guía oficial de Expo](https://docs.expo.dev/app-signing/local-credentials/).

---

## Método 3: Build local con CLI (más rápido)

### Compilar APK

```bash
cd android
./gradlew assembleRelease
```

APK en: `android\app\build\outputs\apk\release\app-release.apk`

### Compilar AAB

```bash
cd android
./gradlew bundleRelease
```

AAB en: `android\app\build\outputs\bundle\release\app-release.aab`

---

## 🔑 Firmar la app (necesario para Play Store)

Si usas **EAS Build**, Expo maneja esto automáticamente.

Si compilas **localmente**, necesitas:

1. **Generar keystore** (solo una vez):

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore monster-counter.keystore -alias monster-counter -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configurar en** `android/gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=monster-counter.keystore
MYAPP_UPLOAD_KEY_ALIAS=monster-counter
MYAPP_UPLOAD_STORE_PASSWORD=tu_password
MYAPP_UPLOAD_KEY_PASSWORD=tu_password
```

3. **Modificar** `android/app/build.gradle` para usar la keystore en signingConfigs.

---

## 📤 Subir a Google Play Store

1. Ve a: https://play.google.com/console
2. Crea una nueva aplicación
3. Rellena la ficha de Store (descripción, capturas, etc.)
4. Sube el **AAB** en "Producción" → "Crear versión"
5. Completa el cuestionario de contenido
6. Envía para revisión

**Tiempo de revisión:** 1-3 días aprox.

---

## 🚀 Recomendación

Para tu primera build y subirla a Play Store:

```bash
# 1. Instala EAS
npm install -g eas-cli

# 2. Login
eas login

# 3. Configura
eas build:configure

# 4. Compila AAB para Play Store
eas build --platform android --profile production
```

Expo te guía en cada paso y gestiona la keystore automáticamente. Es la forma más sencilla para principiantes.
