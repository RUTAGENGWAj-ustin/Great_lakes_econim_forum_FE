import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay,EffectCoverflow } from 'swiper/modules';

const event = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
]

const event2 = [
  { description: 'A premier platform for business leaders, policymakers, and innovators to collaborate, strengthen trade, and foster sustainable economic growth in the Great Lakes region.', title: 'Connecting Leaders. Driving Growth. Shaping the Future.', img:'/speakers/kigali.jpg' },
  { description: 'A premier platform for business leaders, policymakers, and innovators to collaborate, strengthen trade, and foster sustainable economic growth in the Great Lakes region.', title: 'Connecting Leaders. Driving Growth. Shaping the Future.', img:'/speakers/intare.jpg' },
  { description: 'A premier platform for business leaders, policymakers, and innovators to collaborate, strengthen trade, and foster sustainable economic growth in the Great Lakes region.', title: 'Connecting Leaders. Driving Growth. Shaping the Future.', img:'/speakers/arena.jpg' },
  { description: 'A premier platform for business leaders, policymakers, and innovators to collaborate, strengthen trade, and foster sustainable economic growth in the Great Lakes region.', title: 'Connecting Leaders. Driving Growth. Shaping the Future.', img:'/speakers/kigali.jpg' },
  { description: 'A premier platform for business leaders, policymakers, and innovators to collaborate, strengthen trade, and foster sustainable economic growth in the Great Lakes region.', title: 'Connecting Leaders. Driving Growth. Shaping the Future.', img:'/speakers/kigali.jpg' },
  
 
]

const event3 = [
  { name: 'Dave janny',title: 'Analytics', description: 'Get a better understanding of your traffic At Analyst, we publish both primary research and review articles, ensuring a comprehensive coverage of significant advancements in analytical measurement .. At Analyst, we publish both primary research and review articles, ensuring a comprehensive coverage of significant advancements in analytical measurement ..', href: '#', img:'/speakers/artist1.jpg' },
  { name: 'Trevor Noah',title: 'Comedian', description: 'Trevor Noah is a South African comedian, writer, producer, political commentator, actor, and television host. He was the host of The Daily Show, an American late-night talk show and satirical news program on Comedy Central, from 2015 to 2022. Noah has won various awards, including two Primetime Emmy Awards.', href: '#', img:'/speakers/artist2.jpg' },
  { name: 'Diamond platnumz',title: 'Music Artist', description: 'Naseeb Abdul Juma Issack, professionally known as Diamond Platnumz, is a Tanzanian bongo flava recording artist, dancer, philanthropist and businessman. He is the founder and CEO of WCB Wasafi Record Label, Wasafi Bet and Wasafi Media. Diamond has gained a massive following in East and Central Africa. ', href: '#', img:'/speakers/artist3.webp' },
  { name: 'Dave janny',title: 'Analytics', description: 'Get a better understanding of your traffic At Analyst, we publish both primary research and review articles, ensuring a comprehensive coverage of significant advancements in analytical measurement .. At Analyst, we publish both primary research and review articles, ensuring a comprehensive coverage of significant advancements in analytical measurement ..', href: '#', img:'/speakers/artist1.jpg' },
  { name: 'Trevor Noah',title: 'Comedian', description: 'Trevor Noah is a South African comedian, writer, producer, political commentator, actor, and television host. He was the host of The Daily Show, an American late-night talk show and satirical news program on Comedy Central, from 2015 to 2022. Noah has won various awards, including two Primetime Emmy Awards.', href: '#', img:'/speakers/artist2.jpg' },
  { name: 'Diamond platnumz',title: 'Music Artist', description: 'Naseeb Abdul Juma Issack, professionally known as Diamond Platnumz, is a Tanzanian bongo flava recording artist, dancer, philanthropist and businessman. He is the founder and CEO of WCB Wasafi Record Label, Wasafi Bet and Wasafi Media. Diamond has gained a massive following in East and Central Africa. ', href: '#', img:'/speakers/artist3.webp' },
 
]

function Home() {

  
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
        {event2.map((index) => (
          <SwiperSlide key={index}>
     
                  <div 
                   className="h-screen max-w-full bg-black/40 bg-blend-multiply bg-center bg-cover bg-no-repeat mb-10"
                   style={{ backgroundImage: `url(${index.img})` }}
                   >
                    <div className="grid justfy-center items-center gap-4">
                      <div className="p-7"> 
                      <div className="w-inherted mt-15 flex justify-center items-center">
                    <h1 className="text-white text-center font-bold text-5xl max-w-lg ">{index.title}</h1>
                  </div>
                  <div className="w-inherted  mt-10 flex justify-center items-center">
                    <p className="mt-3 mr-10 text-center text-2xl max-w-3xl text-white">
                   {index.description}
                    </p>
                    </div>
                    <div className="w-inherted mt-10 flex justify-center items-center">
                    <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                    Subscribe to a newsletter
                  </button>
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
        {event.map((index) => (
          <SwiperSlide key={index}>
     
                    <div class="max-w-2xl rounded-lg overflow-hidden shadow-lg mb-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-90">
                      <img class="w-full rounded-lg" src={index.img} alt="Sunset in the mountains"/>
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{index.name}</div>
                        <p class="text-gray-700 text-base">
                          {index.description}
                        </p>
                      </div>
                      <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                      </div>
                    </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-10'>
      <div className=" hidden lg:flex lg:flex-1 lg:justify-center">
        <a href="#" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
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
        {event3.map((index) => (
          <SwiperSlide key={index}>
     
                    <div class="max-w-2xl rounded-lg overflow-hidden shadow-lg mb-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-90">
                      <img class="w-full rounded-lg h-80" src={index.img} alt="Sunset in the mountains"/>
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{index.name}</div>
                        <div class="font-bold text-xl mb-2">{index.title}</div>
                        <div className="max-h-30">
                        <p class="text-gray-700 text-base max-h-20 overflow-hidden text-ellipsis">
                          {index.description}
                        </p>
                        </div>
                      </div>
                      <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                      </div>
                    </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='mt-10'>
      <div className=" hidden lg:flex lg:flex-1 lg:justify-center">
        <a href="#" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
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
        slidesPerView={true}
        grabCursor = {true}
        centeredSlides={true}
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
        {event3.map((index) => (
          <SwiperSlide key={index}>
     
                    <div class="bg-white relative max-w-2xl rounded-lg overflow-hidden shadow-lg mb-10 transition delay-150 duration-300 ease-in-out">
                      <img class="w-full rounded-lg h-80" src={index.img} alt="Sunset in the mountains"/>
                      <div class=" px-6 py-4">
                        <div class="font-bold text-xl mb-2">{index.name}</div>
                        <div class="font-bold text-xl mb-2">{index.title}</div>
                        <div className="max-h-30">
                        <p class="text-gray-700 text-base max-h-20 overflow-hidden text-ellipsis">
                          {index.description}
                        </p>
                        </div>
                      </div>
                      <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
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
        <a href="#" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
          News & Blogs <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      </div>
    </div>
    </div>
      </div>
    
    </div> ;
  }
  
  export default Home;