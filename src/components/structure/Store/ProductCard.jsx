import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";
import { useContext } from "react";
import { AuthContext } from "../../../auth/AuthWrapper";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart, favorites, addToCart, toggleFavorite } = useStore();
  const { user } = useContext(AuthContext);

  const isFavorite = favorites.some((item) => item.product_id == product.id);

  const handleProductClick = () => {
    navigate(`/store/product/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user.isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const handleAddToFavorites = (e, product) => {
    e.stopPropagation();
    if (!user.isAuthenticated) {
      navigate("/login");
      return;
    }
    toggleFavorite(product);
  };

  return (
    <div
      className="border rounded-md p-4 text-center w-full hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={handleProductClick}
    >
      {/* Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto h-32 sm:h-40 object-contain mb-4"
      />

      {/* Product info */}
      <h2 className="text-sm sm:text-base font-Poppins mb-1 line-clamp-2">
        {product.name}
      </h2>
      <p className="text-gray-700 font-Montserrat-Light text-sm sm:text-base mb-3">
        {product.price}
      </p>

      {/* Action buttons at bottom center */}
      <div className="flex justify-center space-x-3">
        <button
          type="button"
          className={`p-2 ${
            isFavorite ? "text-red-500" : "text-gray-400"
          } hover:text-red-500 transition-colors`}
          onClick={(e) => handleAddToFavorites(e, product)}
        >
          <FaHeart className="w-4 h-4" />
        </button>

        <button
          type="button"
          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          onClick={handleAddToCart}
        >
          <FiShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
