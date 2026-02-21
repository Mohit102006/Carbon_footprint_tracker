import React, { useEffect, useState } from 'react';
import { URL } from '../constant';

const IconMap = {
  bike:    { emoji: "🚲" }, solar:   { emoji: "☀️" }, leaf:    { emoji: "🍃" },
  plug:    { emoji: "🔌" }, bus:     { emoji: "🚌" }, bulb:    { emoji: "💡" },
  water:   { emoji: "💧" }, recycle: { emoji: "♻️" }, plastic: { emoji: "🚯" },
  tree:    { emoji: "🌳" }, battery: { emoji: "🔋" }, home:    { emoji: "🏠" },
};

// Maps your DB category names → display config
const CATEGORY_META = {
  Transport:   { color: "#ef4444", emoji: "🚗" },
  Electricity: { color: "#eab308", emoji: "⚡" },
  Food:        { color: "#84cc16", emoji: "🥩" },
  Water:       { color: "#06b6d4", emoji: "💧" },
  Waste:       { color: "#8b5cf6", emoji: "♻️" },
  Shopping:    { color: "#f97316", emoji: "🛍️" },
};

const RecommendationCard = ({ title, iconKey }) => {
  const iconData = IconMap[iconKey?.toLowerCase()] || { emoji: '💡' };
  return (
    <div className="mp-rec-card">
      <span className="mp-rec-icon">{iconData.emoji}</span>
      <p className="mp-rec-text">{title}</p>
    </div>
  );
};

const CategoryBar = ({ label, value, maxValue, color, emoji }) => {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontSize: '1rem', width: '1.5rem', textAlign: 'center' }}>{emoji}</span>
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4b7a5a', width: '76px', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, background: '#0a1a0f', borderRadius: '4px', height: '7px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px', transition: 'width 1.2s ease' }} />
      </div>
      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f0fdf4', fontFamily: 'monospace', width: '64px', textAlign: 'right', flexShrink: 0 }}>
        {value.toFixed(1)} kg
      </span>
    </div>
  );
};

