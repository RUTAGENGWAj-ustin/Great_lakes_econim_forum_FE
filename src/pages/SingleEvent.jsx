import React, {useState,useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalDataContext } from "../context/GlobalDataContext";
import { Clock } from 'lucide-react';
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline';



const SingleEvent = () => {
  const { eventId } = useParams(); // Extract eventId from the URL
  const { getSingleEvent,backendUrl2, backendUrl,galleryData } = useContext(GlobalDataContext);
  const { data: event, isLoading, error } = getSingleEvent(eventId);
  const [filteredImages, setFilteredImages] = useState(galleryData.filter((img) => img.event._id === eventId));


    // Function to format the date
    function formatDate(dateString) {
        const date = new Date(dateString);
    
        const options = {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
    
        let formattedDate = date.toLocaleString('en-US', options);
        formattedDate = formattedDate.replace(',', '');
    
        return formattedDate;
      }

        // Function to calculate the countdown
  function countdownToDate(targetDate) {
    const target = new Date(targetDate);
    const now = new Date();
    const difference = target - now;

    if (difference <= 0) {
      return "00:00:00:00"; // Event has already started or ended
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0');

    return `${days}:${hours}:${minutes}:${seconds}`;
  }

  const [countdown, setCountdown] = useState(countdownToDate(event?.date));

   useEffect(() => {
      const interval = setInterval(() => {
        const newCountdown = countdownToDate(event.date);
        setCountdown(newCountdown);
  
        // Stop the interval if the countdown reaches "00:00:00:00"
        if (newCountdown === "00:00:00:00") {
          clearInterval(interval);
        }
      }, 1000); // Update every second
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(interval);
    }, [event?.date]);

  if (isLoading) {
    return <div className="text-center text-gray-700 mt-30">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-30">Error: {error.message}</div>;
  }

  if (!event) {
    return <div className="text-center text-gray-700 mt-30">No event data available.</div>;
  }


  return (
    <div className="p-8 bg-gray-50 min-h-screen mt-30">
      {/* Event Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{event.name}</h1>
     
      </div>

      {/* Event Image */}
      <div className="mb-8">
        <img
          src={backendUrl2+event?.imageUrl}
          alt={event?.name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Description and Location */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Event Description</h2>
          <p className="text-gray-700">{event.description}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Location</h2>
          <p className="text-gray-700">{event.location}</p>

          <div className="grid gap-4 grid-cols-2 justify-center">
        {filteredImages?.length > 0 ? (
          filteredImages.map((item, index) => (
            <div key={index} className="max-w-[650px] max-h-[650px]">
              <img src={backendUrl+item.imageUrl} alt={item.event} className="size-full" />
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No images found for this event.</p>
        )}
      </div>
        </div>

        {/* Right Column: Pricing, Speakers, Sponsors, and Topics */}
        <div>

          <ul className="grid gap-2">
              <li className="flex items-center">
                <span>
                  <CalendarDateRangeIcon className="text-green-600 w-8 h-8 mr-3" />
                </span>
                <span className="font-mono">{formatDate(event.date)}</span>
              </li>
              <li className="flex items-center">
                <span>
                  <Clock className="text-red-600 w-8 h-8 mr-3" />
                </span>
                <span className="font-mono text-red-600" >{countdown}</span>
              </li>
              </ul>
          {/* Pricing */}
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
          <div className="space-y-4">
            {event.pricing.map((price) => (
              <div key={price._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{price.type}</h3>
                <p className="text-gray-700">Price: ${price.price}</p>
                <p className="text-gray-700">
                  Benefits: {price.benefits.join(", ")}
                </p>
              </div>
            ))}
          </div>

          {/* Speakers */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Speakers</h2>
          <div className="space-y-2">
            {event.speakers.map((speaker) => (
              <div key={speaker._id} className="text-gray-700">
                {speaker.name}
              </div>
            ))}
          </div>

          {/* Sponsors */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Sponsors</h2>
          <div className="space-y-2">
            {event.sponsors.map((sponsor) => (
              <div key={sponsor._id} className="text-gray-700">
                {sponsor.name}
              </div>
            ))}
          </div>

          {/* Topics */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Topics</h2>
          <div className="space-y-2">
            {event.topics.map((topic) => (
              <div key={topic._id} className="text-gray-700">
                {topic.name || "No topic name available"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;