import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useAppDispatch';
import { removeToast } from '../store/notificationsSlice';
import './ToastContainer.css';

export const ToastContainer = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(state => state.notifications.toasts);

  useEffect(() => {
    toasts.forEach(toast => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 4000);
      
      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`toast toast-${toast.type}`}
          onClick={() => dispatch(removeToast(toast.id))}
        >
          <span className={`toast-icon ${toast.type}`}>
            {getIcon(toast.type)}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="toast-progress" />
        </div>
      ))}
    </div>
  );
};


