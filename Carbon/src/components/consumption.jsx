import React from 'react'
import { useEffect , useState } from 'react'
import { URL } from '../constant'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line , Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const consumption = () => {
    const [chartData, setChartData] = useState([]);
    const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/consumption/getGraph`, {
          method: "GET",
          credentials: "include",
        })
        const data = await res.json();
        setChartData(data.data);
      }catch(error) {
        console.error("Error fetching data:");
      }
    }

    const fetchDataPie = async () => {
    try {
        const res = await fetch(`${URL}/consumption/getPie`, {
          method: "GET",
          credentials: "include",
        })
        const data = await res.json();
        setDataArr(data.data);
      }catch(error) {
        console.error("Error fetching data:");
      }
  };

    fetchData();
    fetchDataPie();
  }, [])
  
  const data = {
    labels: chartData.map((item) => item.date),
    datasets: [
      {
        label: "Carbon Footprint (kg CO₂)",
        data: chartData.map((item) => item.footprint),
        borderColor: "green",          // ✅ Green line
        backgroundColor: "rgba(0,0,0,0)", // ✅ Transparent fill
        pointBackgroundColor: "green",
        pointBorderColor: "green",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
   plugins: {
    legend: {
      display: false,   // ❌ remove legend
    },
  },
    scales: {
      x: {
        ticks: { color: "#2e7d32" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#2e7d32" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  const categoryColors = {
    Transport: "#2e7d32",
    Electricity: "#1565c0",
    Food: "#ef6c00",
    Water: "#00acc1",
    Waste: "#6a1b9a",
    Shopping: "#c62828",
  };

  const dataPie = {
    labels: dataArr.map((item) => item._id),
    datasets: [
      {
        data: dataArr.map((item) => item.total),
        backgroundColor: dataArr.map(
          (item) => categoryColors[item._id] || "#888"
        ),
        borderWidth: 0,
      },
    ],
  };

  const optionsPie = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: { size: 13 },
        },
      },

      // 🏷 Tooltip on hover
      tooltip: {
        callbacks: {
          label: function (context) {
            const category = context.label;
            const value = context.raw.toFixed(2);
            return `${category}: ${value} kg CO₂`;
          },
        },
      },
    },
  };


  return (
    <div className='flex flex-col items-center justify-center '>
      <h2 className="text-2xl font-bold mb-4 text-center mt-5">Your Carbon Footprints</h2>
      <div className='flex w-[100%] gap-1'>

     <div style={{
        width: "50%",
        height: "400px",
        margin: "40px auto",
        padding: "20px",
        background: "transparent",   // ✅ transparent box
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)", // ✅ shadow
      }}>
      <h2 style={{ textAlign: "center" }}>Last 10 Days Footprint</h2>
      <Line data={data} options={options} />
    </div>

      <div
      style={{
        width: "30%",
        height: "430px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        background: "transparent",
      }}
    >
      <h2 style={{ textAlign: "center"}}>
        Category Wise Footprint
      </h2>
      <br />
      <Pie style={{width:"100%", height:"100%" , }}data={dataPie} options={optionsPie} />
    </div>
      </div>
    </div>
  )
}

export default consumption