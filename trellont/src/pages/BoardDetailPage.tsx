import { useNavigate } from "react-router-dom";
import "./BoardDetailPage.css";
import { useBoards } from "@/hooks/useBoards";
import AddCardModal from "@/modals/AddCardModal";
import EditBoardModal from "@/modals/EditBoardModal";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import type { Card, CardStatus } from "@/services/api";
import DroppableColumn from "@/components/DroppableColumn";

export default function BoardDetailPage() {
  const navigate = useNavigate();
  const { selectedBoard, cards, error, loading, deleteCard, updateCard } = useBoards();
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  if (error || !selectedBoard) {
    return (
      <div className="board-detail-page">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error?.message || "Tablero no encontrado"}</p>
          <button onClick={() => navigate("/boards")}>Volver a tableros</button>
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

  const handleDeleteCard = async (cardId: string) => {
    await deleteCard(cardId);
  };

  const cardsByStatus = {
    todo: cards?.filter((c) => c.status === "todo") || [],
    "in-progress": cards?.filter((c) => c.status === "in-progress") || [],
    done: cards?.filter((c) => c.status === "done") || [],
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = cards?.find((c) => c.id === active.id);
    if (card) {
      setActiveCard(card);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over || !cards) return;

    const cardId = active.id as string;
    const card = cards.find((c) => c.id === cardId);

    if (!card) return;

    const statuses: CardStatus[] = ["todo", "in-progress", "done"];
    
    const newStatus = statuses.includes(over.id as CardStatus)
      ? (over.id as CardStatus)
      : card.status;

    if (newStatus !== card.status) {
      try {
        await updateCard(cardId, { status: newStatus });
      } catch (error) {
        console.error("Error al actualizar la card:", error);
      }
    }
  };

  return (
    <div className="board-detail-page">
      <header
        className="board-header"
        style={{ backgroundColor: selectedBoard.color }}
      >
        <button className="back-button" onClick={() => navigate("/boards")}>
          ← Volver
        </button>

        <EditBoardModal
          boardName={selectedBoard.name}
          boardDescription={selectedBoard.description ?? ""}
        ></EditBoardModal>

        <div className="board-info">
          <h1>{selectedBoard.name}</h1>
          {selectedBoard.description && (
            <p className="description">{selectedBoard.description}</p>
          )}
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
              <span className="stat-value">
                {selectedBoard.stats["in-progress"]}
              </span>
              <span className="stat-label">En progreso</span>
            </div>
            <div className="stat">
              <span className="stat-value">{selectedBoard.stats.done}</span>
              <span className="stat-label">Completadas</span>
            </div>
          </div>
        </div>
      </header>
      <AddCardModal></AddCardModal>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="board-columns">
          <DroppableColumn
            status="todo"
            title="Por hacer"
            emoji="📝"
            cards={cardsByStatus.todo}
            getPriorityColor={getPriorityColor}
            onDeleteCard={handleDeleteCard}
          />
          <DroppableColumn
            status="in-progress"
            title="En progreso"
            emoji="🔄"
            cards={cardsByStatus["in-progress"]}
            getPriorityColor={getPriorityColor}
            onDeleteCard={handleDeleteCard}
          />
          <DroppableColumn
            status="done"
            title="Completadas"
            emoji="✅"
            cards={cardsByStatus.done}
            getPriorityColor={getPriorityColor}
            onDeleteCard={handleDeleteCard}
          />
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="card" style={{ opacity: 0.8, transform: "rotate(5deg)" }}>
              <h3>{activeCard.title}</h3>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
