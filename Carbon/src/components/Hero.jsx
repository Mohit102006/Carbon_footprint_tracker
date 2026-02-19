import React from 'react'
import { Link } from "react-router-dom"
const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center max-w-7xl mx-auto mt-10 px-6 gap-8">
      {/* Left Text */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-green-700 tracking-wide leading-tight">
          Take control of your carbon footprint
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700 leading-relaxed">
          Track, analyze and reduce your impact on the environment.
        </p>
        <Link to="/register"><button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-3xl hover:bg-green-700 transition cursor-pointer">
          Let's begin
        </button>
        </Link>

      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img src="heroimg.png" alt="Hero" className="w-full max-w-md md:max-w-lg" />
      </div>
    </div>

  )
}

export default Hero