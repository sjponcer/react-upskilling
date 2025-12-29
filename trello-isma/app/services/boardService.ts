import type { Column, Card } from "../models/models";

const API_URL = "http://localhost:3001";

export const boardService = {
  async fetchColumns(): Promise<Column[]> {
    const res = await fetch(`${API_URL}/columns`);
    const data: Column[] = await res.json();
    return data.map((col) => ({
      ...col,
      cards: col.cards.map((card) => ({
        ...card,
        createdAt: new Date(card.createdAt),
      })),
    }));
  },

  async updateColumn(column: Column): Promise<void> {
    await fetch(`${API_URL}/columns/${column.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(column),
    });
  },

  async updateCard(columnId: number, card: Card): Promise<void> {
    await fetch(`${API_URL}/columns/${columnId}/cards/${card.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
  },

  async addCard(columnId: number, card: Card): Promise<void> {
    await fetch(`${API_URL}/columns/${columnId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
  },

  async deleteCard(columnId: number, cardId: string): Promise<void> {
    await fetch(`${API_URL}/columns/${columnId}/cards/${cardId}`, {
      method: "DELETE",
    });
  },

  async saveBoard(columns: Column[]): Promise<void> {
    await fetch(`${API_URL}/board`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ columns }),
    });
  },
};

