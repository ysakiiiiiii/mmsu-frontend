import React, { useState, useRef, useEffect } from 'react';

const SortBar = ({
  sortOption,
  setSortOption,
  categories = [],
  selectedCategories = [],
  setSelectedCategories,
  colors = [],
  selectedColors = [],
  setSelectedColors
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categorySelect, setCategorySelect] = useState('');
  const panelRef = useRef(null);

  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    // Reset dropdown to default if no categories selected
    if (updatedCategories.length === 0) {
      setCategorySelect('');
    }
  };

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        const filterButton = document.querySelector('.filter-button');
        if (filterButton && !filterButton.contains(event.target)) {
          setIsFilterOpen(false);
        }
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className="flex justify-end gap-4 px-4 pt-4 relative">
      <button 
        type="button"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="filter-button bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
      >
        Filter & Sort
      </button>

      {isFilterOpen && (
        <div 
          ref={panelRef}
          className="absolute top-full right-0 mt-2 w-72 bg-white shadow-lg rounded-md p-4 z-10 border border-gray-200"
        >
          {/* Sort Options */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-3 py-1 rounded text-sm w-full"
            >
              <option value="default">Default</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="nameAZ">Name: A–Z</option>
              <option value="nameZA">Name: Z–A</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Filter by Category</h3>
            <select 
              className="border px-3 py-1 rounded text-sm w-full"
              value={categorySelect}
              onChange={(e) => {
                const value = e.target.value;
                setCategorySelect(value);
                if (value) {
                  toggleCategory(value);
                }
              }}
            >
              <option value="">All Products</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(selectedCategories) &&
                selectedCategories.map(category => (
                  <span 
                    key={category} 
                    className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center"
                  >
                    {category}
                    <button 
                      type ="button"
                      onClick={() => toggleCategory(category)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <h3 className="font-medium mb-2">Filter by Color</h3>
            <div className="space-y-2">
              {colors.map(color => (
                <label key={color} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                    className="rounded text-green-600"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortBar;
