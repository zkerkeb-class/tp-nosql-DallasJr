import mongoose from "mongoose";

export async function connectDB(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connecté à MongoDB !");
  } catch (err) {
    console.error("Erreur connexion MongoDB :", err.message);
    process.exit(1);
  }
}
