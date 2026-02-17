import express from "express";
import Pokemon from "../models/pokemon.js";

const router = express.Router();

/**
 * GET /api/stats
 */
router.get("/", async (req, res) => {
  try {
    const perType = await Pokemon.aggregate([
      { $unwind: "$type" },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          avgHP: { $avg: "$base.HP" },
        },
      },
      { $sort: { count: -1 } },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
          avgHP: { $round: ["$avgHP", 2] },
        },
      },
    ]);

    const topAttack = await Pokemon.findOne().sort({ "base.Attack": -1 }).lean();

    const topHP = await Pokemon.findOne().sort({ "base.HP": -1 }).lean();

    return res.status(200).json({
      perType,
      topAttack: topAttack
        ? { id: topAttack.id, name: topAttack.name, attack: topAttack.base?.Attack }
        : null,
      topHP: topHP
        ? { id: topHP.id, name: topHP.name, hp: topHP.base?.HP }
        : null,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
