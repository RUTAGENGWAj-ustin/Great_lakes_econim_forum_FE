import React,{ useEffect, useState, useContext } from 'react'
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateGallery from './CreateGallery';
import CreateCategory from './CreateCategory';

function Dash_category() {
    const { categoryData, isLoading } = useContext(GlobalDataContext);
    const [showModal, setShowModal] = useState(false);
   
     if (isLoading) {
       return <div>Loading events...</div>;
     }

    
   
     return (
       <div className="container mx-auto p-6">
         <div className="flex justify-between p-2">
         <h2 className="text-3xl font-bold text-center mb-6">Category</h2>
       
       {/* Button to open modal */}
       <button 
         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
         onClick={() => setShowModal(true)}
       >
         Create New Category
       </button>
     </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {categoryData.map((item) => (
             <div key={item._id} className="bg-white p-4 rounded-lg shadow-md max-h-50">
              
               <h2 className="mt-2 text-gray-700 text-center font-bold text-20">{item.name}</h2>
               <p className='container mx-auto px-4 max-h-35 overflow-hidden text-ellipsis'>{item.description}</p>
               <data value={item.createdAt}/>
        
             </div>
           ))}
         </div>
         {showModal && ( <CreateCategory setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
       </div>
     );
   }
export default Dash_category