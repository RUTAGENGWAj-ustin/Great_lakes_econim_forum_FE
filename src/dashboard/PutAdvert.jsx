import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalDataContext } from "../context/GlobalDataContext";
import Notiflix from "notiflix";

const PutAdvert = ({ setShowModal, advert }) => {
  const { putAdvert } = useContext(GlobalDataContext);
  const [advertData, setAdvertData] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Initialize form data when `advert` prop changes
  useEffect(() => {
    if (advert) {
      setAdvertData({
        title: advert.title,
        description: advert.description,
        link: advert.link,
      });
    }
  }, [advert]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdvertData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Take the first file
    setImage(file); // Set the selected image file
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("advertData:", advertData, image);

    const formData = new FormData();
    formData.append("title", advertData.title);
    formData.append("description", advertData.description);
    formData.append("link", advertData.link);
    if (image) formData.append("image", image); // Append the image file

    console.log("Advert ID:", advert._id);

    try {
      setLoading(true);
      await putAdvert(advert._id, formData); // Pass the `id` and `formData`
      Notiflix.Notify.success("Advert updated successfully!");

      // Close the modal
      setShowModal(false);

      // Refresh the advert list
      refreshPage();
    } catch (error) {
      console.error("Failed to update advert:", error);
      Notiflix.Notify.failure(
        error.response?.data?.error || "Failed to update advert. Please try again."
      );
      setError(error.response?.data?.error || "Failed to update advert. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Advert</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={advertData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={advertData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={advertData.link}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
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
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 disabled:bg-yellow-300"
            >
              {loading ? "Updating..." : "Update Advert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PutAdvert;