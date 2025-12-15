import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { Column, Card } from "./types";
import { getBoard } from "./boardService";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// GET columnas
app.get("/columns", async (req, res) => {
  const board = await getBoard();
  res.json(board.columns);
});

// POST columna
app.post("/columns", async (req, res) => {
  const board = await getBoard();
  const newColumn: Column = req.body;

  board.columns.push(newColumn);
  board.markModified("columns");
  await board.save();

  res.status(201).json(newColumn);
});

// PUT columna
app.put("/columns/:id", async (req, res) => {
  const id = Number(req.params.id);
  const board = await getBoard();

  const index = board.columns.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).send("Column not found");

  // reemplazamos el elemento, no el array
  board.columns[index].set(req.body);
  board.markModified("columns");
  await board.save();

  res.json(board.columns[index]);
});

// DELETE columna
app.delete("/columns/:id", async (req, res) => {
  const id = Number(req.params.id);
  const board = await getBoard();

  const index = board.columns.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).send("Column not found");

  board.columns.splice(index, 1);
  board.markModified("columns");
  await board.save();

  res.sendStatus(204);
});

// POST card
app.post("/columns/:id/cards", async (req, res) => {
  const id = Number(req.params.id);
  const board = await getBoard();

  const column = board.columns.find((c) => c.id === id);
  if (!column) return res.status(404).send("Column not found");

  const newCard: Card = req.body;
  column.cards.push(newCard);

  board.markModified("columns");
  await board.save();

  res.status(201).json(newCard);
});

// PUT card
app.put("/columns/:columnId/cards/:cardId", async (req, res) => {
  const colId = Number(req.params.columnId);
  const cardId = req.params.cardId;

  const board = await getBoard();
  const column = board.columns.find((c) => c.id === colId);
  if (!column) return res.status(404).send("Column not found");

  const index = column.cards.findIndex((c) => c.id === cardId);
  if (index === -1) return res.status(404).send("Card not found");

  column.cards[index].set(req.body);
  board.markModified("columns");
  await board.save();

  res.json(column.cards[index]);
});

// DELETE card
app.delete("/columns/:columnId/cards/:cardId", async (req, res) => {
  const colId = Number(req.params.columnId);
  const cardId = req.params.cardId;

  const board = await getBoard();
  const column = board.columns.find((c) => c.id === colId);
  if (!column) return res.status(404).send("Column not found");

  const index = column.cards.findIndex((c) => c.id === cardId);
  if (index === -1) return res.status(404).send("Card not found");

  column.cards.splice(index, 1);
  board.markModified("columns");
  await board.save();

  res.sendStatus(204);
});

app.put("/board", async (req, res) => {
  const board = await getBoard();

  board.columns = req.body.columns;
  board.markModified("columns");
  await board.save();

  res.json(board.columns);
});

app.listen(3001, () => console.log("API running on http://localhost:3001"));
