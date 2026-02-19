import React, { useState, useEffect } from 'react'
import { BsPersonFill } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { Outlet, Link } from 'react-router-dom';
import { URL } from '../constant';
import { ToastContainer, toast } from "react-toastify";
// import { useSelector } from 'react-redux'
import { setProfileImage } from '../redux/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
// import { UserProvider } from './userContext'; 

const Dashboard = () => {

    const dispatch = useDispatch()
    const profileImg = useSelector(state => state.profile.profileImg)
    const [name, setName] = useState("")
    // const [profileImg , setProfileImg] = useState("")



    useEffect(() => {
        const getRes = async () => {
            try {
                const res = await fetch(`${URL}/consumption/getDetails`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success == 1) {
                    setName(data.name)
                }

            } catch (error) {
                setTotal("Calculating...")
            }
        }
        getRes()
    }, [])

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(`${URL}/profile/getImage`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success) {
                    dispatch(setProfileImage(data.proimg))
                    // toast.success("Profile image updated")
                }
            } catch (err) {
                console.log("Failed to fetch profile image")
            }
        }
        fetchImage()
    }, [dispatch])

    return (
        <>

            <div className='relative h-[100vh] w-[100vw] overflow-hidden'> {/* Added relative and overflow-hidden */}
                {/* Background image div with blur filter */}
                <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{
                        backgroundImage: 'url("/bg.jpg")',
                        filter: 'blur(15px)', // Adjust blur value as needed (e.g., 5px, 10px)
                        transform: 'scale(1.02)' // Slightly scale up to avoid blurry edges
                    }}
                ></div>

                {/* Dashboard content wrapper, make sure it's above the blurred background */}
                <div className='relative z-10 h-full w-full'> {/* Added relative and z-10 */}
                    <div className='h-20 border-b-1 border-gray-200 flex items-center justify-between'>
                        <div className='flex items-center h-10 w-10 ml-10'>
                            <img src="/leaf.png" alt="" />
                            <span className='text-[28px] font-semibold'>EcoTracker</span>
                        </div>
                        <Link to="/Dashboard/profile">
                            <div className='flex items-center mr-20 cursor-pointer'>
                                <div className=' text-green-800 rounded-full w-12 h-12 flex items-center justify-center'>
                                    <img
                                        src={profileImg}
                                        alt="Profile"
                                        className="h-[100%] w-[100%]"
                                    />                        </div>
                                <span className='pl-2'>{name}</span>
                            </div>
                        </Link>
                    </div>
                    <div className='flex'>

                        <div className='flex flex-col items-center border-r-1 border-gray-200 w-60 h-[89vh]'>
                            <div className='w-[100%] flex flex-col items-center justify-center'>
                                <Link to="/Dashboard/mainpage" className='flex items-center w-full p-3 mt-5  rounded-xl shadow-sm hover:text-white hover:bg-green-700 transition-bg duration-500 cursor-pointer pl-15'>
                                    <BsHouseFill className=" mr-3" />
                                    <span className=" font-medium">Dashboard</span>
                                </Link>

                                {/* 2nd div */}
                                <Link to="/Dashboard/Log" className="flex items-center w-full p-3 mt-5  rounded-xl shadow-sm hover:text-white hover:bg-green-700 transition-bg duration-500 cursor-pointer pl-15">
                                    <FaCopy className=" mr-3" />
                                    <span className=" font-medium ">Log</span>
                                </Link>

                                {/* 3rd div */}
                                <Link to="/Dashboard/consumption" className="flex items-center w-full p-3 mt-5  rounded-xl shadow-sm hover:text-white hover:bg-green-700 transition-bg duration-500 cursor-pointer pl-15" >
                                    <FaChartPie className="mr-3" />
                                    <span className=" font-medium">Consumption</span>
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col h-[89vh] w-[100%]'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
            />
        </>
    )
}

export default Dashboard