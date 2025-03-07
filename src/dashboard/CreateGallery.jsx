import React, { useState, useContext } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext'; // Adjust the import path
import Notiflix from 'notiflix';

function CreateGallery({ setShowModal }) {
  const { eventsData, isLoading, postGallery } = useContext(GlobalDataContext); // Get postGallery from context

  const [galleryData, setGalleryData] = useState({
    event: "",
    caption: "",
  });

  const [images, setImages] = useState([]); // State for multiple image files
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGalleryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setImages([...files]); // Set the selected image files
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!galleryData.event || images.length === 0) {
      setError("Event and at least one image are required");
      Notiflix.Notify.failure("Event and at least one image are required");
      return;
    }

    // Clear error
    setError("");

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("event", galleryData.event);
    formData.append("caption", galleryData.caption);
    images.forEach((image, index) => {
      formData.append("images", image); // Append each image file
    });

    try {
      setLoading(true); // Set loading state

      // Use the postGallery function from context
      const response = await postGallery(formData);

      console.log("Gallery images uploaded:", response);

      // Show success notification
      Notiflix.Notify.success("Gallery images uploaded successfully!");

      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error uploading gallery images:", error);

      // Show error notification
      Notiflix.Notify.failure(error.message || "Error uploading gallery images");

      // Set error state
      setError(error.message || "Error uploading gallery images");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Upload to Gallery</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Select Event</label>
            <select
              name="event"
              value={galleryData.event}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Choose an Event</option>
              {eventsData.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              multiple // Allow multiple file uploads
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Caption</label>
            <input
              type="text"
              name="caption"
              value={galleryData.caption}
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
              {loading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGallery;