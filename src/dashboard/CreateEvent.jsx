import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Textarea from "../components/ui/Textarea";
import Label from "../components/ui/Label";
import { GlobalDataContext } from "../context/GlobalDataContext";



const CreateEvent = ({setShowModal}) => {
     const { speakersData,sponsorsData,categoryData,topicsData, isLoading } = useContext(GlobalDataContext);

     if (isLoading) {
        return <div>Loading events...</div>;
      }
//   const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    imageUrl: "",
    name: "",
    category: "",
    description: "",
    date: "",
    location: "",
    topics: [],
    speakers: [],
    sponsors: [],
  });

  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, topicRes, speakerRes, sponsorRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/topics"),
          axios.get("http://localhost:5000/api/speakers"),
          axios.get("http://localhost:5000/api/sponsors"),
        ]);
        console.log("wwwwww:",categoryRes);
        
        setCategories(categoryRes.data);
        setTopics(topicRes.data);
        setSpeakers(speakerRes.data);
        setSponsors(sponsorRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e, field) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setEventData((prev) => ({ ...prev, [field]: values }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/api/upload", formData);
      setEventData((prev) => ({ ...prev, imageUrl: response.data.url }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/events", eventData);
      alert("Event created successfully!");
      setShowModal(false); // Close modal after submission
    } catch (error) {
      console.error("Error creating event:", error);
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
            <input type="text" name="name" value={eventData.name} onChange={handleChange} required 
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select name="category" value={eventData.category} onChange={handleChange} required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
              <option value="">Select Category</option>
              {categoryData.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea name="description" value={eventData.description} onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Date</label>
              <input type="date" name="date" value={eventData.date} onChange={handleChange} required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Location</label>
              <input type="text" name="location" value={eventData.location} onChange={handleChange}
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
            <input type="file" accept="image/*" onChange={handleFileUpload} required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setShowModal(false)}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all">
              Cancel
            </button>
            <button type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all">
              Create Event
            </button>
          </div>
        </form>
      </div>
        </div>
    </div>
  );
};

export default CreateEvent;
