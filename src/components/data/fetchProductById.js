// src/data/fetchProductById.js
export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`http://localhost/MMSU/mmsu-backend/store/fetchProductsById.php?id=${id}`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
