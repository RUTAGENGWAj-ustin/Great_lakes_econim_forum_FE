
import { useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";

function Speakers() {

   const { speakersData, isLoading,backendUrl } = useContext(GlobalDataContext);


    if (isLoading) {
      return <div>Loading events...</div>;
    }

    return <div className="bg-gray-50 mt-30 py-3 sm:py-4">
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-green-600 sm:text-5xl">
      Speakers & Experts
      </p>
      <h2 className="text-center text-base/7 font-normal mt-10 text-black-600">Explore key gatherings that bring together leaders, innovators, and policymakers to shape the future of the Great Lakes economy.</h2>
      <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3">

        {speakersData?.map((item) => (
        <div className="relative lg:row-span-2">
          {/* <div className="absolute inset-px rounded-lg bg-white rounded-lg"></div> */}
          <div className="relative flex h-full flex-col overflow-hidden rounded">
          <div className="@container relative min-h-[20rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-0 top-0 bottom-2 overflow-hidden rounded shadow-1xl">
                <img
                  className="size-full object-cover object-top"
                  src={backendUrl+item.image}
                  alt=""
                />
              </div>
            </div>
            <div className="px-4 pt-6 pb-4 sm:px-2 sm:pt-2 sm:pb-3 bg-white">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-800">Name:</label>
                <p className="text-xl font-semibold text-gray-900">{item.name}</p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <label className="text-sm font-semibold text-gray-800">Expert in:</label>
                <p className="text-sm text-gray-700">{item.expertise}</p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <label className="text-sm font-semibold text-gray-800">Biography:</label>
                <p className="text-sm text-gray-700">{item.bio}</p>
              </div>
            </div>


          
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded"></div>
        </div>
        ))}
      
      </div>
    </div>
  </div>
  }
  
  export default Speakers;
  