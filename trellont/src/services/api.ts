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

export interface CreateBoardInput {
  name: string;
  description?: string;
  color?: string;
}

export const createBoard = async (data: CreateBoardInput): Promise<Board> => {
  const response = await fetch(`${API_BASE_URL}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al crear el board')
  }
  
  const json = await response.json()
  return json.data
}

export interface UpdateBoardInput {
  name?: string;
  description?: string;
  color?: string;
}

export const updateBoard = async (id: string, data: UpdateBoardInput): Promise<Board> => {
  const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al actualizar el board')
  }
  
  const json = await response.json()
  return json.data
}

export const deleteBoard = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al eliminar el board')
  }
}

export interface CreateCardInput {
  boardId: string;
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: string;
  tags?: string[];
}

export const createCard = async (data: CreateCardInput): Promise<Card> => {
  const response = await fetch(`${API_BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al crear la card')
  }
  
  const json = await response.json()
  return json.data
}

export interface UpdateCardInput {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: string;
  tags?: string[];
}

export const updateCard = async (cardId: string, data: UpdateCardInput): Promise<Card> => {
  const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al actualizar la card')
  }
  
  const json = await response.json()
  return json.data
}

export const deleteCard = async (cardId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al eliminar la card')
  }
}

export const getCardsByBoard = async (boardId: string): Promise<Card[]> => {
  const response = await fetch(`${API_BASE_URL}/cards/${boardId}`)
  
  if (!response.ok) {
    throw new Error('Error al obtener las cards')
  }
  
  const json = await response.json()
  return json.data
}

export const getCards = async (boardId: string): Promise<Card[]> => {
  const response = await fetch(`${API_BASE_URL}/cards/${boardId}`)
  const json = await response.json()
  return json.data
}