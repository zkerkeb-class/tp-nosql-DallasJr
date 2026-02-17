import mongoose from "mongoose";

const ALLOWED_TYPES = [
  "Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground",
  "Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy",
];

const statField = (name) => ({
  type: Number,
  required: true,
  min: [1, `${name} doit être entre 1 et 255`],
  max: [255, `${name} doit être entre 1 et 255`],
});

const pokemonSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "L'id est requis"],
      unique: true,
      min: [1, "L'id doit être un entier positif"],
    },

    type: {
      type: [String],
      required: [true, "Le type est requis"],
      validate: {
        validator: (arr) => arr.every((t) => ALLOWED_TYPES.includes(t)),
        message: `Type invalide. Types autorisés: ${ALLOWED_TYPES.join(", ")}`,
      },
    },

    base: {
      HP: statField("HP"),
      Attack: statField("Attack"),
      Defense: statField("Defense"),
      SpecialAttack: { type: Number, min: [1, "SpecialAttack doit être entre 1 et 255"], max: [255, "SpecialAttack doit être entre 1 et 255"] },
      SpecialDefense: { type: Number, min: [1, "SpecialDefense doit être entre 1 et 255"], max: [255, "SpecialDefense doit être entre 1 et 255"] },
      Speed: { type: Number, min: [1, "Speed doit être entre 1 et 255"], max: [255, "Speed doit être entre 1 et 255"] },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pokemon", pokemonSchema);