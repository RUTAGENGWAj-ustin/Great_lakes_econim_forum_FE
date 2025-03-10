import { useState ,useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";


function Gallery() {

  const { galleryData, isLoading, deleteGallery,backendUrl, eventsData } = useContext(GlobalDataContext);
  const [filterEvent, setFilterEvent] = useState(""); // For filtering
  const [filteredImages, setFilteredImages] = useState(galleryData); // Displayed images

  // Function to handle filtering
  const handleFilterChange = (event) => {
    const selectedEvent = event.target.value;
    console.log( "selectedEvent",selectedEvent);
    console.log("galleryData",galleryData);
    
    setFilterEvent(selectedEvent);

    if (selectedEvent === "") {
      setFilteredImages(galleryData); // Show all if no filter selected
    } else {
      setFilteredImages(galleryData.filter((img) => img.event._id === selectedEvent));
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-5 mt-25">
      {/* Dropdown for filtering */}
      <div className="mb-4">
        <select
          className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 rounded"
          value={filterEvent}
          onChange={handleFilterChange}
        >
          <option value="">All Events</option>
              {eventsData?.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
        
        </select>
      </div>

      {/* Display images */}
      <div className="grid gap-4 grid-cols-3 justify-center">
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
  );
}

export default Gallery;
