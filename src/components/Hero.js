import React from 'react';

const Hero = ({ onDonateClick }) => {
  const handleDonateClick = () => {
    if (onDonateClick) {
      onDonateClick();
    }
  };

  return (
    <>
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Harmonious Hands Foundation</h1>
            <p className="subtitle">Empowering Communities, Transforming Lives</p>
            
            <div className="hero-divider"></div>
            
            <h2>Building a Sustainable Future Together</h2>
            <p className="description">
              Join us in creating inclusive, empowered communities through education, 
              cultural preservation, healthcare access, and sustainable livelihoods.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={handleDonateClick}
              >
                Support Our Mission
              </button>
              <a href="#about" className="btn btn-secondary">
                Learn More
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Communities Served</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Lives Impacted</span>
              </div>
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-images">
          <img 
            src={require('../assets/events/cm_event/cm_event_1.webp')} 
            alt="Community Event"
            className="hero-image-1"
          />
          <img 
            src={require('../assets/events/cm_event/cm_event_2.webp')} 
            alt="Education Program"
            className="hero-image-2"
          />
          <img 
            src={require('../assets/events/cm_event/cm_event_3.webp')} 
            alt="Healthcare Initiative"
            className="hero-image-3"
          />
        </div>
        
        <style jsx>{`
          .hero {
            background: linear-gradient(rgba(44, 62, 80, 0.9), rgba(44, 62, 80, 0.9)),
                        url(${require('../assets/events/cm_event/cm_event_4.webp')});
            background-size: cover;
            background-position: center 30%;
            background-attachment: fixed;
            color: white;
            text-align: left;
            padding: 80px 0 60px;
            position: relative;
            overflow: hidden;
            margin-top: 0;
            min-height: calc(100vh - 95px);
            display: flex;
            align-items: center;
          }
          
          .hero-content {
            max-width: 800px;
            margin: 0;
            text-align: left;
          }
          
          .hero h1 {
            font-size: 3.2rem;
            margin-bottom: 15px;
            color: #ffa500;
          }
          
          .subtitle {
            font-size: 1.4rem;
            color: #ff6b6b;
            margin-bottom: 25px;
            font-weight: 500;
            text-align: left;
          }
          
          .hero-divider {
            width: 80px;
            height: 3px;
            background: #ffa500;
            margin: 25px 0;
            text-align: left;
          }
          
          .hero h2 {
            font-size: 2rem;
            margin-bottom: 20px;
            font-weight: 400;
            text-align: left;
          }
          
          .description {
            font-size: 1.1rem;
            max-width: 700px;
            margin: 0 0 35px 0;
            line-height: 1.8;
            color: #eee;
            text-align: left;
          }
          
          .hero-buttons {
            display: flex;
            gap: 20px;
            justify-content: flex-start;
            margin-bottom: 40px;
          }
          
          .btn-primary {
            background: #ffa500;
            padding: 12px 35px;
            font-size: 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            color: white;
            font-weight: 600;
            transition: all 0.3s;
          }
          
          .btn-primary:hover {
            background: #ff8c00;
            transform: translateY(-2px);
          }
          
          .btn-secondary {
            background: transparent;
            border: 2px solid #ffa500;
            color: #ffa500;
            padding: 12px 35px;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
          }
          
          .btn-secondary:hover {
            background: #ffa500;
            color: #2c3e50;
          }
          
          .hero-stats {
            display: flex;
            justify-content: flex-start;
            gap: 40px;
            flex-wrap: wrap;
            margin-top: 30px;
          }
          
          .stat {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          
          .stat-number {
            font-size: 2.2rem;
            font-weight: bold;
            color: #ffa500;
            margin-bottom: 5px;
          }
          
          .stat-label {
            font-size: 0.95rem;
            color: #ccc;
            max-width: 120px;
            line-height: 1.4;
            text-align: left;
          }
          
          .hero-images {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 10px;
            opacity: 0.3;
            padding: 15px;
          }
          
          .hero-images img {
            width: 120px;
            height: 80px;
            object-fit: cover;
            border-radius: 5px;
            border: 2px solid rgba(255,255,255,0.1);
          }
          
          @media (max-width: 768px) {
            .hero {
              padding: 60px 0 40px;
              background-attachment: scroll;
              min-height: calc(100vh - 70px);
              text-align: center;
            }
            
            .hero-content {
              margin: 0 auto;
              text-align: center;
            }
            
            .hero h1 {
              font-size: 2.2rem;
              text-align: center;
            }
            
            .hero h2 {
              font-size: 1.6rem;
              text-align: center;
            }
            
            .subtitle {
              font-size: 1.1rem;
              text-align: center;
            }
            
            .description {
              font-size: 1rem;
              text-align: center;
              margin: 0 auto 35px;
            }
            
            .hero-divider {
              margin: 25px auto;
            }
            
            .hero-buttons {
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            
            .btn-primary, .btn-secondary {
              width: 100%;
              max-width: 250px;
              padding: 10px 25px;
            }
            
            .hero-stats {
              justify-content: center;
              gap: 25px;
            }
            
            .stat {
              align-items: center;
            }
            
            .stat-number {
              font-size: 1.8rem;
            }
            
            .stat-label {
              text-align: center;
            }
            
            .hero-images {
              display: none;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;