const MainPage = () => {
  const [total, setTotal]             = useState(0);
  const [name,  setName]              = useState("");
  const [avg,   setAvg]               = useState(0);
  const [categories, setCategories]   = useState([]);   // [{ _id: "Transport", total: 120.5 }]
  const [recommendations, setRecommendations] = useState([]);
  const [recLoading, setRecLoading]   = useState(true);

  const target       = 5.5;
  const percentage   = Math.min(((avg / target) * 100), 100).toFixed(1);
  const isUnderLimit = parseFloat(avg) <= target;
  const progressColor = isUnderLimit ? "#22c55e" : "#ef4444";
  const circumference = 2 * Math.PI * 26;

  // ── Fetch total + daily avg ──────────────────────────────────────────────
  useEffect(() => {
    const getRes = async () => {
      try {
        const res  = await fetch(`${URL}/consumption/getDetails`, { method: "GET", credentials: "include" });
        const data = await res.json();
        if (data.success == 1) {
          setTotal((data.total).toFixed(2));
          setName(data.name);
          setAvg((data.dailyAvg).toFixed(2));
        }
      } catch (_) { setTotal("Calculating..."); }
    };
    getRes();
  }, []);

  // ── Fetch category-wise breakdown from getCategoryPie ───────────────────
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res  = await fetch(`${URL}/consumption/category`, { method: "GET", credentials: "include" });
        const data = await res.json();
        // data.data = [{ _id: "Transport", total: 120.5 }, { _id: "Food", total: 88.2 }, ...]
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (_) {}
    };
    getCategories();
  }, []);

  // ── Fetch AI suggestions from backend ───────────────────────────────────
  useEffect(() => {
    const getSuggestions = async () => {
      setRecLoading(true);
      try {
        const res  = await fetch(`${URL}/consumption/suggestions`, { method: "GET", credentials: "include" });
        const data = await res.json();
        // data.suggestions = [{ title: "...", iconKey: "bus" }, ...]
        if (data.success && Array.isArray(data.suggestions)) {
          setRecommendations(data.suggestions);
        }
      } catch (_) {
        setRecommendations([]);
      } finally {
        setRecLoading(false);
      }
    };
    getSuggestions();
  }, []);

  const maxCatValue = Math.max(...categories.map(c => c.total), 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .mp-root {
          font-family: 'Syne', sans-serif;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .mp-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 2rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .mp-welcome {
          background: rgba(15,45,24,0.7);
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 1.75rem 2rem;
          backdrop-filter: blur(8px);
        }

        .mp-welcome-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4ade80;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          margin-bottom: 0.85rem;
        }

        .mp-welcome h1 {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0 0 0.4rem 0;
          line-height: 1.2;
        }

        .mp-welcome h1 span { color: #4ade80; }

        .mp-welcome p {
          color: #4b7a5a;
          font-size: 0.9rem;
          margin: 0;
          font-weight: 600;
        }

        .mp-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .mp-stat-card {
          background: rgba(15,45,24,0.7);
          border: 1px solid #1e3d25;
          border-radius: 1.15rem;
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          backdrop-filter: blur(8px);
          transition: border-color .2s, transform .2s;
          cursor: default;
        }

        .mp-stat-card:hover { border-color: #22c55e; transform: translateY(-3px); }

        .mp-stat-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #4b7a5a;
        }

        .mp-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #4ade80;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .mp-stat-value sub {
          font-size: 0.75rem;
          font-weight: 700;
          color: #4b7a5a;
          vertical-align: baseline;
        }

        .mp-stat-unit {
          font-size: 0.78rem;
          font-weight: 600;
          color: #4b7a5a;
        }

        .mp-progress-ring { position: relative; width: 72px; height: 72px; }
.mp-progress-ring svg { width: 72px; height: 72px; transform: rotate(-90deg); }
.mp-progress-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  white-space: nowrap;
  letter-spacing: -0.02em;
}
        .mp-progress-status {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .mp-lower {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 1.5rem;
          flex: 1;
          min-height: 0;
        }

        .mp-left-panel {
          background: rgba(15,45,24,0.7);
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 1.75rem 2rem;
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mp-panel-title {
          font-size: 1rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .mp-panel-sub {
          font-size: 0.8rem;
          color: #4b7a5a;
          font-weight: 600;
          margin: 0;
        }

        .mp-co2-big {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #4ade80;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .mp-co2-big sub { font-size: 1rem; color: #4b7a5a; font-weight: 700; }

        .mp-co2-caption {
          font-size: 0.78rem;
          color: #4b7a5a;
          font-weight: 600;
          border-top: 1px solid #1e3d25;
          padding-top: 0.75rem;
          margin-top: auto;
        }

        .mp-cat-section {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          border-top: 1px solid #1e3d25;
          padding-top: 0.85rem;
        }

        .mp-cat-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4b7a5a;
          margin: 0 0 0.25rem 0;
        }

        .mp-rec-panel {
          background: rgba(15,45,24,0.7);
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 1.5rem 1.25rem;
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .mp-rec-scroll {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding-right: 4px;
          margin-top: 1rem;
        }

        .mp-rec-scroll::-webkit-scrollbar { width: 4px; }
        .mp-rec-scroll::-webkit-scrollbar-track { background: transparent; }
        .mp-rec-scroll::-webkit-scrollbar-thumb { background: #1e3d25; border-radius: 999px; }

        .mp-rec-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 0.75rem;
          padding: 0.65rem 0.85rem;
          cursor: pointer;
          transition: border-color .2s, transform .15s;
          flex-shrink: 0;
        }

        .mp-rec-card:hover { border-color: #22c55e; transform: translateX(3px); }

        .mp-rec-icon { font-size: 1.25rem; flex-shrink: 0; }

        .mp-rec-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: #86efac;
          line-height: 1.4;
          margin: 0;
        }

        .mp-shimmer {
          background: linear-gradient(90deg, #0a1a0f 25%, #1e3d25 50%, #0a1a0f 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 0.75rem;
          height: 46px;
          flex-shrink: 0;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        @media (max-width: 1100px) {
          .mp-stats { grid-template-columns: repeat(2, 1fr); }
          .mp-lower  { grid-template-columns: 1fr; }
          .mp-rec-panel { max-height: 360px; }
        }

        @media (max-width: 600px) {
          .mp-scroll { padding: 1.25rem 1rem 2rem; }
          .mp-stats  { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="mp-root">
        <div className="mp-scroll">

          {/* Welcome banner */}
          <div className="mp-welcome">
            <span className="mp-welcome-badge">🍃 Dashboard</span>
            <h1>Welcome back, <span>{name || "there"}</span>!<br />Ready to lower your footprint today?</h1>
            <p>Your actions matter. Let's make sustainability simple.</p>
          </div>

          {/* Stats row */}
          <div className="mp-stats">
            <div className="mp-stat-card">
              <span className="mp-stat-label">Total Footprint</span>
              <span className="mp-stat-value">{total}<sub>CO₂</sub></span>
              <span className="mp-stat-unit">kg total</span>
            </div>

            <div className="mp-stat-card">
              <span className="mp-stat-label">Daily Average</span>
              <span className="mp-stat-value">{avg}</span>
              <span className="mp-stat-unit">kg / day</span>
            </div>

            <div className="mp-stat-card">
              <span className="mp-stat-label">Target</span>
              <span className="mp-stat-value" style={{ color: '#60a5fa' }}>{target}</span>
              <span className="mp-stat-unit">kg / day</span>
            </div>

            <div className="mp-stat-card">
              <span className="mp-stat-label">Progress</span>
             <div className="mp-progress-ring">
  <svg viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" stroke="#1e3d25" strokeWidth="6" fill="none" />
    <circle cx="32" cy="32" r="26" stroke={progressColor} strokeWidth="6" fill="none"
      strokeLinecap="round"
      strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`} />
  </svg>
  <div
    className="mp-progress-label"
    style={{
      color: progressColor,
      fontSize: `${percentage.toString().length > 4 ? '0.55rem' : '0.65rem'}`,
    }}
  >
    {percentage}%
  </div>
</div>
              <span className="mp-progress-status" style={{ color: progressColor }}>
                {isUnderLimit ? "✓ Below target" : "↑ Above target"}
              </span>
            </div>
          </div>

          {/* Lower section */}
          <div className="mp-lower">

            {/* Left: CO2 + category breakdown bars */}
            <div className="mp-left-panel">
              <p className="mp-panel-title">Your Carbon Footprint</p>
              <p className="mp-panel-sub">Cumulative CO₂ emissions logged so far</p>
              <div className="mp-co2-big">{total} <sub>CO₂</sub></div>

              {/* Category bars — driven by getCategoryPie response */}
              {categories.length > 0 && (
                <div className="mp-cat-section">
                  <p className="mp-cat-title">Category Breakdown</p>
                  {categories.map(cat => {
                    const meta = CATEGORY_META[cat._id] || { color: "#4ade80", emoji: "📊" };
                    return (
                      <CategoryBar
                        key={cat._id}
                        label={cat._id}
                        value={cat.total}
                        maxValue={maxCatValue}
                        color={meta.color}
                        emoji={meta.emoji}
                      />
                    );
                  })}
                </div>
              )}

              <p className="mp-co2-caption">
                Daily average of {avg} kg/day vs target of {target} kg/day —{" "}
                <span style={{ color: isUnderLimit ? "#22c55e" : "#ef4444" }}>
                  {isUnderLimit ? "you're on track 🎉" : "time to reduce ⚡"}
                </span>
              </p>
            </div>

            {/* Right: AI suggestions from backend */}
            <div className="mp-rec-panel">
              <p className="mp-panel-title">💡 Smart Suggestions</p>
              <p className="mp-panel-sub">Personalised tips to reduce your impact</p>
              <div className="mp-rec-scroll">

             {
   total == 0 ? (
    <p style={{ color: '#4b7a5a', fontSize: '0.82rem', textAlign: 'center', marginTop: '1.5rem' }}>
      No suggestions yet. Start logging your activities!
    </p>
  ) : avg < target ? (
    <p style={{ color: '#4b7a5a', fontSize: '0.82rem', textAlign: 'center', marginTop: '1.5rem' }}>
      Great job! 🎉 Your carbon footprint is lower than the average. Your small daily choices are making a real difference for the planet. Keep it up!
    </p>
  ) : recLoading ? (
    Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="mp-shimmer" />
    ))
  ) : recommendations.length > 0 ? (
    recommendations.map((rec, i) => (
      <RecommendationCard key={i} title={rec.title} iconKey={rec.iconKey} />
    ))
  ) : (
    <p style={{ color: '#4b7a5a', fontSize: '0.82rem', textAlign: 'center', marginTop: '1.5rem' }}>
      Server problem
    </p>
  )
}


                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
