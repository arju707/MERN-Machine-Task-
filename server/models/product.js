import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  ram: String,
  price: Number,
  qty: Number,
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    variants: [variantSchema],
    images: [String], // Stores image file names or paths
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
