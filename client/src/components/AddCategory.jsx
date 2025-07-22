import { useState } from "react";
import axios from "axios";

const AddCategory = ({ onClose }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/categories", { name });
      setMessage(res.data.message);
      setName("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding category");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Add Category</h2>
      <form onSubmit={handleAdd} className="space-y-4">
        <input
          type="text"
          placeholder="Enter category name"
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

export default AddCategory;
