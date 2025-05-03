import React, { useState, useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import Notiflix from "notiflix";
import axios from 'axios';

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
    pricing: [], // Add pricing field
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Handle pricing change
  const handlePricingChange = (index, field, value) => {
    const updatedPricing = [...formData.pricing];
    updatedPricing[index][field] = value;
    setFormData({ ...formData, pricing: updatedPricing });
  };

  // Add a new pricing option
  const addPricingOption = () => {
    setFormData({
      ...formData,
      pricing: [...formData.pricing, { type: "", price: 0, benefits: [] }],
    });
  };

  // Remove a pricing option
  const removePricingOption = (index) => {
    const updatedPricing = formData.pricing.filter((_, i) => i !== index);
    setFormData({ ...formData, pricing: updatedPricing });
  };
  const refreshPage = () => {
    window.location.reload();
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if image is selected
    if (!image) {
      setError("Image is required");
      Notiflix.Notify.failure("Image is required");
      return;
    }
  
    // Clear error if image is selected
    setError("");
  
    // Prepare the data to send
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", new Date(formData.date).toISOString()); // Convert to ISO string
    formDataToSend.append("location", formData.location);
    formDataToSend.append("topics", JSON.stringify(formData.topics)); // Convert array to JSON string
    formDataToSend.append("speakers", JSON.stringify(formData.speakers)); // Convert array to JSON string
    formDataToSend.append("sponsors", JSON.stringify(formData.sponsors)); // Convert array to JSON string
    formDataToSend.append("pricing", JSON.stringify(formData.pricing)); // Convert array to JSON string
    formDataToSend.append("image", image); // Append the image file
  
    console.log("formDataToSend:", formDataToSend);
  
    try {
      setLoading(true); // Set loading state to true
  
      // Use the `postEvent` function from context
      const response = await postEvent(formDataToSend);

  
      // Show success notification
      Notiflix.Notify.success("Event created successfully!");
  
      // Optionally, close the modal or reset the form
      setShowModal(false);
      refreshPage();
    } catch (error) {
      console.error("Error creating event:", error);
  
      // Show error notification
      Notiflix.Notify.failure(error.message || "Error creating event");
  
      // Set error state
      setError(error.message || "Error creating event");
    } finally {
      setLoading(false); // Reset loading state
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
                {categoryData?.map((cat) => (
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
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date ? formData.date.slice(0, 16) : ''} // Format the value to match 'YYYY-MM-DDTHH:MM'
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
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
                  {field?.options?.map((option) => (
                    <option key={option._id} value={option._id}>{option.name}</option>
                  ))}
                </select>
              </div>
            ))}

            {/* Pricing Section */}
            <div>
              <label className="block text-gray-700 font-medium">Pricing</label>
              {formData?.pricing?.map((pricing, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Type</label>
                      <input
                        type="text"
                        value={pricing.type}
                        onChange={(e) => handlePricingChange(index, "type", e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="e.g., General Admission"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Price</label>
                      <input
                        type="number"
                        value={pricing.price}
                        onChange={(e) => handlePricingChange(index, "price", parseFloat(e.target.value))}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="e.g., 50"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium">Benefits</label>
                    <textarea
                      value={pricing.benefits.join(", ")}
                      onChange={(e) => handlePricingChange(index, "benefits", e.target.value.split(", "))}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      placeholder="e.g., Standard entry, Access to main event area"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePricingOption(index)}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPricingOption}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                Add Pricing Option
              </button>
            </div>

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