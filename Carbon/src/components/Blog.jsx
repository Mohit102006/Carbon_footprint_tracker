import React, { useEffect, useState } from "react";
import { URL } from "../constant";
import axios from "axios";

function App() {
  const [city,      setCity]      = useState("");
  const [data,      setData]      = useState({});
  const [error,     setError]     = useState("");
  const [newserror, setNewserror] = useState();
  const [newsdata,  setNewsdata]  = useState([]);
  const [clicked,   setClicked]   = useState(false);
  const [loading,   setLoading]   = useState(false);

  const getAQI = async () => {
    setClicked(true);
    setLoading(true);
    setData({});
    setError("");
    try {
      const res = await axios.get(`${URL}/aqi/${city}`);
      setData(res.data);
    } catch (err) {
      setError("City not found or server error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const response    = await axios.get(`${URL}/news`);
        const first10data = response.data.articles.slice(0, 10);
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .aqi-page {
          background: #0a1a0f;
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          padding: 4rem 2rem 5rem;
        }

        .aqi-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .aqi-header img {
          width: 48px;
          height: 40px;
          object-fit: contain;
          filter: drop-shadow(0 0 8px #22c55e55);
        }

        .aqi-header h2 {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .aqi-header h2 span { color: #4ade80; }

        .aqi-search-wrap {
          max-width: 680px;
          margin: 0 auto 1.5rem;
          display: flex;
          gap: 0.75rem;
        }

        .aqi-input {
          flex: 1;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 999px;
          padding: 0.75rem 1.25rem;
          color: #f0fdf4;
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .aqi-input::placeholder { color: #4b7a5a; }
        .aqi-input:focus { border-color: #22c55e; }

        .aqi-btn {
          background: #22c55e;
          color: #0a1a0f;
          border: none;
          padding: 0.75rem 1.75rem;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }

        .aqi-btn:hover { background: #4ade80; transform: translateY(-2px); }
        .aqi-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .aqi-error {
          text-align: center;
          color: #f87171;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        /* ── Result cards ── */
        .aqi-results {
          max-width: 680px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .aqi-result-card {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1rem;
          padding: 1.25rem 1rem;
          text-align: center;
          transition: border-color 0.2s, transform 0.2s;
          min-height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .aqi-result-card:hover { border-color: #22c55e; transform: translateY(-3px); }

        .result-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4b7a5a;
        }

        .result-value {
          font-size: 1.2rem;
          font-weight: 800;
          color: #4ade80;
        }

        /* ── Spinner ── */
        .aqi-spinner {
          width: 28px;
          height: 28px;
          border: 3px solid #1e3d25;
          border-top-color: #22c55e;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── Skeleton shimmer (shown while loading, for the label) ── */
        .aqi-skeleton {
          height: 10px;
          width: 48px;
          background: linear-gradient(90deg, #1e3d25 25%, #2a5435 50%, #1e3d25 75%);
          background-size: 200% 100%;
          border-radius: 999px;
          animation: shimmer 1.2s infinite;
        }

        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        .aqi-divider {
          max-width: 900px;
          margin: 3.5rem auto;
          border: none;
          border-top: 1px solid #1e3d25;
        }

        .aqi-news-heading {
          text-align: center;
          margin-bottom: 2rem;
        }

        .aqi-news-heading h2 {
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.02em;
          margin: 0 0 0.4rem 0;
        }

        .aqi-news-heading h2 span { color: #4ade80; }

        .aqi-news-heading p {
          color: #4b7a5a;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .aqi-news-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .aqi-news-card {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 1.75rem 2rem;
          position: relative;
          transition: border-color 0.2s, transform 0.2s;
          overflow: hidden;
        }

        .aqi-news-card:hover { border-color: #22c55e; transform: translateY(-3px); }

        .aqi-news-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 0;
          border-top: 36px solid #1e3d25;
          border-right: 36px solid transparent;
          transition: border-top-color 0.2s;
        }

        .aqi-news-card:hover::before { border-top-color: #22c55e; }

        .aqi-news-card h3 {
          font-size: 1rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.01em;
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
        }

        .aqi-news-card p.news-desc {
          font-size: 0.875rem;
          color: #86efac;
          line-height: 1.7;
          font-weight: 400;
          margin: 0 0 1rem 0;
        }

        .aqi-news-card p.news-date {
          font-size: 0.75rem;
          color: #4b7a5a;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin: 0;
        }

        @media (max-width: 600px) {
          .aqi-page          { padding: 3rem 1.25rem 4rem; }
          .aqi-search-wrap   { flex-direction: column; }
          .aqi-btn           { width: 100%; }
          .aqi-results       { grid-template-columns: 1fr; }
          .aqi-news-card     { padding: 1.5rem 1.25rem; }
        }
      `}</style>

      <div className="aqi-page">

        {/* Header */}
        <div className="aqi-header">
          <img src="/air-quality-index-icon-aqi-icon-vector-removebg-preview.png" alt="AQI Icon" />
          <h2>AQI <span>Checker</span></h2>
        </div>

        {/* Search */}
        <div className="aqi-search-wrap">
          <input
            type="text"
            placeholder="Enter city name…"
            value={city}
            className="aqi-input"
            onChange={(e) => {
              setCity(e.target.value);
              if (e.target.value === "") {
                setClicked(false);
                setData({});
                setError("");
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && getAQI()}
          />
          <button onClick={getAQI} className="aqi-btn" disabled={loading}>
            {loading ? "Checking…" : "Get AQI"}
          </button>
        </div>

        {/* Error */}
        {error && <p className="aqi-error">{error}</p>}

        {/* Result cards — show when clicked (loading OR data arrived) */}
        {clicked && !error && (
          <div className="aqi-results">
            {[
              { label: "PM2.5", value: data?.PM25 },
              { label: "PM10",  value: data?.PM10 },
              { label: "AQI",   value: data?.AQI  },
            ].map((item) => (
              <div className="aqi-result-card" key={item.label}>
                {loading ? (
                  <>
                    <div className="aqi-skeleton" />
                    <div className="aqi-spinner" />
                  </>
                ) : (
                  <>
                    <p className="result-label">{item.label}</p>
                    <p className="result-value">{item.value ?? "—"}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr className="aqi-divider" />

        {/* News heading */}
        <div className="aqi-news-heading">
          <p>📡 Latest Updates</p>
          <h2>🌏 Global Air <span>Pollution News</span></h2>
        </div>

        {/* News list */}
        <div className="aqi-news-list">
          {newserror && <p className="aqi-error">{newserror}</p>}
          {newsdata.map((news, index) => (
            <div key={index} className="aqi-news-card">
              <h3>{news.title}</h3>
              <p className="news-desc">{news.description}</p>
              <p className="news-date">📰 {news.date}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default App;
