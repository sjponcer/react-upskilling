import type { Board, Card } from "./index";

export interface GetBoardResponse {
  success?: boolean;
  data?: Board[];
}

export interface GetCardsResponse {
  success?: boolean;
  boardId?: string;
  boardName?: string;
  count?: number;
  data?: Card[];
}
