import { BoardModel } from "./models/board";

export async function getBoard() {
  let board = await BoardModel.findOne();
  if (!board) {
    board = await BoardModel.create({ columns: [] });
  }
  return board;
}

export async function saveBoard(columns: any[]) {
  const board = await BoardModel.findOne();

  if (!board) {
    await BoardModel.create({ columns });
  } else {
    board.columns.splice(0, board.columns.length, ...columns);
    board.markModified("columns");
    await board.save();
  }
}
