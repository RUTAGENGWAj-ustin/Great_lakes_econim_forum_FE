import React,{ useEffect, useState, useContext } from 'react'
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateGallery from './CreateGallery';
import CreateCategory from './CreateCategory';
import { PenLineIcon, Trash2 } from "lucide-react";
import EditCategory from './EditCategory';
import Notiflix from 'notiflix';

function Dash_category() {
    const { categoryData, isLoading,deleteCategory,putCategory } = useContext(GlobalDataContext);
    const [showModal, setShowModal] = useState(false);
    const [editshowModal,seteditShowModal] = useState(false);
    const [selectedCategoryId,setselectedCategoryId] = useState(null);
   
     if (isLoading) {
       return <div>Loading events...</div>;
     }

     const handleEditcategory = (category) => {
      setselectedCategoryId(category); // Set the event to edit
      seteditShowModal(true); // Open the edit modal
    };

     const refreshCategories = () => {
        window.location.reload();
    };

     const handleDeleteCategory = async (CategoryId) => {
           
           // Show confirmation dialog
           Notiflix.Confirm.show(
             'Delete Category',
             'Are you sure you want to delete this Category?',
             'Yes',
             'No',
             async () => {
               try {
                 // Call deleteEvent from context
                 await deleteCategory(CategoryId);
       
                 // Show success notification
                 Notiflix.Notify.success('Category deleted successfully!');
               } catch (error) {
                 console.error('Error deleting Category:', error);
       
                 // Show error notification
                 Notiflix.Notify.failure(error.message || 'Error deleting Category');
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
             <div key={item._id} className="bg-white p-4 rounded-lg shadow-md max-h-60 grid grid-cols content-between">
              
               <h2 className="mt-2 text-gray-700 text-center font-bold text-20">{item.name}</h2>
               <p className='container mx-auto px-4 max-h-35 overflow-hidden text-ellipsis'>{item.description}</p>
               <data value={item.createdAt}/>
               <div className="w-full flex justify-center p-2">
                <div className=' border-t-1 border-gray-300 min-w-30 p-3 flex justify-between'>
                  <button className="text-green-600" onClick={() => handleEditcategory(item)}><PenLineIcon size={20}/></button>
                  <button className="text-red-600" onClick={() => handleDeleteCategory(item._id)}><Trash2 size={20}/></button>
                  </div>
                </div>
             </div>
           ))}
         </div>
         {showModal && ( <CreateCategory setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
         {editshowModal && ( <EditCategory
  category={selectedCategoryId}
  setShowModal={seteditShowModal}
  refreshCategories={refreshCategories}
  putCategory={putCategory}
/>)}
       </div>
     );
   }
export default Dash_category