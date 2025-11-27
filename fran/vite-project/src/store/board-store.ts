import type { TrelloCardData } from "@/components/TrelloCard";
import { ColumnId } from "@/enums/column-ids";
import { create } from "zustand";

interface BoardState {
  columns: Record<ColumnId, TrelloCardData[]>;
  addCard: (card: TrelloCardData, columnId: ColumnId) => void;
  removeCard: (cardId: string, columnId: ColumnId) => void;
  moveCard: (cardId: string, fromColumnId: ColumnId, toColumnId: ColumnId) => void;
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
  
  moveCard: (cardId: string, fromColumnId: ColumnId, toColumnId: ColumnId) => {
    set((state) => {
      if (fromColumnId === toColumnId) {
        return state;
      }

      const card = state.columns[fromColumnId].find((card: TrelloCardData) => card.id === cardId);

      if (!card) {
        return state;
      }

      const newFromColumn = state.columns[fromColumnId].filter(
        (card: TrelloCardData) => card.id !== cardId
      );

      const newToColumn = [...state.columns[toColumnId], card];

      return {
        columns: {
          ...state.columns,
          [fromColumnId]: newFromColumn,
          [toColumnId]: newToColumn,
        },
      };
    });
  },
}));
