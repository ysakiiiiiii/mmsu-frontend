import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";
import { useContext } from "react";
import { AuthContext } from "../../../auth/AuthWrapper";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart, favorites, addToCart, toggleFavorite } = useStore();
  const { user } = useContext(AuthContext);
  
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleProductClick = () => {
    navigate(`/store/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user.isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product, 1);
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    if (!user.isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleFavorite(product);
  };

  return (
    <div 
      className="border rounded-md p-4 text-center w-full hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={handleProductClick}
    >
      {/* Tag */}
      <div className="h-6 mb-2 flex justify-center items-center">
        {product.tag === 'PREORDER' && (
          <span className="inline-block bg-green-600 text-white text-xs font-Poppins px-3 py-1 rounded">
            PREORDER
          </span>
        )}
      </div>

      {/* Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto h-32 sm:h-40 object-contain mb-4"
      />

      {/* Product info */}
      <h2 className="text-sm sm:text-base font-Poppins mb-1 line-clamp-2">{product.name}</h2>
      <p className="text-gray-700 font-Montserrat-Light text-sm sm:text-base mb-3">{product.price}</p>

      {/* Action buttons at bottom center */}
      <div className="flex justify-center space-x-3">
        <button 
          className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
          onClick={handleAddToFavorites}
        >
          <FiHeart className="w-4 h-4" />
        </button>
        <button 
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