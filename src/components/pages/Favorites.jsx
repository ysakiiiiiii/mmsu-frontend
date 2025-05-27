import React from "react";
import ProtectedRouting from "../../auth/ProtectedRouting";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "../structure/Store/ProductCard";

const Favorites = () => {
  const { favorites } = useStore();
  const navigate = useNavigate();

  // Normalize favorites if needed (e.g., use product.id instead of product.product_id)
  const normalizedFavorites = favorites?.map((product) => ({
    ...product,
    id: product.id || product.product_id,
  }));

  if (!normalizedFavorites || normalizedFavorites.length === 0) {
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

  return (
    <ProtectedRouting>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {normalizedFavorites.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </ProtectedRouting>
  );
};

export default Favorites;
