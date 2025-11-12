import { createContext, useContext, useState, ReactNode } from "react";

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
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, title: "Backlog", cards: [] },
    { id: 2, title: "Development", cards: [] },
    { id: 3, title: "QA", cards: [] },
    { id: 4, title: "Done", cards: [] },
  ]);

  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const setColumnName = (columnId: number, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );
  };

  const addCard = (columnId: number, title = "Nuevo Card") => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                {
                  id: Date.now().toString(),
                  title,
                  createdAt: new Date(),
                  subTasks: [],
                },
              ],
            }
          : col
      )
    );
  };

  const setCardName = (cardId: string, name: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId ? { ...card, title: name } : card
        ),
      }))
    );
  };

  const deleteCard = (cardId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((card) => card.id !== cardId),
      }))
    );
  };

  const addSubtask = (cardId: string, title: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                subTasks: [
                  ...card.subTasks,
                  { id: Date.now().toString(), title, completed: false },
                ],
              }
            : card
        ),
      }))
    );
  };

  const toggleSubtaskCompleted = (cardId: string, subtaskId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                subTasks: card.subTasks.map((st) =>
                  st.id === subtaskId ? { ...st, completed: !st.completed } : st
                ),
              }
            : card
        ),
      }))
    );
  };

  const updateSubtaskTitle = (
    cardId: string,
    subtaskId: string,
    title: string
  ) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                subTasks: card.subTasks.map((st) =>
                  st.id === subtaskId ? { ...st, title } : st
                ),
              }
            : card
        ),
      }))
    );
  };

  const removeSubTask = (cardId: string, subtaskId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                subTasks: card.subTasks.filter((st) => st.id !== subtaskId),
              }
            : card
        ),
      }))
    );
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
