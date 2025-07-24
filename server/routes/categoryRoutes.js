import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory); // Add category
router.get("/", getCategories); // Get all categories

export default router;
