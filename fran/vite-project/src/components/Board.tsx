import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Column } from "./Column"
import { type TrelloCardData } from "./TrelloCard"

interface BoardProps {
    onAddCard?: () => void
}

const initialColumns = [
    { id: "todo", title: "Por Hacer" },
    { id: "in-progress", title: "En Progreso" },
    { id: "review", title: "En Revisión" },
    { id: "done", title: "Completado" },
]

// Por ahora, datos de ejemplo - luego se manejará con estado global
const initialCards: TrelloCardData[] = []

export function Board({ onAddCard }: BoardProps) {
    // Por ahora, todas las columnas tienen las mismas cards vacías
    // Luego se distribuirán según el estado global
    const cardsByColumn: Record<string, TrelloCardData[]> = {
        todo: [],
        "in-progress": [],
        review: [],
        done: [],
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header del Board */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-800">Mi Tablero</h1>
                    <Button onClick={onAddCard} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Agregar Card
                    </Button>
                </div>

                {/* Columnas */}
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {initialColumns.map((column) => (
                        <Column
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            cards={cardsByColumn[column.id] || []}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}