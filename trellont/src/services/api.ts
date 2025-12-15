const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Board {
  id: string;
  name: string;
  color: string;
}

export interface BoardDetails {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  stats: {
    todo: number;
    'in-progress': number;
    done: number;
  };
  totalCards: number;
}

export interface Card {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

interface BoardsResponse {
  success: boolean;
  count: number;
  data: Board[];
}

interface BoardDetailsResponse {
  success: boolean;
  data: BoardDetails;
}

interface CardsResponse {
  success: boolean;
  boardId: string;
  boardName: string;
  count: number;
  data: Card[];
}

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch(`${API_BASE_URL}/boards`);
  if (!response.ok) {
    throw new Error('Error al obtener los tableros');
  }
  const data: BoardsResponse = await response.json();
  return data.data;
};

export const fetchBoardDetails = async (boardId: string): Promise<BoardDetails> => {
  const response = await fetch(`${API_BASE_URL}/boards/${boardId}`);
  if (!response.ok) {
    throw new Error('Error al obtener los detalles del tablero');
  }
  const data: BoardDetailsResponse = await response.json();
  return {
    ...data.data,
    id: boardId,
  };
};

export const fetchCardsByBoard = async (boardId: string): Promise<Card[]> => {
  const response = await fetch(`${API_BASE_URL}/cards/${boardId}`);
  if (!response.ok) {
    throw new Error('Error al obtener las cards del tablero');
  }
  const data: CardsResponse = await response.json();
  return data.data;
};

