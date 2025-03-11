// News.js
import React, { useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";

const News = () => {
  const { newsData,backendUrl,backendUrl2, } = useContext(GlobalDataContext);

  return (
    <div className="p-4 bg-gray-50 mt-25 w-full grid justify-center">
      
      <div className="bg-gray-50 grid  flex justify-center items-center mb-20">
        <div className="w-fit">
          <h1 className="text-4xl text-center text-green-900 font-semibold">
            <span className="text-green-600 text-4xl">News & Updates</span>
          </h1>
        </div>
      </div>
      <div className="space-y-4 grid gap-2 mr-20 ml-20">
        {newsData?.length > 0 ? (
          newsData?.map((news) => (
            <div
              key={news._id}
              className="grid grid-cols-2 grid-rows-1 gap-4 px-4/5 bg-white"
            >
              {/* Image on the left */}
              <div>

              {news.image && (
                <img
                  src={backendUrl+news.image}
                  alt={news.title}
                  className="size-full object-cover flex-shrink-0"
                />
              )}
              </div>
             
              {/* Content on the right */}
              <div className="">
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