import { NotificationBell } from './NotificationBell';
import './Header.css';

export const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Redux Dashboard</span>
          </div>
          <span className="header-tagline">Gestiona tus items con estilo</span>
        </div>
        
        <div className="header-right">
          <NotificationBell />
          <div className="user-avatar">
            <span>SP</span>
          </div>
        </div>
      </div>
    </header>
  );
};


