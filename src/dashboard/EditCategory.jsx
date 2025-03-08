import React, { useState, useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import Notiflix from "notiflix";

function EditCategory({ category, setShowModal, refreshCategories, putCategory }) {
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
    createdAt: category.createdAt,
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.description) {
      setError("Name and description are required");
      Notiflix.Notify.failure("Name and description are required");
      return;
    }

    // Clear error
    setError("");

    try {
      setLoading(true); // Set loading state

      // Call putCategory from props (passed from parent component or context)
      await putCategory(category._id, formData);

      // Show success notification
      Notiflix.Notify.success("Category updated successfully!");

      // Close the modal
      setShowModal(false);

      // Refresh the categories list
      refreshCategories();
    } catch (error) {
      console.error("Error updating category:", error);

      // Show error notification
      Notiflix.Notify.failure(error.message || "Error updating category");

      // Set error state
      setError(error.message || "Error updating category");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;