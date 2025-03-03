import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  throw new Error("❌ No se encontró ATLAS_URI en el archivo .env");
}

const connectDB = async () => {
  try {
    await mongoose.connect(ATLAS_URI);
    console.log("🟢 Conectado a MongoDB Atlas en AlphaDB");
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB:", error);
    process.exit(1); // Detiene el proceso si hay error en la conexión
  }
};

export default connectDB;
