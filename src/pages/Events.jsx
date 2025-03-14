import { useState, useContext, useEffect } from 'react';
import Pagination from '../Pagination';
import { CalendarDateRangeIcon, LockClosedIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { GlobalDataContext } from '../context/GlobalDataContext';
import { Clock, Dot } from 'lucide-react';
import { Link } from 'react-router-dom';

function Events() {
  const { eventsData, isLoading, backendUrl2 } = useContext(GlobalDataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [eventPerpage, setEventPerpage] = useState(10);

  const lastEvent = currentPage * eventPerpage;
  const firstEvent = lastEvent - eventPerpage;
  const currentEvents = eventsData?.slice(firstEvent, lastEvent);

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

  return (
    <div className="mt-30 grid w-full flex justify-center items-center">
      <div className="bg-gray-50 grid w-full flex justify-center items-center">
        <div className="w-fit">
          <h1 className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-green-600 sm:text-5xl">
            <span className="">Events</span>
          </h1>
          <p className="mt-10 max-w-100 text-center">
            Join us for thrilling events! Live music, workshops, art exhibits, and more! Mark your calendars and don't miss out!
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto py-6">
        <div className="grid gap-8 sm:mt-16 lg:grid-cols-2">
          {currentEvents?.map((index) => (
            <EventCard key={index._id} event={index} backendUrl2={backendUrl2} countdownToDate={countdownToDate} formatDate={formatDate} />
          ))}
        </div>
        <div className='mt-10'>

        <Pagination
          totalPage={eventsData?.length}
          eventPerPage={eventPerpage}
          setCurrentPage={setCurrentPage}
          CurrentPage={currentPage}
        />
        </div>
      </div>
    </div>
  );
}

// EventCard Component
function EventCard({ event, backendUrl2 ,countdownToDate,formatDate }) {
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
  }, [event.date]);

  return (
    <Link to={event._id}>
    <div className="max-w-2xl h-full rounded-lg overflow-hidden mb-10 transition delay-150 duration-300 ease-in-out  border-1 border-solid border-gray-300  hover:border-green-300">
      <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
        <div className="absolute inset-x-0 top-0 bottom-2 overflow-hidden rounded shadow-1xl">
          <img
            className="size-full object-cover object-top"
            src={backendUrl2 + event.imageUrl}
            alt={event._id}
          />
        </div>
      </div>

      <div className="px-0 py-4 pl-2">
        <div className="grid items-center justify-between">
          <div className="font-bold text-xl mb-2">{event.name}</div>
          <div className="flex gap-10 mt-5 mb-5">
            <div className="bg-green-600 text-white pt-1 pb-1 pl-3 pr-3 rounded-2xl font-mono h-fit">
              {event.category.name}
            </div>
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
              <li className="flex items-center">
                <span>
                  <MapPinIcon className="text-green-600 w-8 h-8 mr-3" />
                </span>
                <span className="font-mono max-w-fit">{event.location}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="w-fit">
            <div className="font-bold text-xl mb-2">Prices</div>
            <div className="flex">
              {event.pricing?.map((price) => (
                <div className="border-r border-gray-200 rounded-tr-2xl">
                  <div className="bg-red-600 text-white pt-1 pb-1 pl-3 pr-3 ml-1 mb-2 rounded-tr-2xl max-w-fit max-h-fit">
                    <span>{price.type}: </span>Rwf <span>{price.price}</span>
                  </div>
                  <div className="grid">
                    <ul>
                      {price.benefits?.map((benefit) => (
                        <li className="flex">
                          <span>
                            <Dot />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-base mt-3">{event.description}</p>
      </div>
    </div>
    </Link>
  );
}

export default Events;