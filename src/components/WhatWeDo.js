import React from 'react';

const WhatWeDo = () => {
  const programs = [
    {
      title: 'Education',
      description: 'Ensuring every child has access to quality education'
    },
    {
      title: 'Health & Nutrition',
      description: 'Providing healthcare and proper nutrition for holistic development'
    },
    {
      title: 'Safety & Protection',
      description: 'Creating safe environments free from exploitation'
    },
    {
      title: 'Child Participation',
      description: 'Empowering children to voice their opinions and rights'
    }
  ];

  return (
    <section id="what-we-do" className="section what-we-do">
      {/* Top Brush Decoration */}
      <div 
        className="brush-decoration top-brush"
        style={{ 
          backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
        }}
      />
      
      <div className="container">
        <h2 className="section-title">What We Do</h2>
        
        <div className="programs-grid">
          {programs.map((program, index) => (
            <div key={index} className="program-card">
              <div className="program-icon">
                <span>{index + 1}</span>
              </div>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .what-we-do {
          position: relative;
          background: linear-gradient(to bottom, #fffaf0, #ffffff);
          scroll-margin-top: 95px;
          padding: 80px 0;
        }
        
        /* Brush Decorations */
        .brush-decoration {
          position: absolute;
          left: 0;
          right: 0;
          height: 150px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
          pointer-events: none;
        }
        
        .top-brush {
          top: 0;
          transform: rotate(180deg);
          opacity: 0.8;
        }
        
        .bottom-brush {
          bottom: 0;
          opacity: 0.8;
        }
        
        .section-title {
          color: #2c3e50;
          font-size: 2.8rem;
          margin-bottom: 50px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 2;
        }
        
        .program-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.15); /* Changed to orange */
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
          position: relative;
          overflow: hidden;
        }
        
        .program-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.25); /* Changed to orange */
        }
        
        .program-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #FFA500; /* Changed from #FFD700 to orange */
          border-radius: 15px 15px 0 0;
        }
        
        .program-icon {
          width: 70px;
          height: 70px;
          background: #FFA500; /* Changed from #FFD700 to orange */
          color: #2c3e50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 1.8rem;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(255, 165, 0, 0.4); /* Changed to orange */
        }
        
        .program-card h3 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .program-card p {
          color: #666;
          line-height: 1.6;
          font-size: 1.05rem;
        }
        
        @media (max-width: 992px) {
          .what-we-do {
            scroll-margin-top: 70px;
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2.3rem;
          }
          
          .brush-decoration {
            height: 100px;
          }
        }
        
        @media (max-width: 768px) {
          .what-we-do {
            scroll-margin-top: 70px;
          }
          
          .programs-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .program-card {
            padding: 30px 20px;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .brush-decoration {
            height: 80px;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .brush-decoration {
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;