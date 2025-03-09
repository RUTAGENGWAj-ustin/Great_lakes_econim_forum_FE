import React, { useState, useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateEvent from "./CreateEvent"; // Import the event creation form
import CreateSpeaker from "./CreateSpeaker";
import {PenLineIcon, Trash2 } from "lucide-react";
import EditSpeaker from "./EditSpeaker";
import Notiflix from "notiflix";


function Dash_speakers() {

      const { speakersData, isLoading,deleteSpeaker,backendUrl } = useContext(GlobalDataContext);
      const [showModal, setShowModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);
      const [selectedSpeaker, setSelectedSpeaker] = useState(null);

    
      if (isLoading) {
        return <div>Loading events...</div>;
      }
      const refreshSpeakers = () => {
        console.log("Refreshing speakers...");
        // Fetch or update speakers logic here
      };
       // Function to handle editing a speaker
  const handleEditSpeaker = (speaker) => {
    setSelectedSpeaker(speaker); 
    setShowEditModal(true); 
  };

      const handleDeleteSpeaker = async (speakerId) => {
                  
                  // Show confirmation dialog
                  Notiflix.Confirm.show(
                    'Delete Image',
                    'Are you sure you want to delete this Speaker?',
                    'Yes',
                    'No',
                    async () => {
                      try {
                        // Call deleteEvent from context
                        await deleteSpeaker(speakerId);
              
                        // Show success notification
                        Notiflix.Notify.success('Speaker deleted successfully!');
                      } catch (error) {
                        console.error('Error deleting Speaker:', error);
              
                        // Show error notification
                        Notiflix.Notify.failure(error.message || 'Error deleting Speaker');
                      }
                    },
                    () => {
                      // User clicked "No" or dismissed the dialog
                      Notiflix.Notify.info('Delete canceled');
                    }
                  );
            };
  return (
    <div className="relative container mx-auto p-4">
    <div className="flex justify-between p-2">
      <h2 className="text-2xl font-bold mb-4">Speakers List</h2>
      
      {/* Button to open modal */}
      <button 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Add new Speakers
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Biograph</th>
            <th className="p-3 text-left">Expertise</th>
            <th className="p-3 text-left">Profile</th>
            <th className="p-3 text-left">Operations</th>
          </tr>
        </thead>
        <tbody>
          {speakersData?.map((speaker) => (
            <tr key={speaker._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{speaker?.name}</td>
              <td className="p-3">{speaker?.bio}</td>
              <td className="p-3">{speaker?.expertise}</td>
              <td className="p-3"><img src={backendUrl+speaker?.image} className="w-10 h-10"/></td>
              <td className="p-3">
                <div className="w-full flex justify-between">
                  <button className="text-green-600" onClick={() => handleEditSpeaker(speaker)}><PenLineIcon size={20}/></button> 
                  <button className="text-red-600" onClick={() => handleDeleteSpeaker(speaker._id)}><Trash2 size={20}/></button>
                  </div>
                  </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Modal for event creation */}
    {showModal && ( <CreateSpeaker setShowModal={setShowModal} closeModal={() => setShowModal(false)} />
      // <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      //   <div className="bg-white p-6 rounded-lg shadow-lg max-w-fit w-fit relative">
         
      //   </div>
      // </div>
    )}
     {showEditModal && (
        <EditSpeaker
          speaker={selectedSpeaker}
          setShowModal={setShowEditModal}
          refreshSpeakers={refreshSpeakers}
        />
      )}
  </div>
  )
}

export default Dash_speakers