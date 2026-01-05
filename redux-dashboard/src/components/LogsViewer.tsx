import { useState } from 'react';
// TODO: Importar los hooks necesarios de React Redux
// import { useAppSelector } from '../hooks/useAppDispatch';
import './LogsViewer.css';

export const LogsViewer = () => {
  const [filter, setFilter] = useState<'all' | 'items' | 'notifications' | 'system'>('all');

  // TODO: EJERCICIO PARA EL ALUMNO
  // 1. Obtener los logs del estado de Redux usando useAppSelector
  // 2. Conectar este selector al slice de logs que se encuentra en store/logsSlice.ts
  
  // Datos de ejemplo para visualización (el alumno debe reemplazar esto)
  const logs = [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      action: 'Ejemplo: Item agregado',
      type: 'items' as const,
      details: 'Este es un log de ejemplo'
    }
  ];

  // TODO: EJERCICIO PARA EL ALUMNO
  // 3. Implementar la función para limpiar los logs
  const handleClearLogs = () => {
    console.log('TODO: Implementar clearLogs');
    // dispatch(clearLogs());
  };

  // Filtrar logs según el tipo seleccionado
  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'items':
        return '📦';
      case 'notifications':
        return '🔔';
      case 'system':
        return '⚙️';
      default:
        return '📝';
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'items':
        return '#6366f1';
      case 'notifications':
        return '#10b981';
      case 'system':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="logs-viewer">
      <div className="logs-header">
        <div className="logs-title">
          <h2>📋 Activity Logs</h2>
          <span className="logs-count">{filteredLogs.length} eventos</span>
        </div>
        
        <div className="logs-controls">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${filter === 'items' ? 'active' : ''}`}
              onClick={() => setFilter('items')}
            >
              📦 Items
            </button>
            <button 
              className={`filter-btn ${filter === 'notifications' ? 'active' : ''}`}
              onClick={() => setFilter('notifications')}
            >
              🔔 Notificaciones
            </button>
            <button 
              className={`filter-btn ${filter === 'system' ? 'active' : ''}`}
              onClick={() => setFilter('system')}
            >
              ⚙️ Sistema
            </button>
          </div>
          
          <button className="clear-logs-btn" onClick={handleClearLogs}>
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div className="logs-container">
        {filteredLogs.length === 0 ? (
          <div className="empty-logs">
            <div className="empty-icon">📭</div>
            <h3>No hay logs para mostrar</h3>
            <p>Los eventos de la aplicación aparecerán aquí</p>
            <div className="todo-note">
              <strong>📝 NOTA PARA EL ALUMNO:</strong>
              <p>Para que los logs aparezcan automáticamente, debes:</p>
              <ol>
                <li>Agregar el reducer de logs al store</li>
                <li>Implementar un middleware que capture las acciones</li>
                <li>Conectar los selectores en este componente</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="logs-list">
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="log-entry"
                style={{ borderLeftColor: getLogColor(log.type) }}
              >
                <div className="log-icon">{getLogIcon(log.type)}</div>
                <div className="log-content">
                  <div className="log-main">
                    <span className="log-action">{log.action}</span>
                    <span className="log-time">{formatTime(log.timestamp)}</span>
                  </div>
                  {log.details && (
                    <div className="log-details">{log.details}</div>
                  )}
                </div>
                <span 
                  className="log-badge"
                  style={{ backgroundColor: `${getLogColor(log.type)}20`, color: getLogColor(log.type) }}
                >
                  {log.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instrucciones para el alumno */}
      <div className="developer-notes">
        <details>
          <summary>💡 Instrucciones para el desarrollador (click para expandir)</summary>
          <div className="notes-content">
            <h4>Tareas a completar:</h4>
            <ol>
              <li>
                <strong>Registrar el reducer en el store:</strong>
                <code>store/index.ts</code>
                <pre>{`import logsReducer from './logsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    notifications: notificationsReducer,
    logs: logsReducer, // ← Agregar esto
  },
});`}</pre>
              </li>
              
              <li>
                <strong>Crear un middleware para capturar acciones:</strong>
                <p>Crea un archivo <code>store/loggerMiddleware.ts</code></p>
              </li>
              
              <li>
                <strong>Conectar los selectores en este componente:</strong>
                <p>Reemplazar los datos de ejemplo con datos reales de Redux</p>
              </li>
              
              <li>
                <strong>Implementar la función clearLogs</strong>
                <p>Usar useAppDispatch para despachar la acción</p>
              </li>
            </ol>
            
            <h4>🎯 Objetivos de aprendizaje:</h4>
            <ul>
              <li>Entender cómo funcionan los middlewares en Redux</li>
              <li>Practicar la conexión de componentes con el store</li>
              <li>Aprender a interceptar y loguear acciones</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};

