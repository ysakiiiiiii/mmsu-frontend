import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, isAdmin = false, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-2 gap-4  px-2 py-4
                  sm:grid-cols-3 sm:gap-6  sm:px-1 sm:py-6
                  md:grid-cols-3 
                  lg:grid-cols-4 ">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
