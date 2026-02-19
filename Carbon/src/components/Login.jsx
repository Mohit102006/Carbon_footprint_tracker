import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { URL } from '../constant';
const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [eye , setEye] = useState(false)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !pass) {
            toast.error("All information are required")
            return
        }

        try {
            const data = await fetch(`${URL}/auth/login`,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({email , pass}),
                credentials: "include",
            })
            const res = await data.json()
            if(res.success == 1){
              toast.success(res.message)
              window.location.href="/Dashboard"
            }else{
              toast.error(res.message)
            }
            // toast.success(res.message)
        } catch (error) {
            toast.error(error)
        }
    }

 const handleEye = () => {
        setEye(!eye)
    }

    return (
        <>
          <div className='flex items-center m-auto mr-38'>
       
        <div className='flex flex-col items-center justify-center w-[30vw] h-[60vh] m-auto mt-30 rounded-4xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] -mr-22'>
            <div className='flex items-center h-10 w-10 -ml-40'>
                <img src="leaf.png" alt="" />
                <span className='text-[28px] font-semibold'>EcoTracker</span>
            </div>
            <form action="" className='flex flex-col w-[90%]'>
                <input type="email" className='text-[#555C2A] rounded-2xl  mt-10 w-[100%] h-[6vh] pl-5 shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none ' name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' required />
                <div className=' w-[100%] flex items-center  mt-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)] rounded-2xl'>
                    <input type={eye ? "text" : 'password'} className=' text-[#555C2A]  w-[90%] h-[6vh] pl-5  outline-none' onChange={(e) => { setPassword(e.target.value) }} name="pass" placeholder='Password' required />
                    {eye ?   (<FiEyeOff className='h-[6vh] text-[20px] ml-3 text-[#6B7040] cursor-pointer' onClick={handleEye}/>)  : (<FiEye  className='h-[6vh] text-[20px] ml-3 text-[#6B7040] cursor-pointer' onClick={handleEye}/>)}
                </div>
                <button onClick={handleSubmit} className='bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700 transition mt-10 cursor-pointer z-10 h-[6vh]'>Login</button>
            </form>
            <span className='mt-3'>Don't have account{" "}<span className='text-blue-600'><Link to="/register">Signup</Link></span></span>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
            />
        </div>
         <div className='ml-20 h-30 w-170 flex items-center justify-center mt-30'>
            <img src="signup.png" alt="" className=''/>
        </div>
        </div>
        </>
    )
}

export default Login