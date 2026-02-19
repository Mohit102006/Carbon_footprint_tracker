import React from 'react'

const cards = [
  {
    icon: "🌍",
    title: "Our Mission",
    desc: "To reduce global carbon emissions by helping people understand and manage their environmental impact through smart tracking tools.",
    num: "01",
  },
  {
    icon: "💡",
    title: "Our Vision",
    desc: "We envision a world where every individual actively contributes to sustainability using technology-driven environmental solutions.",
    num: "02",
  },
  {
    icon: "📈",
    title: "Our Impact",
    desc: "EcoTracker has helped users monitor emissions, adopt eco-friendly habits, and significantly lower their carbon footprint over time.",
    num: "03",
  },
]

const whyItems = [
  { icon: "⚡", text: "Real-time carbon tracking" },
  { icon: "🎯", text: "Personalized reduction tips" },
  { icon: "📊", text: "Progress monitoring" },
  { icon: "📋", text: "Beautiful reports" },
]

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .about-page {
          background: #0a1a0f;
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          padding: 5rem 2rem;
        }

        /* Hero heading */
        .about-hero {
          max-width: 1200px;
          margin: 0 auto 4rem;
          text-align: center;
        }

        .about-badge {
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

        .about-hero h1 {
          font-size: clamp(2.25rem, 5vw, 3.75rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0 0 1.25rem 0;
        }

        .about-hero h1 span {
          color: #4ade80;
        }

        .about-hero p {
          color: #86efac;
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.75;
          max-width: 640px;
          margin: 0 auto;
          font-weight: 400;
        }

        /* Cards grid */
        .about-grid {
          max-width: 1200px;
          margin: 0 auto 5rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .about-card {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .about-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.15);
          border-color: #22c55e;
        }

        .about-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .about-card-icon {
          font-size: 2rem;
          line-height: 1;
        }

        .about-card-num {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #4ade80;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
        }

        .about-card h2 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.01em;
          margin: 0 0 0.75rem 0;
        }

        .about-card p {
          font-size: 0.9rem;
          color: #86efac;
          line-height: 1.7;
          font-weight: 400;
          margin: 0;
        }

        /* Why section */
        .about-why {
          max-width: 900px;
          margin: 0 auto;
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.5rem;
          padding: 3rem 2.5rem;
          text-align: center;
        }

        .about-why h2 {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0 0 0.75rem 0;
        }

        .about-why h2 span {
          color: #4ade80;
        }

        .about-why > p {
          color: #86efac;
          font-size: 1rem;
          line-height: 1.7;
          margin: 0 auto 2.5rem;
          max-width: 560px;
        }

        .about-why-items {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .about-why-item {
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 0.85rem;
          padding: 1.25rem 0.75rem;
          transition: border-color 0.2s, transform 0.2s;
        }

        .about-why-item:hover {
          border-color: #22c55e;
          transform: translateY(-3px);
        }

        .about-why-item .why-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        .about-why-item p {
          font-size: 0.8rem;
          font-weight: 700;
          color: #86efac;
          margin: 0;
          letter-spacing: 0.02em;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-why-items {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .about-page {
            padding: 3.5rem 1.5rem;
          }

          .about-grid {
            grid-template-columns: 1fr;
          }

          .about-why {
            padding: 2rem 1.5rem;
          }

          .about-why-items {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="about-page">

        {/* Header */}
        <div className="about-hero">
          <span className="about-badge">🌱 Who we are</span>
          <h1>About <span>EcoTracker</span></h1>
          <p>
            EcoTracker helps individuals track, analyze and reduce their carbon
            footprint. Our mission is to create a greener future by empowering
            people with awareness and smart environmental insights.
          </p>
        </div>

        {/* Cards */}
        <div className="about-grid">
          {cards.map((card) => (
            <div className="about-card" key={card.num}>
              <div className="about-card-top">
                <span className="about-card-icon">{card.icon}</span>
                <span className="about-card-num">{card.num}</span>
              </div>
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Why section */}
        <div className="about-why">
          <h2>Why Choose <span>EcoTracker?</span></h2>
          <p>
            Real-time carbon tracking, personalized reduction tips, progress
            monitoring, and beautiful reports — everything you need to live a more
            sustainable lifestyle.
          </p>
          <div className="about-why-items">
            {whyItems.map((item) => (
              <div className="about-why-item" key={item.text}>
                <span className="why-icon">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default About
