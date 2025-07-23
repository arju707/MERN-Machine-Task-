import axios from "axios";
import { useState } from "react";

const AddProduct = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [variants, setVariants] = useState([{ ram: "", price: "", qty: 1 }]);
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: 1 }]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subCategory", subCategory);
    formData.append("variants", JSON.stringify(variants));

    // ✅ Append images
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Product saved:", res.data);
      alert("Product added successfully");
      onClose(); // close form
    } catch (err) {
      console.error("❌ Error saving product:", err);
      alert("Failed to save product. Check console.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">Add Product</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Title :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          placeholder="HP AMD Ryzen 3"
        />
      </div>

      {/* Variants */}
      {variants.map((variant, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={variant.ram}
            onChange={(e) => handleVariantChange(index, "ram", e.target.value)}
            className="w-1/4 border px-2 py-1 rounded"
            placeholder="Ram"
          />
          <input
            type="number"
            value={variant.price}
            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
            className="w-1/4 border px-2 py-1 rounded"
            placeholder="Price"
          />
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() =>
                handleVariantChange(index, "qty", Math.max(1, variant.qty - 1))
              }
              className="px-2 border rounded"
            >
              −
            </button>
            <span>{variant.qty}</span>
            <button
              type="button"
              onClick={() => handleVariantChange(index, "qty", variant.qty + 1)}
              className="px-2 border rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="bg-gray-800 text-white px-4 py-2 rounded mt-2 mb-4"
      >
        Add variants
      </button>

      {/* Subcategory */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Sub category :</label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select sub-category</option>
          <option value="hp">HP</option>
          <option value="dell">Dell</option>
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Description :</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-2 rounded resize-none"
          placeholder="The Ryzen 7 is a high-end processor..."
        />
      </div>

      {/* Upload Images */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Upload image:</label>
        <input type="file" multiple onChange={handleImageUpload} />
        <div className="flex space-x-2 mt-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              alt="upload"
              className="w-20 h-20 object-cover border rounded"
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button type="submit" className="bg-[#d39c32] text-white px-6 py-2 rounded">
          ADD
        </button>
        <button
          type="button"
          onClick={onClose}
          className="border px-6 py-2 rounded"
        >
          DISCARD
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
