import express from "express";
import {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
  addMessage,
  updateResolution
} from "../controllers/caseController.js";

const router = express.Router();

// Base routes
router.get("/", getAllCases);
router.get("/:id", getCaseById);
router.post("/", createCase);
router.patch("/:id", updateCase);
router.delete("/:id", deleteCase);

// Message and resolution management
router.post("/:id/messages", addMessage);
router.patch("/:id/resolution", updateResolution);

export default router;
