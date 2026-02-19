import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
    return (
        <>
            <nav className="w-full h-20 bg-[#fffbb7] shadow-md  flex items-center justify-between fixed top-0 left-0">
                <div className='flex items-center h-10 w-10 ml-10'>
                    <img src="leaf.png" alt="" />
                    <span className='text-[28px] font-semibold'>EcoTracker</span>
                </div>
                <ul className="flex items-center gap-10  text-base font-semibold">
                    <li className="cursor-pointer">Home</li>
                    <Link to="/about">
                    <li className="cursor-pointer">About</li>
                    </Link>
                    <Link to="login">
                    <li className="cursor-pointer">Login</li>
                    </Link>
                    <Link to="/blog">
                    <li className="cursor-pointer">Blog</li>
                    </Link>
                </ul>
                <div>
                    <Link to="/register"><button className="bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700 transition mr-16 cursor-pointer z-10">
                        Signup
                    </button></Link>
                </div>
            </nav>
            
        </>
    )
}

export default Navbar