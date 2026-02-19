import React from 'react'

const cards = () => {
  return (
    <div className='flex m-auto'>
        <div className='flex flex-col ml-34 items-center justify-center w-80 cursor-pointer rounded-2xl  shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:scale-105'>
            <img src="foot.png" alt="" className='w-10 mt-6'/>
            <br/>
            <h1 className='text-[20px] font-bold'>Track your Emissions</h1>
            <br/>
            <p className='text-center w-50 '>Log your daily activities and get an estimato of your carbon emissions</p>
        </div>
        <div className='flex flex-col ml-34 items-center justify-center w-80 cursor-pointer rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:scale-105'>
            <img src="bulb.png" alt="" className='w-30 h-30'/>
            <br/>
            <h1 className='text-[20px] font-bold -mt-8'>Discover ways to reduce</h1>
            <br/>
            <p className='text-center w-50'> Get Ai recommendation on how to reduce your carbon footprints</p>
        </div>
        <div className='flex flex-col ml-34 items-center justify-center w-80 cursor-pointer rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:scale-105'>
            <img src="progress.png" alt="" className='w-30 h-30 mt-4'/>
            <br/>
            <h1 className='text-[20px] font-bold -mt-8'>Monitor your progress</h1>
            <br/>
            <p className='text-center w-50'>Visualize your carbon footprints over time and celebrate your success</p>
        </div>
       
    </div>
  )
}

export default cards