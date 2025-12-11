"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const API_URL = "http://localhost:3001";

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
};

const BoardContext = createContext<TrelloBoard | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  // 👉 1. Cargar datos desde la API al inicio
  useEffect(() => {
    const fetchColumns = async () => {
      const res = await fetch(`${API_URL}/columns`);
      const data: Column[] = await res.json();

      // convertir createdAt
      const converted = data.map((col) => ({
        ...col,
        cards: col.cards.map((card) => ({
          ...card,
          createdAt: new Date(card.createdAt),
        })),
      }));

      setColumns(converted);
    };

    fetchColumns();
  }, []);

  // 👉 Helper: actualizar columna completa en el backend
  const updateColumn = async (column: Column) => {
    await fetch(`${API_URL}/columns/${column.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(column),
    });
  };

  const updateCard = async (columnId: number, card: Card) => {
    await fetch(`${API_URL}/columns/${columnId}/cards/${card.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
  };

  // =============================================================
  // =============== COLUMN TITLE EDIT ============================
  // =============================================================

  const setColumnName = async (columnId: number, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );

    const col = columns.find((c) => c.id === columnId);
    if (!col) return;

    updateColumn({ ...col, title: newTitle });
  };

  // =============================================================
  // ======================= ADD CARD ============================
  // =============================================================

  const addCard = async (columnId: number, title = "Nuevo Card") => {
    const newCard: Card = {
      id: Date.now().toString(),
      title,
      createdAt: new Date(),
      subTasks: [],
    };

    // actualizar front
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );

    // API
    await fetch(`${API_URL}/columns/${columnId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCard),
    });
  };

  // =============================================================
  // ======================= UPDATE CARD TITLE ===================
  // =============================================================

  const setCardName = (cardId: string, name: string) => {
    const updated = columns.map((col) => ({
      ...col,
      cards: col.cards.map((card) =>
        card.id === cardId ? { ...card, title: name } : card
      ),
    }));
    setColumns(updated);

    // Encontrar card y columna
    const column = columns.find((col) =>
      col.cards.some((c) => c.id === cardId)
    );
    if (!column) return;

    const card = column.cards.find((c) => c.id === cardId);
    if (!card) return;

    updateCard(column.id, { ...card, title: name });
  };

  // =============================================================
  // =========================== DELETE CARD ======================
  // =============================================================

  const deleteCard = async (cardId: string) => {
    const col = columns.find((c) => c.cards.some((card) => card.id === cardId));
    if (!col) return;

    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((card) => card.id !== cardId),
      }))
    );

    await fetch(`${API_URL}/columns/${col.id}/cards/${cardId}`, {
      method: "DELETE",
    });
  };

  // =============================================================
  // ======================== ADD SUBTASK =========================
  // =============================================================

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

    // Update UI
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

    updateCard(col.id, updatedCard);
  };

  // =============================================================
  // ==================== TOGGLE SUBTASK ==========================
  // =============================================================

  const toggleSubtaskCompleted = (cardId: string, subtaskId: string) => {
    const col = columns.find((c) => c.cards.some((card) => card.id === cardId));
    if (!col) return;

    const card = col.cards.find((c) => c.id === cardId);
    if (!card) return;

    const updatedCard = {
      ...card,
      subTasks: card.subTasks.map((st) =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
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

    updateCard(col.id, updatedCard);
  };

  // =============================================================
  // ====================== UPDATE SUBTASK TITLE ==================
  // =============================================================

  const updateSubtaskTitle = (
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

    updateCard(col.id, updatedCard);
  };

  // =============================================================
  // ========================== REMOVE SUBTASK ====================
  // =============================================================

  const removeSubTask = (cardId: string, subtaskId: string) => {
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

    updateCard(col.id, updatedCard);
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
