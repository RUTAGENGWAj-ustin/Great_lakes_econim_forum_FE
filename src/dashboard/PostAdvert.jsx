import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalDataContext } from "../context/GlobalDataContext";

const PostAdvert = ({setShowModal}) => {
  const { postAdvert } = useContext(GlobalDataContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(title,description,link,image);
     
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("image", image);

    

    try {
      await postAdvert(formData);
      refreshPage();
    } catch (error) {
      console.error("Failed to create advert:", error);
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-800/10 flex justify-center h-screen items-center p-4 overflow-y-auto">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative">
      <h1 className="text-2xl font-bold mb-4">Add New Advert</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded-lg"
          required
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              {"Create Advert"}
            </button>
          </div>
      </form>
    </div>
    </div>
  );
};

export default PostAdvert;