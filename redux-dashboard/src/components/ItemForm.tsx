import { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addItem } from '../store/itemsSlice';
import { addNotification, addToast } from '../store/notificationsSlice';
import './ItemForm.css';

const categories = ['Trabajo', 'Personal', 'Compras', 'Ideas', 'Proyectos'];

export const ItemForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: categories[0],
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) return;

    dispatch(addItem(formData));
    
    // Agregar notificación a la campanita
    dispatch(addNotification({
      message: `Item "${formData.name}" agregado exitosamente`,
      type: 'success',
    }));
    
    // Mostrar toast global
    dispatch(addToast({
      message: `✨ "${formData.name}" agregado al dashboard`,
      type: 'success',
    }));

    setFormData({ name: '', description: '', category: categories[0] });
    setIsExpanded(false);
  };

  return (
    <div className={`item-form-container ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <button 
          className="add-item-trigger"
          onClick={() => setIsExpanded(true)}
        >
          <span className="trigger-icon">+</span>
          <span>Agregar nuevo item</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="item-form">
          <div className="form-header">
            <h3>Nuevo Item</h3>
            <button 
              type="button" 
              className="close-form-btn"
              onClick={() => setIsExpanded(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="¿Qué quieres agregar?"
              autoFocus
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Agrega más detalles (opcional)"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <div className="category-select">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`category-option ${formData.category === cat ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, category: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsExpanded(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={!formData.name.trim()}>
              <span>Agregar Item</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};


