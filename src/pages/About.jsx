function About() {
  return (
    <div>
      <div className="mt-8 md:mt-30 mx-4 md:mx-10">
        <div className="bg-gray-50 py-3 sm:py-4">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
            <p className="text-green-600 mx-auto mt-3 mb-3 max-w-lg text-center text-3xl sm:text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
              About GreatLakesForum
            </p>
            <h2 className="text-center text-sm sm:text-base/7 font-normal mb-4 text-black-600">
              Explore key gatherings that bring together leaders, innovators, and policymakers to shape the future of the Great Lakes economy.
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-10 mx-4 md:mx-20">
          {[1, 2, 3].map((item) => (
            <div key={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="order-2 md:order-1">
                <img
                  className="w-full h-auto rounded-xl object-cover object-top"
                  src="../speakers/images.jfif"
                  alt=""
                />
              </div>
              <div className="order-2 md:order-1">
                <div className="w-full h-fit grid gap-3 sm:gap-5">
                  <h1 className="text-black-500 font-bold text-lg sm:text-xl">Fostering Regional Growth</h1>
                  <h2 className="text-stone-700 text-start">
                    GreatLakesForum is dedicated to driving economic development across the Great Lakes region by fostering collaboration among businesses, policymakers, and innovators. We aim to create a thriving economic hub that supports sustainable growth and cross-border partnerships.
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-20 md:mt-40">
          <div className="md:col-span-2 px-4 md:px-0">
            <h2 className="text-green-600 mx-auto mt-3 mb-3 text-center text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-balance lg:text-5xl">
              Our Vision & Impact
            </h2>
            <p className="text-sm sm:text-base">
              We envision a dynamic Great Lakes economy built on collaboration, trade, and sustainability. Through strategic initiatives, we bridge gaps between industries, governments, and communities to create lasting economic and social impact.
            </p>
          </div>
          <div className="md:col-span-3 relative flex justify-center md:justify-end">
            <img
              className="hidden md:block absolute w-2/3 left-1 mt-8 ml-0 border-10 border-white"
              style={{ borderRadius: '30px' }}
              src="../speakers/images.jfif"
              alt=""
            />
            <img
              className="w-full md:w-2/3 mb-8 md:mb-20 object-cover object-top"
              style={{ borderRadius: '30px' }}
              src="../speakers/images.jfif"
              alt=""
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mt-16 md:mt-32 px-4 md:px-0">
          {[
            { title: "Fostering Regional Growth", content: "GreatLakesForum is dedicated to driving economic development across the Great Lakes region by fostering collaboration among businesses, policymakers, and innovators. We aim to create a thriving economic hub that supports sustainable growth and cross-border partnerships." },
            { title: "Empowering Innovation & Trade", content: "GreatLakesForum is dedicated to driving economic development across the Great Lakes region by fostering collaboration among businesses, policymakers, and innovators. We aim to create a thriving economic hub that supports sustainable growth and cross-border partnerships." },
            { title: "Building a Sustainable Future", content: "GreatLakesForum is dedicated to driving economic development across the Great Lakes region by fostering collaboration among businesses, policymakers, and innovators. We aim to create a thriving economic hub that supports sustainable growth and cross-border partnerships." }
          ].map((item, index) => (
            <div key={index} className="flex-1">
              <header className="text-black-500 font-bold mb-3 sm:mb-5 text-lg sm:text-xl">
                {item.title}
              </header>
              <p className="text-sm sm:text-base">
                {item.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 md:mt-20 mx-4 md:mx-20">
          <div className="flex justify-center">
            <header className="text-green-500 text-center font-bold mb-5 text-2xl sm:text-3xl md:text-4xl max-w-2xl">
              Our History – A Legacy of Collaboration and Growth
            </header>
          </div>
          <div className="text-sm sm:text-base">
            <p className="mb-4 sm:mb-7">
              GreatLakesForum was established with a vision to unite business leaders, policymakers, and innovators in addressing economic challenges and opportunities within the Great Lakes region. Recognizing the region's vital role in global trade, sustainability, and innovation, the forum was created as a platform for cross-border dialogue and collaboration.
            </p>
            <p className="mb-4 sm:mb-7">
              What began as a small initiative has grown into a premier gathering that brings together key stakeholders from diverse industries, government institutions, and research organizations. Over the years, the forum has played a crucial role in shaping policies, fostering investment, and driving technological advancements that enhance regional economic competitiveness.
            </p>
            <p className="mb-4 sm:mb-7">
              Through strategic partnerships and meaningful discussions, GreatLakesForum continues to champion initiatives that promote economic resilience, environmental sustainability, and inclusive growth. As we look to the future, we remain committed to strengthening the Great Lakes region's position as a leading economic powerhouse through innovation, trade, and sustainable development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;