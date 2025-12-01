# Sistema de Costos Indirectos

Sistema de configuración de cotización para costos indirectos por planta. Permite definir operaciones y sus costos según rangos de volumen por planta.

## Estructura del Proyecto

```
codeable/
├── backend/          # Backend NestJS con GraphQL
├── frontend/         # Frontend React con Vite
└── docker-compose.yml # Configuración Docker para todos los servicios
```

## Inicio Rápido con Docker

La forma más fácil de levantar todo el proyecto es usando Docker Compose:

```bash
# 1. Copiar archivo de configuración
cp .env.example .env

# 2. Levantar todos los servicios
docker-compose up --build
```

Esto levantará:

- **Base de datos PostgreSQL** en el puerto 5432
- **Backend NestJS** en el puerto 4000 (GraphQL en `/graphql`)
- **Frontend React** en el puerto 80

Accede a la aplicación en: http://localhost

## Desarrollo Local

### Backend

```bash
cd backend

# Instalar dependencias
pnpm install

# Configurar base de datos (asegúrate de tener PostgreSQL corriendo)
# Copiar .env.example a .env y configurar DATABASE_URL

# Ejecutar migraciones
pnpm prisma migrate dev

# Generar Prisma Client
pnpm prisma generate

# Ejecutar seed (opcional)
pnpm prisma:seed

# Iniciar en modo desarrollo
pnpm start:dev
```

El backend estará disponible en: http://localhost:4000/graphql

### Frontend

```bash
cd frontend

# Instalar dependencias
pnpm install

# Generar tipos de GraphQL
pnpm codegen

# Iniciar en modo desarrollo
pnpm dev
```

El frontend estará disponible en: http://localhost:5173

## Tecnologías

### Backend

- **NestJS** - Framework Node.js
- **GraphQL** - API GraphQL con Apollo Server
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos

### Frontend

- **React 19** - Biblioteca UI
- **Vite** - Build tool
- **Apollo Client** - Cliente GraphQL
- **TailwindCSS** - Framework CSS
- **TypeScript** - Tipado estático

## Scripts Disponibles

### Backend

- `pnpm start:dev` - Inicia en modo desarrollo con hot-reload
- `pnpm build` - Compila el proyecto
- `pnpm start:prod` - Inicia en modo producción
- `pnpm test` - Ejecuta las pruebas unitarias
- `pnpm test:cov` - Ejecuta las pruebas con cobertura
- `pnpm prisma:generate` - Genera el cliente de Prisma
- `pnpm prisma:migrate` - Ejecuta migraciones de desarrollo
- `pnpm prisma:seed` - Ejecuta el seed de la base de datos

### Frontend

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Compila para producción
- `pnpm preview` - Previsualiza el build de producción
- `pnpm codegen` - Genera tipos de GraphQL

## Variables de Entorno

### Backend

Crea un archivo `.env` en `backend/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/codeable?schema=public
PORT=4000
CORS_ORIGINS=http://localhost:5173,http://localhost:80
```

### Frontend

Crea un archivo `.env` en `frontend/`:

```env
VITE_API_URL=http://localhost:4000/graphql
```

## Pruebas

### Backend

```bash
cd backend
pnpm test              # Ejecutar todas las pruebas
pnpm test:watch        # Modo watch
pnpm test:cov          # Con cobertura
```

## Modelado de Base de Datos (Prisma)

### Modelos y Relaciones

El sistema utiliza tres modelos principales:

#### 1. Plant (Planta)

- **Propósito**: Representa una planta de producción
- **Campos principales**:
  - `id`: UUID único
  - `name`: Nombre de la planta
  - `code`: Código único de la planta
  - `description`: Descripción opcional
- **Relaciones**: Una planta tiene muchas operaciones (`operations`)

#### 2. Operation (Operación)

- **Propósito**: Representa una operación dentro de una planta
- **Campos principales**:
  - `id`: UUID único
  - `name`: Nombre de la operación
  - `description`: Descripción opcional
  - `plantId`: Referencia a la planta
- **Relaciones**:
  - Pertenece a una planta (`plant`)
  - Tiene muchos costos indirectos (`costs`)
- **Restricciones**: Nombre único por planta (`@@unique([plantId, name])`)

#### 3. IndirectCost (Costo Indirecto)

- **Propósito**: Define el costo de una operación para un rango de volumen específico
- **Campos principales**:
  - `id`: UUID único
  - `operationId`: Referencia a la operación
  - `volumeRange`: Rango de volumen (enum)
  - `cost`: Costo en Decimal(10, 2) para precisión
- **Relaciones**: Pertenece a una operación (`operation`)
- **Restricciones**: Un rango de volumen único por operación (`@@unique([operationId, volumeRange])`)

### Rangos de Volumen

El sistema soporta los siguientes rangos de volumen:

- `RANGE_300KG` - 300 kilogramos
- `RANGE_500KG` - 500 kilogramos
- `RANGE_1T` - 1 tonelada
- `RANGE_3T` - 3 toneladas
- `RANGE_5T` - 5 toneladas
- `RANGE_10T` - 10 toneladas
- `RANGE_20T` - 20 toneladas
- `RANGE_30T` - 30 toneladas

### Diagrama de Relaciones

```
Plant (1) ──< (N) Operation (1) ──< (N) IndirectCost
```

- Una **Planta** tiene muchas **Operaciones**
- Una **Operación** tiene muchos **Costos Indirectos** (uno por rango de volumen)
- Eliminación en cascada: Si se elimina una planta, se eliminan sus operaciones y costos asociados

## Git y Control de Versiones

### Convención de Branching

El proyecto utiliza una convención de branching basada en Git Flow:

- `main`: Rama principal de producción
- `develop`: Rama de desarrollo
- `feature/*`: Nuevas funcionalidades
- `fix/*`: Corrección de bugs
- `hotfix/*`: Correcciones urgentes

### Ejemplo de Workflow

```bash
# Crear rama de feature
git checkout -b feature/nueva-funcionalidad

# Trabajar en la feature
git add .
git commit -m "feat: ✨ Agregar nueva funcionalidad"

# Actualizar desde develop
git checkout develop
git pull origin develop
git checkout feature/nueva-funcionalidad
git merge develop

# Resolver conflictos si existen
# ... editar archivos con conflictos ...
git add .
git commit -m "fix: 🔧 Resolver conflictos con develop"

# Push y crear Pull Request
git push origin feature/nueva-funcionalidad
```

### Resolución de Conflictos

Cuando hay conflictos durante un merge:

1. Identificar archivos con conflictos: `git status`
2. Abrir archivos conflictivos y buscar marcadores `<<<<<<<`, `=======`, `>>>>>>>`
3. Decidir qué código mantener o combinar ambos cambios
4. Eliminar marcadores de conflicto
5. Agregar archivos resueltos: `git add .`
6. Completar el merge: `git commit`

### Convención de Commits

Se utiliza Conventional Commits con emojis:

- `feat: ✨` - Nueva funcionalidad
- `fix: 🐛` - Corrección de bug
- `docs: 📝` - Documentación
- `style: 💄` - Formato, sin cambios de código
- `refactor: ♻️` - Refactorización
- `test: ✅` - Pruebas
- `chore: 🔧` - Tareas de mantenimiento

## Documentación Adicional

- [Backend README](./backend/README.md) - Documentación del backend
- [Frontend README](./frontend/README.md) - Documentación del frontend
