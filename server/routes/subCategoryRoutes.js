// routes/subCategoryRoutes.js
import express from "express";
import SubCategory from "../models/subCategoryModel.js"; // make sure this path is correct

const router = express.Router();

// GET all sub-categories
router.get("/", async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new sub-category (you already have this)
router.post("/", async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subCategory = await SubCategory.create({ name, categoryId });
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
