import { useState } from "react";

const images = [
  { event: "concert", imgUrl: "/speakers/kigali.jpg" },
  { event: "conference", imgUrl: "/speakers/intare.jpg" },
  { event: "concert", imgUrl: "/speakers/meddy.jpg" },
  { event: "party", imgUrl: "/speakers/arena.jpg" },
];

function Gallery() {
  const [filterEvent, setFilterEvent] = useState(""); // For filtering
  const [filteredImages, setFilteredImages] = useState(images); // Displayed images

  // Function to handle filtering
  const handleFilterChange = (event) => {
    const selectedEvent = event.target.value;
    setFilterEvent(selectedEvent);

    if (selectedEvent === "") {
      setFilteredImages(images); // Show all if no filter selected
    } else {
      setFilteredImages(images.filter((img) => img.event === selectedEvent));
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
          <option value="concert">Concert</option>
          <option value="conference">Conference</option>
          <option value="party">Party</option>
        </select>
      </div>

      {/* Display images */}
      <div className="grid gap-4 grid-cols-3 justify-center">
        {filteredImages.length > 0 ? (
          filteredImages.map((item, index) => (
            <div key={index} className="max-w-[650px] max-h-[650px]">
              <img src={item.imgUrl} alt={item.event} className="size-full" />
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
