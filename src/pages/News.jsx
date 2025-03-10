// News.js
import React, { useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";

const News = () => {
  const { newsData,backendUrl,backendUrl2, } = useContext(GlobalDataContext);

  return (
    <div className="p-4 mt-25">
      
      <div className="bg-white grid w-full flex justify-center items-center mb-20">
        <div className="w-fit">
          <h1 className="text-4xl text-center text-green-900 font-semibold">
            <span className="text-green-600 text-4xl">News & Updates</span>
          </h1>
        </div>
      </div>
      <div className="space-y-4 grid grid-cols-1  md:grid-cols-2 gap-2 ">
        {newsData.length > 0 ? (
          newsData.map((news) => (
            <div
              key={news._id}
              className="flex bg-white rounded-lg shadow-md overflow-hidden h-70"
            >
              {/* Image on the left */}
              {news.image && (
                <img
                  src={backendUrl+news.image}
                  alt={news.title}
                  className="size-70 object-cover flex-shrink-0"
                />
              )}
              {/* Content on the right */}
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold"><span>Title: </span> {" "}{news.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-3">{news.content}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <span>By {news.author}</span> |{" "}
                  <span>{new Date(news.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available.</p>
        )}
      </div>
    </div>
  );
};

export default News;