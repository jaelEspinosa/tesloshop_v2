## Descripción
E-commerce Teslo | shop

## Correr en Dev
1. Clonar el repositorio
2. Crear copia del  ```.env.template``` y renombrar a ```.env``` cambiando las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos  ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar el seed ```npm un seed```
7. Correr el proyecto  ```npm run dev```