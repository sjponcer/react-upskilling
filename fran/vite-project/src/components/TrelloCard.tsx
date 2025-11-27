import { Card } from "@/components/ui/card";
import type { ColumnId } from "@/enums/column-ids";
import { cn } from "@/lib/utils";

export interface TrelloCardData {
  id: string;
  title: string;
  description?: string;
}

interface TrelloCardProps {
  card: TrelloCardData;
  columnId: ColumnId;
  className?: string;
}

export function TrelloCard({ card, columnId, className }: TrelloCardProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify({
      cardId: card.id,
      fromColumnId: columnId,
    }));
    event.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow bg-white",
        className
      )}
    >
      <h4 className="font-semibold text-sm mb-1">{card.title}</h4>
      {card.description && (
        <p className="text-xs text-muted-foreground">{card.description}</p>
      )}
    </Card>
  );
}

