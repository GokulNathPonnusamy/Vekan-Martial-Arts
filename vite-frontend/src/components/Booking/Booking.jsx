import React from 'react'

export const Booking = () => {
  return (
    <>
    <div className="bg-[#E2E8F0] grid grid-flow-col mt-0 m-7 rounded-3xl">
        <div className="px-7 py-4">
            <div className="md:hidden flex justify-center items-center mb-5">
                <img className="mr-6 w-48" src="./Founder.png" alt="Mr.Vega Nagarajan" /> 
            </div>
            <h1 className="text-xl lg:text-2xl font-bold">Just Book classes by online</h1>
            <p className="max-lg:text-xl text-2xltext-lg lg:text-xl text-justify my-3">Explore our offerings at Vekan Martial Arts Sports Academy, where we organize special seminars, summer camps, and workshops following the rules set by the World Karate Federation. Whether you prefer online or offline booking, simply click "Book Classes" on our website to secure your spot and embark on your martial arts journey with us.
            </p>
            <div className="max-sm:justify-self-center">
                <button className="text-lg lg:text-xl lg:py-3 lg:px-8 bg-gradient-to-t from-[#153885] to-[#2563EB] px-5 py-2 text-white rounded-full whitespace-nowrap cursor-pointer">Start Booking for Free</button>
            </div>
        </div>

        <div className="max-md:hidden flex justify-center items-center">
            <img className="mr-6 ml-3 max-lg:w-48 w-[260px]" src="./Founder.png" alt="Mr.Vega Nagarajan" /> 
        </div>
    </div>
    </>
  )
}
