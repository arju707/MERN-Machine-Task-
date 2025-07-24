import { useEffect, useState } from "react";
import axios from "axios";

const AddSubCategory = ({ onClose }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {  //fetching current categories
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {   //for handling the form sumbition
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/subcategories", {
        name,
        categoryId,
      });
      setMessage("Sub category added successfully");
      setName("");
      setCategoryId("");
    } catch (err) {
      setMessage("Failed to add sub category");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Add Sub Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Sub Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-[#d39c32] text-white px-4 py-2 rounded hover:bg-[#c4922c]"
          >
            ADD
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
          >
            DISCARD
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
    </div>
  );
};

export default AddSubCategory;
