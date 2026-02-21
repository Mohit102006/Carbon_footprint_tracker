import React, { useState, useEffect } from 'react'
import { BsPersonFill } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { URL } from '../constant';
import { ToastContainer, toast } from "react-toastify";
import { setProfileImage } from '../redux/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

const navItems = [
  { to: "/Dashboard/mainpage", icon: <BsHouseFill />, label: "Dashboard" },
  { to: "/Dashboard/Log",      icon: <FaCopy />,      label: "Log" },
  { to: "/Dashboard/consumption", icon: <FaChartPie />, label: "Consumption" },
]

const Dashboard = () => {
  const dispatch = useDispatch()
  const profileImg = useSelector(state => state.profile.profileImg)
  const [name, setName] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const getRes = async () => {
      try {
        const res = await fetch(`${URL}/consumption/getDetails`, { method: "GET", credentials: "include" })
        const data = await res.json()
        if (data.success == 1) setName(data.name)
      } catch (error) {}
    }
    getRes()
  }, [])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${URL}/profile/getImage`, { method: "GET", credentials: "include" })
        const data = await res.json()
        if (data.success) dispatch(setProfileImage(data.proimg))
      } catch (err) {}
    }
    fetchImage()
  }, [dispatch])

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false) }, [location])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        * { box-sizing: border-box; }

        .dash-root {
          position: relative;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
        }

        /* Blurred bg */
        .dash-bg {
          position: absolute;
          inset: 0;
          background: #0a1a0f;
          z-index: 0;
        }

        /* Dark overlay on bg image */
        .dash-bg-img {
          position: absolute;
          inset: 0;
          background-image: url("/bg.jpg");
          background-size: cover;
          background-position: center;
          filter: blur(15px) brightness(0.25);
          transform: scale(1.02);
          z-index: 1;
        }

        /* Content layer */
        .dash-content {
          position: relative;
          z-index: 10;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        /* ── Topbar ── */
        .dash-topbar {
          height: 68px;
          border-bottom: 1px solid #1e3d25;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          flex-shrink: 0;
          background: rgba(10, 26, 15, 0.7);
          backdrop-filter: blur(12px);
        }

        .dash-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .dash-logo img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .dash-logo-text {
          font-size: 1.3rem;
          font-weight: 800;
          color: #4ade80;
          letter-spacing: -0.03em;
        }

        .dash-logo-text::before {
          content: '◈ ';
          font-size: 0.9rem;
          color: #22c55e;
        }

        .dash-topbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .dash-profile-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          padding: 0.4rem 0.85rem 0.4rem 0.4rem;
          border: 1px solid #1e3d25;
          border-radius: 999px;
          background: #0f2d18;
          transition: border-color 0.2s;
        }

        .dash-profile-link:hover { border-color: #22c55e; }

        .dash-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #1e3d25;
        }

        .dash-profile-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #86efac;
          letter-spacing: 0.01em;
        }

        /* Hamburger */
        .dash-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }

        .dash-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #4ade80;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }

        .dash-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .dash-hamburger.open span:nth-child(2) { opacity: 0; }
        .dash-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Body ── */
        .dash-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* ── Sidebar ── */
        .dash-sidebar {
          width: 220px;
          flex-shrink: 0;
          border-right: 1px solid #1e3d25;
          background: rgba(10, 26, 15, 0.6);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0.75rem;
          gap: 0.25rem;
          overflow-y: auto;
          transition: transform 0.3s ease;
        }

        .dash-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #86efac;
          text-decoration: none;
          border: 1px solid transparent;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          letter-spacing: 0.01em;
        }

        .dash-nav-link:hover {
          background: #0f2d18;
          color: #4ade80;
          border-color: #1e3d25;
        }

        .dash-nav-link.active {
          background: #0f2d18;
          color: #4ade80;
          border-color: #22c55e;
        }

        .dash-nav-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        /* ── Main area ── */
        .dash-main {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        /* Mobile overlay */
        .dash-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 40;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .dash-hamburger { display: flex; }
          .dash-profile-name { display: none; }

          .dash-sidebar {
            position: fixed;
            top: 68px;
            left: 0;
            height: calc(100vh - 68px);
            z-index: 50;
            transform: translateX(-100%);
            width: 240px;
          }

          .dash-sidebar.open {
            transform: translateX(0);
          }

          .dash-overlay.open { display: block; }
        }
      `}</style>

      <div className="dash-root">
        <div className="dash-bg" />
        <div className="dash-bg-img" />

        <div className="dash-content">

          {/* Topbar */}
          <div className="dash-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                className={`dash-hamburger${sidebarOpen ? ' open' : ''}`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <span /><span /><span />
              </button>
              <Link to="/Dashboard/mainpage" className="dash-logo">
                <img src="/leaf.png" alt="EcoTracker" />
                <span className="dash-logo-text">EcoTracker</span>
              </Link>
            </div>

            <div className="dash-topbar-right">
              <Link to="/Dashboard/profile" className="dash-profile-link">
                <img src={profileImg === "" ? "/profile.png" : profileImg} alt="Profile" className="dash-avatar" />
                {name && <span className="dash-profile-name">{name}</span>}
              </Link>
            </div>
          </div>

          {/* Body */}
          <div className="dash-body">

            {/* Mobile overlay */}
            <div
              className={`dash-overlay${sidebarOpen ? ' open' : ''}`}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <nav className={`dash-sidebar${sidebarOpen ? ' open' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`dash-nav-link${location.pathname === item.to ? ' active' : ''}`}
                >
                  <span className="dash-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Main content */}
            <main className="dash-main">
              <Outlet />
            </main>

          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  )
}

export default Dashboard
