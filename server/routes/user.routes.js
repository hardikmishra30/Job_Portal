import express from "express";
import {
  applyJob,
  getUserData,
  getUserJobApplication,
  updateUserResume,
} from "../controllers/user.controllers.js";
import upload from "../config/multer.js";

const router = express.Router();

//Get User Data
router.get("/user", getUserData);

// Apply for a job
router.post("/apply", applyJob);

// get applied jobs data
router.get("/applications", getUserJobApplication);

// Update user profile
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
