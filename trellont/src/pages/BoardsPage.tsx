import { useNavigate } from "react-router-dom";
import "./BoardsPage.css";
import { useBoards } from "../hooks/useBoards";

export default function BoardsPage() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useBoards();

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  };

  if (isLoading) {
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
          <p>{error.message}</p>
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
        {data?.length === 0 ? (
          <div className="empty-state">
            <h3>No hay tableros disponibles</h3>
            <p>Crea tu primer tablero para comenzar</p>
          </div>
        ) : (
          data?.map((board) => (
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
