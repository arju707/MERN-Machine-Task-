import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// Add to wishlist
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const existing = await Wishlist.findOne({ userId, productId });
    if (existing)
      return res.status(409).json({ message: "Already in wishlist" });

    const newItem = new Wishlist({ userId, productId });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's wishlist
router.get("/:userId", async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.params.userId }).populate(
      "productId"
    );
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from wishlist
router.delete("/", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await Wishlist.deleteOne({ userId, productId });
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
