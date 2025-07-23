import express from "express";
import multer from "multer";
import Product from "../models/Product.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST: Create product
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { title, description, subCategory, variants } = req.body;
    const parsedVariants = JSON.parse(variants);

    const newProduct = new Product({
      name: title,
      description,
      subCategoryId: subCategory,
      variants: parsedVariants,
      images: req.files.map((file) => `/uploads/${file.filename}`),
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ BACKEND ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET: All products with optional search + subCategory filtering
router.get("/", async (req, res) => {
  const { search, subCategories } = req.query;
  const query = {};

  // Search logic
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Sub-category filtering logic
  if (subCategories) {
    const ids = subCategories.split(",");
    query.subCategoryId = { $in: ids };
  }

  try {
    const products = await Product.find(query).populate("subCategoryId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
