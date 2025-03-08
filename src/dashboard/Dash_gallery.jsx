import React,{ useEffect, useState, useContext } from 'react'
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateGallery from './CreateGallery';
import EditGallery from './EditGallery';
import { PenLineIcon, Trash2 } from "lucide-react";
import Notiflix from 'notiflix';

function Dash_gallery() {
      const { galleryData, isLoading, deleteGallery } = useContext(GlobalDataContext);
     const [showModal, setShowModal] = useState(false);
     const [showEditModal, setShowEditModal] = useState(false);
     const [selectedGallery, setSelectedGallery] = useState(null);
   
     // Function to refresh the gallery list
     const refreshGallery = () => {
       console.log("Refreshing gallery...");
       // Fetch or update gallery logic here
     };
   
     // Function to handle editing a gallery item
     const handleEditGallery = (item) => {
       setSelectedGallery(item); // Set the gallery to edit
       setShowEditModal(true); // Open the edit modal
     };
    
      if (isLoading) {
        return <div>Loading events...</div>;
      }

const handleDeleteImage = async (imageId) => {
            
            // Show confirmation dialog
            Notiflix.Confirm.show(
              'Delete Image',
              'Are you sure you want to delete this Image?',
              'Yes',
              'No',
              async () => {
                try {
                  // Call deleteEvent from context
                  await deleteGallery(imageId);
        
                  // Show success notification
                  Notiflix.Notify.success('Image deleted successfully!');
                } catch (error) {
                  console.error('Error deleting event:', error);
        
                  // Show error notification
                  Notiflix.Notify.failure(error.message || 'Error deleting image');
                }
              },
              () => {
                // User clicked "No" or dismissed the dialog
                Notiflix.Notify.info('Delete canceled');
              }
            );
      };
      
    
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
                <div className="w-full flex justify-center p-2">
                  <div className=' border-t-1 border-gray-300 min-w-30 p-3 flex justify-between'>
                    <button className="text-green-600" onClick={() => handleEditGallery(item)}><PenLineIcon size={20}/></button>
                     <button className="text-red-600" onClick={() => handleDeleteImage(item._id)}><Trash2 size={20}/></button>
                     </div>
                    </div>
                
              </div>
            ))}
          </div>
          {showModal && ( <CreateGallery setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
          {showEditModal && (
        <EditGallery
          gallery={selectedGallery}
          setShowModal={setShowEditModal}
          refreshGallery={refreshGallery}
        />
      )}
        </div>
      );
    }

export default Dash_gallery