import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  ram: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const imageSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  buffer: Buffer, // if storing in MongoDB (in-memory)
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // changed from `name` to match frontend
  description: { type: String, required: true },
  subCategory: { type: String, required: true }, // assuming this is a string ID or name
  variants: [variantSchema],
  images: [imageSchema], // multiple image support with multer
}, {
  timestamps: true, // optional: adds createdAt and updatedAt
});

export default mongoose.model("Product", productSchema);
