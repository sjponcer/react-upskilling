import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type BoardDetails, type Card } from '../services/api';
import './BoardDetailPage.css';

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDetails | null>(null);
  const [cards, setCards] = useState<{
    todo: Card[];
    'in-progress': Card[];
    done: Card[];
  }>({
    todo: [],
    'in-progress': [],
    done: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [boardData, cardsData] = await Promise.all([
          {
            id: "692cef58ac0b6efb34922a17",
            name: "Recursos Humanos",
            color: "#519839"
          },
          [{
            id: "692cef58ac0b6efb34922a17",
            title: "Implementar autenticación",
            status: "todo",
            priority: "high",
            assignedTo: "Juan Perez",
            dueDate: "2025-12-31",
            tags: ["security", "auth"],
            createdAt: "2025-11-30",
            updatedAt: "2025-11-30"
          }]
        ]);

        // Ensure boardData has all required BoardDetails properties
        setBoard({
          ...boardData,
          createdAt: "2025-11-30", // example date, adjust as necessary
          stats: {
            todo: 1,
            'in-progress': 1,
            done: 1
          }, // provide default/fake stats if needed for mock data
          totalCards: 3
        });

        // Ensure cardsData is an array for filtering
        const cardsArray = cardsData as Card[];

        // Organizar cards por estado
        const organizedCards = {
          todo: cardsArray.filter(c => c.status === 'todo'),
          'in-progress': cardsArray.filter(c => c.status === 'in-progress'),
          done: cardsArray.filter(c => c.status === 'done')
        };
        
        setCards(organizedCards);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el tablero');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, [id]);

  if (loading) {
    return (
      <div className="board-detail-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando tablero...</p>
        </div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="board-detail-page">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error || 'Tablero no encontrado'}</p>
          <button onClick={() => navigate('/boards')}>Volver a tableros</button>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e53e3e';
      case 'medium': return '#dd6b20';
      case 'low': return '#38a169';
      default: return '#718096';
    }
  };

  return (
    <div className="board-detail-page">
      <header className="board-header" style={{ backgroundColor: board.color }}>
        <button className="back-button" onClick={() => navigate('/boards')}>
          ← Volver
        </button>
        <div className="board-info">
          <h1>{board.name}</h1>
          {board.description && <p className="description">{board.description}</p>}
          <div className="board-stats">
            <div className="stat">
              <span className="stat-value">{board.totalCards}</span>
              <span className="stat-label">Total Cards</span>
            </div>
            <div className="stat">
              <span className="stat-value">{board.stats.todo}</span>
              <span className="stat-label">Por hacer</span>
            </div>
            <div className="stat">
              <span className="stat-value">{board.stats['in-progress']}</span>
              <span className="stat-label">En progreso</span>
            </div>
            <div className="stat">
              <span className="stat-value">{board.stats.done}</span>
              <span className="stat-label">Completadas</span>
            </div>
          </div>
        </div>
      </header>

      <div className="board-columns">
        <div className="column">
          <div className="column-header todo-header">
            <h2>📝 Por hacer</h2>
            <span className="count">{cards.todo.length}</span>
          </div>
          <div className="cards-list">
            {cards.todo.map(card => (
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
                    {card.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {cards.todo.length === 0 && (
              <div className="empty-column">No hay tareas pendientes</div>
            )}
          </div>
        </div>

        <div className="column">
          <div className="column-header progress-header">
            <h2>🔄 En progreso</h2>
            <span className="count">{cards['in-progress'].length}</span>
          </div>
          <div className="cards-list">
            {cards['in-progress'].map(card => (
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
                    {card.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {cards['in-progress'].length === 0 && (
              <div className="empty-column">No hay tareas en progreso</div>
            )}
          </div>
        </div>

        <div className="column">
          <div className="column-header done-header">
            <h2>✅ Completadas</h2>
            <span className="count">{cards.done.length}</span>
          </div>
          <div className="cards-list">
            {cards.done.map(card => (
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
                    {card.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {cards.done.length === 0 && (
              <div className="empty-column">No hay tareas completadas</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

