import React, { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    image: "",
  });

  const openModal = (product = null) => {
    if (product) {
      setEditProductId(product.id);
      setFormData({
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
      });
    } else {
      setEditProductId(null);
      setFormData({ name: "", price: "", originalPrice: "", image: "" });
    }
    setShowModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const { name, price, originalPrice, image } = formData;
    if (!name || !price || !originalPrice) return alert("All fields are required");

    if (editProductId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProductId ? { ...p, name, price: parseFloat(price), originalPrice: parseFloat(originalPrice), image } : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name,
          price: parseFloat(price),
          originalPrice: parseFloat(originalPrice),
          image: image || "https://via.placeholder.com/100",
        },
      ]);
    }

    setShowModal(false);
    setFormData({ name: "", price: "", originalPrice: "", image: "" });
    setEditProductId(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-green-50 to-blue-50">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow"
          >
            Add Product
          </button>
          <select className="px-4 py-2 rounded-lg bg-white shadow border text-gray-700">
            <option>Sort by</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-4 flex flex-col items-center justify-between shadow-md h-96 transition hover:scale-105"
          >
            <img
              src={product.image || "https://via.placeholder.com/100"}
              alt={product.name}
              className="object-contain h-3/4 mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <div className="flex justify-between items-center w-full mt-auto pt-2">
              <div>
                <div className="text-sm font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-xs line-through text-gray-400">
                  ${product.originalPrice.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => openModal(product)}
                className="bg-white/50 backdrop-blur-sm px-4 py-1 text-sm rounded-full border border-white/30 shadow"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editProductId ? "Edit Product" : "Add Product"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Original Price"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-24 object-contain mx-auto"
                />
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  {editProductId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
