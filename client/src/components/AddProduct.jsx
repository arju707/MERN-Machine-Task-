import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [variants, setVariants] = useState([
    { ram: "", price: "", quantity: "" },
  ]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subcategories");
        setSubCategories(res.data);
      } catch (error) {
        console.error("Failed to load subcategories", error);
      }
    };
    fetchSubCategories();
  }, []);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", quantity: "" }]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subCategory", subCategory);
      formData.append("variants", JSON.stringify(variants));
      images.forEach((img) => formData.append("images", img));

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");
      console.log("Saved product:", res.data);

      // reset form
      setTitle("");
      setDescription("");
      setSubCategory("");
      setVariants([{ ram: "", price: "", quantity: "" }]);
      setImages([]);
      setPreviewImages([]);
    } catch (err) {
      console.error("❌ Error saving product: ", err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        >
          <option value="">Select Subcategory</option>
          {subCategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        <div>
          <label className="block font-medium mb-1">Variants</label>
          {variants.map((variant, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="RAM"
                value={variant.ram}
                onChange={(e) =>
                  handleVariantChange(index, "ram", e.target.value)
                }
                className="border px-2 py-1"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                className="border px-2 py-1"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={variant.quantity}
                onChange={(e) =>
                  handleVariantChange(index, "quantity", e.target.value)
                }
                className="border px-2 py-1"
                required
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="text-blue-600 text-sm mt-1"
          >
            + Add Variant
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} />
          <div className="flex gap-2 mt-2">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Preview"
                className="h-16 w-16 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
