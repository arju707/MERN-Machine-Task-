
import { find } from "../models/product.js";

const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await find({
      name: { $regex: search, $options: "i" }, 
    });

    res.json(products);
  } catch (err) {
    console.error("Error fetching products", err);
    res.status(500).json({ error: "Server error" });
  }
};

export default { getProducts };
