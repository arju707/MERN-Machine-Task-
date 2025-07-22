import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Category already exists" });

    const newCategory = await Category.create({ name });
    res.status(201).json({ message: "Category created", category: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Error creating category", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories", error: err.message });
  }
};
