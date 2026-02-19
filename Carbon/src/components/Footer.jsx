import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
     <footer className="relative bg-green-600 text-white pt-10 pb-6 mt-20">

      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-green-400 opacity-60"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between  gap-1">

        {/* Logo + Name */}
        <div className="flex items-center gap-3 -ml-19">
          <div className="bg-white p-2 rounded-lg backdrop-blur-md">
            <img
              src="/leaf.png"
              alt="EcoTracker Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <h2 className="text-2xl font-semibold tracking-wide">
            EcoTracker
          </h2>
        </div>

        {/* Developer */}
        <div className="text-center">
          <p className="text-white text-sm md:text-base">
            Developed with 🌿 by
          </p>
          <p className="font-semibold text-lg tracking-wide">
            Mohit Kumar Soni
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mohit-kumar-soni-8129b6388"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-green-300 transition duration-300"
          >
            <FaLinkedin />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Mohit102006"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-green-300 transition duration-300"
          >
            <FaGithub />
          </a>

        </div>
      </div>

      {/* Bottom */}
      {/* <div className="text-center text-white/80 text-xs mt-8">
        © {new Date().getFullYear()} EcoTracker • All Rights Reserved
      </div> */}
    </footer>
  )
}

export default Footer