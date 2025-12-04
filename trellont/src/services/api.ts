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

export const getBoards = async (): Promise<Board[]> => {
  const response = await fetch(`${API_BASE_URL}/boards`)
  const json = await response.json()
  return json.data
}

export const getBoardById = async (id: string): Promise<BoardDetails> => {
  const response = await fetch(`${API_BASE_URL}/boards/${id}`)
  const json = await response.json()
  return json.data
}

export const getCards = async (boardId: string): Promise<Card[]> => {
  const response = await fetch(`${API_BASE_URL}/cards/${boardId}`)
  const json = await response.json()
  return json.data
}