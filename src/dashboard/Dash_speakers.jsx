import React, { useState, useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateEvent from "./CreateEvent"; // Import the event creation form
import CreateSpeaker from "./CreateSpeaker";

function Dash_speakers() {

      const { speakersData, isLoading } = useContext(GlobalDataContext);
      const [showModal, setShowModal] = useState(false);

      let eventurl="http://localhost:5000";
    
      if (isLoading) {
        return <div>Loading events...</div>;
      }
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
          </tr>
        </thead>
        <tbody>
          {speakersData?.map((event) => (
            <tr key={event._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{event?.name}</td>
              <td className="p-3">{event?.bio}</td>
              <td className="p-3">{event?.expertise}</td>
              <td className="p-3"><img src={event?.image} className="w-10 h-10"/></td>
      
            
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
  </div>
  )
}

export default Dash_speakers