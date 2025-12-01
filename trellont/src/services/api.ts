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

