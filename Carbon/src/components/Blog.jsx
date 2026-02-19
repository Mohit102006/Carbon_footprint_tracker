import React, { useEffect, useState } from "react";
import { URL } from "../constant";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [newserror, setNewserror] = useState();
  const [newsdata, setNewsdata] = useState([]);
  const [clicked, setClicked] = useState(false);

  const getAQI = async () => {
    setClicked(true);
    try {
      const res = await axios.get(`${URL}/aqi/${city}`);
      setData(res.data);
      console.log(res);
      setError("");
    } catch (err) {
      setError("City not found or server error");
      setData(null);
    }
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(`${URL}/news`);
        const first10data = response.data.articles.slice(0, 10);
        console.log(first10data);
        setNewsdata(first10data);
        setNewserror("");
      } catch (error) {
        setNewserror("Server Error");
        setNewsdata(null);
      }
    };
    getNews();
  }, []);

  return (
    <>
      <div className="relative">
       

        <div className="flex items-center m-auto justify-center gap-1 mt-10">
          <img
            src="/air-quality-index-icon-aqi-icon-vector-removebg-preview.png"
            className="w-12 h-10"
            alt=""
          />
          <h2 className="text-3xl font-semibold">AQI Checker</h2>
        </div>

        <div
          className={`flex flex-col items-center justify-center w-[50vw] 
          m-auto mt-10 rounded-4xl 
          transition-all duration-500 ease-in-out overflow-hidden
          ${clicked ? "h-[20vh]" : "h-[10vh]"}`}
        >
          <div className="flex items-center justify-center gap-3 w-[90%]">
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              className="text-[#555C2A] rounded-2xl w-[80%] h-[6vh] pl-5 shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none"
              onChange={(e) => setCity(e.target.value)}
            />

            <button
              onClick={getAQI}
              className="bg-green-600 text-white px-9 py-2 rounded-3xl hover:bg-green-700 transition cursor-pointer h-[6vh] w-[15vw]"
            >
              Get AQI
            </button>
          </div>

          {clicked && data && (
            <div className="text-center flex flex-col justify-center mt-2 -ml-2">
              <div className="flex gap-3">
                <div className="flex items-center w-[15vw] h-[8vh] justify-center rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                  <h2 className="text-xl font-bold">PM25: 98µg/m³</h2>
                </div>

                <div className="flex items-center w-[15vw] h-[8vh] justify-center rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                  <h2 className="text-xl font-bold">PM10: 25µg/m³</h2>
                </div>

                <div className="flex items-center w-[15vw] h-[8vh] justify-center rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                  <h2 className="text-xl font-bold">AQI: 100</h2>
                </div>
              </div>
            </div>
           )} 
        </div>
      </div>

      <hr className="my-10 border-t w-[80%] m-auto" />
      <br />
      <h2 className="text-2xl font-bold items-center gap-2 text-gray-800 text-center font-serif">
        🌏 Global Air Pollution News
      </h2>

      <div className="flex flex-col items-center justify-center mt-6 gap-5 m-auto">
        {newsdata.map((news,index)=>{
          return (
        <div key={index} className="relative w-[80%] e shadow-lg rounded-lg p-6 border border-gray-200 font-serif">
          {/* Folded paper corner */}
          <div
            className="absolute top-0 left-0 w-0 h-0 
                    border-t-[40px] border-t-gray-200 
                    border-r-[40px] border-r-transparent"
          ></div>

          {/* Globe + Heading */}
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            {news.title}
          </h2>

          {/* News Content */}
          <div className="mt-4">
            <p className="mt-3 text-gray-700 leading-relaxed">
              {news.description}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              📰{news.date}
            </p>
          </div>
        </div>
           )
        })} 
      </div>
    </>
  );
}

export default App;
