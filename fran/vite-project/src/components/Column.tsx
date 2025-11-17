import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrelloCard, type TrelloCardData } from "./TrelloCard"
import { cn } from "@/lib/utils"

interface ColumnProps {
    id: string
    title: string
    cards: TrelloCardData[]
    className?: string
}

export function Column({ id, title, cards, className }: ColumnProps) {
    return (
        <div className={cn("flex-1 min-w-[280px] max-w-[320px]", className)}>
            <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-2">
                        {cards.map((card) => (
                            <TrelloCard key={card.id} card={card} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}