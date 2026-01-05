# 🔑 Solución Completa - Sistema de Logs

**⚠️ ESTE ARCHIVO ES PARA EL INSTRUCTOR - NO MOSTRAR A LOS ALUMNOS**

## Implementación Completa del Logger Middleware

### 1. store/index.ts

```typescript
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import notificationsReducer from './notificationsSlice';
import logsReducer from './logsSlice';
import { loggerMiddleware } from './loggerMiddleware';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    notifications: notificationsReducer,
    logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. store/loggerMiddleware.ts (Solución Completa)

```typescript
import { Middleware } from '@reduxjs/toolkit';
import { addLog } from './logsSlice';

export const loggerMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  // Verificar que la acción tenga un tipo válido
  if (!action.type) return next(action);
  
  // No loguear las propias acciones de logs para evitar loops infinitos
  if (action.type.startsWith('logs/')) {
    return next(action);
  }

  // Determinar tipo y mensaje basado en la acción
  let logType: 'items' | 'notifications' | 'system' = 'system';
  let message = action.type;
  let details = '';

  // Acciones de items
  if (action.type.startsWith('items/')) {
    logType = 'items';
    switch (action.type) {
      case 'items/addItem':
        message = `Item agregado: ${action.payload.name}`;
        details = `Categoría: ${action.payload.category} - ${action.payload.description}`;
        break;
      case 'items/removeItem':
        message = 'Item eliminado';
        details = `ID: ${action.payload}`;
        break;
      case 'items/updateItem':
        message = `Item actualizado: ${action.payload.name}`;
        details = `Categoría: ${action.payload.category}`;
        break;
      default:
        message = 'Acción de items';
    }
  } 
  // Acciones de notificaciones
  else if (action.type.startsWith('notifications/')) {
    logType = 'notifications';
    switch (action.type) {
      case 'notifications/addNotification':
        message = `Nueva notificación: ${action.payload.message}`;
        details = `Tipo: ${action.payload.type}`;
        break;
      case 'notifications/markAsRead':
        message = 'Notificación marcada como leída';
        details = `ID: ${action.payload}`;
        break;
      case 'notifications/markAllAsRead':
        message = 'Todas las notificaciones marcadas como leídas';
        break;
      case 'notifications/removeNotification':
        message = 'Notificación eliminada';
        details = `ID: ${action.payload}`;
        break;
      case 'notifications/clearNotifications':
        message = 'Todas las notificaciones eliminadas';
        break;
      default:
        message = 'Acción de notificaciones';
    }
  }
  // Otras acciones del sistema
  else {
    logType = 'system';
    message = `Acción del sistema: ${action.type}`;
  }

  // Despachar el log
  storeAPI.dispatch(addLog({
    action: message,
    type: logType,
    details: details || undefined
  }));

  // Continuar con la acción original
  return next(action);
};
```

### 3. components/LogsViewer.tsx (Partes modificadas)

```typescript
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
import { clearLogs } from '../store/logsSlice';
import './LogsViewer.css';

export const LogsViewer = () => {
  const [filter, setFilter] = useState<'all' | 'items' | 'notifications' | 'system'>('all');
  const dispatch = useAppDispatch();

  // Obtener logs del estado de Redux
  const logs = useAppSelector(state => state.logs.logs);

  // Implementar la función para limpiar logs
  const handleClearLogs = () => {
    dispatch(clearLogs());
  };

  // ... resto del componente sin cambios
};
```

## Verificación de la Solución

### Checklist:

- [x] logsReducer agregado al store
- [x] loggerMiddleware implementado
- [x] Middleware agregado a la configuración del store
- [x] Selector conectado en LogsViewer
- [x] clearLogs dispatch implementado
- [x] Prevención de loops infinitos
- [x] Mensajes descriptivos para cada acción
- [x] Detalles incluidos en los logs

### Comportamiento Esperado:

1. **Al agregar un item:**
   - Aparece log: "Item agregado: [nombre]"
   - Tipo: items
   - Detalles: "Categoría: [categoría] - [descripción]"

2. **Al eliminar un item:**
   - Aparece log: "Item eliminado"
   - Tipo: items
   - Detalles: "ID: [id]"

3. **Al actualizar un item:**
   - Aparece log: "Item actualizado: [nombre]"
   - Tipo: items

4. **Al agregar notificación:**
   - Aparece log: "Nueva notificación: [mensaje]"
   - Tipo: notifications

5. **Filtros:**
   - Funcionan correctamente para cada tipo
   - "Todos" muestra todos los logs

6. **Botón Limpiar:**
   - Vacía todos los logs
   - No genera loops infinitos

## Puntos Clave para Explicar a los Alumnos

1. **Orden de ejecución:**
   - Middleware → Reducer → Store actualizado

2. **Prevención de loops:**
   - Siempre verificar que no estemos logueando nuestras propias acciones

3. **El middleware recibe:**
   - `storeAPI`: { dispatch, getState }
   - `next`: Función para continuar al siguiente middleware/reducer
   - `action`: La acción que se está despachando

4. **Buenas prácticas:**
   - Siempre llamar `next(action)`
   - No mutar la acción
   - Manejar errores correctamente
   - Evitar lógica pesada en middlewares

## Extensiones Sugeridas

1. **Niveles de log:** info, warning, error
2. **Filtrado avanzado:** por fecha, por texto
3. **Persistencia:** localStorage
4. **Exportación:** JSON, CSV
5. **Límite configurable:** UI para cambiar maxLogs
6. **Búsqueda en tiempo real**
7. **Agrupación de logs similares**
8. **Estadísticas:** acciones más frecuentes

## Debugging Tips

Si los logs no aparecen:
1. Verificar que logsReducer está en el store
2. Verificar que el middleware está agregado
3. Revisar Redux DevTools para ver si las acciones addLog se disparan
4. Verificar que no hay loops infinitos (navegador congelado)
5. Comprobar que el selector está correctamente conectado

Si hay loops infinitos:
1. Asegurarse de filtrar `logs/` en el middleware
2. No despachar acciones dentro de reducers
3. Verificar condiciones de parada en el middleware

