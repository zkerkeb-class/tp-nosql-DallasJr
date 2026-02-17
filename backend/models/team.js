import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    pokemons: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Pokemon",
      validate: {
        validator: (arr) => arr.length <= 6,
        message: "Une équipe ne peut pas dépasser 6 Pokémon",
      },
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
