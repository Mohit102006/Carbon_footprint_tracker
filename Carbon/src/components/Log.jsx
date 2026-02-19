import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from '../constant';
const subcategories = {
  "Transport": ["Car", "ElectricCar", "Bus", "Bike", "Train", "Plane", "Walk"],
  "Electricity": ["Home", "Office", "Industry", "Renewable"],
  "Food": ["Beef", "Mutton", "Chicken", "Vegetarian", "Vegan", "Dairy", "Seafood"],
  "Water": ["Shower", "Laundry", "Dishwashing", "Gardening", "Filtered"],
  "Waste": ["Plastic", "Paper", "Metal", "Organic", "E-waste", "Glass"],
  "Shopping": ["Clothing", "Electronics", "Furniture", "Groceries", "Luxury"]
};

const quant = {
  "Transport": "KM",
  "Electricity": "Kwh",
  "Food": "Kg",
  "Water": "Liters",
  "Waste": "Kg",
  "Shopping": "INR"
};
const Log = () => {
  const [cat, setCat] = useState("")
  const [click, setClick] = useState(false)
  const [disa, setDisa] = useState(false)
  const [sub, setSub] = useState([])
  const [data, setformData] = useState({
    category: "",
    subcategory: "",
    amount: "",
    date: ""
  })

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCat(selectedCategory);
    if (selectedCategory === "") {
      setClick(false);
      setSub([]);
    } else {
      setClick(true);
      setSub(subcategories[selectedCategory] || []);
    }

    setformData({
      ...data,
      category: selectedCategory,
      subcategory: "",
      amount: "",
    });
    setDisa(false);
  };


  const handleSubCategoryChange = (e) => {
    (e.target.value == "" ? setDisa(false) : setDisa(true))
    setformData({ ...data, subcategory: e.target.value })
  }

  const handleAmount = (e) => {
    setformData({ ...data, amount: parseFloat(e.target.value) })
  }

  const handleDate = (e) => {
    setformData({ ...data, date: e.target.value })
  }

  const handleInfo = async (e) => {
    e.preventDefault()
    const { category, subcategory, amount, date } = data;
    if (!category || !subcategory || isNaN(amount) || amount <= 0 || !date) {
      return toast.error("Fill all information");
    }
    try {
      const res = await fetch(`${URL}/consumption/Logdetails`, {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ category, subcategory, amount, date })
      })
      const data = await res.json()
      if (data.success == 1) {
        toast.success("Entry Saved")
        setformData({
          category: "",
          subcategory: "",
          amount: "",
          date: ""
        });
        setCat("");
        setClick(false);
        setSub([]);
        setDisa(false);
          document.querySelector('.inp').value = ""; // clears amount input
      } else {
        toast.error("Error occurred")
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
      <div className='p-10 h-[65vh] w-300 m-auto  mt-20 rounded-2xl  shadow-[0_8px_30px_rgba(0,0,0,0.3)] ml-13'>
        <p className='text-[20px] text-gray-800 font-bold'>Log Your Consumption</p>
        <div className='mt-6 flex flex-col'>
          <form action="" className='flex  flex-col'>
            <div className='flex mt-7'>
              <label className='font-semibold text-[20px] text-gray-800'>Select Categories</label>
              <select name="" value={data.category} onChange={handleCategoryChange} className='text-gray-700 focus:ring-2 focus:ring-green-300 border-1 border-gray-500 outline-none rounded h-10 w-80 pl-4 h-9 ml-19 text-[20px]'>
                <option value="">Choose Categories</option>
                {Object.keys(subcategories).map((category, index) => (
                  <option value={category} key={index}>{category}</option>
                ))}
              </select>
            </div>
            <div className='flex mt-7'>
              <label className='font-semibold text-[20px] text-gray-800'>Select Sub Categories</label>
              <select name="" onChange={handleSubCategoryChange} className='text-gray-700 focus:ring-2 focus:ring-green-300 border-1 border-gray-500 outline-none rounded h-10 w-80 pl-4 h-9 ml-9 text-[20px]'>
                <option value="">Choose Sub Categories</option>
                {sub.map((e, key) => {
                  return (
                    <option value={e} key={key}>{e}</option>
                  )
                })}
              </select>
            </div>
            <div className='flex mt-7 '>
              <label className='font-semibold text-[20px] text-gray-800 '>Enter Amount</label>
              {(click && disa) == 0 ? <><input type="text" placeholder="Fill above information" disabled className='border-gray-500 outline-none rounded w-80 pl-4 h-9 ml-28 border h-10 text-[20px] text-gray-800 placeholder-gray-700 inp' />
              </> : <><input type="text" onChange={handleAmount} placeholder={click == true ? (`Enter Amount in ${quant[cat]}`) : "Fill above information"} className=' inp border-gray-500 outline-none rounded w-80 pl-4 h-9 ml-28 border h-10 text-[20px] text-gray-800 placeholder-gray-700 inp' />
              </>}
            </div>
            <div className='flex mt-7 '>
              <label className='font-semibold text-[20px] text-gray-800 '>Select Date</label>
              <input type="date" value={data.date} onChange={handleDate} className='border-gray-500 outline-none rounded w-80 pl-4 h-9 ml-33 border h-10 text-[20px] text-gray-800 placeholder-gray-700' />
            </div>
            <div className=' flex items-center justify-center mt-10'>
              <button onClick={handleInfo} className='bg-green-600 text-white w-80 px-6 py-2 rounded-3xl hover:bg-green-700 transition  cursor-pointer z-10 h-[6vh]'>Log Consumption</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  )
}



export default Log