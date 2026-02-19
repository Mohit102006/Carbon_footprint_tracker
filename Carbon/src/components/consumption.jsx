import React, { useEffect, useState } from 'react'
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
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const categoryColors = {
  Transport:   "#4ade80",
  Electricity: "#60a5fa",
  Food:        "#fb923c",
  Water:       "#22d3ee",
  Waste:       "#c084fc",
  Shopping:    "#f87171",
};

const Consumption = () => {
  const [chartData, setChartData] = useState([]);
  const [dataArr,   setDataArr]   = useState([]);

  useEffect(() => {
    const fetchLine = async () => {
      try {
        const res  = await fetch(`${URL}/consumption/getGraph`, { method: "GET", credentials: "include" });
        const data = await res.json();
        setChartData(data.data);
      } catch (e) { console.error(e); }
    };
    const fetchPie = async () => {
      try {
        const res  = await fetch(`${URL}/consumption/getPie`, { method: "GET", credentials: "include" });
        const data = await res.json();
        setDataArr(data.data);
      } catch (e) { console.error(e); }
    };
    fetchLine();
    fetchPie();
  }, []);

  /* ── Line chart config ── */
  const lineData = {
    labels: chartData.map(d => d.date),
    datasets: [{
      label: "Carbon Footprint (kg CO₂)",
      data: chartData.map(d => d.footprint),
      borderColor: "#4ade80",
      backgroundColor: "rgba(74,222,128,0.08)",
      pointBackgroundColor: "#4ade80",
      pointBorderColor: "#0a1a0f",
      pointBorderWidth: 2,
      pointRadius: 5,
      tension: 0.4,
      fill: true,
    }],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f2d18",
        borderColor: "#1e3d25",
        borderWidth: 1,
        titleColor: "#4ade80",
        bodyColor: "#86efac",
        callbacks: { label: ctx => ` ${ctx.raw.toFixed(2)} kg CO₂` },
      },
    },
    scales: {
      x: {
        ticks: { color: "#4b7a5a", font: { family: 'Syne', size: 11 } },
        grid:  { color: "rgba(74,222,128,0.05)" },
        border: { color: "#1e3d25" },
      },
      y: {
        ticks: { color: "#4b7a5a", font: { family: 'Syne', size: 11 } },
        grid:  { color: "rgba(74,222,128,0.07)" },
        border: { color: "#1e3d25" },
      },
    },
  };

  /* ── Pie chart config ── */
  const pieData = {
    labels: dataArr.map(d => d._id),
    datasets: [{
      data: dataArr.map(d => d.total),
      backgroundColor: dataArr.map(d => categoryColors[d._id] || "#4b7a5a"),
      borderWidth: 2,
      borderColor: "#0a1a0f",
      hoverOffset: 8,
    }],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#86efac",
          font: { family: 'Syne', size: 12, weight: '700' },
          padding: 16,
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#0f2d18",
        borderColor: "#1e3d25",
        borderWidth: 1,
        titleColor: "#4ade80",
        bodyColor: "#86efac",
        callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw.toFixed(2)} kg CO₂` },
      },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .cons-root {
          font-family: 'Syne', sans-serif;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .cons-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 2rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Header */
        .cons-header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .cons-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4ade80;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          width: fit-content;
        }

        .cons-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .cons-title span { color: #4ade80; }

        .cons-subtitle {
          color: #4b7a5a;
          font-size: 0.85rem;
          font-weight: 600;
          margin: 0;
        }

        /* Charts grid */
        .cons-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.5rem;
          flex: 1;
          min-height: 0;
        }

        .cons-card {
          background: rgba(15,45,24,0.75);
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 1.75rem;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color .2s;
        }

        .cons-card:hover { border-color: rgba(74,222,128,0.35); }

        .cons-card-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.01em;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cons-card-dot {
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
        }

        .cons-card-sub {
          font-size: 0.78rem;
          color: #4b7a5a;
          font-weight: 600;
          margin: -0.5rem 0 0;
        }

        .cons-chart-wrap {
          flex: 1;
          min-height: 0;
          position: relative;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .cons-grid {
            grid-template-columns: 1fr;
          }

          .cons-chart-wrap {
            height: 280px;
          }
        }

        @media (max-width: 600px) {
          .cons-scroll { padding: 1.25rem 1rem 2rem; }
        }
      `}</style>

      <div className="cons-root">
        <div className="cons-scroll">

          {/* Header */}
          <div className="cons-header">
            <span className="cons-badge">📊 Analytics</span>
            <h2 className="cons-title">Your Carbon <span>Footprints</span></h2>
            <p className="cons-subtitle">Track your emissions over time and by category</p>
          </div>

          {/* Charts */}
          <div className="cons-grid">

            {/* Line chart */}
            <div className="cons-card">
              <p className="cons-card-title">
                <span className="cons-card-dot" />
                Last 10 Days Footprint
              </p>
              <p className="cons-card-sub">Daily CO₂ emissions (kg)</p>
              <div className="cons-chart-wrap" style={{ height: '320px' }}>
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>

            {/* Pie chart */}
            <div className="cons-card">
              <p className="cons-card-title">
                <span className="cons-card-dot" style={{ background: '#60a5fa' }} />
                Category Wise Footprint
              </p>
              <p className="cons-card-sub">Breakdown by emission source</p>
              <div className="cons-chart-wrap" style={{ height: '320px' }}>
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Consumption;
