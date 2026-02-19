import React from 'react';
import { useEffect, useState } from 'react';
import { URL } from '../constant';

const MOCK_RECOMMENDATIONS = [
     { title: "Use bicycle or walk for short distances", iconKey: "bike" },
  { title: "Switch to solar or renewable energy", iconKey: "solar" },
  { title: "Eat more plant-based and local food", iconKey: "leaf" },
  { title: "Turn off and unplug idle electronics", iconKey: "plug" },
  { title: "Use public transport or carpool", iconKey: "bus" },
  { title: "Replace bulbs with energy-efficient LEDs", iconKey: "bulb" },
  { title: "Save water by fixing leaks and shorter showers", iconKey: "water" },
  { title: "Reduce, reuse, and recycle waste properly", iconKey: "recycle" },
  { title: "Avoid single-use plastic products", iconKey: "plastic" },
  { title: "Plant trees and support green initiatives", iconKey: "tree" },
  { title: "Use energy-efficient appliances", iconKey: "battery" },
  { title: "Work from home when possible to reduce travel", iconKey: "home" },
];


const IconMap = {
    bike: {
    emoji: "🚲",
    color: "text-blue-500",
  },
  solar: {
    emoji: "☀️",
    color: "text-yellow-500",
  },
  leaf: {
    emoji: "🍃",
    color: "text-green-600",
  },
  plug: {
    emoji: "🔌",
    color: "text-gray-700",
  },
  bus: {
    emoji: "🚌",
    color: "text-indigo-500",
  },
  bulb: {
    emoji: "💡",
    color: "text-amber-500",
  },
  water: {
    emoji: "💧",
    color: "text-cyan-500",
  },
  recycle: {
    emoji: "♻️",
    color: "text-green-500",
  },
  plastic: {
    emoji: "🚯",
    color: "text-red-500",
  },
  tree: {
    emoji: "🌳",
    color: "text-emerald-600",
  },
  battery: {
    emoji: "🔋",
    color: "text-lime-600",
  },
  home: {
    emoji: "🏠",
    color: "text-orange-500",
  },
};




const RecommendationCard = ({ title, iconKey }) => {

    const iconData = IconMap[iconKey.toLowerCase()] || { emoji: '💡', color: 'text-yellow-600' };

    return (
        <div className="flex items-center bg-white p-4 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer mt-2">
            <div className={`p-2 rounded-full bg-green-50 mr-4 text-xl flex items-center justify-center ${iconData.color}`}>
                {iconData.emoji}
            </div>
            <p className="text-sm font-semibold text-gray-800 leading-snug">{title}</p>
        </div>
    );
};



const mainPage = () => {
    const [total, setTotal] = useState("")
    const [name, setName] = useState("")
    const [avg, setAvg] = useState("")

    const target = 5.5;
    let percentage , isUnderLimit , progressColor;
    useEffect(() => {
        const getRes = async () => {
            try {
                const res = await fetch(`${URL}/consumption/getDetails`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success == 1) {
                    setTotal((data.total).toFixed(2))
                    setName(data.name)
                    setAvg((data.dailyAvg).toFixed(2))
                }
            } catch (error) {
                setTotal("Calculating...")
            }
        }
        getRes()
    }, [])

     percentage = (( avg / target) * 100).toFixed(1);
     isUnderLimit = (avg) <= target;
    progressColor = isUnderLimit ? "#16a34a" : "#dc2626";
    return (

        <main className="flex items-center justify-center" >

            <div className="flex flex-col flex-grow p-8 md:p-10 lg:p-12 ml-80">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-10 lg:mb-16">

                    {/* Left (Text) Area */}
                    <div className="w-full lg:w-1/2 pr-0 lg:pr-10 ">

                        {/* Welcome Message */}
                        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-gray-800 mb-2 w-120">
                            <span className='inline-flex items-center'>
                                Welcome back, {name}!
                                <span className='ml-2 text-green-500 text-3xl'>🍃</span>
                            </span>
                            <span className="block font-extrabold text-gray-800">
                                Ready to lower your footprint today?
                            </span>
                        </h1>
                        <p className="text-base text-gray-600 mb-6">
                            Your actions matter. Let's make sustainability simple.
                        </p>

                        {/* Footprint Display */}
                        <div className="mb-8  mt-6 w-180 flex flex-col gap-10   ">
                            <div className='flex flex-col w-130'>
                                <p className="text-lg font-medium text-gray-700 mb-1">Your Footprint</p>
                                {/* Replicating the specific green color and CO2 style */}
                                <p className="text-5xl font-black" style={{ color: '#054c31ff' }}>
                                    {total} <sub className='font-bold text-xl'>CO₂</sub>
                                </p>
                            </div>
                            <div className="flex flex-wrap w-200 gap-6  ">
                                {/* Box 1 - Daily Average */}
                                <div className="w-40 h-32 bg-white/20 backdrop-blur-md rounded-2xl flex flex-col justify-center items-center border border-white/40 shadow-md hover:scale-105 transition-transform">
                                    <h3 className="text-lg font-semibold text-gray-800">Daily Average</h3>
                                    <p className="text-2xl font-bold text-green-800 mt-1">
                                        {(avg)} <span className="text-sm font-semibold">kg/day</span>
                                    </p>
                                </div>

                                {/* Box 2 - Target */}
                                <div className="w-40 h-32 bg-white/20 backdrop-blur-md rounded-2xl flex flex-col justify-center items-center border border-white/40 shadow-md hover:scale-105 transition-transform">
                                    <h3 className="text-lg font-semibold text-gray-800">Target</h3>
                                    <p className="text-2xl font-bold text-blue-800 mt-1">
                                        {target} <span className="text-sm font-semibold">kg/day</span>
                                    </p>
                                </div>

                                {/* Box 3 - Progress */}
                                <div className="w-40 h-32 bg-white/20 backdrop-blur-md rounded-2xl flex flex-col justify-center items-center border border-white/40 shadow-md hover:scale-105 transition-transform">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Progress</h3>

                                    {/* Circle Progress */}
                                    <div className="relative w-16 h-16 items-center flex justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="29.5"
                                                stroke="#d1d5db"
                                                strokeWidth="6"
                                                fill="none"
                                              
                                            />
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="29.5"
                                                stroke={progressColor}
                                                strokeWidth="6"
                                                strokeDasharray={`${(percentage / 100) * 175}, 175`}
                                                fill="none"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={` font-bold `}  style={{ color: progressColor }}>
                                                {percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    <p
                                        className={`text-xs font-medium mt-1 ${isUnderLimit ? "text-green-700" : "text-red-700"
                                            }`}
                                    >
                                        {isUnderLimit ? "Below target" : "Above target"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='-ml-30'>

                <h2 className="text-xl font-semibold text-gray-900 ">
                    Smart Suggestions to Reduce Your Impact
                </h2>
                <div className="overflow-auto scrollbar-hide scroll-container">


                    {/* Force horizontal scroll */}
                    <div className=" w-[400px] ">
                        {MOCK_RECOMMENDATIONS.map((rec, index) => (
                            <RecommendationCard
                                key={index}
                                title={rec.title}
                                iconKey={rec.iconKey}
                            />
                        ))}
                    </div>
                </div>
            </div>


        </main>
    );
};

export default mainPage;