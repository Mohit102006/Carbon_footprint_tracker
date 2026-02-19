import React from 'react'

const cardData = [
  {
    img: "foot.png",
    title: "Track your Emissions",
    desc: "Log your daily activities and get an estimate of your carbon emissions.",
    imgClass: "card-img-sm",
  },
  {
    img: "bulb.png",
    title: "Discover ways to reduce",
    desc: "Get AI recommendations on how to reduce your carbon footprint.",
    imgClass: "card-img-md",
  },
  {
    img: "progress.png",
    title: "Monitor your progress",
    desc: "Visualize your carbon footprint over time and celebrate your success.",
    imgClass: "card-img-md",
  },
]

const Cards = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        .cards-section {
          background: #0a1a0f;
          font-family: 'Syne', sans-serif;
          padding: 5rem 2rem;
          border-bottom: 1px solid #1e3d25;
        }

        .cards-heading {
          text-align: center;
          margin-bottom: 3rem;
        }

        .cards-heading h2 {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.03em;
          margin: 0 0 0.5rem 0;
        }

        .cards-heading h2 span {
          color: #4ade80;
        }

        .cards-heading p {
          color: #4b7a5a;
          font-size: 1rem;
          font-weight: 400;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          background: #0f2d18;
          border: 1px solid #1e3d25;
          border-radius: 1.25rem;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.15);
          border-color: #22c55e;
        }

        .card-icon-wrap {
          width: 72px;
          height: 72px;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: border-color 0.3s;
        }

        .card:hover .card-icon-wrap {
          border-color: #22c55e;
        }

        .card-img-sm {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }

        .card-img-md {
          width: 44px;
          height: 44px;
          object-fit: contain;
        }

        .card h3 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #f0fdf4;
          letter-spacing: -0.01em;
          margin: 0 0 0.75rem 0;
        }

        .card p {
          font-size: 0.9rem;
          color: #86efac;
          line-height: 1.7;
          font-weight: 400;
          margin: 0;
        }

        .card-number {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #4ade80;
          background: #0a1a0f;
          border: 1px solid #1e3d25;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
          align-self: flex-start;
        }

        @media (max-width: 900px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .cards-section {
            padding: 3.5rem 1.5rem;
          }

          .cards-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
      `}</style>

      <section className="cards-section">
        <div className="cards-heading">
          <h2>How <span>EcoTracker</span> works</h2>
          <p>Three simple steps to a greener lifestyle</p>
        </div>

        <div className="cards-grid">
          {cardData.map((card, i) => (
            <div className="card" key={i}>
              <span className="card-number">0{i + 1}</span>
              <div className="card-icon-wrap">
                <img src={card.img} alt={card.title} className={card.imgClass} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Cards
