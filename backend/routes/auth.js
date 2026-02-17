import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

/**
 * POST /api/auth/register
 * body: { username, password }
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username et password requis" });
    }

    await User.create({ username, password });
    return res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Username déjà utilisé" });
    }
    return res.status(400).json({ error: error.message });
  }
});

/**
 * POST /api/auth/login
 * body: { username, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username et password requis" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
