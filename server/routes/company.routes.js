import express, { Router } from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJob,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/company.controller.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/auth.middleware.js";

const router = Router();

// Register a company
router.post("/register", upload.single("image"), registerCompany);

// Company Login
router.post("/login", loginCompany);

// Get company data
router.get("/company", protectCompany, getCompanyData);

// Post a Job
router.post("/post-job", protectCompany, postJob);

// Get applicant data from router company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// get company job list
router.get("/list-jobs", protectCompany, getCompanyPostedJob);

// Change application status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

// change application visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
