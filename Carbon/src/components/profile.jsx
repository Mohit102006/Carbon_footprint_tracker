import React from 'react'
import { FiLogOut } from 'react-icons/fi';
import { FaSignOutAlt, FaFileExport, FaUser, FaStar, FaEnvelope, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import { ToastContainer, toast } from "react-toastify";
import { URL } from '../constant';
import { useDispatch, useSelector } from 'react-redux'
import { setProfileImage } from '../redux/profileSlice'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import ReportArea from "../components/ReportArea";

const profile = () => {

  const dispatch = useDispatch()
  const profileImg = useSelector(state => state.profile.profileImg)
  const [hovered, setHovered] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [pop, setPop] = useState(false)
  const [img, setImg] = useState("")
  const [pimg , setPimg] = useState("")
  const [passPop, setPassPop] = useState(false)
const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
const [downloadPDF, setDownloadPDF] = useState(false);
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)


 const exportReport = () => {
  setDownloadPDF(true);
};

  const setLogout = async () => {
    try {
      const res = await fetch(`${URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      })
      const data = await res.json()
      if (data.success == 1) {
        toast.success("Logged out successfully")
        setTimeout(() => {
          window.location.href = "/login"
        }, 1000)
      } else {
        toast.error("Logout failed")
      }
      }
     catch (error) {
      toast.error("Logout error")
    }
  }

  const handleSaveImage = async () => {
    try {
      const res = await fetch(`${URL}/profile/setImage`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ig: img })
      })
      const data = await res.json()
      if (data.success == 1) {
        setTimeout(() => toast.success("Profile image updated!"), 100) // ✅ safe delay
        dispatch(setProfileImage(data.proimg))
        setPimg(data.proimg)
        setPop(false)
      }
    } catch (err) {
      toast.error("Failed to save image")
    }
  }

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
          setEmail(data.email)
          setDate(data.date)
          setPimg(data.pi)
        }
      } catch (error) {
        setTotal("Calculating...")
      }
    }
    getRes()
  }, [])

  const changePass = async () => {

    if (!oldPass || !newPass || !confirmPass) {
      toast.warning("Fill all fields")
      return
    }

    if (newPass !== confirmPass) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const res = await fetch(`${URL}/auth/changePass`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, oldPass, newPass })
      })

      const data = await res.json()
      console.log(data.success)
      if (data.success == 1) {
        toast.success("Password changed successfully")
        setPassPop(false)
        setOldPass("")
        setNewPass("")
        setConfirmPass("")
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error("Something went wrong")
    }
  }


  

  return (
    <>


      <AnimatePresence mode="wait">
        {pop && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0  flex items-center justify-center z-50 rounded-2xl  shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                backgroundColor: "#1a1a1a",
                backdropFilter: "blur(40px)",
              }}
              className=" m-auto ml-100 bg-[#004d4066] rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 w-[70vw] sm:w-[50vw] h-[60vh] rounded-2xl  shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <h2 className="text-xl font-semibold text-gray-500">
                Change Profile Image
              </h2>

              <div className='flex flex-col items-center justify-center h-[97%] w-full gap-1'>
                <div className='h-[45%] w-[98%] flex items-center justify-center gap-3 proCon' >
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/a1.png")}>
                    <img src="/a1.png" alt="" className='h-[100%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/a2.png")}>
                    <img src="/a2.png" alt="" className='h-[100%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/a3.png")} >
                    <img src="/a3.png" alt="" className='h-[95%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/a4.png")}>
                    <img src="/a4.png" alt="" className='h-[100%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/a5.png")}>
                    <img src="/a5.png" alt="" className='h-[100%] w-[100%]' />
                  </div>

                </div>
                <div className=' h-[45%] w-[98%] flex items-center justify-center gap-3 proCon' >
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/ag1.png")}>
                    <img src="/ag1.png" alt="" className='h-[100%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/ag2.png")}>
                    <img src="/ag2.png" alt="" className='h-[100%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/ag3.png")}>
                    <img src="/ag3.png" alt="" className='h-[95%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/ag4.png")}>
                    <img src="/ag4.png" alt="" className='h-[100%] w-[100%]' />
                  </div>
                  <div className=' h-[95%] w-[18%] flex items-center justify-center cursor-pointer' onClick={() => setImg("/ag5.png")}>
                    <img src="/ag5.png" alt="" className='h-[100%] w-[100%]' />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                  onClick={handleSaveImage}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
                  onClick={() => setPop(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


         <AnimatePresence>
        {passPop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1a1a1a] p-6 rounded-2xl w-[90vw] sm:w-[420px] shadow-2xl flex flex-col gap-4"
            >
              <h2 className="text-xl text-gray-300 font-semibold text-center">
                Change Password
              </h2>

              {/* OLD PASS */}
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none"
                />
                <span
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                >
                  {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {/* NEW PASS */}
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none"
                />
                <span
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                >
                  {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {/* CONFIRM PASS */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white outline-none"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={changePass}
                  className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setPassPop(false)}
                  className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <div className='h-[89vh] w-[85vw] flex items-center justify-center '>
        <div className='h-[90%] w-[50%] flex items-center justify-center flex-col rounded-2xl  shadow-[0_8px_30px_rgba(0,0,0,0.3)] gap-1'>
          <div className='h-[200px] w-[200px] -mt-16 rounded-2xl ' >
              <img src={pimg} alt="" />
          </div>
          <button className=' hover:border hover:border-white cursor-pointer w-50 h-8 rounded' onClick={() => { setPop(!pop) }}>Change Profile Image</button>
          <br />
          <div className='flex flex-col gap-3 cursor-pointer w-full items-center justify-center'>
            <div className=' w-[70%] items-center  flex text-left justify-between'>
              <div className='flex items-center justify-center gap-1'>
                <FaUser className='' />
                <span className='font-semibold text-[20px]'>Username  </span>
              </div>
              <div className=''>
                <span className='font-semibold text-[20px]'>{name}</span>
              </div>
            </div>
            <div className=' w-[70%] items-center justify-between flex text-right'>
              <div className='flex items-center justify-center gap-1'>
                <FaEnvelope />
                <span className='font-semibold text-[20px]'>Email  </span>
              </div>
              <div className=' overflow-auto emailScroll w-[300px]'>
                <span className='font-semibold text-[20px] '>{email}</span>
              </div>
            </div>
            <div className=' w-[70%] items-center justify-between flex '>
              <div className='flex items-center justify-center gap-1'>
                <FaCalendarAlt />
                <span className='font-semibold text-[20px]'>Since  </span>
              </div>
              <div className=''>
                <span className='font-semibold text-[20px]'>{date}</span>
              </div>
            </div>

          </div>
          <br />
          <div className='-mb-20 flex items-center gap-5'>
            <button

              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`cursor-pointer relative w-44 h-12 rounded-lg overflow-hidden transition-all duration-500 flex items-center justify-center ${hovered ? 'bg-gradient-to-r from-red-600 to-pink-500' : 'bg-red-500'
                }`}
            >
              {/* Centered icon + text */}
              <div onClick={setLogout}
                className={`flex items-center gap-2 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'
                  } text-white font-semibold`}
              >
                <FiLogOut size={20} />
                <span>Logout</span>
              </div>

              {/* Arrow slides across */}
              <div
                className={`absolute left-0 top-0 h-full flex items-center text-white transition-all duration-500 ${hovered ? 'translate-x-36 opacity-100' : 'translate-x-0 opacity-0'
                  }`}
              >
                <FaArrowRight size={20} />
              </div>
            </button>
            <button  onClick={exportReport} className='flex items-center gap-1 cursor-pointer relative w-44 h-12 rounded-lg overflow-hidden transition-all duration-500 flex items-center justify-center bg-green-600 text-white hover:bg-green-700'>
              <FaFileExport />
              <span>Export report</span>

                   {downloadPDF && (
  <ReportArea
    name={name}
    email={email}
    onDone={() => setDownloadPDF(false)}
  />
)}

            </button>
          </div>
          <div>



            <button
            onClick={() => setPassPop(true)}
            className="underline hover:text-green-700"
          >
            Change Password
          </button>


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

export default profile