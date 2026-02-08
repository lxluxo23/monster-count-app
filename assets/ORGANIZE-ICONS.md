# 📱 Organizar iconos generados

Veo que generaste los iconos. Ahora hay que organizarlos:

## Archivos generados:

✅ **res/** - Carpeta con iconos de Android en múltiples resoluciones
✅ **play_store_512.png** - Icono para Google Play Store (512×512)

## Archivos actuales que usar Expo/React Native:

Los siguientes archivos en `assets/` parecen ser los antiguos y necesitan actualizarse:

- `icon.png` - 22KB (antiguo)
- `adaptive-icon.png` - 17KB (antiguo)
- `splash-icon.png` - 17KB (antiguo)
- `favicon.png` - 1KB (antiguo)

## ¿Qué herramienta usaste?

Según los archivos generados, parece que usaste **Icon Kitchen** o **Android Asset Studio**.

### Si usaste Icon Kitchen:
Debería haber descargado un ZIP con:
- Los PNG que necesitas copiar a `assets/`
- La carpeta `res/` con los iconos Android

### Necesitas:
Busca en la descarga los archivos con el Monster White (deberían ser más grandes en tamaño) y cópialos con estos nombres en `assets/`:

1. **icon.png** → Icono general 1024×1024
2. **adaptive-icon.png** → Icono adaptativo Android 1024×1024
3. **splash-icon.png** → Pantalla de carga 1024×1024
4. **favicon.png** → Icono web 192×192

## Acción recomendada:

¿La herramienta te generó un archivo ZIP? Si es así:
1. Descomprímelo
2. Busca los PNG principales (suelen estar en una carpeta "ios" o raíz)
3. Cópialos a `assets/` con los nombres correctos

O dime qué herramienta usaste y te ayudo a ubicar los archivos correctos.
