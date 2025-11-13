"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

// const initialBoardData: Column[] = [
//   { id: 1, title: "Backlog", cards: [] },
//   { id: 2, title: "Development", cards: [] },
//   { id: 3, title: "QA", cards: [] },
//   { id: 4, title: "Done", cards: [] },
// ];

const BoardContext = createContext<TrelloBoard | undefined>(undefined);

const localBoardDataKey = "trello-board-data";
const initialBoardData: Column[] = [
  {
    id: 1,
    title: "Backlog",
    cards: [
      {
        id: "1762977473135",
        title: "New Features",
        createdAt: new Date("2025-11-12T19:57:53.135Z"),
        subTasks: [
          { id: "1762977477771", title: "Nueva Subtarea", completed: false },
          { id: "1762977478384", title: "Nueva Subtarea", completed: false },
          { id: "1762977479079", title: "Nueva Subtarea", completed: false },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Development",
    cards: [
      {
        id: "1762978134760",
        title: "Issue witl localStorage",
        createdAt: new Date("2025-11-12T20:08:54.760Z"),
        subTasks: [
          {
            id: "1762978180498",
            title: "Pregutnar a Santi XD",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "QA",
    cards: [
      {
        id: "1762977203921",
        title: "Save data in LocalStorage",
        createdAt: new Date("2025-11-12T19:53:23.921Z"),
        subTasks: [
          {
            id: "1762977216267",
            title: "Save in localStorage",
            completed: true,
          },
          {
            id: "1762977507896",
            title: "Load data from LocalStorage",
            completed: true,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Done",
    cards: [
      {
        id: "1762977201179",
        title: "Create Trello App",
        createdAt: new Date("2025-11-12T19:53:21.179Z"),
        subTasks: [
          { id: "1762977219348", title: "Create Main App", completed: true },
          {
            id: "1762977315187",
            title: "Create Card/Column Component",
            completed: true,
          },
          {
            id: "1762977405186",
            title: "Drag & Drop in column",
            completed: true,
          },
        ],
      },
      {
        id: "1762977230001",
        title: "Fix - Drang & Drop",
        createdAt: new Date("2025-11-12T19:53:50.001Z"),
        subTasks: [
          {
            id: "1762977234539",
            title: "Add Drag & Drop Between Columns",
            completed: true,
          },
          { id: "1762977235127", title: "Keep Order", completed: true },
        ],
      },
      {
        id: "1762977204097",
        title: "Create Context and Methods",
        createdAt: new Date("2025-11-12T19:53:24.097Z"),
        subTasks: [
          { id: "1762977217155", title: "Context", completed: true },
          { id: "1762977217617", title: "Methods", completed: true },
          {
            id: "1762977218048",
            title: "Implements Context",
            completed: true,
          },
        ],
      },
    ],
  },
];

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>(initialBoardData);

  useEffect(() => {
    const stored = localStorage.getItem(localBoardDataKey);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored ?? "null") as Column[];
      const withDates = parsed.map((col) => ({
        ...col,
        cards: col.cards.map((card) => ({
          ...card,
          createdAt: new Date(card.createdAt),
        })),
      }));
      //TODO ver pq esto aveces hace fallar el card.createdAt
      setColumns(withDates || initialBoardData);
    } catch (err) {
      console.error("Error loading board:", err);
      setColumns(initialBoardData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localBoardDataKey, JSON.stringify(columns));
  }, [columns]);

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
