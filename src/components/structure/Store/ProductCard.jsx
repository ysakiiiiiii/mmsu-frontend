import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-center text-center border p-4 rounded hover:shadow-lg transition">
      {product.tag && (
        <span className="bg-purple-600 text-white text-xs px-2 py-1 mb-2 rounded">
          {product.tag}
        </span>
      )}
      <img src={product.image} alt={product.name} className="w-40 h-40 object-contain mb-3" />
      <h3 className="text-sm font-medium">{product.name}</h3>
      <p className="text-gray-700 text-sm">{product.price}</p>
    </div>
  );
};

export default ProductCard;
