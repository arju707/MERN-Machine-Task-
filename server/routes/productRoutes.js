import express from "express";
import multer from "multer";
import Product from "../models/Product.js";

const router = express.Router();

// Set up multer storage (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Product - supports multipart/form-data with images
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { title, description, subCategory, variants } = req.body;

    // Parse the variants JSON string
    const parsedVariants = JSON.parse(variants);

    // Extract image info (file buffers if storing locally, or upload to cloud)
    const imageData = req.files.map((file) => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      buffer: file.buffer, // only if storing in DB or local
    }));

    const product = new Product({
      title,
      description,
      subCategory,
      variants: parsedVariants,
      images: imageData, // you may store just URLs instead
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving product:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId subCategoryId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
