import express from 'express';
import Pokemon from "../models/pokemon.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/pokemons
 */
router.get("/", async (req, res) => {
  try {
    const { type, name, sort } = req.query;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;

    const safePage = page < 1 ? 1 : page;
    const safeLimit = limit < 1 ? 1 : limit;

    const skip = (safePage - 1) * safeLimit;

    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (name) {
      filter.$or = [
        { "name.english": { $regex: name, $options: "i" } },
        { "name.french": { $regex: name, $options: "i" } },
      ];
    }

    const total = await Pokemon.countDocuments(filter);
    const totalPages = Math.ceil(total / safeLimit) || 1;

    let query = Pokemon.find(filter).skip(skip).limit(safeLimit);

    if (sort) {
      query = query.sort(sort);
    }

    const data = await query;
    return res.status(200).json({
      data,
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


/**
 * GET /api/pokemons/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const pokemon = await Pokemon.findOne({ id });

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon non trouvé" });
    }

    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/pokemons
 * body: { id, name: { english, french, ... }, type: [...], base: {...} }
 * auth required
 */
router.post("/", auth, async (req, res) => {
  try {
    const created = await Pokemon.create(req.body);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * PUT /api/pokemons/:id
 * body: { name?, type?, base? }
 * auth required
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const updated = await Pokemon.findOneAndUpdate(
      { id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Pokémon non trouvé" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/pokemons/:id
 * auth required
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const deleted = await Pokemon.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ error: "Pokémon non trouvé" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;