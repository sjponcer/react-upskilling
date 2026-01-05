import { Middleware } from '@reduxjs/toolkit';
import { addLog } from './logsSlice';

/**
 * 🎯 EJERCICIO PARA EL ALUMNO: Logger Middleware
 * 
 * Este middleware debe capturar TODAS las acciones que pasen por Redux
 * y crear entradas de log automáticamente.
 * 
 * OBJETIVOS:
 * 1. Interceptar cada acción antes de que llegue al reducer
 * 2. Crear un log entry basado en el tipo de acción
 * 3. Despachar la acción addLog para registrar el evento
 * 4. Permitir que la acción original continúe su flujo
 */

// TODO: Implementar el middleware
export const loggerMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  // TODO 1: Verificar que la acción tenga un tipo válido

  // TODO 2: No loguear las acciones del propio logger para evitar loops infinitos

  // TODO 3: Determinar el tipo de log basándose en la acción
  // TODO 4: Crear un mensaje descriptivo basado en la acción
  // TODO 5: Despachar la acción addLog con los datos correspondientes

  // TODO 6: Permitir que la acción original continúe

  // ⚠️ IMPORTANTE: Mientras tanto, solo dejamos pasar las acciones
  return next(action);
};

/**
 * 💡 PISTAS:
 * 
 * 1. La estructura de un middleware de Redux es:
 *    (storeAPI) => (next) => (action) => { ... }
 * 
 * 2. storeAPI contiene:
 *    - dispatch: para despachar nuevas acciones
 *    - getState: para leer el estado actual
 * 
 * 3. next(action) es lo que permite que la acción continúe al reducer
 * 
 * 4. El orden importa: normalmente quieres loguear ANTES de next(action)
 * 
 * 5. Para obtener detalles del payload, puedes acceder a action.payload
 * 
 * EJEMPLO DE IMPLEMENTACIÓN BÁSICA:
 * 
 * const result = next(action);
 * 
 * if (action.type === 'items/addItem') {
 *   storeAPI.dispatch(addLog({
 *     action: `Item agregado: ${action.payload.name}`,
 *     type: 'items',
 *     details: `Categoría: ${action.payload.category}`
 *   }));
 * }
 * 
 * return result;
 */

/**
 * 📚 RECURSOS ADICIONALES:
 * 
 * - Redux Middleware: https://redux.js.org/understanding/history-and-design/middleware
 * - Redux Toolkit Middleware: https://redux-toolkit.js.org/api/getDefaultMiddleware
 * 
 * BONUS:
 * - Agrega colores diferentes según el tipo de acción
 * - Incluye información del payload en los detalles
 * - Agrega timestamps más detallados
 * - Filtra acciones que no quieras loguear
 */

