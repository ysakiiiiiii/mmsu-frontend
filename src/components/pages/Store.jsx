import React, { useState } from 'react';
import ProductGrid from '../structure/Store/ProductGrid';
import SortBar from '../structure/Store/SortBar';
import SidebarFilter from '../structure/Store/SideFilter';

const dummyProducts = [
  { id: 1, name: 'MMSU Hat', price: '₱150.00', tag: 'PREORDER', image: '/product-image/cap2.png', category: 'Caps' },
  { id: 2, name: 'MMSU Headband', price: '₱74.00', tag: 'PREORDER', image: '/product-image/headband.png', category: 'Accessories' },
  { id: 3, name: 'MMSU Stallions Jacket', price: '₱499.99', image: '/product-image/jacket.png', category: 'Jackets' },
  { id: 4, name: 'MMSU Tote Bag', price: '₱199.99', image: '/product-image/tote.png', category: 'Accessories' },
];


const Store = () => {
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const filteredProducts = dummyProducts.filter((product) =>
    selectedCategories.length === 0 || selectedCategories.includes(product.category)
  );

  return (
    <div className="flex max-w-7xl mx-auto mt-8">
      <SidebarFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <div className="flex-1 px-6">
        <h1 className="text-2xl font-bold mb-4">Store</h1>
        <SortBar sortOption={sortOption} setSortOption={setSortOption} />
        <ProductGrid products={sortProducts(filteredProducts)} />
      </div>
    </div>
  );
};

export default Store;