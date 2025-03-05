import mongoose from "mongoose";
import dotenv from "dotenv";
import Citizen from "./models/citizen.js";
import Superhero from "./models/superhero.js";
import Case from "./models/case.js";
import Admin from "./models/admin.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("🔄 Base de datos conectada para migración");

    // Ciudadanos de prueba
    const existingCitizen = await Citizen.findOne({ username: "carlosm" });
    if (!existingCitizen) {
      await Citizen.create({
        name: "Carlos Mario",
        username: "carlosm",
        password: "123456",
        email: "carlos@email.com",
        personalInfo: {
          phoneNumber: "3001234567",
          idNumber: "1234567890",
          dateOfBirth: "1995-05-15"
        },
        address: {
          street: "Calle 50",
          city: "Medellín",
          state: "Antioquia",
          country: "Colombia"
        }
      });
      console.log("✅ Ciudadano de prueba creado");
    }

    // Superhéroes de prueba
    const existingHero = await Superhero.findOne({ username: "superc" });
    if (!existingHero) {
      await Superhero.create({
        name: "Super Colombian",
        username: "superc",
        password: "123456",
        email: "super@hero.com",
        powers: [
          {
            name: "Super Fuerza",
            description: "Fuerza sobrehumana",
            level: 8
          }
        ],
        specialties: ["Rescate", "Combate"],
        contactInfo: {
          email: "super@hero.com",
          phone: "3001234567"
        }
      });
      console.log("✅ Superhéroe de prueba creado");
    }

    // Administrador de prueba
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      await Admin.create({
        username: "administradorSistema",
        password: "admin123",
        email: "admin@system.com",
        permissions: {
          manageHeroes: true,
          manageCitizens: true,
          manageCases: true,
          systemConfiguration: true
        }
      });
      console.log("✅ Administrador de prueba creado");
    }

    console.log("✨ Migración completada exitosamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error en la migración:", error);
    process.exit(1);
  }
};

seedDatabase();
