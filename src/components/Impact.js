import React from 'react';

const Impact = () => {
  const impactStats = [
    { number: '1,250,000+', label: 'Children Impacted Overall' },
    { number: '94%', label: 'Children in School (Ages 6-18)' },
    { number: '96%', label: 'Children Protected from Undernourishment' },
    { number: '92%', label: 'Adolescent Girls Continuing Education' }
  ];

  return (
    <section id="impact" className="section impact">
      {/* Top Brush Decoration */}
      <div 
        className="brush-decoration top-brush"
        style={{ 
          backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
        }}
      />
      
      <div className="container">
        <h2 className="section-title">Impact You Helped Us Achieve</h2>
        
        <div className="impact-stats">
          {impactStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="impact-note">
          <p>
            *Data based on our annual impact assessment reports. Each percentage represents 
            real change in children's lives through education, nutrition, and protection programs.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .impact {
          position: relative;
          background: linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%); /* Changed to orange */
          color: #2c3e50;
          scroll-margin-top: 95px;
          padding: 80px 0;
          border-top: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
          border-bottom: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
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
        
        .impact-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }
        
        .stat-card {
          text-align: center;
          padding: 40px 20px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.15); /* Changed to orange */
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 165, 0, 0.3); /* Changed to orange */
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #FFA500; /* Changed from #FFD700 to orange */
          border-radius: 15px 15px 0 0;
        }
        
        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.25); /* Changed to orange */
          border-color: #FFA500; /* Changed to orange */
        }
        
        .stat-number {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 15px;
          color: #2c3e50;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .stat-label {
          font-size: 1.1rem;
          line-height: 1.4;
          color: #2c3e50;
          font-weight: 600;
        }
        
        .impact-note {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          font-size: 0.95rem;
          padding-top: 30px;
          border-top: 2px solid rgba(255, 165, 0, 0.3); /* Changed to orange */
          color: #2c3e50;
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.8);
          padding: 25px;
          border-radius: 10px;
          border: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
        }
        
        @media (max-width: 992px) {
          .impact {
            scroll-margin-top: 70px;
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2.3rem;
          }
          
          .brush-decoration {
            height: 100px;
          }
          
          .stat-number {
            font-size: 2.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .impact {
            scroll-margin-top: 70px;
          }
          
          .impact-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .stat-number {
            font-size: 2.2rem;
          }
          
          .stat-label {
            font-size: 1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .brush-decoration {
            height: 80px;
          }
        }
        
        @media (max-width: 480px) {
          .impact-stats {
            grid-template-columns: 1fr;
          }
          
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

export default Impact;