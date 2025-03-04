
import React, {useState,useContext} from 'react';
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateSponsor from './CreateSponsor';
function Dash_sponsors() {
     const { sponsorsData, isLoading } = useContext(GlobalDataContext);
      const [showModal, setShowModal] = useState(false);
    
      if (isLoading) {
        return <div>Loading events...</div>;
      }
    
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sponsorsData?.map((sponsor) => (
              <div key={sponsor._id} className="bg-white p-4 rounded-lg shadow-md text-center">
                {sponsor.logo && <img src={sponsor.logo} alt={sponsor.name} className="w-full h-32 object-contain mb-2" />}
                <h3 className="text-xl font-semibold">{sponsor.name}</h3>
                {sponsor.website && (
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Visit Website
                  </a>
                )}
                <p className="text-gray-700 mt-2">{sponsor.description}</p>
              </div>
            ))}
          </div>
          {showModal && ( <CreateSponsor setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}

        </div>
      );
    }

export default Dash_sponsors