import mongoose from "mongoose";
import { BoardModel } from "../models/Board";
import { seedColumns } from "./board.seed";

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/trello");

    console.log("Connected to MongoDB");

    // Limpiamos el board existente
    await BoardModel.deleteMany({});

    // Creamos uno nuevo
    await BoardModel.create({
      columns: seedColumns,
    });

    console.log("✅ Board seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed", error);
    process.exit(1);
  }
}

seed();
