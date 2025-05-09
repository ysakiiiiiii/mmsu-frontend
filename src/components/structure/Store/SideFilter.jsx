import React from 'react';

const categories = [
  { label: 'Caps', value: 'Caps' },
  { label: 'T-Shirts', value: 'Tshirts' },
  { label: 'Jackets', value: 'Jackets' },
  { label: 'Accessories', value: 'Accessories' },
];

const SidebarFilter = ({ selectedCategories, setSelectedCategories }) => {
  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="w-64 p-4 border-r bg-white">
      <h2 className="text-lg font-semibold mb-4">🔍 Search Filter</h2>
      <p className="text-sm font-medium mb-2">By Category</p>
      <div className="flex flex-col gap-2">
        {categories.map(({ label, value }) => (
          <label key={value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedCategories.includes(value)}
              onChange={() => handleCheckboxChange(value)}
              className="accent-green-600"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilter;
