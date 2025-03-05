import React, { useState, useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import Notiflix from "notiflix";

const CreateEvent = ({ setShowModal }) => {
  const { postEvent, speakersData, sponsorsData, categoryData, topicsData, isLoading } = useContext(GlobalDataContext);

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    date: "",
    location: "",
    topics: [],
    speakers: [],
    sponsors: [],
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle multiple selections correctly
  const handleMultiSelect = (e, field) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      Notiflix.Notify.failure("Please select an image.");
      return;
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        Notiflix.Notify.failure("No token found. Please log in.");
        setLoading(false);
        return;
      }
  
      // Prepare FormData
      const data = new FormData();
      data.append("image", image);
      console.log("FormData (image):", image); // Check if the image is correct
      console.log("data:",data);
      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => data.append(key, item));
          console.log(`FormData (${key}):`, formData[key]); // Check array fields
        } else {
          data.append(key, formData[key]);
          console.log(`FormData (${key}):`, formData[key]); // Check single fields
        }
      });
    
     
      // Send POST request via context function
      await postEvent("events", data, token);
  
      Notiflix.Notify.success("Event created successfully!");
      setFormData({
        name: "",
        category: "",
        description: "",
        date: "",
        location: "",
        topics: [],
        speakers: [],
        sponsors: [],
      });
      setImage(null);
    } catch (error) {
      console.error("Error creating event:", error);
      Notiflix.Notify.failure("Failed to create event. Please check your input.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="absolute inset-0 h-screen bg-gray-800/10 flex justify-center overflow-y-auto">
      <div className=" inset-0 pt-5 pb-5 grid justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-1xl w-full relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Event</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                <option value="">Select Category</option>
                {categoryData.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
              </div>
            </div>

            {[{ label: "Topics", name: "topics", options: topicsData },
              { label: "Speakers", name: "speakers", options: speakersData },
              { label: "Sponsors", name: "sponsors", options: sponsorsData }].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 font-medium">{field.label}</label>
                <select multiple name={field.name} onChange={(e) => handleMultiSelect(e, field.name)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                  {field.options.map((option) => (
                    <option key={option._id} value={option._id}>{option.name}</option>
                  ))}
                </select>
              </div>
            ))}

            <div>
              <label className="block text-gray-700 font-medium">Image Upload</label>
              <input type="file" accept="image/*" onChange={handleFileChange} required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all">
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
