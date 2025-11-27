import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Column } from "./Column";
import { type TrelloCardData } from "./TrelloCard";
import { ColumnId } from "@/enums/column-ids";
import { useBoardStore } from "@/store/board-store";
import { AddCardModal } from "./AddCardModal";
import { useState } from "react";

interface BoardProps {
  onAddCard?: () => void;
}

const initialColumns = [
  { id: ColumnId.Todo, title: "To Do" },
  { id: ColumnId.InProgress, title: "In Progress" },
  { id: ColumnId.Review, title: "In Testing" },
  { id: ColumnId.Done, title: "Done" },
];

export function Board() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addCard = useBoardStore((state) => state.addCard);
  const columns = useBoardStore((state) => state.columns);

  const cardsByColumn: Record<string, TrelloCardData[]> = {
    todo: [],
    inProgress: [],
    review: [],
    done: [],
  };

  function handleAddCard() {
    setIsModalOpen(true);
  }

  function handleSaveCard(card: TrelloCardData, columnId: ColumnId) {
    addCard(card, columnId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Team Board</h1>
          <Button onClick={handleAddCard} className="gap-2">
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
              cards={columns[column.id] || []}
            />
          ))}
        </div>
      </div>

      <AddCardModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSaveCard}
      />
    </div>
  );
}
