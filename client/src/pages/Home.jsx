import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import AddCategory from "../components/AddCategory";
import AddSubCategory from "../components/AddSubCategory";
import AddProduct from "../components/AddProduct";


const Home = () => {
  const navigate = useNavigate();

  // Auth check
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token && token.length > 10;
  };

  // State
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubCategory, setShowAddSubCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Fetch categories & sub-categories
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const catRes = await axios.get("http://localhost:5000/api/categories");
        setCategories(catRes.data);

        const subRes = await axios.get("http://localhost:5000/api/subcategories");
        setSubCategories(subRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Handle checkbox change
  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSubCategories((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="bg-[#0b3d5c] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">MyStore</div>
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search any things"
            className="w-full p-2 rounded"
          />
        </div>
        <button className="bg-[#d39c32] px-4 py-2 rounded mr-4">Search</button>
        <div className="flex items-center space-x-4">
          <span className="cursor-pointer">❤️</span>
          <span className="cursor-pointer">Sign in</span>
          <span className="cursor-pointer">🛒</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-60 border-r p-4">
          <h2 className="font-bold text-lg mb-2">Categories</h2>
          <ul className="space-y-1 text-sm">
            <li className="font-semibold cursor-pointer">All categories</li>

            {categories.map((cat) => (
              <li key={cat._id}>
                <div className="font-semibold">{cat.name}</div>

                {subCategories
                  .filter((sub) => sub.categoryId.toString() === cat._id.toString())
                  .map((sub) => (
                    <label key={sub._id} className="flex items-center space-x-2 ml-4">
                      <input
                        type="checkbox"
                        value={sub._id}
                        onChange={handleSubCategoryChange}
                      />
                      <span>{sub.name}</span>
                    </label>
                  ))}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Product Area */}
        <main className="flex-1 p-6">
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mb-6">
            <button
              className="bg-[#d39c32] text-white px-4 py-2 rounded"
              onClick={() => setShowAddCategory(true)}
            >
              Add category
            </button>
            <button
              className="bg-[#d39c32] text-white px-4 py-2 rounded"
              onClick={() => setShowAddSubCategory(true)}
            >
              Add sub category
            </button>
            <button className="bg-[#d39c32] text-white px-4 py-2 rounded" onClick={() => setShowAddProduct(true)}>
              Add product
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 shadow-sm flex flex-col items-center"
                >
                  <img
                    src="https://via.placeholder.com/150"
                    alt="product"
                    className="w-full h-40 object-cover mb-2"
                  />
                  <h3 className="font-semibold mb-1">HP AMD Ryzen 3</h3>
                  <p className="text-[#0b3d5c] font-bold">$529.99</p>
                  <div className="flex justify-between w-full mt-2">
                    <span className="text-gray-400">⭐️⭐️⭐️⭐️⭐️</span>
                    <span className="cursor-pointer">❤️</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">10 of 456 items</p>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`px-3 py-1 rounded-full ${
                    num === 1 ? "bg-[#d39c32] text-white" : "bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
              <span className="ml-2">...</span>
              <button className="px-3 py-1 rounded-full bg-gray-200">10</button>
            </div>
            <div className="text-sm">
              Show{" "}
              <select className="border rounded px-2 py-1 ml-1">
                <option>10 rows</option>
                <option>20 rows</option>
              </select>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal isOpen={showAddCategory} onClose={() => setShowAddCategory(false)}>
        <AddCategory onClose={() => setShowAddCategory(false)} />
      </Modal>

      <Modal isOpen={showAddSubCategory} onClose={() => setShowAddSubCategory(false)}>
        <AddSubCategory onClose={() => setShowAddSubCategory(false)} />
      </Modal>

      <Modal isOpen={showAddProduct} onClose={() => setShowAddProduct(false)}>
  <AddProduct onClose={() => setShowAddProduct(false)} />
</Modal>
    </div>
  );
};

export default Home;
