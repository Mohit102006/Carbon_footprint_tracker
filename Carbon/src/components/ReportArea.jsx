import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { URL } from "../constant";
import { FaArrowLeft } from "react-icons/fa";

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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const categoryColors = {
  Transport: "#2e7d32",
  Electricity: "#1565c0",
  Food: "#ef6c00",
  Water: "#00acc1",
  Waste: "#6a1b9a",
  Shopping: "#c62828",
};

const ReportPDF = ({ name, email, onDone }) => {
  const reportRef = useRef();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/consumption/MonthlyReport`, {
          method: "GET",
          credentials: "include",
        });
        const d = await res.json();
        setData(d.data1daily);
        setTotal(d.total);
        setCategory(d.data2category);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data.length) return;

    const generatePDF = async () => {
      const chartCanvas = reportRef.current.querySelector("canvas");
      if (!chartCanvas) {
        setTimeout(generatePDF, 500);
        return;
      }
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        willReadFrequently: true,
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
        borderColor: "#1b5e20",
        backgroundColor: "rgba(27,94,32,0.08)",
        pointBackgroundColor: "#1b5e20",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#4a4a4a", font: { size: 10 } },
        grid: { display: false },
        border: { color: "#e0e0e0" },
      },
      y: {
        ticks: { color: "#4a4a4a", font: { size: 10 } },
        grid: { color: "rgba(0,0,0,0.04)" },
        border: { color: "#e0e0e0" },
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
        borderWidth: 3,
        borderColor: "#fff",
      },
    ],
  };

  const optionsPie = {
    animation: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: { size: 12, family: "Georgia, serif" },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
    },
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const topCategory =
    category.length > 0
      ? category.reduce((a, b) => (a.total > b.total ? a : b))
      : null;

  return (
    <div
      ref={reportRef}
      style={{
        width: "800px",
        background: "#ffffff",
        color: "#1a1a1a",
        position: "fixed",
        left: "-9999px",
        top: 0,
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)",
          padding: "40px 48px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", right: "-40px", top: "-40px",
          width: "200px", height: "200px",
          borderRadius: "50%", background: "rgba(255,255,255,0.05)",
        }} />
        <div style={{
          position: "absolute", right: "60px", top: "-20px",
          width: "120px", height: "120px",
          borderRadius: "50%", background: "rgba(255,255,255,0.04)",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
          <div style={{
            width: "36px", height: "36px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px",
          }}>🌿</div>
          <span style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: "600",
          }}>EcoTracker</span>
        </div>

        <h1 style={{
          color: "#ffffff",
          fontSize: "30px",
          fontWeight: "normal",
          letterSpacing: "0.5px",
          margin: "0 0 8px",
          lineHeight: 1.2,
        }}>
          Carbon Footprint Report
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: "14px",
          margin: 0,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "0.3px",
        }}>
          30-Day Summary · Generated {today}
        </p>
      </div>

      {/* Profile & Total Strip */}
      <div style={{
        display: "flex",
        alignItems: "stretch",
        borderBottom: "1px solid #e8e8e8",
      }}>
        {/* User Info */}
        <div style={{
          flex: 1,
          padding: "24px 32px",
          borderRight: "1px solid #e8e8e8",
        }}>
          <p style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#888",
            textTransform: "uppercase",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
            fontWeight: "600",
            margin: "0 0 6px",
          }}>Prepared for</p>
          <p style={{ fontSize: "18px", margin: "0 0 4px", color: "#1a1a1a" }}>{name}</p>
          <p style={{
            fontSize: "12px",
            color: "#666",
            margin: 0,
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}>{email}</p>
        </div>

        {/* Total Footprint */}
        <div style={{
          padding: "24px 32px",
          background: "#f9fbf9",
          minWidth: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <p style={{
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#888",
            textTransform: "uppercase",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
            fontWeight: "600",
            margin: "0 0 6px",
          }}>Total Emissions</p>
          <p style={{
            fontSize: "36px",
            fontWeight: "normal",
            color: "#1b5e20",
            margin: "0 0 2px",
            lineHeight: 1,
          }}>
            {typeof total === "number" ? total.toFixed(1) : total}
          </p>
          <p style={{
            fontSize: "12px",
            color: "#666",
            margin: 0,
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}>kg CO₂ equivalent</p>
        </div>

        {/* Top Category */}
        {topCategory && (
          <div style={{
            padding: "24px 32px",
            background: "#fff8f0",
            minWidth: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderLeft: "1px solid #e8e8e8",
          }}>
            <p style={{
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#888",
              textTransform: "uppercase",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontWeight: "600",
              margin: "0 0 6px",
            }}>Largest Source</p>
            <p style={{
              fontSize: "20px",
              color: categoryColors[topCategory._id] || "#888",
              margin: "0 0 2px",
              lineHeight: 1,
            }}>{topCategory._id}</p>
            <p style={{
              fontSize: "12px",
              color: "#666",
              margin: 0,
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}>{typeof topCategory.total === "number" ? topCategory.total.toFixed(1) : topCategory.total} kg CO₂</p>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div style={{ padding: "32px 40px" }}>

        {/* Daily Trend */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <h2 style={{
              fontSize: "16px",
              fontWeight: "normal",
              color: "#1a1a1a",
              margin: 0,
              letterSpacing: "0.3px",
            }}>Daily Carbon Trend</h2>
            <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
          </div>

          <div style={{
            background: "#fafafa",
            borderRadius: "8px",
            padding: "24px 20px 16px",
            border: "1px solid #f0f0f0",
          }}>
            <Line data={dataGraph} options={options} />
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <h2 style={{
              fontSize: "16px",
              fontWeight: "normal",
              color: "#1a1a1a",
              margin: 0,
              letterSpacing: "0.3px",
            }}>Category Breakdown</h2>
            <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
          </div>

          <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
            {/* Pie chart */}
            <div style={{ width: "280px", flexShrink: 0 }}>
              <Pie data={dataPie} options={optionsPie} />
            </div>

            {/* Category breakdown bars */}
            <div style={{ flex: 1 }}>
              {category
                .slice()
                .sort((a, b) => b.total - a.total)
                .map((item, i) => {
                  const max = Math.max(...category.map((c) => c.total));
                  const pct = ((item.total / max) * 100).toFixed(0);
                  const color = categoryColors[item._id] || "#888";
                  return (
                    <div key={i} style={{ marginBottom: "14px" }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "5px",
                      }}>
                        <span style={{
                          fontSize: "12px",
                          fontFamily: "Helvetica Neue, Arial, sans-serif",
                          color: "#333",
                          fontWeight: "500",
                        }}>{item._id}</span>
                        <span style={{
                          fontSize: "12px",
                          fontFamily: "Helvetica Neue, Arial, sans-serif",
                          color: "#666",
                        }}>
                          {typeof item.total === "number" ? item.total.toFixed(1) : item.total} kg
                        </span>
                      </div>
                      <div style={{
                        height: "6px",
                        background: "#f0f0f0",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: color,
                          borderRadius: "3px",
                        }} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #e8e8e8",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fafafa",
      }}>
        <span style={{
          fontSize: "10px",
          color: "#aaa",
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>EcoTracker · Carbon Intelligence</span>
        <span style={{
          fontSize: "10px",
          color: "#aaa",
          fontFamily: "Helvetica Neue, Arial, sans-serif",
        }}>🌱 Track. Reduce. Sustain.</span>
      </div>
    </div>
  );
};

export default ReportPDF;