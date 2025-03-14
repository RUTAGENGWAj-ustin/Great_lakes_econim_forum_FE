import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalDataContext } from "../context/GlobalDataContext";
import Notiflix from 'notiflix';

const PutAdvert = ({setShowModal,advert}) => {
  const { putAdvert } = useContext(GlobalDataContext);
  const [advertData, setadvertData] = useState({
    title:advert.title,
    description:advert.description,
    link:advert.link

  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  
      useEffect(() => {
        if (advert) {
          setadvertData({
            title:advert.title,
            description:advert.description,
            link:advert.link
        
          });
        }
      }, [advert]);

   const handleChange = (advert) => {
        const { name, value } = advert.target;
        setadvertData((prevData) => ({ ...prevData, [name]: value }));
      };
    const handleFileUpload = (event) => {
        const files = event.target.files;
        setImage([...files]); // Set the selected image files
      };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("advertData:",advertData,image);
    
    const formData = new FormData();
    formData.append("title", advertData.title);
    formData.append("description", advertData.description);
    formData.append("link", advertData.link);
    if (image) formData.append("image", image);
    console.log(advert._id);
    
    try {
      setLoading(true);
      await putAdvert(advert._id, formData);
          Notiflix.Notify.success("News updated successfully!");
        
            // Close the modal
            setShowModal(false);
               // Refresh the news list
      navigate("/adverts"); // Redirect to the list of adverts
    } catch (error) {
      console.error("Failed to update advert:", error);
      Notiflix.Notify.failure(error.message || "Failed to update news. Please try again.");
      setError(error.message || "Failed to update news. Please try again.");

      
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
          placeholder="Title"
          value={advertData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={advertData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
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
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Update Advert
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default PutAdvert;