import mongoose from "mongoose";

const SubTaskSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    completed: Boolean,
  },
  { _id: false }
);

const CardSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    createdAt: String,
    subTasks: [SubTaskSchema],
  },
  { _id: false }
);

const ColumnSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    cards: [CardSchema],
  },
  { _id: false }
);

const BoardSchema = new mongoose.Schema({
  columns: [ColumnSchema],
});

export const BoardModel = mongoose.model("Board", BoardSchema, "board");
