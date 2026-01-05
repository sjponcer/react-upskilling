# 📊 Redux Dashboard - Proyecto de Aprendizaje

Aplicación de dashboard interactiva construida con React, TypeScript, Redux Toolkit y Vite. Diseñada para aprender conceptos avanzados de Redux incluyendo middlewares, DevTools y gestión de estado compleja.

## ✨ Características

- 📦 **Gestión de Items**: Crear, actualizar y eliminar items con categorías
- 🔔 **Sistema de Notificaciones**: Notificaciones en tiempo real con centro de notificaciones
- 🎨 **UI Moderna**: Interfaz limpia y responsiva con animaciones fluidas
- 📋 **Sistema de Logs**: Visualización en tiempo real de todas las acciones de Redux
- 🛠️ **Redux DevTools**: Integración completa con Redux DevTools para debugging

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

## 📚 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Dashboard.tsx   # Componente principal
│   ├── Header.tsx      # Barra de navegación
│   ├── ItemForm.tsx    # Formulario de items
│   ├── ItemList.tsx    # Lista de items
│   ├── NotificationBell.tsx  # Centro de notificaciones
│   ├── ToastContainer.tsx    # Notificaciones toast
│   └── LogsViewer.tsx  # Visor de logs (EJERCICIO)
├── store/              # Redux store y slices
│   ├── index.ts        # Configuración del store
│   ├── itemsSlice.ts   # Slice de items
│   ├── notificationsSlice.ts  # Slice de notificaciones
│   ├── logsSlice.ts    # Slice de logs
│   └── loggerMiddleware.ts    # Middleware logger (EJERCICIO)
├── hooks/              # Custom hooks
│   └── useAppDispatch.ts
└── types/              # Definiciones de tipos TypeScript
    └── index.ts
```

## 🎓 Ejercicio: Sistema de Logs con Middleware

Este proyecto incluye un ejercicio práctico para aprender sobre Redux Middlewares.

### 📝 Objetivo del Ejercicio

Implementar un sistema completo de logging que capture y muestre todas las acciones de Redux en tiempo real.

### 🎯 Tareas

1. **Registrar el reducer de logs en el store**
2. **Implementar el logger middleware** para capturar acciones
3. **Agregar el middleware al store**
4. **Conectar el componente LogsViewer** con Redux

### 📖 Instrucciones Detalladas

Lee el archivo [`EJERCICIO_LOGS.md`](./EJERCICIO_LOGS.md) para instrucciones paso a paso.

**Archivos del ejercicio:**
- `src/store/logsSlice.ts` - Slice ya implementado
- `src/store/loggerMiddleware.ts` - **A completar por el alumno**
- `src/components/LogsViewer.tsx` - **A conectar con Redux**
- `src/store/index.ts` - **A actualizar**

### ✅ Verificación

Una vez completado, deberías poder:
- ✅ Ver logs de todas las acciones en tiempo real
- ✅ Filtrar logs por tipo (items, notificaciones, sistema)
- ✅ Limpiar logs con un botón
- ✅ Ver detalles de cada acción

## 🛠️ Redux DevTools

Este proyecto está configurado para usar Redux DevTools. 

### Instalación de la Extensión

1. Instala la extensión en tu navegador:
   - [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

2. Abre las DevTools del navegador (F12)
3. Ve a la pestaña "Redux"

### Características de Redux DevTools

- 📊 **Inspector**: Ver el estado completo y diffs
- ⏯️ **Time Travel**: Viajar en el tiempo entre acciones
- 📝 **Action Log**: Historial completo de acciones
- 🎨 **State Tree**: Visualización del árbol de estado
- 📤 **Import/Export**: Guardar y compartir sesiones de debugging

## 🧪 Tecnologías

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Redux Toolkit** - Gestión de estado
- **Vite** - Build tool y dev server
- **CSS3** - Estilos con variables CSS

## 📦 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build de producción
npm run lint         # Ejecutar ESLint
```

## 💡 Conceptos de Redux Cubiertos

### Básicos
- ✅ Store configuration
- ✅ Slices y reducers
- ✅ Actions y action creators
- ✅ Selectors
- ✅ Hooks (useSelector, useDispatch)

### Avanzados
- ✅ Middlewares personalizados
- ✅ Redux DevTools integration
- ✅ TypeScript con Redux
- ✅ Gestión de estado normalizado
- ✅ Side effects y async logic

## 📚 Recursos de Aprendizaje

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Redux Fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [Understanding Redux Middleware](https://redux.js.org/understanding/history-and-design/middleware)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)

## 🎨 Características de UI

- 🌗 Variables CSS para temas
- 📱 Diseño completamente responsivo
- ✨ Animaciones y transiciones suaves
- 🎯 Indicadores visuales de estado
- 🔔 Sistema de notificaciones toast
- 📊 Dashboard con estadísticas en tiempo real

## 🐛 Debugging Tips

### Si los logs no aparecen:
1. Verifica que `logsReducer` está en el store
2. Verifica que el middleware está agregado correctamente
3. Revisa Redux DevTools para ver las acciones `addLog`
4. Asegúrate de que no hay loops infinitos

### Si hay loops infinitos:
1. Verifica que el middleware filtra las acciones `logs/`
2. No despachas acciones dentro de reducers
3. El middleware debe llamar `next(action)` correctamente

## 📄 Licencia

Este es un proyecto educativo. Siéntete libre de usarlo para aprender y enseñar.

## 🤝 Contribuciones

Este es un proyecto de aprendizaje. Si encuentras errores o tienes sugerencias, ¡son bienvenidas!

---

**¡Feliz aprendizaje! 🎉**

Para preguntas sobre el ejercicio, revisa [`EJERCICIO_LOGS.md`](./EJERCICIO_LOGS.md)

Para la solución completa (instructores), revisa [`SOLUCION_LOGS.md`](./SOLUCION_LOGS.md)
