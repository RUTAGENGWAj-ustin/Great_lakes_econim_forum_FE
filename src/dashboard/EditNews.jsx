import React, { useState, useContext, useEffect } from 'react';
import Notiflix from 'notiflix';

function EditNews({ news, setShowModal, refreshNews,putNews }) {


  const [newsData, setNewsData] = useState({
    title: news.title,
    content: news.content,
    author: news.author,
  });

  const [image, setImage] = useState(null); // State for the new image file
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Populate the form with the news data when the component mounts
  useEffect(() => {
    if (news) {
      setNewsData({
        title: news.title,
        content: news.content,
        author: news.author,
      });
    }
  }, [news]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewsData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImage(file); // Set the selected image file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate required fields
    if (!newsData.title || !newsData.content) {
      setError("Title and content are required");
      Notiflix.Notify.failure("Title and content are required");
      return;
    }
  
    // Clear error
    setError("");
  
    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("title", newsData.title);
    formData.append("content", newsData.content);
    formData.append("author", newsData.author);
    if (image) {
      formData.append("image", image); // Append the new image file
    }
  
    // Debugging: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      setLoading(true); // Set loading state
  
      // Call putNews from context to update the news
      await putNews(news._id, formData);
  
      // Show success notification
      Notiflix.Notify.success("News updated successfully!");
  
      // Close the modal
      setShowModal(false);
  
      // Refresh the news list
      refreshNews();
    } catch (error) {
      console.error("Error updating news:", error);
  
      // Show error notification
      Notiflix.Notify.failure(error.message || "Failed to update news. Please try again.");
  
      // Set error state
      setError(error.message || "Failed to update news. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit News</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newsData.title}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Content</label>
            <textarea
              name="content"
              value={newsData.content}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={newsData.author}
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
              {loading ? "Updating..." : "Update News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNews;