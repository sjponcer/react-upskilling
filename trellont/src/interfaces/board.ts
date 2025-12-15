import type { Card, Stats } from "./index";

export interface Board {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
  createdAt?: Date;
  stats?: Stats;
  totalCards?: number;
  cards: Card[];
}
