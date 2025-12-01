# Sistema de Costos Indirectos

Sistema de configuración de costos indirectos por planta y operación. Permite definir operaciones y sus costos según rangos de volumen.

## Características

- Gestión de plantas y operaciones
- Configuración de costos indirectos por rangos de volumen (300kg, 500kg, 1T, 3T, 5T, 10T, 20T, 30T)
- Interfaz moderna con TailwindCSS
- API GraphQL con Apollo Client
- Validaciones en tiempo real
- Manejo de errores robusto

## Tecnologías

- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Apollo Client** - Cliente GraphQL
- **TailwindCSS** - Framework de estilos
- **GraphQL Codegen** - Generación de tipos TypeScript

## Requisitos

- Node.js 18+ 
- npm o yarn

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env con:
# VITE_API_URL=http://localhost:4000/graphql
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Generar tipos de GraphQL
npm run codegen

# Linting
npm run lint
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── indirect-costs/ # Componentes del módulo principal
│   └── ui/             # Componentes UI reutilizables
├── hooks/              # Custom hooks
├── lib/                # Librerías y configuraciones
│   ├── apollo-client.ts
│   └── gql/            # Tipos generados de GraphQL
├── types/              # Tipos TypeScript compartidos
├── graphql/            # Queries y mutations GraphQL
└── App.tsx             # Componente principal
```

## Variables de Entorno

- `VITE_API_URL` - URL del endpoint GraphQL (default: http://localhost:4000/graphql)

## Desarrollo

El proyecto usa Vite como build tool. Para desarrollo:

```bash
npm run dev
```

El servidor de desarrollo se ejecutará en `http://localhost:5173`

## Build de Producción

```bash
npm run build
```

El build se generará en la carpeta `dist/`

## Generación de Tipos GraphQL

Después de cambios en el schema GraphQL del backend:

```bash
npm run codegen
```

Esto generará los tipos TypeScript en `src/lib/gql/graphql.ts`

## Licencia

Proyecto de prueba técnica
