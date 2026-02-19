import React from "react";

const Section3 = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .s3-section {
          background: #0a1a0f;
          font-family: 'Syne', sans-serif;
          padding: 5rem 2rem;
          border-bottom: 1px solid #1e3d25;
        }

        .s3-heading {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .s3-heading h2 {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0 0 0.75rem 0;
        }

        .s3-heading h2 span {
          color: #4ade80;
        }

        .s3-heading p {
          color: #86efac;
          font-size: 1rem;
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto;
          font-weight: 400;
        }

        .s3-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
        }

        .s3-card {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 0.75rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }

        .s3-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.15);
          border-color: #22c55e;
        }

        .s3-card img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 0.85rem;
          display: block;
        }

        .s3-card-side {
          flex: 1;
        }

        .s3-card-center {
          flex: 2;
          border-color: #22c55e44;
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.1);
        }

        .s3-card-center:hover {
          box-shadow: 0 24px 60px rgba(34, 197, 94, 0.25);
        }

        /* Center label badge */
        .s3-center-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .s3-center-badge span {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4ade80;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          padding: 0.2rem 0.75rem;
          border-radius: 999px;
        }

        @media (max-width: 768px) {
          .s3-section {
            padding: 3.5rem 1.5rem;
          }

          .s3-grid {
            flex-direction: column;
            max-width: 480px;
          }

          .s3-card-side,
          .s3-card-center {
            flex: unset;
            width: 100%;
          }
        }
      `}</style>

      <section className="s3-section">

        {/* Heading */}
        <div className="s3-heading">
          <h2>Dashboard <span>Experience</span></h2>
          <p>
            A clean, powerful and user-friendly dashboard to track your carbon
            footprint, analyze trends and monitor your environmental progress.
          </p>
        </div>

        {/* Image Layout */}
        <div className="s3-grid">

          {/* Left */}
          <div className="s3-card s3-card-side">
            <img src="/2.png" alt="Dashboard left" />
          </div>

          {/* Center */}
          <div className="s3-card s3-card-center">
            <div className="s3-center-badge">
              <span>✦ Main Dashboard</span>
            </div>
            <img src="/3.png" alt="Main Dashboard" />
          </div>

          {/* Right */}
          <div className="s3-card s3-card-side">
            <img src="/4.png" alt="Dashboard right" />
          </div>

        </div>
      </section>
    </>
  );
};

export default Section3;
