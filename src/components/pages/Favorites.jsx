import React from "react";
import ProtectedRouting from "../../auth/ProtectedRouting";
import { useStore } from "../../context/StoreContext";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  console.log("Favorites component rendering");
  const { favorites, toggleFavorite, addToCart } = useStore();
  const navigate = useNavigate();

  console.log("Favorites from context:", favorites);
  console.log("favorites.length:", favorites?.length);

  if (favorites)
    favorites.forEach((product) =>
      console.log("Product in favorites:", product)
    );
  const handleProductClick = (id) => {
    navigate(`/store/product/${id}`);
  };

  // If no favorites, show empty state
  if (!favorites || favorites.length === 0) {
    return (
      <ProtectedRouting>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              You don't have any favorites yet
            </p>
          </div>
        </div>
      </ProtectedRouting>
    );
  }

  // favorites are already normalized in context

  return (
    <ProtectedRouting>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <div
              key={product.product_id}
              onClick={() => handleProductClick(product.product_id)}
            >
              <button type="button"
                className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
              >
                <FiHeart className="w-5 h-5" fill="currentColor" />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto h-32 object-contain mb-4"
              />
              <h2 className="text-sm font-Poppins mb-1 line-clamp-2">
                {product.name}
              </h2>
              <p className="text-gray-700 font-Montserrat-Light text-sm mb-3">
                {product.price}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600 transition-colors flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
              >
                <FiShoppingCart className="mr-1" size={14} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRouting>
  );
};

export default Favorites;
