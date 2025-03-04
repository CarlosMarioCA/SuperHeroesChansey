import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import recordRoutes from "./routes/record.js";
import citizenRoutes from "./routes/citizen.js"; // Importa las rutas de citizen

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/record", recordRoutes);
app.use("/citizen", citizenRoutes); // Agrega la nueva ruta

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
