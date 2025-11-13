"use client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";
import { BoardProvider, useBoardContext } from "./context/board";
import { Column } from "./components/column";

function BoardContent() {
  const { columns, setColumns } = useBoardContext();

  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState<string | null>(null);

  const findCardLocation = (id: string) => {
    for (let i = 0; i < columns.length; i++) {
      const idx = columns[i].cards.findIndex((c) => c.id === id);
      if (idx !== -1) return { columnIndex: i, cardIndex: idx };
    }
    return null;
  };

  const findCardTitle = (id: string) => {
    for (const col of columns) {
      const card = col.cards.find((c) => c.id === id);
      if (card) return card.title;
    }
    return "";
  };

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const isOverColumn = overId.startsWith("column-");

    const activeLocation = findCardLocation(activeId);
    const overLocation = isOverColumn ? null : findCardLocation(overId);
    if (!activeLocation) return;

    setColumns((prev) => {
      const newCols = prev.map((c) => ({ ...c, cards: [...c.cards] }));
      const movedCard = newCols[activeLocation.columnIndex].cards.splice(
        activeLocation.cardIndex,
        1
      )[0];

      if (!movedCard) return prev;

      if (isOverColumn) {
        const targetColumnIndex = Number(overId.replace("column-", "")) - 1;
        newCols[targetColumnIndex].cards.push(movedCard);
      } else if (overLocation) {
        newCols[overLocation.columnIndex].cards.splice(
          overLocation.cardIndex,
          0,
          movedCard
        );
      }

      return newCols;
    });
  };

  return (
    <main className="flex min-h-screen items-start justify-center font-sans dark:bg-gray-800 gap-4 p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {columns.map((column, index) => (
          <Column key={column.id} column={column} index={index} />
        ))}

        <DragOverlay dropAnimation={{ duration: 150 }}>
          {activeId && (
            <div className="bg-gray-700 rounded-lg shadow-lg p-4 text-gray-100 opacity-90 scale-105">
              {findCardTitle(activeId)}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </main>
  );
}

export default function Home() {
  return (
    <BoardProvider>
      <BoardContent />
    </BoardProvider>
  );
}
