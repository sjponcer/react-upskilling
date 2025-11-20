import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Column } from "./Column";
import { type TrelloCardData } from "./TrelloCard";
import { ColumnId } from "@/enums/column-ids";

interface BoardProps {
  onAddCard?: () => void;
}

const initialColumns = [
  { id: ColumnId.Todo, title: "To Do" },
  { id: ColumnId.InProgress, title: "In Progress" },
  { id: ColumnId.Review, title: "In Testing" },
  { id: ColumnId.Done, title: "Done" },
];

const initialCards: TrelloCardData[] = [];

export function Board({ onAddCard }: BoardProps) {
  const cardsByColumn: Record<string, TrelloCardData[]> = {
    todo: [],
    inProgress: [],
    review: [],
    done: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Team Board</h1>
          <Button onClick={onAddCard} className="gap-2">
            <Plus className="h-4 w-4" />
            New Card
          </Button>
        </div>

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
  );
}
