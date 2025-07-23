import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]);
        setSelectedRAM(res.data.variants?.[0]?.ram || "");
      })
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left - Images */}
        <div className="md:w-1/2">
          <div className="border rounded p-4 flex items-center justify-center h-96">
            <img
              src={`http://localhost:5000${selectedImage}`}
              alt={product.name}
              className="object-contain max-h-full"
            />
          </div>
          <div className="flex gap-4 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000${img}`}
                alt={`thumb-${i}`}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                  selectedImage === img ? "ring-2 ring-yellow-500" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-800">₹{product.variants[0]?.price}</p>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Availability:</span>
            <span className="text-green-600 font-semibold">✔ In stock</span>
          </div>
          <p className="text-sm text-gray-500">Hurry up! Only {product.variants[0]?.quantity} product left in stock!</p>

          <hr className="my-4" />

          {/* RAM Options */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Ram:</p>
            <div className="flex gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  className={`px-4 py-1 border rounded ${
                    selectedRAM === v.ram ? "bg-gray-800 text-white" : "bg-gray-100"
                  }`}
                  onClick={() => setSelectedRAM(v.ram)}
                >
                  {v.ram} GB
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Quantity :</p>
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 border rounded text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="px-3 py-1 border rounded text-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded shadow">
              Edit product
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded shadow">
              Buy it now
            </button>
            <button className="border rounded-full p-3 text-xl">🤍</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
