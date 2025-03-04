import React,{useState} from 'react'

function CreateNews({ setShowModal }) {
    const [newsData, setNewsData] = useState({
      title: "",
      content: "",
      image: "",
      author: "",
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewsData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      console.log("Selected file:", file);
      // File upload logic can be added here
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitting News Data:", newsData);
      // API call to submit newsData can be added here
    };
  
    return (
      <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create News</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Title</label>
              <input type="text" name="title" value={newsData.title} onChange={handleChange} required 
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Content</label>
              <textarea name="content" value={newsData.content} onChange={handleChange} required
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Author</label>
              <input type="text" name="author" value={newsData.author} onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium">Image Upload</label>
              <input type="file" accept="image/*" onChange={handleFileUpload}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
  
            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all">
                Cancel
              </button>
              <button type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all">
                Create News
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  

export default CreateNews