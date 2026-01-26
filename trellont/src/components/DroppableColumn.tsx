import { useDroppable } from "@dnd-kit/core";
import type { Card, CardStatus } from "@/services/api";
import DraggableCard from "./DraggableCard";

interface DroppableColumnProps {
  status: CardStatus;
  title: string;
  emoji: string;
  cards: Card[];
  getPriorityColor: (priority: string) => string;
  onDeleteCard: (cardId: string) => void;
}

export default function DroppableColumn({
  status,
  title,
  emoji,
  cards,
  getPriorityColor,
  onDeleteCard,
}: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="column" ref={setNodeRef}>
      <div className={`column-header ${status}-header`}>
        <h2>
          {emoji} {title}
        </h2>
        <span className="count">{cards.length}</span>
      </div>
      <div className="cards-list">
        {cards.map((card) => (
          <DraggableCard
            key={card.id}
            card={card}
            getPriorityColor={getPriorityColor}
            onDelete={onDeleteCard}
          />
        ))}
        {cards.length === 0 && (
          <div className="empty-column">No hay tareas</div>
        )}
      </div>
    </div>
  );
}
