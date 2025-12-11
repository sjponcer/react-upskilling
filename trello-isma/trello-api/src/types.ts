export type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Card = {
  id: string;
  title: string;
  createdAt: Date;
  subTasks: SubTask[];
};

export type Column = {
  id: number;
  title: string;
  cards: Card[];
};
