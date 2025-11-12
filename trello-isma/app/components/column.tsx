import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo, useState, useMemo } from "react";
import { useBoardContext } from "../context/board";
import { Card } from "./card";

export const Column = memo(function Column({
  column,
  index,
}: {
  column: Column;
  index: number;
}) {
  const { setColumnName, editingCardId, addCard } = useBoardContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title || `Column ${column.id}`);
  const { isOver, setNodeRef } = useDroppable({ id: `column-${column.id}` });

  const cardsJSX = useMemo(
    () => column.cards.map((card) => <Card key={card.id} card={card} />),
    [column.cards, editingCardId]
  );

  const handleBlur = () => {
    setIsEditing(false);
    const trimmed = title.trim() || "Column Name";
    if (trimmed !== column.title) setColumnName(column.id, trimmed);
    setTitle(trimmed);
  };

  return (
    <div
      ref={setNodeRef}
      className={`group/column flex-1 min-h-24 bg-gray-600 rounded-lg p-4 relative transition-all duration-200 ${
        isOver ? "ring-2 ring-offset-2 ring-blue-400" : ""
      }`}
    >
      {index === 0 && (
        <div
          className="absolute top-2 right-4 transition-opacity cursor-pointer text-white text-xl select-none hover:scale-110"
          onClick={() => addCard(column.id)}
        >
          <i className="fas fa-plus"></i>
        </div>
      )}

      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
          className="w-full bg-gray-700 text-white font-semibold mb-3 p-1 rounded-sm outline-none"
        />
      ) : (
        <h2
          className="text-white font-semibold mb-3 cursor-pointer select-none"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h2>
      )}

      <SortableContext
        items={column.cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {cardsJSX}
      </SortableContext>
    </div>
  );
});
