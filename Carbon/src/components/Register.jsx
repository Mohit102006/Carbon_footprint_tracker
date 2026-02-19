import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from '../constant';
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [otp, setOtp] =useState('');
    const [otpsent, setOtpsent] = useState(false);
    const [verifyotp, setVerifyotp] = useState(false);
    const [eye , setEye] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !pass) {
            toast.error("All information are required")
            return
        }

        try {
            const data = await fetch(`${URL}/auth/signup`,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({name , email , pass})
            })
            const res = await data.json()
            toast.success("Registered successfully")
        } catch (error) {
            toast.error(error)
        }
    }


    const handleOtp = async (e) => {
        e.preventDefault()
         if (!name || !email) {
            toast.error("All information are required")
            return
        }
        try {
            const res = await fetch(`${URL}/auth/sendotp`,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({email})
            })
            const data = await res.json()
            if(data.success == 1){
                toast.success(data.message)
                setOtpsent(true)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error)
        }
    }
    const verifyOtp = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${URL}/auth/verifyOtp`,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({email , otp})
            })
            const data = await res.json()
             if(data.success == 1){
                toast.success(data.message)
                setVerifyotp(true)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error)
        }
    }

    const handleEye = () => {
        setEye(!eye)
    }

    return (
        <>
        <div className='flex items-center m-auto ml-20'>

        <div className='ml-20 h-30 w-170 flex items-center justify-center mt-30'>
            <img src="signup.png" alt="" className=''/>
        </div>
        <div className='flex flex-col items-center justify-center w-full max-w-md h-[60vh] object-contain m-auto mt-30 rounded-4xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] -ml-5'>

            <div className='flex items-center h-10 w-10 -ml-40'>
                <img src="leaf.png" alt="" />
                <span className='text-[28px] font-semibold'>EcoTracker</span>
            </div>
            <form action="" className='flex flex-col w-[90%]'>
                <input type="text" className=' text-[#555C2A] rounded-2xl mt-10 w-[100%] h-[6vh] pl-5  shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none' name="name" onChange={(e) => { setName(e.target.value) }} placeholder='Username' required />
                <input type="email" disabled={otpsent} className='text-[#555C2A] rounded-2xl  mt-10 w-[100%] h-[6vh] pl-5 shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none ' name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' required />
                {!otpsent ? (
                    <>
                    <button className='bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700 transition mt-10 cursor-pointer z-10 h-[6vh]' onClick={handleOtp}>Send OTP</button>
                    </>
                ) : !verifyotp ? (
                    <>
                    <input type="text" className=' text-[#555C2A] rounded-2xl mt-10 w-[100%] h-[6vh] pl-5  shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none' name="otp" onChange={(e) => {setOtp(e.target.value)}} placeholder='Enter OTP'/>
                    <button className='bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700 transition mt-10 cursor-pointer z-10 h-[6vh]' onClick={verifyOtp}>Veriify OTP</button>
                    </>
                ) : (
                    <>
                     <div className=' w-[100%] flex items-center  mt-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)] rounded-2xl'>
                    <input type={eye ? "text" : "password"} className=' text-[#555C2A]  w-[90%] h-[6vh] pl-5  outline-none' onChange={(e) => { setPassword(e.target.value) }} name="pass" placeholder='Password' required />
                    {eye ?   (<FiEyeOff className='h-[6vh] text-[20px] ml-3 text-[#6B7040] cursor-pointer' onClick={handleEye}/>)  : (<FiEye  className='h-[6vh] text-[20px] ml-3 text-[#6B7040] cursor-pointer' onClick={handleEye}/>)}
                </div>
                <button onClick={handleSubmit} className='bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700 transition mt-10 cursor-pointer z-10 h-[6vh]'>Signup</button>
                    </>
                )
            }

               
            </form>
            <span className='mt-3'>Already have account <span className='text-blue-600'><Link to="/login">login</Link></span></span>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
            />
        </div>
        </div>
        </>
    )
}

export default Register