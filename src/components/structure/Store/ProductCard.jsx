import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-md p-4 text-center w-full">
      <div className="h-6 mb-2 flex justify-center items-center">
        {product.tag === 'PREORDER' && (
          <span className="inline-block bg-green-600 text-white text-xs font-Poppins px-3 py-1 rounded">
            PREORDER
          </span>
        )}
      </div>

      <img
        src={product.image}
        alt={product.name}
        className="mx-auto h-40 object-contain mb-4"
      />

      <h2 className="text-lg font-Poppins mb-1">{product.name}</h2>
      <p className="text-gray-700 font-Montserrat-Light">{product.price}</p>
    </div>
  );
};

export default ProductCard;
