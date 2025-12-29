import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBoard,
  updateBoard,
  deleteBoard,
  createCard,
  updateCard,
  deleteCard,
  type CreateBoardInput,
  type UpdateBoardInput,
  type CreateCardInput,
  type UpdateCardInput,
  getBoards,
  getBoardById,
  getCardsByBoard,
} from "../services/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useBoards = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  /**
   * useQuery (con fetchBoards) se encarga de obtener y cachear la
   * lista de boards desde la API.
   * useMutation (createBoardMutation, updateBoardMutation, deleteBoardMutation) se usa para crear,
   * actualizar o eliminar boards en el backend.
   */

  const boards = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(),
  });

  const selectedBoard = useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardById(id || ""),
    enabled: !!id?.length,
  });

  const cards = useQuery({
    queryKey: ["cards", id],
    queryFn: () => getCardsByBoard(id || ""),
    enabled: !!id?.length,
  });
  /** La relación con useQuery es la siguiente:
   * Cuando usas una mutación (por ejemplo, crear un board), la mutación hace la petición al backend (POST, PUT, DELETE).
   * En el onSuccess de la mutación, llamas a queryClient.invalidateQueries({ queryKey: ['boards'] }). Esto le dice a React Query que la cache de los boards está desactualizada.
   * React Query automáticamente vuelve a ejecutar fetchBoards (el useQuery de los boards) para traer la lista actualizada.
   */
  // Mutations para Boards
  const createBoardMutation = useMutation({
    mutationFn: (data: CreateBoardInput) => createBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBoardInput }) =>
      updateBoard(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", variables.id] });
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: (id: string) => deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setSelectedBoardId(null);
    },
  });

  // Mutations para Cards
  const createCardMutation = useMutation({
    mutationFn: (data: CreateCardInput) => createCard(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cards", variables.boardId] });
      queryClient.invalidateQueries({ queryKey: ["board", variables.boardId] });
    },
  });

  const updateCardMutation = useMutation({
    mutationFn: ({ cardId, data }: { cardId: string; data: UpdateCardInput }) =>
      updateCard(cardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", selectedBoardId] });
      queryClient.invalidateQueries({ queryKey: ["board", selectedBoardId] });
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: (cardId: string) => deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", selectedBoardId] });
      queryClient.invalidateQueries({ queryKey: ["board", selectedBoardId] });
    },
  });

  return {
    // Data
    boards: boards.data,
    selectedBoard: selectedBoard.data,
    cards: cards.data,
    loading: boards.isLoading || selectedBoard.isLoading || cards.isLoading,
    error: boards.error || selectedBoard.error || cards.error,

    // Setters
    setSelectedBoardId,

    // Board Mutations
    createBoard: createBoardMutation.mutateAsync,
    updateBoard: (id: string, data: UpdateBoardInput) =>
      updateBoardMutation.mutateAsync({ id, data }),
    deleteBoard: deleteBoardMutation.mutateAsync,
    isCreatingBoard: createBoardMutation.isPending,
    isUpdatingBoard: updateBoardMutation.isPending,
    isDeletingBoard: deleteBoardMutation.isPending,

    // Card Mutations
    createCard: createCardMutation.mutateAsync,
    updateCard: (cardId: string, data: UpdateCardInput) =>
      updateCardMutation.mutateAsync({ cardId, data }),
    deleteCard: deleteCardMutation.mutateAsync,
    isCreatingCard: createCardMutation.isPending,
    isUpdatingCard: updateCardMutation.isPending,
    isDeletingCard: deleteCardMutation.isPending,
  };
};
