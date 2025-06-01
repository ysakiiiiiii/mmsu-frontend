import React, { useState, useContext, useEffect } from "react";
import { FiHeart, FiShoppingCart, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";
import { AuthContext } from "../../../auth/AuthWrapper";
import { fetchProductById } from "../../data/fetchProductById";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, addToCart, toggleFavorite } = useStore();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => {
        if (!data) {
          setError("Product not found");
          setProduct(null);
        } else {
          setProduct(data);
        }
      })
      .catch(() => {
        setError("Failed to fetch product");
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading product...
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 text-center py-20 text-lg">{error}</div>
    );
  if (!product) return null;

  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const requireAuth = (action) => {
    if (!user.isAuthenticated) {
      navigate("/login", { state: { from: `/store/product/${id}` } });
      return false;
    }
    return true;
  };

  const handleAddToCartClick = () => {
    if (!requireAuth("add to cart")) return;
    addToCart(product, quantity);
  };

  const handleToggleFavorite = () => {
    if (!requireAuth("save favorites")) return;
    toggleFavorite(product);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-8 text-sm font-medium"
      >
        <FiChevronLeft className="mr-1" size={20} /> Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-3xl shadow-lg p-8">
        <div
          className="w-full md:w-1/2 flex justify-center items-center rounded-2xl p-6"
          style={{
            background:
              "radial-gradient(circle farthest-side, #D6E944, #2ED943)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-96 object-contain rounded-xl transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Right panel - Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-Montserrat-ExtraBold mb-3 text-gray-900">
              {product.name}
            </h1>

            <p className="text-3xl text-black font-Poppins mb-6 tracking-tight">
              <span>P </span>
              {product.price}
            </p>

            <p className="text-gray-700 leading-relaxed mb-8 min-h-[120px]">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Quantity on top */}
          <div className="mb-6">
            <span className="font-medium text-gray-700 mb-2 block">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm w-max">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg transition-colors select-none"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center py-2 focus:outline-none"
                aria-label="Quantity input"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg transition-colors select-none"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons side by side */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg py-3 shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={handleAddToCartClick}
              aria-label="Add to cart"
            >
              <FiShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleToggleFavorite}
              aria-label="Toggle favorite"
              className={`flex items-center gap-2 px-5 py-3 border-2 rounded-lg transition-colors ${
                isFavorite
                  ? "border-red-500 bg-red-100 text-red-600 hover:bg-red-200"
                  : "border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-100"
              } shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400`}
            >
              <FiHeart size={22} />
              {isFavorite ? "Favorited" : "Favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
