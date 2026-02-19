import React from "react";

const Section3 = () => {
  return (
     <section className=" py-20 px-6">

      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-green-700 mb-3">
          Dashboard Experience
        </h2>
        <p className=" text-lg max-w-2xl mx-auto">
          A clean, powerful and user-friendly dashboard to track your carbon
          footprint, analyze trends and monitor your environmental progress.
        </p>
      </div>

      {/* Image Layout */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">

        {/* Left Small Image */}
        <div className="w-full md:w-1/4 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-2 hover:scale-105 transition duration-300">
          <img
            src="/2.png"
            alt="Dashboard left"
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* Center Main Image (Highlight) */}
        <div className="w-full md:w-2/4 bg-white rounded-3xl shadow-2xl p-3 hover:scale-105 transition duration-300 border border-green-200">
          <img
            src="/3.png"
            alt="Main Dashboard"
            className="rounded-2xl w-full object-cover"
          />
        </div>

        {/* Right Small Image */}
        <div className="w-full md:w-1/4 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-2 hover:scale-105 transition duration-300">
          <img
            src="/4.png"
            alt="Dashboard right"
            className="rounded-xl w-full object-cover"
          />
        </div>

      </div>
    </section>
  )
}

export default Section3