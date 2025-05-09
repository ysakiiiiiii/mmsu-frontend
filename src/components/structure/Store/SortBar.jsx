// structure/Store/SortBar.jsx
import React from 'react';

const SortBar = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex justify-end gap-4 px-4 pt-4">
      <label className="text-sm font-medium self-center">Sort by:</label>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border px-3 py-1 rounded text-sm"
      >
        <option value="default">Default</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="nameAZ">Name: A–Z</option>
        <option value="nameZA">Name: Z–A</option>
      </select>
    </div>
  );
};

export default SortBar;
