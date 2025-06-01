import React, { useState, useEffect } from "react";
import ProductGrid from "../../structure/Store/ProductGrid";
import ProductModal from "./ProductModal";
import MessageModal from "../../common/messageModal";
import ConfirmModal from "../../common/confirmModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    color: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successType, setSuccessType] = useState(null);

  useEffect(() => {
    fetch("http://localhost/MMSU/mmsu-backend/store/fetchProducts.php")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));

    fetch("http://localhost/MMSU/mmsu-backend/store/fetchCategories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const handleEdit = (product) => {
    setFormData({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category_id: product.category_id || "",
      color: product.color || "",
      image: product.image || "",
    });
    setEditProductId(product.id);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    setConfirmMessage("Are you sure you want to delete this product?");
    setConfirmAction(() => async () => {
      // Delete API call
      const res = await fetch(
        "http://localhost/MMSU/mmsu-backend/admin/deleteProduct.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: productId }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        setSuccessType("deleteProduct");
        setSuccessModalOpen(true);
      } else {
        alert("Failed to delete product.");
      }
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.category_id) {
      alert("Please fill in Name, Price, and Category.");
      return;
    }
    setConfirmMessage(
      editProductId
        ? "Are you sure you want to update this product?"
        : "Are you sure you want to add this product?"
    );
    setConfirmAction(() => async () => {
      const payload = new FormData();
      payload.append("id", editProductId || "");
      payload.append("name", formData.name);
      payload.append("price", formData.price);
      payload.append("description", formData.description);
      payload.append("category_id", formData.category_id);
      payload.append("color", formData.color);

      if (formData.imageFile) {
        payload.append("image", formData.imageFile);
      }

      const url = editProductId
        ? "http://localhost/MMSU/mmsu-backend/admin/updateProduct.php"
        : "http://localhost/MMSU/mmsu-backend/admin/addProduct.php";

      const res = await fetch(url, {
        method: "POST",
        body: payload,
      });
      

      const data = await res.json();
      if (data.success) {
        const updated = await fetch(
          "http://localhost/MMSU/mmsu-backend/store/fetchProducts.php"
        ).then((res) => res.json());
        setProducts(updated);
        setShowModal(false);
        setEditProductId(null);
        setFormData({
          name: "",
          price: "",
          description: "",
          category_id: "",
          color: "",
          image: "",
          imageFile: null,
        });
        setSuccessType("updateProduct");
        setSuccessModalOpen(true);
      } else {
        alert("Failed to save product.");
      }
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  return (
    <div className="md:p-6 mt-17 md:mt-1">
      <div className="mb-5">
        <h2 className="text-3xl font-Montserrat-ExtraBold text-gray-900 mb-4">
          Manage Products
        </h2>

        <button
          onClick={() => {
            setEditProductId(null);
            setFormData({
              name: "",
              price: "",
              description: "",
              category_id: "",
              color: "",
              image: "",
            });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-indigo-800 text-white 
                    px-5 py-3 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </button>
      </div>

      <ProductGrid
        products={products}
        isAdmin={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <ProductModal
          show={showModal}
          formData={formData}
          setFormData={setFormData}
          editMode={!!editProductId}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          categories={categories}
        />
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        message={confirmMessage}
        onConfirm={confirmAction}
        onCancel={() => setConfirmOpen(false)}
      />

      <MessageModal
        isOpen={successModalOpen}
        type={successType}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
}
