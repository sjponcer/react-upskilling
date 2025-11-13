type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

type Card = {
  id: string;
  title: string;
  createdAt: Date;
  subTasks: SubTask[];
};

type Column = {
  id: number;
  title: string;
  cards: Card[];
};
