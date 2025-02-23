
const ListOfSpeaker = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', image: '../public/speakers/download (1).jfif'},
  { name: 'Engagement', description: 'Speak directly to your customers', image: 'https://tailwindui.com/plus-assets/img/component-images/bento-03-mobile-friendly.png'},
  { name: 'Security', description: 'Your customers’ data will be safe and secure',image: 'https://tailwindui.com/plus-assets/img/component-images/bento-03-mobile-friendly.png'},
  { name: 'Integrations', description: 'Connect with third-party tools',image: 'https://tailwindui.com/plus-assets/img/component-images/bento-03-mobile-friendly.png'},
  { name: 'Automations', description: 'Build strategic funnels that will convert', image: 'https://tailwindui.com/plus-assets/img/component-images/bento-03-mobile-friendly.png'},
]

function Speakers() {
    return <div className="bg-white-50 mt-30 py-3 sm:py-4">
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-green-600 sm:text-5xl">
      Speakers & Experts
      </p>
      <h2 className="text-center text-base/7 font-normal mt-10 text-black-600">Explore key gatherings that bring together leaders, innovators, and policymakers to shape the future of the Great Lakes economy.</h2>
      <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3">

        {ListOfSpeaker.map((item) => (
        <div className="relative lg:row-span-2">
          {/* <div className="absolute inset-px rounded-lg bg-white rounded-lg"></div> */}
          <div className="relative flex h-full flex-col overflow-hidden rounded">
          <div className="@container relative min-h-[20rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-0 top-0 bottom-2 overflow-hidden rounded shadow-1xl">
                <img
                  className="size-full object-cover object-top"
                  src={item.image}
                  alt=""
                />
              </div>
            </div>
            <div className="px-2 pt-4 pb-3 sm:px-1 sm:pt-1 sm:pb-3">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                {item.name}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                {item.description}
              </p>
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
  