"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { boardService } from "../services/boardService";
import type { Column, Card } from "../models/models";

type TrelloBoard = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  setColumnName: (columnId: number, name: string) => void;
  addCard: (columnId: number, title?: string) => void;
  setCardName: (cardId: string, name: string) => void;
  deleteCard: (cardId: string) => void;
  addSubtask: (cardId: string, title: string) => void;
  toggleSubtaskCompleted: (cardId: string, subtaskId: string) => void;
  updateSubtaskTitle: (
    cardId: string,
    subtaskId: string,
    title: string
  ) => void;
  editingCardId: string | null;
  setEditingCardId: React.Dispatch<React.SetStateAction<string | null>>;
  removeSubTask: (cardId: string, subtaskId: string) => void;
  saveBoard: (columns: Column[]) => void;
};

const BoardContext = createContext<TrelloBoard | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchColumns = async () => {
      const data = await boardService.fetchColumns();
      setColumns(data);
    };

    fetchColumns();
  }, []);


  const setColumnName = async (columnId: number, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );

    const col = columns.find((c) => c.id === columnId);
    if (!col) return;

    await boardService.updateColumn({ ...col, title: newTitle });
  };

  const addCard = async (columnId: number, title = "Nuevo Card") => {
    const newCard: Card = {
      id: Date.now().toString(),
      title,
      createdAt: new Date(),
      subTasks: [],
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );

    await boardService.addCard(columnId, newCard);
  };

  const setCardName = async (cardId: string, name: string) => {
    const updated = columns.map((col) => ({
      ...col,
      cards: col.cards.map((card) =>
        card.id === cardId ? { ...card, title: name } : card
      ),
    }));
    setColumns(updated);

    const column = columns.find((col) =>
      col.cards.some((c) => c.id === cardId)
    );
    if (!column) return;

    const card = column.cards.find((c) => c.id === cardId);
    if (!card) return;

    await boardService.updateCard(column.id, { ...card, title: name });
  };

  const deleteCard = async (cardId: string) => {
    const col = columns.find((c) => c.cards.some((card) => card.id === cardId));
    if (!col) return;

    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((card) => card.id !== cardId),
      }))
    );

    await boardService.deleteCard(col.id, cardId);
  };

  const addSubtask = async (cardId: string, title: string) => {
    const col = columns.find((c) => c.cards.some((card) => card.id === cardId));
    if (!col) return;

    const card = col.cards.find((c) => c.id === cardId);
    if (!card) return;

    const newSubtask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    const updatedCard = {
      ...card,
      subTasks: [...card.subTasks, newSubtask],
    };

    setColumns((prev) =>
      prev.map((column) =>
        column.id === col.id
          ? {
            ...column,
            cards: column.cards.map((c) =>
              c.id === cardId ? updatedCard : c
            ),
          }
          : column
      )
    );

    await boardService.updateCard(col.id, updatedCard);
  };

  const toggleSubtaskCompleted = async (cardId: string, subtaskId: string) => {
    const column = columns.find((col) =>
      col.cards.some((card) => card.id === cardId)
    );
    if (!column) return;

    const card = column.cards.find((c) => c.id === cardId);
    if (!card) return;

    const updatedSubTasks = card.subTasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );

    const updatedCard = {
      ...card,
      subTasks: updatedSubTasks,
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === column.id
          ? {
            ...col,
            cards: col.cards.map((c) =>
              c.id === cardId ? updatedCard : c
            ),
          }
          : col
      )
    );

    await boardService.updateCard(column.id, updatedCard);
  };

  const updateSubtaskTitle = async (
    cardId: string,
    subtaskId: string,
    title: string
  ) => {
    const col = columns.find((c) => c.cards.some((card) => card.id === cardId));
    if (!col) return;

    const card = col.cards.find((c) => c.id === cardId);
    if (!card) return;

    const updatedCard = {
      ...card,
      subTasks: card.subTasks.map((st) =>
        st.id === subtaskId ? { ...st, title } : st
      ),
    };

    setColumns((prev) =>
      prev.map((column) =>
        column.id === col.id
          ? {
            ...column,
            cards: column.cards.map((c) =>
              c.id === cardId ? updatedCard : c
            ),
          }
          : column
      )
    );

    await boardService.updateCard(col.id, updatedCard);
  };

  const removeSubTask = async (cardId: string, subtaskId: string) => {
    const col = columns.find((c) => c.cards.some((card) => card.id === cardId));
    if (!col) return;

    const card = col.cards.find((c) => c.id === cardId);
    if (!card) return;

    const updatedCard = {
      ...card,
      subTasks: card.subTasks.filter((st) => st.id !== subtaskId),
    };

    setColumns((prev) =>
      prev.map((column) =>
        column.id === col.id
          ? {
            ...column,
            cards: column.cards.map((c) =>
              c.id === cardId ? updatedCard : c
            ),
          }
          : column
      )
    );

    await boardService.updateCard(col.id, updatedCard);
  };

  const saveBoard = async (columns: Column[]) => {
    await boardService.saveBoard(columns);
  };

  return (
    <BoardContext.Provider
      value={{
        columns,
        setColumns,
        setColumnName,
        addCard,
        setCardName,
        deleteCard,
        addSubtask,
        toggleSubtaskCompleted,
        updateSubtaskTitle,
        editingCardId,
        setEditingCardId,
        removeSubTask,
        saveBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context)
    throw new Error("useBoardContext must be used within BoardProvider");
  return context;
};

export { BoardContext };
