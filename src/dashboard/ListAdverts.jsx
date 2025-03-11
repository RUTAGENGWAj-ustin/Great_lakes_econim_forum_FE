import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
// import { useGlobalData } from "../context/GlobalDataContext";
import { GlobalDataContext } from "../context/GlobalDataContext";
import PostAdvert from "./PostAdvert";
import PutAdvert from "./PutAdvert";
import { DeleteIcon, PenLineIcon, Trash2 } from "lucide-react";

const ListAdverts = () => {
  const { advertData, deleteAdvert } = useContext(GlobalDataContext);

      const [showModal, setShowModal] = useState(false);
       const [showEditModal, setShowEditModal] = useState(false);
       const [selectedAdvert, setSelectedAdvert] = useState(null);
     
       // Function to refresh the gallery list
       const refreshGallery = () => {
         console.log("Refreshing gallery...");
         // Fetch or update gallery logic here
       };
     
       // Function to handle editing a gallery item
       const handleEditAdvert = (advert) => {
         setSelectedAdvert(advert); // Set the gallery to edit
         setShowEditModal(true); // Open the edit modal
       };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Adverts</h1>
      <button
        className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Add New Advert
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {advertData?.map((advert) => (
          <div key={advert._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`http://localhost:5000/${advert.image}`} // Serve images from the backend
              alt={advert.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{advert.title}</h2>
            <p className="text-gray-600 mt-2">{advert.description}</p>
            <a
              href={advert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit Link
            </a>
            <div className="mt-4 flex space-x-2">
            <div className="w-full flex justify-center p-2">
                  <div className=' border-t-1 border-gray-300 min-w-30 p-3 flex justify-between'>
                    <button className="text-green-600" onClick={() => handleEditAdvert(advert)}><PenLineIcon size={20}/></button>
                     <button className="text-red-600" onClick={() => deleteAdvert(advert._id)}><Trash2 size={20}/></button>
                     </div>
                    </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && ( <PostAdvert setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
          {showEditModal && (
        <PutAdvert
          news={selectedAdvert}
          setShowModal={setShowEditModal}
          refreshNews={refreshGallery}
        />)}
    </div>
  );
};

export default ListAdverts;