import express from "express";
import {
  getAllSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero,
  loginSuperhero
} from "../controllers/superheroController.js";

const router = express.Router();

// Base routes
router.get("/", getAllSuperheroes);
router.get("/:id", getSuperheroById);
router.post("/", createSuperhero);
router.post("/login", loginSuperhero);
router.patch("/:id", updateSuperhero);
router.delete("/:id", deleteSuperhero);

export default router;
