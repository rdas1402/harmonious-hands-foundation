import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Harmonious Hands Foundation</h2>
            
            <div className="mission-statement">
              <p>
                At <strong>Harmonious Hands Foundation</strong>, we are convinced that genuine change 
                starts when communities come together. Nurtured in Assam and extending across borders, 
                we are a Section 8 nonprofit company dedicated to nurturing a humane, inclusive, and 
                sustainable future for everyone.
              </p>
              
              <p>
                Our purpose is to empower marginalized societies, conserve cultural heritage, foster 
                holistic education, enhance access to healthcare, and develop sustainable livelihoods.
              </p>
              
              <p className="highlight">
                Harmonious Hands Foundation is a Section 8 nonprofit organization rooted in Assam, 
                dedicated to creating inclusive, sustainable, and empowered communities. We work at 
                the intersection of education, culture, health, environment, and livelihoods.
              </p>
            </div>
          </div>
          
          <div className="about-image">
            <img 
              src={require('../assets/events/cm_event/cm_event_1.webp')} 
              alt="Harmonious Hands Foundation Event" 
            />
            <img 
              src={require('../assets/events/cm_event/cm_event_2.webp')} 
              alt="Community Engagement" 
              className="secondary-image"
            />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .about {
          position: relative;
          padding: 80px 0;
          background: linear-gradient(to bottom, #fffaf0, #ffffff);
          scroll-margin-top: 95px;
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
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .section-title {
          color: #2c3e50;
          font-size: 2.8rem;
          margin-bottom: 25px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
        
        .mission-statement p {
          margin-bottom: 20px;
          line-height: 1.8;
          color: #555;
          font-size: 1.1rem;
        }
        
        .highlight {
          background: rgba(255, 165, 0, 0.15); /* Changed from rgba(255, 215, 0, 0.15) to orange */
          padding: 25px;
          border-left: 4px solid #FFA500; /* Changed from #FFD700 to orange */
          border-radius: 5px;
          margin: 30px 0;
          color: #2c3e50;
        }
        
        .contact-info {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.15); /* Changed to orange */
          margin-top: 40px;
          border: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
        }
        
        .contact-info h3 {
          color: #2c3e50;
          margin-bottom: 25px;
          font-size: 1.5rem;
          font-weight: 700;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(255, 165, 0, 0.3); /* Changed to orange */
        }
        
        .contact-details {
          display: grid;
          gap: 20px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          background: rgba(255, 165, 0, 0.05); /* Changed to orange */
          padding-left: 10px;
          border-radius: 8px;
        }
        
        .contact-item:last-child {
          border-bottom: none;
        }
        
        .contact-icon {
          font-size: 1.5rem;
          min-width: 40px;
          color: #2c3e50;
        }
        
        .contact-item span {
          color: #2c3e50;
          font-weight: 500;
        }
        
        .about-image {
          position: relative;
        }
        
        .about-image img {
          width: 100%;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2); /* Changed to orange */
          border: 1px solid rgba(255, 165, 0, 0.2); /* Changed to orange */
        }
        
        .secondary-image {
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 60%;
          border: 5px solid white;
          transform: rotate(5deg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        @media (max-width: 992px) {
          .about {
            scroll-margin-top: 70px;
            padding: 60px 0;
          }
          
          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .section-title {
            font-size: 2.3rem;
          }
          
          .secondary-image {
            display: none;
          }
          
          .brush-decoration {
            height: 100px;
          }
        }
        
        @media (max-width: 768px) {
          .contact-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .contact-icon {
            font-size: 1.3rem;
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
          
          .contact-info {
            padding: 20px;
          }
          
          .brush-decoration {
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;