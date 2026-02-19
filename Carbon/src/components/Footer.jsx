import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .footer {
          background: #0a1a0f;
          font-family: 'Syne', sans-serif;
          border-top: 1px solid #1e3d25;
          padding: 2.5rem 2rem;
          position: relative;
        }

        .footer-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #22c55e, transparent);
          opacity: 0.6;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        /* Logo */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .footer-logo-icon {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 0.6rem;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-logo-icon img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        .footer-logo-text {
          font-size: 1.3rem;
          font-weight: 800;
          color: #4ade80;
          letter-spacing: -0.03em;
        }

        .footer-logo-text::before {
          content: '◈ ';
          font-size: 0.9rem;
          color: #22c55e;
        }

        /* Developer */
        .footer-dev {
          text-align: center;
          flex: 1;
          min-width: 160px;
        }

        .footer-dev p {
          color: #4b7a5a;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          margin: 0 0 0.2rem 0;
        }

        .footer-dev strong {
          color: #86efac;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        /* Social */
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 0.6rem;
          color: #86efac;
          font-size: 1.1rem;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }

        .footer-social-link:hover {
          border-color: #22c55e;
          color: #4ade80;
          transform: translateY(-2px);
        }

        /* Divider + copyright */
        .footer-bottom {
          max-width: 1200px;
          margin: 1.75rem auto 0;
          padding-top: 1.25rem;
          border-top: 1px solid #1e3d25;
          text-align: center;
          color: #2d5a38;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        @media (max-width: 600px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }

          .footer-dev {
            order: 2;
          }

          .footer-socials {
            order: 3;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-glow" />

        <div className="footer-inner">

          {/* Logo */}
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <img src="/leaf.png" alt="EcoTracker Logo" />
            </div>
            <span className="footer-logo-text">EcoTracker</span>
          </div>

          {/* Developer */}
          <div className="footer-dev">
            <p>Developed with 🌿 by</p>
            <strong>Mohit Kumar Soni</strong>
          </div>

          {/* Social Icons */}
          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/in/mohit-kumar-soni-8129b6388"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Mohit102006"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} EcoTracker • All Rights Reserved
        </div>
      </footer>
    </>
  )
}

export default Footer
