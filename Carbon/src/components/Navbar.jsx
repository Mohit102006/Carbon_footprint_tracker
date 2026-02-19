import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .eco-nav {
          background: #0a1a0f;
          border-bottom: 1px solid #1e3d25;
          font-family: 'Syne', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0 2rem;
        }

        .eco-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        .eco-logo {
          font-size: 1.4rem;
          font-weight: 800;
          color: #4ade80;
          text-decoration: none;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .eco-logo::before {
          content: '◈';
          font-size: 1rem;
          color: #22c55e;
        }

        .eco-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
        }

        .eco-links a {
          color: #86efac;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          transition: background 0.2s, color 0.2s;
        }

        .eco-links a:hover {
          background: #1a3d22;
          color: #4ade80;
        }

        .eco-signup a {
          background: #22c55e;
          color: #0a1a0f !important;
          padding: 0.45rem 1.1rem;
          border-radius: 6px;
          font-weight: 800;
          letter-spacing: 0.06em;
          transition: background 0.2s, transform 0.15s !important;
        }

        .eco-signup a:hover {
          background: #4ade80 !important;
          color: #0a1a0f !important;
          transform: translateY(-1px);
        }

        .eco-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 8px;
        }

        .eco-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #4ade80;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }

        .eco-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .eco-hamburger.open span:nth-child(2) { opacity: 0; }
        .eco-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 700px) {
          .eco-hamburger { display: flex; }

          .eco-links {
            display: ${`${menuOpen ? 'flex' : 'none'}`};
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            background: #0a1a0f;
            border-bottom: 1px solid #1e3d25;
            padding: 0.75rem 1.5rem 1rem;
          }

          .eco-links a {
            padding: 0.65rem 0.5rem;
            border-radius: 6px;
          }

          .eco-signup {
            margin-top: 0.5rem;
          }

          .eco-signup a {
            display: block;
            text-align: center;
          }
        }
      `}</style>

      <nav className="eco-nav">
        <div className="eco-nav-inner">
          <Link to="/" className="eco-logo">EcoTracker</Link>

          <button
            className={`eco-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <ul className="eco-links" style={{ display: menuOpen ? 'flex' : undefined }}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
            <li className="eco-signup"><Link to="/register" onClick={() => setMenuOpen(false)}>Signup</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
