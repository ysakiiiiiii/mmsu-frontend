// src/pages/Store.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../data/fetchProducts";
import ProductGrid from "../structure/Store/ProductGrid";
import SortBar from "../structure/Store/SortBar";


const Store = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts();
      setProducts(result);
    };
    loadProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];
  const colors = [...new Set(products.map((p) => p.color))];

  const sortProducts = (products) => {
    const sorted = [...products];
    switch (sortOption) {
      case "priceLowHigh":
        return sorted.sort(
          (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
        );
      case "priceHighLow":
        return sorted.sort(
          (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
        );
      case "nameAZ":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "nameZA":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const colorMatch =
      selectedColors.length === 0 || selectedColors.includes(product.color);
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
