import React from 'react'
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .hero-section {
          background: #0a1a0f;
          min-height: calc(100vh - 68px);
          display: flex;
          align-items: center;
          font-family: 'Syne', sans-serif;
          border-bottom: 1px solid #1e3d25;
        }

        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }

        .hero-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4ade80;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800;
          color: #f0fdf4;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 1.25rem 0;
        }

        .hero-title span {
          color: #4ade80;
        }

        .hero-desc {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: #86efac;
          line-height: 1.7;
          margin: 0 0 2rem 0;
          max-width: 420px;
          font-weight: 400;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          background: #22c55e;
          color: #0a1a0f;
          border: none;
          padding: 0.75rem 1.75rem;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .hero-btn-primary:hover {
          background: #4ade80;
          transform: translateY(-2px);
        }

        .hero-btn-secondary {
          background: none;
          border: none;
          color: #86efac;
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s;
          padding: 0;
        }

        .hero-btn-secondary:hover {
          color: #4ade80;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid #1e3d25;
        }

        .hero-stat-val {
          font-size: 1.4rem;
          font-weight: 800;
          color: #4ade80;
          display: block;
        }

        .hero-stat-label {
          font-size: 0.75rem;
          color: #4b7a5a;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-image-wrap {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
        }

        .hero-image-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, #22c55e22 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-image-wrap img {
          width: 100%;
          max-width: 460px;
          height: auto;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 40px #22c55e33);
        }

        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: column-reverse;
            text-align: center;
            align-items: center;
            padding: 3rem 2rem;
          }

          .hero-text {
            align-items: center;
          }

          .hero-desc {
            max-width: 500px;
          }

          .hero-image-wrap {
            justify-content: center;
            width: 100%;
          }

          .hero-image-wrap img {
            max-width: 320px;
          }

          .hero-image-glow {
            width: 300px;
            height: 300px;
          }

          .hero-stats {
            justify-content: center;
          }
        }

        @media (max-width: 500px) {
          .hero-inner {
            padding: 2.5rem 1.5rem;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .hero-btn-primary {
            width: 100%;
            text-align: center;
          }

          .hero-image-wrap img {
            max-width: 260px;
          }

          .hero-stats {
            gap: 1.25rem;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-inner">

          {/* Left Text */}
          <div className="hero-text">
            <span className="hero-badge">🌱 Eco-Friendly Living</span>

            <h1 className="hero-title">
              Take control of your{" "}
              <span>carbon footprint</span>
            </h1>

            <p className="hero-desc">
              Track, analyze, and reduce your impact on the environment — one step at a time.
            </p>

            <div className="hero-actions">
              <Link to="/register">
                <button className="hero-btn-primary">Let's begin →</button>
              </Link>
              <Link to="/about">
                <button className="hero-btn-secondary">Learn more</button>
              </Link>
            </div>

            
          </div>

          {/* Right Image */}
          <div className="hero-image-wrap">
            <div className="hero-image-glow" />
            <img src="heroimg.png" alt="Hero" />
          </div>

        </div>
      </section>
    </>
  )
}

export default Hero
