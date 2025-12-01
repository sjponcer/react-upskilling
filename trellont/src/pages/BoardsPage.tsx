import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Board } from '../services/api';
import './BoardsPage.css';

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        const data = [
            {
                "id": "692cef58ac0b6efb34922a17",
                "name": "Recursos Humanos",
                "color": "#519839"
            },
            {
                "id": "692cef58ac0b6efb34922a18",
                "name": "Diseño UI/UX",
                "color": "#b04632"
            },
            {
                "id": "692cef58ac0b6efb34922a15",
                "name": "Proyecto Web App",
                "color": "#0079bf"
            },
            {
                "id": "692cef58ac0b6efb34922a16",
                "name": "Marketing Digital",
                "color": "#d29034"
            }
        ]
        setBoards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los tableros');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  };

  if (loading) {
    return (
      <div className="boards-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando tableros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="boards-page">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="boards-page">
      <header className="page-header">
        <h1>📋 Mis Tableros</h1>
        <p className="subtitle">Selecciona un tablero para ver sus detalles</p>
      </header>

      <div className="boards-grid">
        {boards.length === 0 ? (
          <div className="empty-state">
            <h3>No hay tableros disponibles</h3>
            <p>Crea tu primer tablero para comenzar</p>
          </div>
        ) : (
          boards.map((board) => (
            <div
              key={board.id}
              className="board-card"
              onClick={() => handleBoardClick(board.id)}
              style={{ borderLeftColor: board.color }}
            >
              <div 
                className="board-color-indicator" 
                style={{ backgroundColor: board.color }}
              ></div>
              <div className="board-content">
                <h3 className="board-name">{board.name}</h3>
                <div className="board-footer">
                  <span className="view-link">Ver detalles →</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

