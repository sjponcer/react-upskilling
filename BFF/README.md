# BFF API - Boards & Cards Management

API REST creada con Express, TypeScript y MongoDB (Mongoose) para gestionar boards y cards estilo Trello/Kanban.

## 🚀 Instalación

### Prerequisitos

- Node.js (v18 o superior)
- MongoDB instalado localmente o acceso a MongoDB Atlas

### Pasos de instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz con:
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bff-db
```

O usa MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/bff-db
```

3. **Inicializar la base de datos con datos de ejemplo:**
```bash
npm run seed
```

4. **Iniciar el servidor:**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con hot reload
- `npm run build` - Compila el proyecto TypeScript a JavaScript
- `npm start` - Inicia el servidor en producción
- `npm run seed` - Inicializa la base de datos con datos de ejemplo

## 🛣️ Endpoints API

### 📋 Boards

#### `GET /api/boards`
Obtiene todos los boards (solo nombre e id)

**Respuesta:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "674a1b2c3d4e5f6a7b8c9d0e",
      "name": "Proyecto Web App",
      "color": "#0079bf"
    }
  ]
}
```

#### `GET /api/boards/:id`
Obtiene detalles de un board específico con estadísticas

**Ejemplo:** `GET /api/boards/674a1b2c3d4e5f6a7b8c9d0e`

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": "674a1b2c3d4e5f6a7b8c9d0e",
    "name": "Proyecto Web App",
    "description": "Desarrollo de la aplicación web principal",
    "color": "#0079bf",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "stats": {
      "todo": 1,
      "in-progress": 2,
      "done": 2
    },
    "totalCards": 5
  }
}
```

### 🎴 Cards

#### `GET /api/cards/:boardId`
Obtiene todas las cards asociadas a un board

**Parámetros de consulta opcionales:**
- `status`: Filtrar por estado (todo, in-progress, done)
- `priority`: Filtrar por prioridad (low, medium, high)

**Ejemplos:**
- `GET /api/cards/674a1b2c3d4e5f6a7b8c9d0e`
- `GET /api/cards/674a1b2c3d4e5f6a7b8c9d0e?status=in-progress`
- `GET /api/cards/674a1b2c3d4e5f6a7b8c9d0e?priority=high`

**Respuesta:**
```json
{
  "success": true,
  "boardId": "674a1b2c3d4e5f6a7b8c9d0e",
  "boardName": "Proyecto Web App",
  "count": 5,
  "data": [
    {
      "id": "674a1b2c3d4e5f6a7b8c9d0f",
      "title": "Implementar autenticación",
      "status": "in-progress",
      "priority": "high",
      "assignedTo": "Carlos López",
      "dueDate": "2024-12-15T00:00:00.000Z",
      "tags": ["security", "auth"],
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-05T15:30:00.000Z"
    }
  ]
}
```

#### `GET /api/card/details/:cardId`
Obtiene los detalles completos de una card específica

**Ejemplo:** `GET /api/card/details/674a1b2c3d4e5f6a7b8c9d0f`

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": "674a1b2c3d4e5f6a7b8c9d0f",
    "title": "Implementar autenticación",
    "description": "Sistema de login con JWT y refresh tokens",
    "status": "in-progress",
    "priority": "high",
    "assignedTo": "Carlos López",
    "dueDate": "2024-12-15T00:00:00.000Z",
    "tags": ["security", "auth"],
    "board": {
      "id": "674a1b2c3d4e5f6a7b8c9d0e",
      "name": "Proyecto Web App",
      "color": "#0079bf"
    },
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-05T15:30:00.000Z"
  }
}
```

## 🗄️ Modelos de Datos

### Board Model
```typescript
{
  _id: ObjectId,
  name: string,              // requerido, max 100 caracteres
  description?: string,      // opcional, max 500 caracteres
  color?: string,            // default: '#0079bf'
  createdAt: Date,
  updatedAt: Date
}
```

### Card Model
```typescript
{
  _id: ObjectId,
  boardId: ObjectId,         // referencia a Board, requerido
  title: string,             // requerido, max 200 caracteres
  description?: string,      // opcional, max 2000 caracteres
  status: 'todo' | 'in-progress' | 'done',  // default: 'todo'
  priority: 'low' | 'medium' | 'high',      // default: 'medium'
  assignedTo?: string,       // opcional
  dueDate?: Date,            // opcional
  tags?: string[],           // opcional
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Tecnologías

- **Express 4.18** - Framework web para Node.js
- **TypeScript 5.3** - Superset tipado de JavaScript
- **MongoDB** - Base de datos NoSQL
- **Mongoose 8.0** - ODM para MongoDB
- **CORS** - Middleware para habilitar CORS
- **tsx** - Ejecutor de TypeScript con hot reload

## 📝 Estructura del Proyecto

```
BFF/
├── src/
│   ├── config/
│   │   └── database.ts       # Configuración de MongoDB
│   ├── database/
│   │   └── seed.ts           # Script para datos de ejemplo
│   ├── models/
│   │   ├── Board.model.ts    # Modelo de Board
│   │   └── Card.model.ts     # Modelo de Card
│   ├── routes/
│   │   ├── boards.routes.ts  # Rutas de boards
│   │   └── cards.routes.ts   # Rutas de cards
│   └── index.ts              # Punto de entrada
├── .env                      # Variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Probando la API

### Con cURL

```bash
# Obtener todos los boards
curl http://localhost:3001/api/boards

# Obtener cards de un board
curl http://localhost:3001/api/cards/BOARD_ID

# Obtener detalles de una card
curl http://localhost:3001/api/card/details/CARD_ID
```

### Con Navegador

Simplemente visita:
- `http://localhost:3001/api/boards`
- `http://localhost:3001/`

### Herramientas Recomendadas

- **Postman** - Cliente API completo
- **Insomnia** - Cliente API minimalista
- **Thunder Client** - Extensión de VS Code
- **MongoDB Compass** - GUI para visualizar la base de datos

## 🌐 Conectar desde tu Frontend React

```typescript
// Ejemplo con fetch
const getBoards = async () => {
  const response = await fetch('http://localhost:3001/api/boards');
  const data = await response.json();
  return data.data;
};

// Ejemplo con axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

const getCardsByBoard = async (boardId: string) => {
  const { data } = await api.get(`/cards/${boardId}`);
  return data.data;
};
```

## 🎯 Próximos Pasos

- [ ] Agregar endpoints POST, PUT, DELETE
- [ ] Implementar autenticación con JWT
- [ ] Agregar validación de datos con Joi o Zod
- [ ] Implementar paginación
- [ ] Agregar búsqueda y filtros avanzados
- [ ] Tests con Jest y Supertest
- [ ] Documentación con Swagger/OpenAPI
- [ ] Rate limiting y seguridad
- [ ] WebSockets para actualizaciones en tiempo real

## 📄 Licencia

ISC
