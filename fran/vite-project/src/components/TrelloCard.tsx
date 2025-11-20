import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TrelloCardData {
  id: string;
  title: string;
  description?: string;
}

interface TrelloCardProps {
  card: TrelloCardData;
  className?: string;
}

export function TrelloCard({ card, className }: TrelloCardProps) {
  return (
    <Card
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
