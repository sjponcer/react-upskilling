import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrelloCard, type TrelloCardData } from "./TrelloCard"
import { cn } from "@/lib/utils"
import type { ColumnId } from "@/enums/column-ids"
import { useState } from "react"

interface ColumnProps {
    id: ColumnId
    title: string
    cards: TrelloCardData[]
    className?: string,
    onDrop: (cardId: string, fromColumnId: ColumnId, toColumnId: ColumnId) => void
}

export function Column({ id, title, cards, className, onDrop }: ColumnProps) {
    const [isDraggingOver, setIsDraggingOver] = useState(false)

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setIsDraggingOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);

        try {
            const data = JSON.parse(event.dataTransfer.getData("text/plain"));
            const { cardId, fromColumnId } = data;

            if (fromColumnId !== id) {
                onDrop(cardId, fromColumnId, id);
            }
        } catch (error) {
            console.error("Error parsing drag data:", error);
        }
    };

    return (
        <div className={cn("flex-1 min-w-[280px] max-w-[320px]", className)}>
            <Card className="h-full flex flex-col"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-2">
                        {cards.map((card) => (
                            <TrelloCard key={card.id} card={card} columnId={id} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}