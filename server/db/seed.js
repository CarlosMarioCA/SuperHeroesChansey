import mongoose from "mongoose";
import dotenv from "dotenv";
import Citizen from "../models/citizen.js";

dotenv.config();

const { ATLAS_URI } = process.env;

const seedCitizens = async () => {
  try {
    await mongoose.connect(ATLAS_URI);
    console.log("🔄 Base de datos conectada. Insertando datos...");

    await Citizen.deleteMany(); // Limpia la colección antes de insertar nuevos datos
    await Citizen.insertMany([
      { name: "Juan Pérez", username: "juanp", password: "1234" },
      { name: "Ana López", username: "anal", password: "5678" }
    ]);

    console.log("✅ Datos insertados correctamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error en la migración:", error);
    process.exit(1);
  }
};

seedCitizens();
