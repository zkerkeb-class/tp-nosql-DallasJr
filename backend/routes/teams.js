import express from "express";
import auth from "../middleware/auth.js";
import Team from "../models/team.js";
import Pokemon from "../models/pokemon.js";

const router = express.Router();

/**
 * POST /api/teams
 * body: { name, pokemonIds }
 * auth required
 */
router.post("/", auth, async (req, res) => {
  try {
    const { name, pokemonIds = [] } = req.body;

    if (!name) return res.status(400).json({ error: "Le nom est requis" });
    if (!Array.isArray(pokemonIds)) {
      return res.status(400).json({ error: "pokemonIds doit être un tableau" });
    }
    if (pokemonIds.length > 6) {
      return res.status(400).json({ error: "Max 6 Pokémon par équipe" });
    }

    const pokemons = await Pokemon.find({ id: { $in: pokemonIds } }).select("_id id");
    if (pokemons.length !== pokemonIds.length) {
      return res.status(400).json({ error: "Un ou plusieurs Pokémon sont invalides" });
    }

    const team = await Team.create({
      user: req.user.id,
      name,
      pokemons: pokemons.map((p) => p._id),
    });

    return res.status(201).json(team);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/teams
 * auth required
 */
router.get("/", auth, async (req, res) => {
  try {
    const teams = await Team.find({ user: req.user.id })
      .sort("-createdAt")
      .populate("pokemons");

    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/teams/:id
 * auth required
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.id, user: req.user.id }).populate("pokemons");
    if (!team) return res.status(404).json({ error: "Équipe introuvable" });
    return res.status(200).json(team);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * PUT /api/teams/:id
 * body: { name?, pokemonIds? }
 * auth required
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, pokemonIds } = req.body;

    const update = {};
    if (name) update.name = name;

    if (pokemonIds !== undefined) {
      if (!Array.isArray(pokemonIds)) {
        return res.status(400).json({ error: "pokemonIds doit être un tableau" });
      }
      if (pokemonIds.length > 6) {
        return res.status(400).json({ error: "Max 6 Pokémon par équipe" });
      }

      const pokemons = await Pokemon.find({ id: { $in: pokemonIds } }).select("_id id");
      if (pokemons.length !== pokemonIds.length) {
        return res.status(400).json({ error: "Un ou plusieurs Pokémon sont invalides" });
      }
      update.pokemons = pokemons.map((p) => p._id);
    }

    const team = await Team.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      update,
      { new: true, runValidators: true }
    );

    if (!team) return res.status(404).json({ error: "Équipe introuvable" });
    return res.status(200).json(team);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/teams/:id
 * auth required
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Team.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Équipe introuvable" });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
