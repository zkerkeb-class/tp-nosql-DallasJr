// Charger les variables d'environnement en PREMIER (avant tout autre import)
// dotenv lit le fichier .env et rend les variables accessibles via process.env
import 'dotenv/config';

import express from 'express';
import cors from 'cors';


import pokemonRoutes from './routes/pokemons.js';

import { connectDB } from "./db/connect.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(cors()); // Permet les requêtes cross-origin (ex: frontend sur un autre port)

app.use('/assets', express.static('assets')); // Permet d'accéder aux fichiers dans le dossier "assets" via l'URL /assets/...

app.use(express.json());

app.use("/api/auth", authRouter);

app.use('/api/pokemons', pokemonRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

app.get('/api/pokemons', (req, res) => {
  res.status(200).json(pokemons);
});

async function start() {
  await connectDB(process.env.MONGODB_URI);
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

start();