import React, { useState, useContext, useEffect } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext';
import Notiflix from 'notiflix';

function EditSponsor({ sponsor, setShowModal, refreshSponsors }) {
  const { putSponsor } = useContext(GlobalDataContext);

  const [sponsorData, setSponsorData] = useState({
    name: sponsor.name,
    website: sponsor.website,
    description: sponsor.description,
  });

  const [logo, setLogo] = useState(null); // State for the new logo file
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Populate the form with the sponsor data when the component mounts
  useEffect(() => {
    if (sponsor) {
      setSponsorData({
        name: sponsor.name,
        website: sponsor.website,
        description: sponsor.description,
      });
    }
  }, [sponsor]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSponsorData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file); // Set the selected logo file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!sponsorData.name) {
      setError("Name is required");
      Notiflix.Notify.failure("Name is required");
      return;
    }

    // Clear error
    setError("");

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("name", sponsorData.name);
    formData.append("website", sponsorData.website);
    formData.append("description", sponsorData.description);
    if (logo) {
      formData.append("logo", logo); // Append the new logo file
    }

    try {
      setLoading(true); // Set loading state

      // Call putSponsor from context to update the sponsor
      await putSponsor(sponsor._id, formData);

      // Show success notification
      Notiflix.Notify.success("Sponsor updated successfully!");

      // Close the modal
      setShowModal(false);

      // Refresh the sponsors list
      refreshSponsors();
    } catch (error) {
      console.error("Error updating sponsor:", error);

      // Show error notification
      Notiflix.Notify.failure(error.message || "Failed to update sponsor. Please try again.");

      // Set error state
      setError(error.message || "Failed to update sponsor. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Sponsor</h2>

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
              {loading ? "Updating..." : "Update Sponsor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSponsor;