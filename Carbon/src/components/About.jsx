import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-[#f3f6c4] px-6 py-12">

      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-green-700 mb-4">
          About EcoTracker
        </h1>
        <p className=" text-lg max-w-3xl mx-auto">
          EcoTracker helps individuals track, analyze and reduce their carbon
          footprint. Our mission is to create a greener future by empowering
          people with awareness and smart environmental insights.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Mission */}
        <div className=" rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <div className="text-green-600 text-4xl mb-4">🌍</div>
          <h2 className="text-xl font-semibold mb-2 text-green-700">
            Our Mission
          </h2>
          <p className="">
            To reduce global carbon emissions by helping people understand and
            manage their environmental impact through smart tracking tools.
          </p>
        </div>

        {/* Vision */}
        <div className=" rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <div className="text-green-600 text-4xl mb-4">💡</div>
          <h2 className="text-xl font-semibold mb-2 text-green-700">
            Our Vision
          </h2>
          <p className="">
            We envision a world where every individual actively contributes to
            sustainability using technology-driven environmental solutions.
          </p>
        </div>

        {/* Impact */}
        <div className=" rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <div className="text-green-600 text-4xl mb-4">📈</div>
          <h2 className="text-xl font-semibold mb-2 text-green-700">
            Our Impact
          </h2>
          <p className="">
            EcoTracker has helped users monitor emissions, adopt eco-friendly
            habits, and significantly lower their carbon footprint over time.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-4xl mx-auto text-center mt-16">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Why Choose EcoTracker?
        </h2>
        <p className="text-lg">
          Real-time carbon tracking, personalized reduction tips, progress
          monitoring, and beautiful reports — everything you need to live a more
          sustainable lifestyle.
        </p>
      </div>
    </div>
  )
}

export default About