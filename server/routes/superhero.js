import express from "express";
import {
  getAllSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero,
  assignCase,
  updateStats
} from "../controllers/superheroController.js";

const router = express.Router();

router.get("/", getAllSuperheroes);
router.get("/:id", getSuperheroById);
router.post("/", createSuperhero);
router.patch("/:id", updateSuperhero);
router.delete("/:id", deleteSuperhero);
router.post("/:id/cases", assignCase);
router.patch("/:id/stats", updateStats);

export default router;
