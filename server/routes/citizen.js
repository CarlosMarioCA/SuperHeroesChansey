import express from "express";
import Citizen from "../models/citizen.js";

const router = express.Router();

// Obtener todos los ciudadanos
router.get("/", async (req, res) => {
  try {
    const citizens = await Citizen.find();
    res.status(200).json(citizens);
  } catch (error) {
    console.error("Error al obtener ciudadanos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Obtener un ciudadano por ID
router.get("/:id", async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id);
    if (!citizen) {
      return res.status(404).json({ message: "Ciudadano no encontrado" });citi
    }
    res.status(200).json(citizen);
  } catch (error) {
    console.error("Error al obtener ciudadano:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Crear un nuevo ciudadano
router.post("/", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const newCitizen = new Citizen({ name, username, password });
    await newCitizen.save();
    res.status(201).json({ message: "Ciudadano creado", citizen: newCitizen });
  } catch (error) {
    console.error("Error al crear ciudadano:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Actualizar un ciudadano
router.patch("/:id", async (req, res) => {
  try {
    const updatedCitizen = await Citizen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCitizen) {
      return res.status(404).json({ message: "Ciudadano no encontrado" });
    }
    res.status(200).json({ message: "Ciudadano actualizado", citizen: updatedCitizen });
  } catch (error) {
    console.error("Error al actualizar ciudadano:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Eliminar un ciudadano
router.delete("/:id", async (req, res) => {
  try {
    const deletedCitizen = await Citizen.findByIdAndDelete(req.params.id);
    if (!deletedCitizen) {
      return res.status(404).json({ message: "Ciudadano no encontrado" });
    }
    res.status(200).json({ message: "Ciudadano eliminado" });
  } catch (error) {
    console.error("Error al eliminar ciudadano:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
