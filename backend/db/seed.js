import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./connect.js";
import Pokemon from "../models/pokemon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  await connectDB(process.env.MONGODB_URI);

  const jsonPath = path.resolve(__dirname, "../data/pokemons.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(raw);

  await Pokemon.deleteMany({});
  console.log("Collection vidée.");

  const inserted = await Pokemon.insertMany(data);
  console.log(`${inserted.length} Pokémon insérés avec succès !`);

  await mongoose.connection.close();
  console.log("Connexion fermée.");
}

seed().catch(async (err) => {
  console.error("Seed error:", err);
  await mongoose.connection.close();
  process.exit(1);
});
