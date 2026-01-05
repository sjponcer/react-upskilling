# 📋 Ejercicio: Sistema de Logs con Redux Middleware

## 🎯 Objetivo

Implementar un sistema completo de logging que capture y muestre todas las acciones de Redux en tiempo real, aprendiendo sobre middlewares y el flujo de datos en Redux.

## 📝 Tareas a Completar

### Tarea 1: Registrar el Reducer de Logs en el Store

**Archivo:** `src/store/index.ts`

1. Importa el reducer de logs:
```typescript
import logsReducer from './logsSlice';
```

2. Agrégalo al `configureStore`:
```typescript
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    notifications: notificationsReducer,
    logs: logsReducer, // ← Agregar esta línea
  },
});
```

✅ **Verifica:** El store ahora debe tener una sección `logs` en su estado.

---

### Tarea 2: Implementar el Logger Middleware

**Archivo:** `src/store/loggerMiddleware.ts`

El archivo ya existe con comentarios y TODOs. Debes:

1. Verificar que la acción tenga un `type` válido
2. Evitar loguear las acciones del propio logger (prevenir loops infinitos)
3. Determinar el tipo de log según la acción:
   - `items/*` → type: `'items'`
   - `notifications/*` → type: `'notifications'`
   - Otros → type: `'system'`
4. Crear mensajes descriptivos para cada acción
5. Despachar `addLog` con la información correspondiente
6. Permitir que la acción original continúe su flujo

**Ejemplo de implementación:**

```typescript
export const loggerMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  if (!action.type) return next(action);
  
  // No loguear las propias acciones de logs
  if (action.type.startsWith('logs/')) {
    return next(action);
  }

  // Determinar tipo y mensaje
  let logType: 'items' | 'notifications' | 'system' = 'system';
  let message = action.type;
  let details = '';

  if (action.type.startsWith('items/')) {
    logType = 'items';
    switch (action.type) {
      case 'items/addItem':
        message = `Item agregado: ${action.payload.name}`;
        details = `Categoría: ${action.payload.category}`;
        break;
      case 'items/removeItem':
        message = 'Item eliminado';
        break;
      case 'items/updateItem':
        message = `Item actualizado: ${action.payload.name}`;
        break;
    }
  } else if (action.type.startsWith('notifications/')) {
    logType = 'notifications';
    // Implementar casos para notificaciones
  }

  // Despachar el log
  storeAPI.dispatch(addLog({
    action: message,
    type: logType,
    details: details
  }));

  // Continuar con la acción original
  return next(action);
};
```

✅ **Verifica:** Los logs deben capturar las acciones correctamente.

---

### Tarea 3: Agregar el Middleware al Store

**Archivo:** `src/store/index.ts`

1. Importa el middleware:
```typescript
import { loggerMiddleware } from './loggerMiddleware';
```

2. Agrégalo a la configuración:
```typescript
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    notifications: notificationsReducer,
    logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
```

✅ **Verifica:** El middleware debe ejecutarse en cada acción.

---

### Tarea 4: Conectar el Componente LogsViewer

**Archivo:** `src/components/LogsViewer.tsx`

1. Descomentar el import de `useAppSelector`:
```typescript
import { useAppSelector } from '../hooks/useAppDispatch';
```

2. Reemplazar los datos de ejemplo con datos reales:
```typescript
const logs = useAppSelector(state => state.logs.logs);
```

3. Implementar la función `handleClearLogs`:
```typescript
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
import { clearLogs } from '../store/logsSlice';

// Dentro del componente:
const dispatch = useAppDispatch();

const handleClearLogs = () => {
  dispatch(clearLogs());
};
```

✅ **Verifica:** Los logs deben mostrarse en el componente y el botón de limpiar debe funcionar.

---

## 🧪 Pruebas

Una vez completadas todas las tareas, prueba lo siguiente:

1. **Agregar un item:** Debe aparecer un log "Item agregado"
2. **Eliminar un item:** Debe aparecer un log "Item eliminado"
3. **Actualizar un item:** Debe aparecer un log "Item actualizado"
4. **Marcar notificaciones:** Debe aparecer logs de notificaciones
5. **Filtrar logs:** Los filtros deben funcionar correctamente
6. **Limpiar logs:** El botón debe vaciar todos los logs

## 🎓 Conceptos Aprendidos

- ✅ Cómo funcionan los middlewares en Redux
- ✅ Interceptar y procesar acciones
- ✅ Evitar loops infinitos en middlewares
- ✅ Conectar componentes con múltiples slices
- ✅ Usar Redux DevTools para debugging
- ✅ Gestionar estado derivado

## 🚀 Bonus (Opcional)

1. **Persistir logs en localStorage**
   - Guarda los logs cuando cambien
   - Cárgalos al iniciar la aplicación

2. **Exportar logs a JSON**
   - Botón para descargar logs
   - Formato JSON o CSV

3. **Búsqueda en logs**
   - Campo de búsqueda
   - Filtrar por texto

4. **Límite configurable**
   - Permitir al usuario cambiar `maxLogs`
   - Mostrar contador de logs guardados vs. totales

5. **Colores personalizados**
   - Diferentes colores según la acción
   - Indicadores visuales de éxito/error

## 📚 Recursos

- [Redux Middleware](https://redux.js.org/understanding/history-and-design/middleware)
- [Redux Toolkit - configureStore](https://redux-toolkit.js.org/api/configureStore)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

---

**¡Buena suerte con el ejercicio! 🎉**

Si tienes dudas, revisa los comentarios en cada archivo y usa Redux DevTools para inspeccionar el flujo de acciones.

