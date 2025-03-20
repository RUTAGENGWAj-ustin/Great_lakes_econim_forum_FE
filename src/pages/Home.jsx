import { useState,useContext,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay,EffectCoverflow } from 'swiper/modules';
import { CalendarDateRangeIcon, LockClosedIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { GlobalDataContext } from '../context/GlobalDataContext';
import { Clock, Dot } from 'lucide-react';


function Home() {
  const { eventsData, isLoading, backendUrl2,speakersData,backendUrl,newsData,advertData } = useContext(GlobalDataContext);

  const upcomingEvents = eventsData?.filter((event) => new Date(event.date) > new Date());
  const upcomingNews = newsData?.filter((news) => new Date(news.date) > new Date());

    // Function to get random speakers
    function getRandomSpeakers(speakers, count = 5) {
      // Fisher-Yates shuffle algorithm
      const shuffledSpeakers = [...speakersData];
      for (let i = shuffledSpeakers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSpeakers[i], shuffledSpeakers[j]] = [shuffledSpeakers[j], shuffledSpeakers[i]];
      }
  
      // Return the first `count` speakers
      return shuffledSpeakers.slice(0, count);
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
  
    return <div className="max-w-full mt-25">
            <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        // breakpoints={{
        //   640: { slidesPerView: 2 },
        //   768: { slidesPerView: 3 },
        //   1024: { slidesPerView: 4 },
        // }}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: true }}
        loop
      >
        {advertData?.map((advert) => (
          <SwiperSlide key={advert._id}>
     
                      <div 
                    className="h-screen max-w-full bg-black/40 bg-blend-multiply bg-center bg-cover bg-no-repeat mb-10 grid justify-center items-center"
                    style={{ backgroundImage: `url(${`${backendUrl2}${advert.image}`})` }}
                  >
                    <div className="grid justify-center items-center gap-4">
                      <div className="p-7"> 
                        <div className="w-full mt-15 flex justify-center items-center">
                          <h1 className="text-white text-center font-bold text-3xl sm:text-4xl md:text-5xl max-w-lg">
                            {advert.title}
                          </h1>
                        </div>
                        <div className="w-full mt-10 flex justify-center items-center">
                          <p className="mt-3 mx-4 sm:mx-10 text-center text-lg sm:text-xl md:text-2xl max-w-3xl text-white">
                            {advert.description}
                          </p>
                        </div>
                        <div className="w-full mt-10 flex justify-center items-center">
                          <a
                            href={advert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                          >
                            Continue
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
          </SwiperSlide>
        ))}
      </Swiper>
   

      {/* //event and summit */}

      <div className="max-w-full mt-20">
      <div className="flex justify-center items-center">
      <div className="p-7 justify-center items-center">
        <div className="w-fit">
      <h1 className="w-fit  font-bold text-5xl text-green-900">Events & Summits</h1>
      <p className="mt-3 mr-10 max-w-100 text-center">
      Explore key gatherings that bring together leaders, innovators, and policymakers to shape the future of the Great Lakes economy.
      </p>
      </div>
      </div>
      </div>

      <div className="mt-20 grid w-full flex justify-center items-center">
        <div className='grid w-full flex justify-center items-center'>
          <div className='w-fit'>
          <h1 className='text-3xl text-center text-green-900 font-bold'>Upcoming <span className='text-green-600'>Event</span></h1>

          <p className='mt-10 max-w-100 text-center'>Join us for thrilling events! Live music, workshops, art exhibits, and more! Mark your calendars and don't miss out!</p>
          </div>
        </div>

      <div className="w-full max-w-7xl mx-auto py-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        // breakpoints={{
        //   640: { slidesPerView: 2 },
        //   768: { slidesPerView: 3 },
        //   1024: { slidesPerView: 4 },
        // }}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        loop
      >
        {upcomingEvents?.map((index) => (
          <SwiperSlide key={index}>
     
               <EventCard key={index._id} event={index} backendUrl2={backendUrl2} countdownToDate={countdownToDate} formatDate={formatDate} />

          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-10'>
      <div className=" hidden lg:flex lg:flex-1 lg:justify-center">
        <a href="/events" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
          All Events <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      </div>
    </div>
      </div>
      </div>

      <div className="mt-20 grid w-full flex justify-center items-center">
        <div className='grid w-full flex justify-center items-center'>
          <div className='w-fit'>
          <h1 className='text-3xl text-center text-green-900 font-bold'>Best Speakers <span className='text-green-600'>and</span> Artist</h1>

          <p className='mt-10 max-w-100 text-center'>Join us for thrilling events! Live music, workshops, art exhibits, and more! Mark your calendars and don't miss out!</p>
          </div>
        </div>

      <div className="w-full max-w-7xl mx-auto py-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        // breakpoints={{
        //   640: { slidesPerView: 2 },
        //   768: { slidesPerView: 3 },
        //   1024: { slidesPerView: 4 },
        // }}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: true }}
        loop
      >
        {speakersData?.map((index) => (
          <SwiperSlide key={index}>
     
                    <div class="max-w-2xl rounded-lg overflow-hidden shadow-lg mb-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-90">
                      <img class="w-full rounded-lg h-80" src={backendUrl+index.image} alt="Sunset in the mountains"/>
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Name :{index.name}</div>
                        <div class="font-bold text-xl mb-2">Experet in {index.expertise}</div>
                        <div className="max-h-30">
                        <p className='font-bold text-xl mb-2'>Biography:</p>
                        <p class="text-gray-700 text-base max-h-20 overflow-hidden text-ellipsis">
                          {index.bio}
                        </p>
                        </div>
                      </div>
                    
                    </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-10'>
      <div className=" hidden lg:flex lg:flex-1 lg:justify-center">
        <a href="/speakers" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
          All Speakers <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      </div>
    </div>
    <div className="max-h-500">
    <div className='grid w-full flex justify-center items-center'>
          <div className='w-fit'>
          <h1 className='text-3xl text-center text-green-900 font-bold'>LATEST <span className='text-green-600'>NEWS</span></h1>

          <p className='mt-10 max-w-100 text-center'>Join us for thrilling events! Live music, workshops, art exhibits, and more! Mark your calendars and don't miss out!</p>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto py-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay,EffectCoverflow]}
        // spaceBetween={20}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0, // Tilt angle
          stretch: 0, // Space between slides
          depth: 70, // Depth effect
          modifier: 2.5, // Effect intensity
          slideShadows: false, // Enable shadows
        }}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: true }}
        loop

    
      >
        {newsData?.map((index) => (
          <SwiperSlide key={index}>
     
                    <div class="bg-white relative max-w-3xl rounded-lg overflow-hidden shadow-lg mb-10 transition delay-150 duration-300 ease-in-out">
                      <img class="w-full rounded-lg h-100" src={backendUrl+index.image} alt="Sunset in the mountains"/>
                      <div class=" px-6 py-4">
                        <div class="text-xl mb-2"><span className='font-sembold'>Author: </span><span className='font-bold'>{index.title}</span></div>
                        <div class=" text-xl mb-2"><span className='font-sembold'>Author: </span><span className='font-bold'>{index.author}</span></div>
                        <div class="text-xl mb-2"><span className='font-sembold'>Date : </span><span className='font-bold'>{formatDate(index.date)}</span></div>
                        
                        <div className="max-h-30">
                        <p class="text-gray-700 text-base max-h-20 overflow-hidden text-ellipsis">
                          {index.content}
                        </p>
                        </div>
                      </div>
                     
                    </div>
          </SwiperSlide>
        ))}
        {/* <div className="swiper-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div> */}
      </Swiper>
      <div className='mt-10'>
      <div className=" hidden lg:flex lg:flex-1 lg:justify-center">
        <a href="/news" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
          News & Blogs <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      </div>
    </div>
    </div>
      </div>
    
    </div> ;
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
    <div className="max-w-2xl rounded-lg overflow-hidden mb-10 transition delay-150 duration-300 ease-in-out">
      <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
        <div className="absolute inset-x-0 top-0 bottom-2 overflow-hidden rounded shadow-1xl">
          <img
            className="size-full object-cover object-top"
            src={backendUrl2 + event.imageUrl}
            alt={event._id}
          />
        </div>
      </div>

      <div className="px-0 py-4">
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
                  {/* <div className="grid">
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
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-base mt-3">{event.description}</p>
      </div>
    </div>
  );
}
  
  export default Home;