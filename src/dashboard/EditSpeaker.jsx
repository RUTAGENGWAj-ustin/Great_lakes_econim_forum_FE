import React, { useState, useContext, useEffect } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext';
import Notiflix from 'notiflix';

function EditSpeaker({ speaker, setShowModal, refreshSpeakers }) {
  const { putSpeaker } = useContext(GlobalDataContext);

  const [speakerData, setSpeakerData] = useState({
    name: speaker.name,
    bio: speaker.bio,
    expertise: speaker.expertise,
    image: null, // Store file instead of string
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Populate the form with the speaker data when the component mounts
  useEffect(() => {
    if (speaker) {
      setSpeakerData({
        name: speaker.name,
        bio: speaker.bio,
        expertise: speaker.expertise,
        image: null, // Reset image to null (user can upload a new one)
      });
    }
  }, [speaker]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSpeakerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSpeakerData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!speakerData.name || !speakerData.bio || !speakerData.expertise) {
      setError("Name, bio, and expertise are required");
      Notiflix.Notify.failure("Name, bio, and expertise are required");
      return;
    }

    // Clear error
    setError("");

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("name", speakerData.name);
    formData.append("bio", speakerData.bio);
    formData.append("expertise", speakerData.expertise);
    if (speakerData.image) {
      formData.append("image", speakerData.image);
    }

    try {
      setLoading(true); // Set loading state

      // Call putSpeaker from context to update the speaker
      await putSpeaker(speaker._id, formData);

      // Show success notification
      Notiflix.Notify.success("Speaker updated successfully!");

      // Close the modal
      setShowModal(false);

      // Refresh the speakers list
      refreshSpeakers();
    } catch (error) {
      console.error("Error updating speaker:", error);

      // Show error notification
      Notiflix.Notify.failure(error.message || "Failed to update speaker. Please try again.");

      // Set error state
      setError(error.message || "Failed to update speaker. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Speaker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={speakerData.name}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Bio</label>
            <textarea
              name="bio"
              value={speakerData.bio}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Expertise</label>
            <input
              type="text"
              name="expertise"
              value={speakerData.expertise}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Image Upload</label>
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              {loading ? "Updating..." : "Update Speaker"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSpeaker;