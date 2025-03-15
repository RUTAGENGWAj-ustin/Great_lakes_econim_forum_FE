import React, { useState, useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateEvent from "./CreateEvent"; // Import the event creation form
import { DeleteIcon, PenLineIcon, Trash2 } from "lucide-react";
import Notiflix from "notiflix";
import EditEvent from "./EditEvent";

function Dash_events() {
  const { eventsData, isLoading, deleteEvent, putEvent,categoryData,topicsData,speakersData,sponsorsData , backendUrl} = useContext(GlobalDataContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEditEvent = (event) => {
    setSelectedEvent(event); // Set the event to edit
    setShowEditModal(true); // Open the edit modal
  };

  const refreshEvents = () => {
      window.location.reload();
  };

  if (isLoading) {
    return <div>Loading events...</div>;
  }

    // Handle delete event
    const handleDeleteEvent = async (eventId) => {
      
      // Show confirmation dialog
      Notiflix.Confirm.show(
        'Delete Event',
        'Are you sure you want to delete this event?',
        'Yes',
        'No',
        async () => {
          try {
            // Call deleteEvent from context
            await deleteEvent(eventId);
  
            // Show success notification
            Notiflix.Notify.success('Event deleted successfully!');
          } catch (error) {
            console.error('Error deleting event:', error);
  
            // Show error notification
            Notiflix.Notify.failure(error.message || 'Error deleting event');
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
        <h2 className="text-2xl font-bold mb-4">Events List</h2>
        
        {/* Button to open modal */}
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Add new event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Topics</th>
              <th className="p-3 text-left">Speakers</th>
              <th className="p-3 text-left">Sponsors</th>
              <th className="p-3 text-left">Operations</th>
            </tr>
          </thead>
          <tbody>
            {eventsData?.map((event) => (
              <tr key={event._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{event?.name}</td>
                <td className="p-3">{new Date(event?.date).toLocaleDateString()}</td>
                <td className="p-3">{event?.location}</td>
                <td className="p-3">{event?.topics?.map(topic => topic.name).join(", ") || "N/A"}</td>
                <td className="p-3">{event?.speakers?.map(speaker => speaker.name).join(", ") || "N/A"}</td>
                <td className="p-3">{event?.sponsors?.map(sponsor => sponsor.name).join(", ") || "N/A"}</td>
                <td className="p-3">
                  <div className="w-full flex justify-between">
                    <button className="text-green-600"  onClick={() => handleEditEvent(event)}><PenLineIcon size={20}/></button>
                    <button className="text-red-600" onClick={() => handleDeleteEvent(event._id)}><Trash2 size={20} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for event creation */}
      {showModal && ( <CreateEvent setShowModal={setShowModal} closeModal={() => setShowModal(false)} />
        // <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        //   <div className="bg-white p-6 rounded-lg shadow-lg max-w-fit w-fit relative">
           
        //   </div>
        // </div>
      )}
      {showEditModal && ( <EditEvent event={selectedEvent} setShowModal={setShowEditModal} refreshEvents={refreshEvents} putEvent={putEvent} categoryData={categoryData} topicsData={topicsData} speakersData={speakersData} sponsorsData={sponsorsData}/>)}

    </div>
  );
}

export default Dash_events;
