import React,{ useEffect, useState, useContext } from 'react'
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateGallery from './CreateGallery';

function Dash_gallery() {
      const { galleryData, isLoading } = useContext(GlobalDataContext);
     const [showModal, setShowModal] = useState(false);
    
      if (isLoading) {
        return <div>Loading events...</div>;
      }
    
      return (
        <div className="container mx-auto p-6">
          <div className="flex justify-between p-2">
          <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>
        
        {/* Button to open modal */}
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Add to Gallery
        </button>
      </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryData.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-48 object-cover rounded-md" />
                <p className="mt-2 text-gray-700 text-center">{item.caption || "No caption provided"}</p>
              </div>
            ))}
          </div>
          {showModal && ( <CreateGallery setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
        </div>
      );
    }

export default Dash_gallery