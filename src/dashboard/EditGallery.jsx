import React, { useState, useContext, useEffect } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext';
import Notiflix from 'notiflix';

function EditGallery({ gallery, setShowModal, refreshGallery }) {
  const { eventsData, isLoading, putGallery } = useContext(GlobalDataContext);

  const [galleryData, setGalleryData] = useState({
    event: gallery.event,
    caption: gallery.caption,
  });

  const [images, setImages] = useState([]); // State for new image files
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Populate the form with the gallery data when the component mounts
  useEffect(() => {
    if (gallery) {
      setGalleryData({
        event: gallery.event,
        caption: gallery.caption,
      });
    }
  }, [gallery]);

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
    if (!galleryData.event) {
      setError("Event is required");
      Notiflix.Notify.failure("Event is required");
      return;
    }

    // Clear error
    setError("");

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("event", galleryData.event);
    formData.append("caption", galleryData.caption);
    images.forEach((image, index) => {
      formData.append("images", image); // Append each new image file
    });

    try {
      setLoading(true); // Set loading state

      // Call putGallery from context to update the gallery
      await putGallery(gallery._id, formData);

      // Show success notification
      Notiflix.Notify.success("Gallery updated successfully!");

      // Close the modal
      setShowModal(false);

      // Refresh the gallery list
      refreshGallery();
    } catch (error) {
      console.error("Error updating gallery:", error);

      // Show error notification
      Notiflix.Notify.failure(error.message || "Failed to update gallery. Please try again.");

      // Set error state
      setError(error.message || "Failed to update gallery. Please try again.");
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Gallery</h2>

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
              {loading ? "Updating..." : "Update Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGallery;