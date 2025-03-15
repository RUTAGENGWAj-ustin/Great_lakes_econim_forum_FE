import React,{useState,useContext} from 'react'
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateNews from './CreateNews';
import EditNews from './EditNews';
import { PenLineIcon, Trash2 } from "lucide-react";
import Notiflix from 'notiflix';


function Dash_news() {
       const { newsData, isLoading , deleteNews,putNews ,backendUrl } = useContext(GlobalDataContext);
       const [showModal, setShowModal] = useState(false);
       const [showEditModal, setShowEditModal] = useState(false);
       const [selectedNews, setSelectedNews] = useState(null);
        
          if (isLoading) {
            return <div>Loading events...</div>;
          }
          const refreshNews = () => {
              window.location.reload();
            // Fetch or update news logic here
          };

          const handleEditNews = (news) => {
            setSelectedNews(news); // Set the news to edit
            setShowEditModal(true); // Open the edit modal
          };

          const handleDeleteNews = async (NewsId) => {
                      
                      // Show confirmation dialog
                      Notiflix.Confirm.show(
                        'Delete News',
                        'Are you sure you want to delete this News?',
                        'Yes',
                        'No',
                        async () => {
                          try {
                            // Call deleteEvent from context
                            await deleteNews(NewsId);
                  
                            // Show success notification
                            Notiflix.Notify.success('News deleted successfully!');
                          } catch (error) {
                            console.error('Error deleting event:', error);
                  
                            // Show error notification
                            Notiflix.Notify.failure(error.message || 'Error deleting News');
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
          <h2 className="text-3xl font-bold text-center mb-6">Latest News</h2>
        
        {/* Button to open modal */}
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
        Create News
        </button>
      </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData?.map((news) => (
              <div key={news._id} className="bg-white p-4 rounded-lg shadow-md">
                {news.image && <img src={backendUrl+news.image} alt={news.title} className="w-full h-48 object-cover rounded-md" />}
                <h3 className="text-xl font-semibold mt-2">{news.title}</h3>
                <p className="text-gray-700 mt-2">{news.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500 mt-2">By {news.author || "Unknown"} on {new Date(news.date).toLocaleDateString()}</p>
               <div className="w-full flex justify-center p-2">
                <div className=' border-t-1 border-gray-300 min-w-30 p-3 flex justify-between'>
                  <button className="text-green-600" onClick={() => handleEditNews(news)}><PenLineIcon size={20}/></button>
                   <button className="text-red-600" onClick={() => handleDeleteNews(news._id)}><Trash2 size={20}/></button>
                   </div>
                   </div>

              </div>
            ))}
          </div>
          {showModal && ( <CreateNews setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
          {showEditModal && (
        <EditNews
          news={selectedNews}
          setShowModal={setShowEditModal}
          refreshNews={refreshNews}
          putNews={putNews}
        />
      )}
        </div>
      );
    }

export default Dash_news