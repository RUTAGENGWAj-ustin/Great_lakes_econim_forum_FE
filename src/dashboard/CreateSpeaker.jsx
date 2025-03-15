import React, { useState, useContext } from 'react';
import { GlobalDataContext } from '../context/GlobalDataContext';
import Notiflix from 'notiflix';

function CreateSpeaker({ setShowModal }) {
  const { postSpeaker } = useContext(GlobalDataContext);

  const [speakerData, setSpeakerData] = useState({
    name: "",
    bio: "",
    expertise: "",
    image: null, // Store file instead of string
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSpeakerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSpeakerData((prevData) => ({ ...prevData, image: file }));
  };

  const refreshPage = () => {
    window.location.reload();
  };

const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("name", speakerData.name);
    formData.append("bio", speakerData.bio);
    formData.append("expertise", speakerData.expertise);
    if (speakerData.image) {
      formData.append("image", speakerData.image);
    }

    try {
      await postSpeaker(formData); // Call API function

      // Show success notification
      Notiflix.Notify.success("Speaker created successfully!");
      refreshPage();
      setShowModal(false); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting speaker:", error);

      // Show error notification
      Notiflix.Notify.failure("Failed to create speaker. Please try again.");
    }
};


  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Speaker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input type="text" name="name" value={speakerData.name} onChange={handleChange} required 
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Bio</label>
            <textarea name="bio" value={speakerData.bio} onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Expertise</label>
            <input type="text" name="expertise" value={speakerData.expertise} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Image Upload</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setShowModal(false)}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all">
              Cancel
            </button>
            <button type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all">
              Create Speaker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSpeaker;
