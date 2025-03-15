import React, { useState, useContext } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext'; // Adjust the import path
import Notiflix from 'notiflix';

function CreateCategory({ setShowModal }) {
  const { isLoading, postCategory } = useContext(GlobalDataContext); // Get postCategory from context

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };
  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!categoryData.name || !categoryData.description) {
      setError("Name and description are required");
      Notiflix.Notify.failure("Name and description are required");
      return;
    }

    // Clear error
    setError("");

    // Prepare data to send
    const data = {
      ...categoryData,
      createdAt: new Date().toISOString(), // Add current date
    };

    try {
      setLoading(true); // Set loading state

      // Use the postCategory function from context
      const response = await postCategory(data);

      console.log("Category created:", response);

      // Show success notification
      Notiflix.Notify.success("Category created successfully!");

      // Close the modal
      setShowModal(false);
      refreshPage();
    } catch (error) {
      console.error("Error creating category:", error);

      // Show error notification
      Notiflix.Notify.failure(error.message || "Error creating category");

      // Set error state
      setError(error.message || "Error creating category");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Category Name</label>
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category Description</label>
            <input
              type="text"
              name="description"
              value={categoryData.description}
              onChange={handleChange}
              required
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;