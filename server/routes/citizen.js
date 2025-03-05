import express from "express";
import {
  getAllCitizens,
  getCitizenById,
  createCitizen,
  updateCitizen,
  deleteCitizen,
  loginCitizen
} from "../controllers/citizenController.js";

const router = express.Router();

// Base routes
router.get("/", getAllCitizens);
router.get("/:id", getCitizenById);
router.post("/", createCitizen);
router.post("/login", loginCitizen);
router.patch("/:id", updateCitizen);
router.delete("/:id", deleteCitizen);

export default router;
