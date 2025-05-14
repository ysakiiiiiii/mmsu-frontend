import React, { useState } from 'react';
import ProductGrid from '../structure/Store/ProductGrid';
import SortBar from '../structure/Store/SortBar';

export const dummyProducts = [
  { 
    id: 1, 
    name: 'MMSU Hat', 
    price: '₱150.00', 
    tag: 'PREORDER', 
    image: '/product-image/cap2.png', 
    category: 'Caps',
    color: 'Green',
    description: 'Official MMSU baseball cap with embroidered logo. Adjustable strap for perfect fit.'
  },
  { 
    id: 2, 
    name: 'MMSU Headband', 
    price: '₱74.00', 
    image: '/product-image/headband.png', 
    category: 'Accessories',
    color: 'White',
    description: 'Sample'
  },
  { 
    id: 3, 
    name: 'MMSU Jacket W', 
    price: '₱499.99', 
    tag: 'PREORDER', 
    image: '/product-image/jacket.png', 
    category: 'Jackets',
    color: 'Green',
    description: 'Sample'
  },
  { 
    id: 4, 
    name: 'MMSU Tote Bag', 
    price: '₱199.99', 
    image: '/product-image/tote.png', 
    category: 'Bags',
    color: 'White',
    description: 'Sample'
  },
];

const Store = () => {
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Extract unique categories from products
  const categories = [...new Set(dummyProducts.map(product => product.category))];
  // Available colors
  const colors = ['Green', 'White'];

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

  const filteredProducts = dummyProducts.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || 
                         selectedCategories.includes(product.category);
    const colorMatch = selectedColors.length === 0 || 
                      selectedColors.includes(product.color);
    return categoryMatch && colorMatch;
  });

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-8 px-4">
      <div className="flex-1 md:px-6 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold mb-4">Store</h1>
        <SortBar 
          sortOption={sortOption}
          setSortOption={setSortOption}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          colors={colors}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
        />
        <ProductGrid products={sortProducts(filteredProducts)} />
      </div>
    </div>
  );
};

export default Store;