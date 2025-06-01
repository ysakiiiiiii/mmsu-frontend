import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";
import { useContext } from "react";
import { AuthContext } from "../../../auth/AuthWrapper";

const ProductCard = ({ product, isAdmin = false, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { cart, favorites, addToCart, toggleFavorite } = useStore();
  const { user } = useContext(AuthContext);

  const isFavorite = favorites.some((item) => item.product_id == product.id);

  const handleProductClick = () => {
    if (!isAdmin) {
      navigate(`/store/product/${product.id}`);
    }
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

  const handleAddToFavorites = (e) => {
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
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto h-32 sm:h-40 object-contain mb-4"
      />

      <h2 className="text-sm sm:text-base font-Poppins mb-1 line-clamp-2">
        {product.name}
      </h2>
      <p className="text-gray-700 font-Montserrat-Light text-sm sm:text-base mb-3">
        <span>P </span>
        {product.price}
      </p>

      {isAdmin ? (
        <div className="flex justify-center gap-3 mt-2">
          <button onClick={() => onEdit(product)} className="text-blue-600">
            Edit
          </button>
          <button onClick={() => onDelete(product.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ) : (
        <div className="flex justify-center space-x-3">
          <button
            type="button"
            className={`p-2 ${
              isFavorite ? "text-red-500" : "text-gray-400"
            } hover:text-red-500 transition-colors`}
            onClick={handleAddToFavorites}
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
      )}
    </div>
  );
};

export default ProductCard;
