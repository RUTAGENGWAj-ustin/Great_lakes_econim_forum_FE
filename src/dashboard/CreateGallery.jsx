import React,{useState,useContext} from 'react'
import { GlobalDataContext } from "../context/GlobalDataContext";

function CreateGallery({ setShowModal }) {
      const { eventsData, isLoading } = useContext(GlobalDataContext);
    
    const [galleryData, setGalleryData] = useState({
      event: "",
      imageUrl: "",
      caption: "",
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setGalleryData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      console.log("Selected file:", file);
      // File upload logic can be added here
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitting Gallery Data:", galleryData);
      // API call to submit galleryData can be added here
    };
  
    return (
      <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Upload to Gallery</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Select Event</label>
              <select name="event" value={galleryData.event} onChange={handleChange} required
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Choose an Event</option>
                {eventsData.map((event) => (
                  <option key={event._id} value={event._id}>{event.name}</option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Image Upload</label>
              <input type="file" accept="image/*" onChange={handleFileUpload} required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Caption</label>
              <input type="text" name="caption" value={galleryData.caption} onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
  
            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all">
                Cancel
              </button>
              <button type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all">
                Upload Image
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  

export default CreateGallery