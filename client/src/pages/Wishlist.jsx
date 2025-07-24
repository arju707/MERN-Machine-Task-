import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToWishlist = async (productId) => {
    const userId = localStorage.getItem("userId"); // Ensure you store user ID after login
    await axios.post("http://localhost:5000/api/wishlist", {
      userId,
      productId,
    });
    fetchWishlist(); // Refetch items
  };

  const fetchWishlist = async () => {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
    setWishlist(res.data.map((item) => item.productId)); // extract product details
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="border rounded p-4 shadow">
              <img
                src={`http://localhost:5000${product.images?.[0]}`}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm">{product.description}</p>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
              <Link
                to={`/product/${product._id}`}
                className="block text-blue-500 mt-1"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
