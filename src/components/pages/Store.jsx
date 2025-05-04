import React, { useState } from 'react';
import ProductGrid from '../structure/Store/ProductGrid';
import SortBar from '../structure/Store/SortBar';

const dummyProducts = [
  { id: 1, name: 'MMSU Hat', price: '₱150.00', tag: 'PREORDER', image: '/product-image/cap2.png' },
  { id: 2, name: 'MMSU Headband', price: '₱74.00', tag: 'PREORDER', image: '/product-image/headband.png' },
  { id: 3, name: 'MMSU Stallions Jacket', price: '₱499.99', image: '/product-image/jacket.png' },
  { id: 4, name: 'MMSU Tote Bag', price: '₱199.99', image: '/product-image/tote.png' },
];


const Store = () => {
  const [sortOption, setSortOption] = useState('default');

  const sortProducts = (products) => {
    const sorted = [...products];
    switch (sortOption) {
      case 'priceLowHigh':
        return sorted.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
      case 'priceHighLow':
        return sorted.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
      case 'nameAZ':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameZA':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mt-8">Store</h1>
      <SortBar sortOption={sortOption} setSortOption={setSortOption} />
      <ProductGrid products={sortProducts(dummyProducts)} />
    </div>
  );
};

export default Store;
