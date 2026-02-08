# Política de privacidad – contenedor Nginx

Carpeta: `Dockerfile`, `nginx.conf`, `privacy-policy.html`, `docker-compose.yml`.

Solo se crea el contenedor; la red se añade desde Portainer.

---

## Crear el contenedor

```bash
cd privacy-site
docker compose up -d --build
```

No se exponen puertos ni redes. El contenedor escucha en el puerto 80 interno.

---

## Añadir a la red en Portainer

1. **Containers** → **privacy-site** → **Duplicate/Edit** o **Recreate** (o usa la opción de redes).
2. O: **Networks** → **frontend** (o la red que uses) → **Containers** → **Connect container** → elige **privacy-site**.

Quedará en la misma red que NPM; en el Proxy Host usa **privacy-site** como hostname y puerto **80**.

---

## Sin compose (solo Docker)

```bash
cd privacy-site
docker build -t privacy-site .
docker run -d --name privacy-site --restart always privacy-site
```

Luego en Portainer conectas **privacy-site** a la red que quieras.
