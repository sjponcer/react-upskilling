import express from "express";
import cors from "cors";
import { loadData, saveData } from "./storage";
import { Column, Card } from "./types";

const app = express();
app.use(cors());
app.use(express.json());

let board: Column[] = loadData(); // cargar JSON

// GET — obtener todas las columnas
app.get("/columns", (req, res) => {
  res.json(board);
});

// POST — agregar columna
app.post("/columns", (req, res) => {
  const newColumn: Column = req.body;
  board.push(newColumn);
  saveData(board);
  res.status(201).json(newColumn);
});

// PUT — actualizar columna
app.put("/columns/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = board.findIndex((col) => col.id === id);

  if (index === -1) return res.status(404).send("Column not found");

  board[index] = req.body;
  saveData(board);
  res.json(board[index]);
});

// DELETE — borrar columna
app.delete("/columns/:id", (req, res) => {
  const id = Number(req.params.id);
  board = board.filter((col) => col.id !== id);
  saveData(board);
  res.sendStatus(204);
});

// POST — agregar tarjeta a una columna específica
app.post("/columns/:id/cards", (req, res) => {
  const id = Number(req.params.id);
  const column = board.find((c) => c.id === id);

  if (!column) return res.status(404).send("Column not found");

  const newCard: Card = req.body;
  column.cards.push(newCard);

  saveData(board);
  res.status(201).json(newCard);
});

// PUT — actualizar card dentro de una columna
app.put("/columns/:columnId/cards/:cardId", (req, res) => {
  const colId = Number(req.params.columnId);
  const cardId = req.params.cardId;

  const column = board.find((c) => c.id === colId);
  if (!column) return res.status(404).send("Column not found");

  const index = column.cards.findIndex((c) => c.id === cardId);
  if (index === -1) return res.status(404).send("Card not found");

  column.cards[index] = req.body;

  saveData(board);
  res.json(column.cards[index]);
});

// DELETE card
app.delete("/columns/:columnId/cards/:cardId", (req, res) => {
  const colId = Number(req.params.columnId);
  const cardId = req.params.cardId;

  const column = board.find((c) => c.id === colId);
  if (!column) return res.status(404).send("Column not found");

  column.cards = column.cards.filter((c) => c.id !== cardId);

  saveData(board);
  res.sendStatus(204);
});

app.listen(3001, () => console.log("API running on http://localhost:3001"));
