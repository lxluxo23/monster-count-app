# Servir política de privacidad con Nginx
# Comprimir carpeta privacy-site, subir al servidor y: docker build -t privacy-site .

FROM nginx:alpine

# Contenido: index en / y copia en /privacidad.html
COPY privacy-policy.html /usr/share/nginx/html/index.html
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/privacidad.html

# Config mínima: / y redirección /privacidad -> /
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
