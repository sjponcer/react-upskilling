<<<<<<< HEAD
import { useParams, useNavigate } from "react-router-dom";
import "./BoardDetailPage.css";
import { useBoardDetails } from "../hooks/useBoardDetails";
=======
import { useParams, useNavigate } from 'react-router-dom';
import './BoardDetailPage.css';
import { useBoards } from '../hooks/useBoards';
import { useEffect } from 'react';
>>>>>>> main

export default function BoardDetailPage() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { board, cards, error, isLoading } = useBoardDetails(id);

  if (isLoading) {
=======
  const { id } = useParams<{ id: string }>();

  const { selectedBoard, setSelectedBoardId, loading, error, cards } = useBoards();

  const handleCreateCard = () => {
    //hook .createCard => mutation
    //abrir un form
  }
  useEffect(() => {
    if (id) {
      setSelectedBoardId(id);
    }
  }, [id, setSelectedBoardId]);

  if (loading) {
>>>>>>> main
    return (
      <div className="board-detail-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando tablero...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedBoard) {
    return (
      <div className="board-detail-page">
        <div className="error">
          <h2>⚠️ Error</h2>
<<<<<<< HEAD
          <p>{error?.message || "Tablero no encontrado"}</p>
          <button onClick={() => navigate("/boards")}>Volver a tableros</button>
=======
          <p>{error?.message || 'Tablero no encontrado'}</p>
          <button onClick={() => navigate('/boards')}>Volver a tableros</button>
>>>>>>> main
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#e53e3e";
      case "medium":
        return "#dd6b20";
      case "low":
        return "#38a169";
      default:
        return "#718096";
    }
  };

  return (
    <div className="board-detail-page">
<<<<<<< HEAD
      <header className="board-header" style={{ backgroundColor: board.color }}>
        <button className="back-button" onClick={() => navigate("/boards")}>
          ← Volver
        </button>
        <div className="board-info">
          <h1>{board.name}</h1>
          {board.description && (
            <p className="description">{board.description}</p>
          )}
=======
      <header className="board-header" style={{ backgroundColor: selectedBoard.color }}>
        <button className="back-button" onClick={() => navigate('/boards')}>
          ← Volver
        </button>
        <div className="board-info">
          <h1>{selectedBoard.name}</h1>
          {selectedBoard.description && <p className="description">{selectedBoard.description}</p>}
>>>>>>> main
          <div className="board-stats">
            <div className="stat">
              <span className="stat-value">{selectedBoard.totalCards}</span>
              <span className="stat-label">Total Cards</span>
            </div>
            <div className="stat">
              <span className="stat-value">{selectedBoard.stats.todo}</span>
              <span className="stat-label">Por hacer</span>
            </div>
            <div className="stat">
<<<<<<< HEAD
              <span className="stat-value">{board.stats["in-progress"]}</span>
=======
              <span className="stat-value">{selectedBoard.stats['in-progress']}</span>
>>>>>>> main
              <span className="stat-label">En progreso</span>
            </div>
            <div className="stat">
              <span className="stat-value">{selectedBoard.stats.done}</span>
              <span className="stat-label">Completadas</span>
            </div>
          </div>
        </div>
        <button onClick={() => handleCreateCard()}>crear +</button>
      </header>

      <div className="board-columns">
        <div className="column">
          <div className="column-header todo-header">
            <h2>📝 Por hacer</h2>
            <span className="count">{cards?.filter(c => c.status === 'todo').length}</span>
          </div>
          <div className="cards-list">
<<<<<<< HEAD
            {cards.todo.map((card) => (
=======
            {cards?.filter(c => c.status === 'todo').map(card => (
>>>>>>> main
              <div key={card.id} className="card">
                <h3>{card.title}</h3>
                <div className="card-meta">
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(card.priority) }}
                  >
                    {card.priority}
                  </span>
                  {card.assignedTo && (
                    <span className="assignee">👤 {card.assignedTo}</span>
                  )}
                </div>
                {card.tags.length > 0 && (
                  <div className="tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {cards?.filter(c => c.status === 'todo').length === 0 && (
              <div className="empty-column">No hay tareas pendientes</div>
            )}
          </div>
        </div>

        <div className="column">
          <div className="column-header progress-header">
            <h2>🔄 En progreso</h2>
<<<<<<< HEAD
            <span className="count">{cards["in-progress"].length}</span>
          </div>
          <div className="cards-list">
            {cards["in-progress"].map((card) => (
=======
            <span className="count">{selectedBoard.stats['in-progress']}</span>
          </div>
          <div className="cards-list">
            {cards?.filter(c => c.status === 'in-progress').map(card => (
>>>>>>> main
              <div key={card.id} className="card">
                <h3>{card.title}</h3>
                <div className="card-meta">
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(card.priority) }}
                  >
                    {card.priority}
                  </span>
                  {card.assignedTo && (
                    <span className="assignee">👤 {card.assignedTo}</span>
                  )}
                </div>
                {card.tags.length > 0 && (
                  <div className="tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
<<<<<<< HEAD
            {cards["in-progress"].length === 0 && (
=======
            {cards?.filter(c => c.status === 'in-progress').length === 0 && (
>>>>>>> main
              <div className="empty-column">No hay tareas en progreso</div>
            )}
          </div>
        </div>

        <div className="column">
          <div className="column-header done-header">
            <h2>✅ Completadas</h2>
            <span className="count">{cards?.filter(c => c.status === 'done').length}</span>
          </div>
          <div className="cards-list">
<<<<<<< HEAD
            {cards.done.map((card) => (
=======
            {cards?.filter(c => c.status === 'done').map(card => (
>>>>>>> main
              <div key={card.id} className="card">
                <h3>{card.title}</h3>
                <div className="card-meta">
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(card.priority) }}
                  >
                    {card.priority}
                  </span>
                  {card.assignedTo && (
                    <span className="assignee">👤 {card.assignedTo}</span>
                  )}
                </div>
                {card.tags.length > 0 && (
                  <div className="tags">
                    {card.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {cards?.filter(c => c.status === 'done').length === 0 && (
              <div className="empty-column">No hay tareas completadas</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
