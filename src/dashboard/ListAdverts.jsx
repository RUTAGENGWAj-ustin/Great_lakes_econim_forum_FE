import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
// import { useGlobalData } from "../context/GlobalDataContext";
import { GlobalDataContext } from "../context/GlobalDataContext";
import PostAdvert from "./PostAdvert";
import PutAdvert from "./PutAdvert";
import { DeleteIcon, PenLineIcon, Trash2 } from "lucide-react";

const ListAdverts = () => {
  const { advertData, deleteAdvert,backendUrl2 } = useContext(GlobalDataContext);

      const [showModal, setShowModal] = useState(false);
       const [showEditModal, setShowEditModal] = useState(false);
       const [selectedAdvert, setSelectedAdvert] = useState(null);
     console.log("aaaaaaaaaaaaaaaaa:",advertData);
     
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
    <div className="container mx-auto p-6">
          <div className="flex justify-between p-2">
          <h2 className="text-3xl font-bold text-center mb-6">Adverts</h2>
        
        {/* Button to open modal */}
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
         Add New Advert
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {advertData?.map((advert) => (
          <div key={advert._id} className="h-90/100 max-w-full bg-black/40 bg-blend-multiply bg-center bg-cover bg-no-repeat mb-10 grid justfy-center items-center"
          style={{ backgroundImage: `url(${`${backendUrl2}${advert.image}`})` }}>
                  <div className="grid justfy-center items-center gap-4">
                      <div className="p-7"> 
                      <div className="w-inherted mt-15 flex justify-center items-center">
                    <h1 className="text-white text-center font-bold text-5xl max-w-lg ">{advert.title}</h1>
                  </div>
                  <div className="w-inherted  mt-10 flex justify-center items-center">
                    <p className="mt-3 mr-10 text-center text-2xl max-w-3xl text-white">
                   {advert.description}
                    </p>
                    </div>
                    <div className="w-inherted mt-10 flex justify-center items-center">
                    <a
              href={advert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Continue
            </a>
                  </div>
                    </div>
                    </div>
          
            <div className="mt-4 flex space-x-2">
            <div className="w-full flex justify-center p-2">
                  <div className=' border-1 border-green-300 bg-white min-w-30 p-3 flex justify-between rounded'>
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
          advert={selectedAdvert}
          setShowModal={setShowEditModal}
          refreshNews={refreshGallery}
        />)}
    </div>
  );
};

export default ListAdverts;