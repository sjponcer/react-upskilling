import { useQuery } from "@tanstack/react-query";
import {
  type BoardDetails,
  type Card,
  getBoardById,
  getCardsByBoard,
} from "../services/api";

export const useBoardDetails = (boardId: string | undefined) => {
  const boardQuery = useQuery<BoardDetails, Error>({
    queryKey: ["board", boardId],
    queryFn: () => getBoardById(boardId!),
  });

  const cardsQuery = useQuery<Card[], Error>({
    queryKey: ["cards", boardId],
    queryFn: () => getCardsByBoard(boardId!),
  });

  const organizedCards = cardsQuery.data
    ? {
        todo: cardsQuery.data.filter((c) => c.status === "todo"),
        "in-progress": cardsQuery.data.filter(
          (c) => c.status === "in-progress"
        ),
        done: cardsQuery.data.filter((c) => c.status === "done"),
      }
    : {
        todo: [] as Card[],
        "in-progress": [] as Card[],
        done: [] as Card[],
      };

  return {
    board: boardQuery.data,
    cards: organizedCards,
    isLoading: boardQuery.isLoading || cardsQuery.isLoading,
    isError: boardQuery.isError || cardsQuery.isError,
    error: boardQuery.error || cardsQuery.error,
  };
};
