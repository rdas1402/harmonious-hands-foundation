import React from 'react';

const Approach = () => {
  return (
    <section id="approach" className="section approach">
      {/* Top Brush Decoration */}
      <div 
        className="brush-decoration top-brush"
        style={{ 
          backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
        }}
      />
      
      <div className="container">
        <h2 className="section-title">Our Holistic Approach</h2>
        
        <div className="approach-content">
          <p className="approach-description">
            With your support, we address children's critical needs by working with parents, 
            teachers, communities, and government bodies. We focus on changing behaviors at 
            the grassroots level and influencing public policy at a systemic level – thereby 
            creating an ecosystem where children are made the nation's priority.
          </p>
          
          <div className="approach-levels">
            <div className="level">
              <h3>Family</h3>
              <p>Working directly with families to create supportive environments</p>
            </div>
            
            <div className="level">
              <h3>Community</h3>
              <p>Engaging communities to become child-friendly spaces</p>
            </div>
            
            <div className="level">
              <h3>Children</h3>
              <p>Empowering children as active participants in their development</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .approach {
          position: relative;
          background: #ffffff;
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
        
        .section-title {
          color: #2c3e50;
          font-size: 2.8rem;
          margin-bottom: 30px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        .approach-content {
          position: relative;
          z-index: 2;
        }
        
        .approach-description {
          max-width: 800px;
          margin: 0 auto 50px;
          font-size: 1.1rem;
          line-height: 1.8;
          text-align: center;
          color: #555;
          background: #ffffff;
          padding: 30px;
          border-radius: 15px;
          border: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.1); /* Changed to orange */
        }
        
        .approach-levels {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        
        .level {
          text-align: center;
          padding: 40px 30px;
          background: #ffffff;
          color: #2c3e50;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.1); /* Changed to orange */
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
          position: relative;
          overflow: hidden;
        }
        
        .level:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2); /* Changed to orange */
        }
        
        .level::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #FFA500; /* Changed from #FFD700 to orange */
          border-radius: 15px 15px 0 0;
        }
        
        .level h3 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          font-weight: 700;
          color: #2c3e50;
        }
        
        .level p {
          line-height: 1.6;
          font-size: 1.05rem;
          color: #555;
        }
        
        @media (max-width: 992px) {
          .approach {
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
          .approach {
            scroll-margin-top: 70px;
          }
          
          .approach-levels {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .level {
            padding: 30px 20px;
          }
          
          .level h3 {
            font-size: 1.5rem;
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

export default Approach;