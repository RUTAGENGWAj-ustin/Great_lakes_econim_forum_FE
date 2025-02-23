
import { useState } from 'react';
import Pagination from '../Pagination';
import { CalendarDateRangeIcon, LockClosedIcon, MapPinIcon } from '@heroicons/react/24/outline';

const event = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secuYour customers’ data will be safe and securYour customers’ data will be safe and secueYour customers’ data will be safe and secu', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', img:'/speakers/meddy.jpg' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', img:'/speakers/meddy.jpg' },
]

function Events() {
const [currentPage,setCurrentPage] = useState(1);
const [eventPerpage,setEventPerpage] = useState(10);

const lastEvent = currentPage*eventPerpage;
const firstEvent = lastEvent - eventPerpage;
const currentEvents = event.slice(firstEvent,lastEvent);



    return <div className="mt-30 grid w-full flex justify-center items-center">
    <div className='bg-white grid w-full flex justify-center items-center'>
      <div className='w-fit'>
      <h1 className='text-4xl text-center text-green-900 font-semibold '><span className='text-green-600 text-4xl'>Events</span></h1>

      <p className='mt-10 max-w-100 text-center'>Join us for thrilling events! Live music, workshops, art exhibits, and more! Mark your calendars and don't miss out!</p>
      </div>
    </div>

  <div className="w-full max-w-7xl mx-auto py-6">
    <div className='grid gap-8 sm:mt-16 lg:grid-cols-2'>
    {currentEvents.map((index) => (
 
                <div class="max-w-2xl rounded-lg overflow-hidden  mb-10 transition delay-150 duration-300 ease-in-out">
                  <img class="w-full rounded-lg" src={index.img} alt="Sunset in the mountains"/>
                  <div className='flex justify-end'>
                  <div className='bg-green-600 text-white pt-1 pb-1 pl-3 pr-3 ml-20 -mt-5 rounded-tr-2xl max-w-fit max-h-fit'>Rwf <span>30,000</span>
                  </div>
                  </div>
                  <div class="px-0 py-4">
                    <div class="grid items-center justify-between">
                      <div class="font-bold text-xl mb-2">{index.name}</div>
                      <div className="flex mt-5 mb-5">
                      <ul className='flex gap-6'>
                      <li className='bg-green-600 text-white pt-1 pb-1 pl-3 pr-3 rounded-2xl font-mono'>Business</li>
                        <li className='flex items-center'>
                          <span><CalendarDateRangeIcon className='text-green-600 w-8 h-8'/></span>
                          <span className='font-mono'>20 jun 2025</span> 
                        </li>
                        <li className='flex items-center'>
                          <span><MapPinIcon className='text-green-600 w-8 h-8'/></span>
                          <span className='font-mono'>kigali</span>
                        </li>
                    </ul>
                   </div>
                 </div>
                   
                    <p class="text-gray-700 text-base">
                      {index.description}
                    </p>
                  </div>
                  <div class="px-0 pt-4 pb-2">
                    {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
                  </div>
                </div>
    ))}
    </div>

  <Pagination totalPage={event.length} eventPerPage={eventPerpage} setCurrentPage={setCurrentPage} CurrentPage={currentPage}/>

</div>
  </div>;
  }
  
  export default Events;
  