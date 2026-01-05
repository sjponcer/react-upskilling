import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
import { removeItem } from '../store/itemsSlice';
import { addNotification, addToast } from '../store/notificationsSlice';
import './ItemList.css';

const categoryColors: Record<string, string> = {
  'Trabajo': '#6366f1',
  'Personal': '#10b981',
  'Compras': '#f59e0b',
  'Ideas': '#ec4899',
  'Proyectos': '#8b5cf6',
};

export const ItemList = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.items.items);

  const handleDelete = (id: string, name: string) => {
    dispatch(removeItem(id));
    
    // Agregar notificación a la campanita
    dispatch(addNotification({
      message: `Item "${name}" eliminado`,
      type: 'error',
    }));
    
    // Mostrar toast global
    dispatch(addToast({
      message: `🗑️ "${name}" eliminado del dashboard`,
      type: 'error',
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" fill="url(#emptyGradient)" opacity="0.1" />
            <path d="M70 90 L100 120 L130 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
            <path d="M60 110 L100 150 L140 110" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
            <defs>
              <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3>No hay items todavía</h3>
        <p>Agrega tu primer item usando el formulario de arriba</p>
      </div>
    );
  }

  return (
    <div className="items-grid">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="item-card"
          style={{ 
            animationDelay: `${index * 0.05}s`,
            '--category-color': categoryColors[item.category] || '#6366f1'
          } as React.CSSProperties}
        >
          <div className="item-card-header">
            <span 
              className="item-category"
              style={{ background: categoryColors[item.category] || '#6366f1' }}
            >
              {item.category}
            </span>
            <button 
              className="delete-btn"
              onClick={() => handleDelete(item.id, item.name)}
              aria-label="Eliminar item"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
          
          <h4 className="item-name">{item.name}</h4>
          
          {item.description && (
            <p className="item-description">{item.description}</p>
          )}
          
          <div className="item-footer">
            <span className="item-date">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {formatDate(item.createdAt)}
            </span>
          </div>
          
          <div className="item-glow" />
        </div>
      ))}
    </div>
  );
};


