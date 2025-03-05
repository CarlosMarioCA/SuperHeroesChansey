import express from "express";
import {
  getAllCitizens,
  getCitizenById,
  createCitizen,
  updateCitizen,
  deleteCitizen,
  addCase
} from "../controllers/citizenController.js";

const router = express.Router();

// Base route: /api/citizens
router.get("/", getAllCitizens);
router.get("/:id", getCitizenById);
router.post("/", createCitizen);
router.patch("/:id", updateCitizen);
router.delete("/:id", deleteCitizen);

// Case management routes
router.post("/:id/cases", addCase);

export default router;
