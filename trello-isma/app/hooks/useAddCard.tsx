import { useState } from "react";
import { useBoardContext } from "../context/board";
import { boardService } from "../services/boardService";
import type { Card } from "../models/models";

export const useAddCard = () => {
  const { columns, setColumns } = useBoardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCard = async (columnId: number, title: string): Promise<void> => {
    if (!title.trim()) {
      setError("El nombre de la tarea no puede estar vacío");
      return;
    }

    setIsLoading(true);
    setError(null);

    const cardId = Date.now().toString();
    const newCard: Card = {
      id: cardId,
      title: title.trim(),
      createdAt: new Date(),
      subTasks: [],
    };

    try {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
        )
      );

      await boardService.addCard(columnId, newCard);
    } catch (err) {
      setError("Error al agregar la tarjeta. Por favor, intenta de nuevo.");
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? {
              ...col,
              cards: col.cards.filter((card) => card.id !== cardId),
            }
            : col
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    addCard,
    isLoading,
    error,
    clearError,
  };
};

