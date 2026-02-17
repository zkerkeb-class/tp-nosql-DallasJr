import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/user.js";
import Pokemon from "../models/pokemon.js";

const router = express.Router();

/**
 * POST /api/favorites/:pokemonId
 * auth required
 */
router.post("/:pokemonId", auth, async (req, res) => {
  try {
    const pokemonId = parseInt(req.params.pokemonId, 10);
    if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
      return res.status(400).json({ error: "pokemonId invalide" });
    }

    const exists = await Pokemon.exists({ id: pokemonId });
    if (!exists) return res.status(404).json({ error: "Pokémon introuvable" });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: pokemonId } },
      { new: true }
    ).select("username favorites");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/favorites/:pokemonId
 * auth required
 */
router.delete("/:pokemonId", auth, async (req, res) => {
  try {
    const pokemonId = parseInt(req.params.pokemonId, 10);
    if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
      return res.status(400).json({ error: "pokemonId invalide" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: pokemonId } },
      { new: true }
    ).select("username favorites");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/favorites
 * auth required
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("favorites");
    if (!user) return res.status(401).json({ error: "Utilisateur introuvable" });

    const pokemons = await Pokemon.find({ id: { $in: user.favorites } }).sort("id");
    return res.status(200).json({ favorites: user.favorites, data: pokemons });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
