import express from "express";
import {
  getAdminProfile,
  updateAdminProfile,
  updateSecuritySettings,
  logAdminActivity,
  updatePermissions
} from "../controllers/adminController.js";

const router = express.Router();

// Admin profile routes
router.get("/profile", getAdminProfile);
router.patch("/profile", updateAdminProfile);

// Security and permissions
router.patch("/security", updateSecuritySettings);
router.patch("/permissions", updatePermissions);

// Activity logging
router.post("/activity", logAdminActivity);

export default router;