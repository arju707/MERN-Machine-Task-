// routes/productRoutes.js
import express from "express";
import multer from "multer";
import Product from "../models/Product.js";

const router = express.Router();

// Multer setup to save images to /uploads
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

// POST: Create a new product
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { title, description, subCategory, variants } = req.body;
     const parsedVariants = JSON.parse(variants);
      console.log("Parsed Variants on backend:", parsedVariants);

    const newProduct = new Product({
      name: title,
      description,
      subCategoryId: subCategory,
      variants: JSON.parse(variants),
      
      images: req.files.map((file) => `/uploads/${file.filename}`),
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ BACKEND ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("subCategoryId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
  
});


export default router;
