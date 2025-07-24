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
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  //  Fetch products
  const fetchProducts = async (
    query = searchTerm,
    subCategoryFilter = selectedSubCategories,
    currentPage = page
  ) => {
    try {
      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (subCategoryFilter.length > 0)
        params.append("subCategories", subCategoryFilter.join(","));
      params.append("page", currentPage);
      params.append("limit", limit);

      const res = await axios.get(
        `http://localhost:5000/api/products?${params.toString()}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }

    fetchProducts();

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

  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;

    setSelectedSubCategories((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((id) => id !== value);

      setPage(1); // Reset to page 1 on filter
      fetchProducts(searchTerm, updated, 1);
      return updated;
    });
  };

  const handlePageChange = (num) => {
    setPage(num);
    fetchProducts(searchTerm, selectedSubCategories, num);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}

      <div className="bg-[#0b3d5c] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">MyStore</div>
        <div className="flex-1 mx-6">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                fetchProducts(e.target.value, selectedSubCategories, 1);
              }
            }}
            type="text"
            placeholder="Search any things"
            className="w-full p-2 rounded"
          />
        </div>
        <button
          className="bg-[#d39c32] px-4 py-2 rounded mr-4"
          onClick={() => {
            setPage(1);
            fetchProducts(searchTerm, selectedSubCategories, 1);
          }}
        >
          Search
        </button>
        <div className="flex items-center space-x-4">
          <Link to="/wishlist">
            <span className="cursor-pointer">❤️</span>
          </Link>
          <span className="cursor-pointer">Sign in</span>
          <span className="cursor-pointer">🛒</span>
        </div>
      </div>

      {/* Main Content */}

      <div className="flex flex-1">
        {/* Sidebar */}

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
                      <input //check box filtration
                        type="checkbox"
                        value={sub._id}
                        onChange={handleSubCategoryChange}
                        checked={selectedSubCategories.includes(sub._id)}
                      />
                      <span>{sub.name}</span>
                    </label>
                  ))}
              </li>
            ))}
          </ul>
        </aside>

        {/* Product List */}

        <main className="flex-1 p-6">
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
            <Link to="/add-product">
              <button className="bg-[#d39c32] text-white px-4 py-2 rounded">
                Add product
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
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
              </Link>
            ))}
          </div>

          {/* Pagination */}

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    className={`px-3 py-1 rounded-full ${
                      num === page ? "bg-[#d39c32] text-white" : "bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                )
              )}
            </div>
            <div className="text-sm">
              Show{" "}
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setPage(1);
                  fetchProducts(searchTerm, selectedSubCategories, 1);
                }}
                className="border rounded px-2 py-1 ml-1"
              >
                <option value={9}>9 rows</option>
                <option value={12}>12 rows</option>
                <option value={15}>15 rows</option>
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
