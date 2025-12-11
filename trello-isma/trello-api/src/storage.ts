import fs from "fs";
import path from "path";
import { Column } from "./types";

const DATA_PATH = path.join(__dirname, "data.json");

export function loadData(): Column[] {
  if (!fs.existsSync(DATA_PATH)) {
    return [];
  }
  const json = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(json);
}

export function saveData(data: Column[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}
