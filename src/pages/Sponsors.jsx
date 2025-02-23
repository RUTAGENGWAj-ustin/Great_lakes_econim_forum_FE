
import { useState } from "react";

const images = [
  { event: "concert", imgUrl: "/speakers/brarirwa.png" },
  { event: "conference", imgUrl: "/speakers/mtn.jfif" },
  { event: "concert", imgUrl: "/speakers/fortbet.jfif" },
  { event: "party", imgUrl: "/speakers/arena.jpg" },
  { event: "concert", imgUrl: "/speakers/brarirwa.png" },
  { event: "conference", imgUrl: "/speakers/mtn.jfif" },
  { event: "concert", imgUrl: "/speakers/fortbet.jfif" },
  { event: "party", imgUrl: "/speakers/arena.jpg" },
  { event: "concert", imgUrl: "/speakers/brarirwa.png" },
  { event: "conference", imgUrl: "/speakers/mtn.jfif" },
  { event: "concert", imgUrl: "/speakers/fortbet.jfif" },
  { event: "party", imgUrl: "/speakers/arena.jpg" },
  { event: "concert", imgUrl: "/speakers/brarirwa.png" },
  { event: "conference", imgUrl: "/speakers/mtn.jfif" },
  { event: "concert", imgUrl: "/speakers/fortbet.jfif" },
  { event: "party", imgUrl: "/speakers/arena.jpg" },
];

function Sponsors() {

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
    return    <div className="w-full flex flex-col items-center p-5 mt-30">
    {/* Dropdown for filtering */}
    <div className="mb-4">
     <div className="w-fit"><div> <h1 className="text-center font-semibold text-green-600 text-5xl max-w-lg ">Sponsers and Partner</h1></div></div>
    </div>

    {/* Display images */}
    <div className="grid gap-4 grid-cols-5 justify-center">
      {filteredImages.length > 0 ? (
        filteredImages.map((item, index) => (
          <div key={index} className="max-w-[650px] max-h-[650px] shadow-1xl">
            <img src={item.imgUrl} alt={item.event} className="h-40 w-full shadow-1xl" />
          </div>
        ))
      ) : (
        <p className="text-center col-span-3">No images found for this event.</p>
      )}
    </div>
  </div>;
  }
  
  export default Sponsors;
  