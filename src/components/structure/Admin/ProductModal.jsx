export default function ProductModal({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editMode,
  categories = [],
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {editMode ? "Edit Product" : "Add Product"}
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
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-4 py-2 border rounded"
          />
          <select
            value={formData.category_id}
            onChange={(e) =>
              setFormData({ ...formData, category_id: Number(e.target.value) })
            }
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            className="w-full px-4 py-2 border rounded bg-white text-green-700"
          >
            <option value="">Select Color</option>
            <option value="white">White</option>
            <option value="green">Green</option>
          </select>

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, imageFile: e.target.files[0] })
            }
            className="w-full px-4 py-2 border rounded"
          />

          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {editMode ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
