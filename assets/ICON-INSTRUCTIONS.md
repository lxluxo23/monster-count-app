# Instrucciones para generar iconos de Monster White

## 1. Generar iconos con la imagen de Monster White

Usa la imagen `assets\icon-source.webp` (Monster Ultra Zero White) para generar todos los tamaños de iconos.

### Opción A: Usar herramienta online
1. Ve a: https://icon.kitchen/
2. Sube `assets\icon-source.webp`
3. Ajusta el padding y fondo según necesites
4. Descarga el pack de iconos

### Opción B: Usar Expo (recomendado)
Necesitas convertir el .webp a .png de 1024×1024px primero, luego:

```bash
# Instalar sharp si no lo tienes
npm install -g sharp-cli

# Convertir webp a png
npx sharp -i assets/icon-source.webp -o assets/icon-temp.png resize 1024 1024

# Después reemplaza icon.png, adaptive-icon.png, splash-icon.png y favicon.png
```

## 2. Archivos que necesitas actualizar:

- **icon.png** - Icono general (1024×1024)
- **adaptive-icon.png** - Icono adaptativo Android (1024×1024, sin margen)
- **splash-icon.png** - Pantalla de carga (1024×1024)
- **favicon.png** - Icono web (48×48)

## Configuración actual:

- **Package**: com.monstercounter.app
- **Nombre**: Monster Counter
- **Versión**: 1.0.0 (versionCode: 1)
- **Color de fondo**: Verde Monster (#2ECC71)
- **Tema**: Oscuro
