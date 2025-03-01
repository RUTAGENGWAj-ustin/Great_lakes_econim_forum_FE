import React, {useContext}from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";

function Dash_events() {
  // Consume the eventsData from context
  const { eventsData, isLoading, hasError } = useContext(GlobalDataContext);
   console.log("event:",eventsData);
   

  // If the data is still loading or there's an error, show loading state or error message
  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (hasError) {
    return <div>Error loading events.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Events List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Topics</th>
              <th className="p-3 text-left">Speakers</th>
              <th className="p-3 text-left">Sponsors</th>
            </tr>
          </thead>
          <tbody>
            {eventsData?.map((event) => (
              <tr key={event._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{event?.name}</td>
                <td className="p-3">{new Date(event?.date).toLocaleDateString()}</td>
                <td className="p-3">{event?.location}</td>
                <td className="p-3">{event?.topics?.map(topic => topic.name).join(", ") || "N/A"}</td>
                <td className="p-3">{event?.speakers?.map(speaker => speaker.name).join(", ") || "N/A"}</td>
                <td className="p-3">{event?.sponsors?.map(sponsor => sponsor.name).join(", ") || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dash_events;
