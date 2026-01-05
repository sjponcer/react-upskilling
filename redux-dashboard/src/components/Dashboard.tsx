import { useAppSelector } from '../hooks/useAppDispatch';
import { ItemForm } from './ItemForm';
import { ItemList } from './ItemList';
import { LogsViewer } from './LogsViewer';
import './Dashboard.css';

export const Dashboard = () => {
  const items = useAppSelector(state => state.items.items);
  const notifications = useAppSelector(state => state.notifications.notifications);
  
  const categories = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="dashboard">
      <div className="dashboard-container">
        <section className="dashboard-welcome">
          <h1>
            <span className="wave">👋</span> Bienvenido al Dashboard
          </h1>
          <p>Agrega, organiza y gestiona tus items. Cada acción genera una notificación.</p>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
              📦
            </div>
            <div className="stat-content">
              <h4>{items.length}</h4>
              <p>Total Items</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              🔔
            </div>
            <div className="stat-content">
              <h4>{notifications.filter(n => !n.read).length}</h4>
              <p>Sin leer</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              📁
            </div>
            <div className="stat-content">
              <h4>{Object.keys(categories).length}</h4>
              <p>Categorías</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
              📊
            </div>
            <div className="stat-content">
              <h4>{notifications.length}</h4>
              <p>Actividades</p>
            </div>
          </div>
        </section>

        <section className="form-section">
          <ItemForm />
        </section>

        <section className="items-section">
          <div className="section-header">
            <h2>Mis Items</h2>
            {items.length > 0 && (
              <span className="items-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
            )}
          </div>
          <ItemList />
        </section>

        <section className="logs-section">
          <LogsViewer />
        </section>
      </div>
    </main>
  );
};


