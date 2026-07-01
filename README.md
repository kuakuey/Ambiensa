# Prueba Técnica Ambiensa — CRUD de Usuarios

Sistema básico de registro y consulta de usuarios con **React (Next.js)** en el frontend y **Laravel** como API REST en el backend.

## Estructura del proyecto

```
PruebaAmbiensa/
├── ambiensa-back/     # API REST Laravel
├── ambiensa-front/    # Frontend React (Next.js + Tailwind)
└── README.md
```

## Requisitos

- PHP >= 8.3
- Composer
- Node.js >= 18
- MySQL (XAMPP recomendado)
- Base de datos: **PruebaGF**

## 1. Base de datos

### Opción A: Script SQL + migraciones Laravel

Importa el archivo SQL incluido en el repositorio:

```bash
mysql -u root -p < ambiensa-back/database/sql/prueba_gf.sql
```

Luego ejecuta las migraciones de Laravel (crean tablas internas como `sessions`, `cache`, etc.):

```bash
cd ambiensa-back
php artisan migrate
```

> **Nota:** Si importaste el SQL antes de migrar y la tabla `usuarios` ya existe, Laravel puede mostrar un error al crearla. En ese caso, marca la migración como ejecutada o usa solo la **Opción B**.

### Opción B: Solo migraciones Laravel (recomendado)

Crea la base de datos manualmente y ejecuta las migraciones:

```sql
CREATE DATABASE PruebaGF CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
cd ambiensa-back
php artisan migrate
```

## 2. Backend (Laravel)

```bash
cd ambiensa-back
composer install
cp .env.example .env   # si aún no existe
php artisan key:generate
```

Configura la base de datos en `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=PruebaGF
DB_USERNAME=root
DB_PASSWORD=
```

Ejecuta las migraciones y levanta el servidor:

```bash
php artisan migrate
php artisan serve
```

La API quedará disponible en: `http://localhost:8000/api`

### Endpoints

| Método   | Ruta                  | Descripción        |
|----------|-----------------------|--------------------|
| GET      | `/api/usuarios`       | Listar usuarios    |
| POST     | `/api/usuarios`       | Crear usuario      |
| GET      | `/api/usuarios/{id}`  | Ver usuario        |
| PUT      | `/api/usuarios/{id}`  | Actualizar usuario |
| DELETE   | `/api/usuarios/{id}`  | Eliminar usuario   |

## 3. Frontend (Next.js)

```bash
cd ambiensa-front
npm install
cp .env.local.example .env.local
npm run dev
```

Abre: `http://localhost:3000`

Variables de entorno (`.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Funcionalidades

- Formulario con todos los campos requeridos:
  - Identificación, nombre de usuario, apellidos, nombres
  - Fecha de nacimiento, celular, teléfono, correo personal
  - Estado civil, sexo, dirección
- Listado de usuarios registrados
- Crear, editar y eliminar registros
- Validaciones en frontend (campos obligatorios, formato de correo, fecha)
- Validaciones en backend (Laravel Form Requests)

## Entrega

1. Subir el código a GitHub o GitLab
2. Incluir este README con instrucciones
3. Incluir el script SQL en `ambiensa-back/database/sql/prueba_gf.sql`
4. Compartir el enlace del repositorio por correo