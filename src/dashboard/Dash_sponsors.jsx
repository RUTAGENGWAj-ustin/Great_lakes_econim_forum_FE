
import React, {useState,useContext} from 'react';
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateSponsor from './CreateSponsor';
import { PenLineIcon, Trash2 } from "lucide-react";
import EditSponsor from './EditSponsor';
import Notiflix from 'notiflix';

function Dash_sponsors() {
     const { sponsorsData, isLoading,deleteSponsor,backendUrl } = useContext(GlobalDataContext);
      const [showModal, setShowModal] = useState(false);

      const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
    
      if (isLoading) {
        return <div>Loading events...</div>;
      }

      const refreshSponsors = () => {
          window.location.reload();
        // Fetch or update sponsors logic here
      };

      const handleEditSponsor = (sponsor) => {
        setSelectedSponsor(sponsor); // Set the sponsor to edit
        setShowEditModal(true); // Open the edit modal
      };

      const handleDeletesponsor = async (sponsorId) => {
                  
                  // Show confirmation dialog
                  Notiflix.Confirm.show(
                    'Delete Sponsor',
                    'Are you sure you want to delete this Sponsor?',
                    'Yes',
                    'No',
                    async () => {
                      try {
                        // Call deleteEvent from context
                        await deleteSponsor(sponsorId);
              
                        // Show success notification
                        Notiflix.Notify.success('Sponsor deleted successfully!');
                      } catch (error) {
                        console.error('Error deleting Sponsor:', error);
              
                        // Show error notification
                        Notiflix.Notify.failure(error.message || 'Error deleting Sponsor');
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
          <h2 className="text-3xl font-bold text-center mb-6">Our Sponsors</h2>
        
        {/* Button to open modal */}
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
        Add Sponsor
        </button>
      </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorsData?.map((sponsor) => (
              <div key={sponsor._id} className="bg-white p-4 rounded-lg shadow-md grid grid-cols content-between">
                {sponsor.logo && <img src={backendUrl+sponsor.logo} alt={sponsor.name} className="w-full h-48 object-cover rounded-md" />}
                <h3 className="text-xl font-semibold">{sponsor.name}</h3>
                {sponsor.website && (
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Visit Website
                  </a>
                )}
                <p className="text-gray-700 mt-2">{sponsor.description}</p>
                <div className="w-full flex justify-center p-2">
                  <div className=' border-t-1 border-gray-300 min-w-30 p-3 flex justify-between'>
                    <button className="text-green-600" onClick={() => handleEditSponsor(sponsor)}><PenLineIcon size={20}/></button> 
                    <button className="text-red-600" onClick={() => handleDeletesponsor(sponsor._id)}><Trash2 size={20}/></button>
                    </div>
                    </div>
                
              </div>
            ))}
          </div>
          {showModal && ( <CreateSponsor setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
          {showEditModal && (
        <EditSponsor
          sponsor={selectedSponsor}
          setShowModal={setShowEditModal}
          refreshSponsors={refreshSponsors}
        />
      )}

        </div>
      );
    }

export default Dash_sponsors