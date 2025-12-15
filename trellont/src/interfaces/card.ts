export interface Card {
  id?: string;
  title?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: Date;
}