# Capturas de pantalla para Google Play Store

## Requisitos

| Tipo | Cantidad | Relación | Tamaño mínimo | Formato |
|------|-----------|----------|---------------|---------|
| **Teléfono** | 2–8 (recomendado ≥4) | 9:16 o 16:9 | 1080 px en el lado corto | PNG/JPEG, max 8 MB |
| **Tablet 7"** | 2–8 | 9:16 o 16:9 | 320–3840 px | PNG/JPEG |
| **Tablet 10"** | 2–8 | 9:16 o 16:9 | 1080–7680 px | PNG/JPEG |

Para promocionar la app, Google recomienda **al menos 4 capturas de teléfono** con **mínimo 1080×1080 px** (en la práctica suele usarse 1080×1920 para 9:16).

---

## 1. Ejecutar la app en emulador Android

Desde la raíz del proyecto:

```bash
npx expo start
```

Luego pulsa **`a`** para abrir en el emulador Android (necesitas Android Studio con un AVD instalado).

O solo emulador:

```bash
npx expo run:android
```

**Emulador recomendado:** dispositivo tipo Pixel 6 (1080×2400) o similar. En Android Studio: **Device Manager** → crear/editar AVD → resolución que dé **1080×1920** o superior en vertical.

---

## 2. Sacar las capturas en el emulador

### Opción A: Botón del emulador

En la barra lateral derecha del emulador hay un icono de **cámara** (Take screenshot). Cada captura se guarda en la carpeta que tengas configurada (suele ser `Desktop` o la que indique el emulador).

### Opción B: Atajo de teclado

- **Windows/Linux:** `Ctrl + S` (en algunos emuladores).
- O menú **...** (tres puntos) → **Take screenshot**.

### Opción C: ADB (desde tu PC)

Con el emulador (o un dispositivo) conectado:

```bash
# Listar dispositivos
adb devices

# Captura y guardar en el PC (una por una)
adb exec-out screencap -p > screenshot1.png
adb exec-out screencap -p > screenshot2.png
```

Las imágenes suelen salir en la resolución nativa del dispositivo/emulador.

---

## 3. Pantallas que conviene capturar

1. **Inicio** – Grid de Monsters, estadísticas “Hoy” y “Total”, botón flotante si se ve.
2. **Inicio con Monster seleccionado** – Un tipo elegido y FAB visible.
3. **Historial** – Lista con al menos una entrada (añade una desde Inicio si hace falta).
4. **Perfil** – Resumen, estadísticas y menú.

Así cubres las 4 capturas mínimas recomendadas para teléfono.

---

## 4. Ajustar tamaño y relación de aspecto

Si las capturas no cumplen exactamente 9:16 o el tamaño mínimo:

- **Teléfono:** redimensionar a **1080×1920** px (9:16).
- **Tablet 7":** por ejemplo **1200×1920** px (9:16).
- **Tablet 10":** por ejemplo **1600×2560** px (9:16).

Puedes usar:

- **IrfanView / GIMP / Photoshop** (redimensionar y recortar).
- **ImageMagick** (línea de comandos):

```bash
# Redimensionar a 1080 de ancho manteniendo proporción (9:16)
magick screenshot.png -resize 1080x1920! phone-1.png

# Varias a la vez (Windows PowerShell)
Get-ChildItem screenshot*.png | ForEach-Object { magick $_.FullName -resize 1080x1920! "phone-$($_.BaseName).png" }
```

Sustituye `screenshot.png` y `phone-1.png` por tus archivos.

---

## 5. Tablets (7" y 10")

Si no tienes emulador de tablet, puedes:

1. Reutilizar las mismas capturas de teléfono y **redimensionarlas** a los tamaños de tablet (ej. 1200×1920 para 7", 1600×2560 para 10"), o  
2. Crear AVD de tablet en Android Studio (Device Manager → New Device → Tablet 7" / 10") y repetir el proceso de captura.

Google acepta las mismas imágenes redimensionadas para tablet si mantienen 16:9 o 9:16 y están dentro de los rangos de píxeles indicados.

---

## Resumen rápido

1. `npx expo start` → **a** (Android).
2. Ir a Inicio, Historial, Perfil; sacar 4+ capturas con el botón de cámara del emulador o `adb exec-out screencap -p > nombre.png`.
3. Redimensionar a 1080×1920 (9:16) para teléfono.
4. Subir en Play Console en “Capturas de pantalla de teléfono” (y tablet si aplica).
