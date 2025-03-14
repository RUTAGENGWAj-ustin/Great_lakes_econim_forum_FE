import React, { useState, useContext } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext'; // Adjust the import path
import Notiflix from 'notiflix';

function CreateSponsor({ setShowModal }) {
  const { postSponsor } = useContext(GlobalDataContext); // Get postSponsor from context

  const [sponsorData, setSponsorData] = useState({
    name: "",
    website: "",
    description: "",
  });

  const [logo, setLogo] = useState(null); // State for the logo file
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSponsorData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file); // Set the selected logo file
  };
  
  const refreshPage = () => {
    window.location.reload();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!logo || !sponsorData.name) {
      setError("Logo and name are required");
      Notiflix.Notify.failure("Logo and name are required");
      return;
    }

    // Clear error
    setError("");

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("name", sponsorData.name);
    formData.append("website", sponsorData.website);
    formData.append("description", sponsorData.description);
    formData.append("logo", logo); // Append the logo file

    try {
      setLoading(true); // Set loading state

      // Use the postSponsor function from context
      const response = await postSponsor(formData);

      // Show success notification
      Notiflix.Notify.success("Sponsor created successfully!");
      refreshPage();
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error creating sponsor:", error);

      // Show error notification
      Notiflix.Notify.failure(error.message || "Error creating sponsor");

      // Set error state
      setError(error.message || "Error creating sponsor");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Sponsor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={sponsorData.name}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Website</label>
            <input
              type="url"
              name="website"
              value={sponsorData.website}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={sponsorData.description}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Logo Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

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
              {loading ? "Creating..." : "Create Sponsor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSponsor;