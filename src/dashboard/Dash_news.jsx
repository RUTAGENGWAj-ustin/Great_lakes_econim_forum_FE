import React,{useState,useContext} from 'react'
import { GlobalDataContext } from "../context/GlobalDataContext";
import CreateNews from './CreateNews';
function Dash_news() {
       const { newsData, isLoading } = useContext(GlobalDataContext);
         const [showModal, setShowModal] = useState(false);
        
          if (isLoading) {
            return <div>Loading events...</div>;
          }
        
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
                {news.image && <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-md" />}
                <h3 className="text-xl font-semibold mt-2">{news.title}</h3>
                <p className="text-gray-700 mt-2">{news.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500 mt-2">By {news.author || "Unknown"} on {new Date(news.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
          {showModal && ( <CreateNews setShowModal={setShowModal} closeModal={() => setShowModal(false)} />)}
        </div>
      );
    }

export default Dash_news