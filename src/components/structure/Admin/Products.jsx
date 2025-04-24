import React, { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: "$100" },
    { id: 2, name: "Product B", price: "$200" },
  ]);

  const addProduct = () => {
    const name = prompt("Enter product name:");
    const price = prompt("Enter product price:");
    if (name && price) {
      setProducts([...products, { id: Date.now(), name, price }]);
    }
  };

  const updateProduct = (id) => {
    const name = prompt("Enter new name:");
    const price = prompt("Enter new price:");
    if (name && price) {
      setProducts(products.map(p => (p.id === id ? { ...p, name, price } : p)));
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
      <button onClick={addProduct} className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded">
        Add Product
      </button>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => updateProduct(product.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
