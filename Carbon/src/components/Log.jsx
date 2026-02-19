import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from '../constant';

const subcategories = {
  "Transport":   ["Car", "ElectricCar", "Bus", "Bike", "Train", "Plane", "Walk"],
  "Electricity": ["Home", "Office", "Industry", "Renewable"],
  "Food":        ["Beef", "Mutton", "Chicken", "Vegetarian", "Vegan", "Dairy", "Seafood"],
  "Water":       ["Shower", "Laundry", "Dishwashing", "Gardening", "Filtered"],
  "Waste":       ["Plastic", "Paper", "Metal", "Organic", "E-waste", "Glass"],
  "Shopping":    ["Clothing", "Electronics", "Furniture", "Groceries", "Luxury"]
};

const quant = {
  "Transport": "KM", "Electricity": "KWh", "Food": "Kg",
  "Water": "Liters", "Waste": "Kg", "Shopping": "INR"
};

const categoryIcons = {
  "Transport": "🚗", "Electricity": "⚡", "Food": "🍽️",
  "Water": "💧", "Waste": "♻️", "Shopping": "🛍️"
};

const Log = () => {
  const [cat,   setCat]   = useState("");
  const [click, setClick] = useState(false);
  const [disa,  setDisa]  = useState(false);
  const [sub,   setSub]   = useState([]);
  const [data,  setformData] = useState({ category: "", subcategory: "", amount: "", date: "" });

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCat(val);
    setClick(val !== "");
    setSub(subcategories[val] || []);
    setformData({ ...data, category: val, subcategory: "", amount: "" });
    setDisa(false);
  };

  const handleSubCategoryChange = (e) => {
    setDisa(e.target.value !== "");
    setformData({ ...data, subcategory: e.target.value });
  };

  const handleAmount = (e) => setformData({ ...data, amount: parseFloat(e.target.value) });
  const handleDate   = (e) => setformData({ ...data, date: e.target.value });

  const handleInfo = async (e) => {
    e.preventDefault();
    const { category, subcategory, amount, date } = data;
    if (!category || !subcategory || isNaN(amount) || amount <= 0 || !date)
      return toast.error("Fill all information");
    try {
      const res  = await fetch(`${URL}/consumption/Logdetails`, {
        method: "POST",
        headers: { 'content-type': "application/json" },
        credentials: "include",
        body: JSON.stringify({ category, subcategory, amount, date })
      });
      const resp = await res.json();
      if (resp.success == 1) {
        toast.success("Entry Saved");
        setformData({ category: "", subcategory: "", amount: "", date: "" });
        setCat(""); setClick(false); setSub([]); setDisa(false);
        document.querySelector('.inp').value = "";
      } else {
        toast.error("Error occurred");
      }
    } catch (err) { toast.error(String(err)); }
  };

  const amountDisabled = !(click && disa);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .log-root {
          font-family: 'Syne', sans-serif;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .log-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 2rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          align-items: center;
        }

        /* Header */
        .log-header {
          width: 100%;
          max-width: 680px;
        }

        .log-badge {
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
          margin-bottom: 0.75rem;
        }

        .log-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0 0 0.3rem;
        }

        .log-title span { color: #4ade80; }

        .log-subtitle {
          color: #4b7a5a;
          font-size: 0.85rem;
          font-weight: 600;
          margin: 0;
        }

        /* Card */
        .log-card {
          width: 100%;
          max-width: 680px;
          background: rgba(15,45,24,0.75);
          border: 1px solid #1e3d25;
          border-radius: 1.5rem;
          padding: 2.25rem 2rem;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Category chips */
        .log-cat-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .log-chip {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 999px;
          padding: 0.4rem 0.9rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #86efac;
          cursor: pointer;
          transition: border-color .2s, background .2s, color .2s;
        }

        .log-chip:hover      { border-color: #22c55e; color: #4ade80; }
        .log-chip.selected   { background: #0f2d18; border-color: #22c55e; color: #4ade80; }

        /* Field */
        .log-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .log-label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4b7a5a;
        }

        .log-select,
        .log-input {
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #f0fdf4;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          outline: none;
          width: 100%;
          transition: border-color .2s;
          appearance: none;
          -webkit-appearance: none;
        }

        .log-select:focus,
        .log-input:focus   { border-color: #22c55e; }

        .log-select:disabled,
        .log-input:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Make date input icon green-ish on dark */
        .log-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7) sepia(1) saturate(3) hue-rotate(80deg);
          cursor: pointer;
        }

        /* option styling (limited cross-browser) */
        .log-select option { background: #0f2d18; color: #86efac; }

        .log-input::placeholder { color: #4b7a5a; }

        /* Amount row with unit badge */
        .log-amount-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .log-unit-badge {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 0.6rem;
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          font-weight: 800;
          color: #4ade80;
          white-space: nowrap;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }

        /* Divider */
        .log-divider { border: none; border-top: 1px solid #1e3d25; margin: 0; }

        /* Submit button */
        .log-btn {
          background: #22c55e;
          color: #0a1a0f;
          border: none;
          padding: 0.85rem;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          width: 100%;
          transition: background .2s, transform .15s;
          margin-top: 0.25rem;
        }

        .log-btn:hover { background: #4ade80; transform: translateY(-2px); }

        @media (max-width: 600px) {
          .log-scroll { padding: 1.25rem 1rem 2rem; }
          .log-card   { padding: 1.75rem 1.25rem; }
        }
      `}</style>

      <div className="log-root">
        <div className="log-scroll">

          {/* Header */}
          <div className="log-header">
            <span className="log-badge">📋 Activity Logger</span>
            <h2 className="log-title">Log Your <span>Consumption</span></h2>
            <p className="log-subtitle">Record your daily activities to track your carbon footprint</p>
          </div>

          {/* Form card */}
          <div className="log-card">

            {/* Category chips */}
            <div className="log-field">
              <span className="log-label">Select Category</span>
              <div className="log-cat-chips">
                {Object.keys(subcategories).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`log-chip${cat === c ? ' selected' : ''}`}
                    onClick={() => handleCategoryChange({ target: { value: cat === c ? "" : c } })}
                  >
                    {categoryIcons[c]} {c}
                  </button>
                ))}
              </div>
            </div>

            <hr className="log-divider" />

            {/* Subcategory */}
            <div className="log-field">
              <span className="log-label">Sub Category</span>
              <select
                className="log-select"
                value={data.subcategory}
                onChange={handleSubCategoryChange}
                disabled={!click}
              >
                <option value="">{click ? "Choose sub category" : "Select a category first"}</option>
                {sub.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Amount */}
            <div className="log-field">
              <span className="log-label">Amount</span>
              <div className="log-amount-row">
                <input
                  type="number"
                  min="0"
                  className="log-input inp"
                  placeholder={amountDisabled ? "Fill category & sub category first" : `Enter amount in ${quant[cat]}`}
                  disabled={amountDisabled}
                  onChange={handleAmount}
                />
                {!amountDisabled && (
                  <span className="log-unit-badge">{quant[cat]}</span>
                )}
              </div>
            </div>

            {/* Date */}
            <div className="log-field">
              <span className="log-label">Date</span>
              <input
                type="date"
                className="log-input"
                value={data.date}
                onChange={handleDate}
              />
            </div>

            <hr className="log-divider" />

            <button className="log-btn" onClick={handleInfo}>
              Log Consumption →
            </button>

          </div>
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
  );
};

export default Log;
