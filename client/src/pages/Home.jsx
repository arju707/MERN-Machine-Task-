import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import AddCategory from "../components/AddCategory";
import AddSubCategory from "../components/AddSubCategory";
import { Link } from "react-router-dom";

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

  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));

    const fetchCategories = async () => {
      try {
        const catRes = await axios.get("http://localhost:5000/api/categories");
        setCategories(catRes.data);

        const subRes = await axios.get(
          "http://localhost:5000/api/subcategories"
        );
        setSubCategories(subRes.data);
      } catch (err) {
        console.error("Error fetching category data", err);
      }
    };

    fetchCategories();
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
                  .filter((sub) => sub.categoryId === cat._id)
                  .map((sub) => (
                    <label
                      key={sub._id}
                      className="flex items-center space-x-2 ml-4"
                    >
                      <input type="checkbox" />
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
            <Link to="/add-product" className="text-blue-600 underline">
              <button className="bg-[#d39c32] text-white px-4 py-2 rounded">
                Add product
              </button>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              
              <div key={product._id} className="border rounded shadow p-4">
                
                <img
                  src={`http://localhost:5000${product.images?.[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.description}
                </p>
                <ul className="text-sm">
                  {product.variants.map((v, i) => (
                    <li key={i}>
                      RAM {v.ram} GB – ₹{v.price} ({v.quantity} pcs)
                    </li>
                  ))}
                </ul>
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

      <Modal
        isOpen={showAddSubCategory}
        onClose={() => setShowAddSubCategory(false)}
      >
        <AddSubCategory onClose={() => setShowAddSubCategory(false)} />
      </Modal>
    </div>
  );
};

export default Home;
