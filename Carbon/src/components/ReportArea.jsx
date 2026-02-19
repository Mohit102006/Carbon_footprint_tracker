import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { URL } from "../constant";

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

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444"];

const ReportPDF = ({ name, email, onDone }) => {
  const reportRef = useRef();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/consumption/MonthlyReport`, { method: "GET", credentials: "include" })
        const d = await res.json();
        setData(d.data1daily);
        setTotal(d.total);
        setCategory(d.data2category);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    }
  fetchData();
  }, [])
  

  useEffect(() => {
  if (!data.length) return;

  const generatePDF = async () => {
    // wait until chart is fully rendered
    const chartCanvas = reportRef.current.querySelector("canvas");
    if (!chartCanvas) {
      setTimeout(generatePDF, 500);
      return;
    }
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      willReadFrequently: true,   // ✅ remove warning
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("EcoTracker_Report.pdf");

    onDone();
  };

setTimeout(generatePDF, 1500);
}, [data]);


  const dataGraph = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Carbon Footprint (kg CO₂)",
        data: data.map((item) => item.footprint),
        borderColor: "green",          // ✅ Green line
        backgroundColor: "rgba(0,0,0,0)", // ✅ Transparent fill
        pointBackgroundColor: "green",
        pointBorderColor: "green",
        tension: 0.1,
        fill: false, 
      },
    ],
  };

  const categoryColors = {
    Transport: "#2e7d32",
    Electricity: "#1565c0",
    Food: "#ef6c00",
    Water: "#00acc1",
    Waste: "#6a1b9a",
    Shopping: "#c62828",
  };


const options = {
  responsive: true,
  animation: false,   // ⭐ IMPORTANT — ensures line is drawn instantly
  plugins: {
    legend: { display: false },
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

   const dataPie = {
    labels: category.map((item) => item._id),
    datasets: [
      {
        data: category.map((item) => item.total),
        backgroundColor: category.map(
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
    },
  };


  return (
    <div
      ref={reportRef}
      style={{
        width: "800px",
        padding: "20px",
        background: "white",
        color: "black",
        position: "fixed",
        left: "-9999px",
        top: 0
      }}
    >
      <h1 style={{textAlign:"center" , fontSize:"24px", fontWeight:"bold"}}>EcoTracker Carbon Report (Last 30 Days)</h1>
      <br />
      <p><b>Name:</b> {name}</p>
     < br />
      <p><b>Email:</b> {email}</p>
      <br/>
      <p><b>Total Carbon Footprint:</b> {total} kg CO₂</p>
      <br />
      <h3 style={{fontSize:"18px", fontWeight:"bold"}}>Daily Carbon Trend</h3>
      <br/>
      <Line   data={dataGraph} options={options} />
      <br />
      <div  style={{
        width: "30%",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}>

    <h3 style={{fontSize:"18px", fontWeight:"bold"}}>Category Breakdown</h3> 
    <br />
    <Pie style={{width:"100%", height:"100%" , }}data={dataPie} options={optionsPie} />
      </div>
    </div>
  );
};

export default ReportPDF;
