// src/data/fetchProducts.js
export const fetchProducts = async () => {
  try {
    const res = await fetch('http://localhost/MMSU/mmsu-backend/store/fetchProducts.php', {
      
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
