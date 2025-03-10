import React, { useState } from 'react';
import Notiflix from 'notiflix';

function EditEvent({ event, setShowModal, refreshEvents, putEvent, categoryData, topicsData, speakersData, sponsorsData }) {
  const [formData, setFormData] = useState({
    name: event.name,
    category: event.category,
    description: event.description,
    date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '', // Format date for input
    location: event.location,
    topics: event.topics || [],
    speakers: event.speakers || [],
    sponsors: event.sponsors || [],
  });

  const [image, setImage] = useState(null); // State for the new image file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelect = (e, field) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.category || !formData.date || !formData.location) {
      Notiflix.Notify.failure('Name, category, date, and location are required');
      return;
    }

    // Prepare FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('topics', JSON.stringify(formData.topics));
    formDataToSend.append('speakers', JSON.stringify(formData.speakers));
    formDataToSend.append('sponsors', JSON.stringify(formData.sponsors));
    if (image) {
      formDataToSend.append('image', image); // Append the new image file
    }

    try {
      // Call putEvent from context
      await putEvent(event._id, formDataToSend);

      // Show success notification
      Notiflix.Notify.success('Event updated successfully!');

      // Close the modal
      setShowModal(false);

      // Refresh the events list
      refreshEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      Notiflix.Notify.failure(error.message || 'Error updating event');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {/* Populate categories dynamically */}
              {categoryData?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Topics</label>
            <select
              multiple
              name="topics"
              value={formData.topics}
              onChange={(e) => handleMultiSelect(e, 'topics')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {/* Populate topics dynamically */}
              {topicsData?.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Speakers</label>
            <select
              multiple
              name="speakers"
              value={formData.speakers}
              onChange={(e) => handleMultiSelect(e, 'speakers')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {/* Populate speakers dynamically */}
              {speakersData?.map((speaker) => (
                <option key={speaker._id} value={speaker._id}>
                  {speaker.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Sponsors</label>
            <select
              multiple
              name="sponsors"
              value={formData.sponsors}
              onChange={(e) => handleMultiSelect(e, 'sponsors')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {/* Populate sponsors dynamically */}
              {sponsorsData?.map((sponsor) => (
                <option key={sponsor._id} value={sponsor._id}>
                  {sponsor.name}
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;