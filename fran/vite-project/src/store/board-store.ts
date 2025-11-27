import type { TrelloCardData } from "@/components/TrelloCard";
import { ColumnId } from "@/enums/column-ids";
import { create } from "zustand";

interface BoardState {
  columns: Record<ColumnId, TrelloCardData[]>;
  addCard: (card: TrelloCardData, columnId: ColumnId) => void;
  removeCard: (cardId: string, columnId: ColumnId) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: {
    [ColumnId.Todo]: [],
    [ColumnId.InProgress]: [],
    [ColumnId.Review]: [],
    [ColumnId.Done]: [],
  },

  addCard: (card: TrelloCardData, columnId: ColumnId) => {
    set((state) => ({
      columns: {
        ...state.columns,
        [columnId]: [...state.columns[columnId], card],
      },
    }));
  },

  removeCard: (cardId: string, columnId: ColumnId) => {
    set((state) => ({
      columns: {
        ...state.columns,
        [columnId]: state.columns[columnId].filter(
          (card) => card.id !== cardId
        ),
      },
    }));
  },
}));
