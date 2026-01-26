import { useDraggable } from "@dnd-kit/core";
import type { Card } from "@/services/api";
import EditCardModal from "@/modals/EditCardModal";
import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";

interface DraggableCardProps {
  card: Card;
  getPriorityColor: (priority: string) => string;
  onDelete: (cardId: string) => void;
}

export default function DraggableCard({
  card,
  getPriorityColor,
  onDelete,
}: DraggableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({ id: card.id });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="card" style={{ cursor: "grab" }}>
        <h3>{card.title}</h3>
        <div className="card-meta">
          <span
            className="priority-badge"
            style={{
              backgroundColor: getPriorityColor(card.priority),
            }}
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
        <div style={{ display: "flex", gap: 8 }}>
          <EditCardModal cardId={card.id} cardTitle={card.title} />
          <ConfirmModal
            triggerButton={
              <Button
                variant="destructive"
                size="sm"
                style={{ padding: 8 }}
                onClick={(e) => e.stopPropagation()}
              >
                Eliminar
              </Button>
            }
            onConfirm={() => onDelete(card.id)}
          />
        </div>
      </div>
    </div>
  );
}
