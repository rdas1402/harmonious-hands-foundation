import React from 'react';
import '../styles/components/Hero.css';

const Hero = ({ onDonateClick, onVolunteerClick }) => {
  const handleDonateClick = () => {
    if (onDonateClick) {
      onDonateClick();
    }
  };

  const handleVolunteerClick = () => {
    if (onVolunteerClick) {
      onVolunteerClick();
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
              <button 
                className="btn btn-primary"
                onClick={handleVolunteerClick}
              >
                Join as Volunteer
              </button>
              <a href="#about" className="btn btn-primary">
                Learn More
              </a>
            </div>
            
            {/* <div className="hero-stats">
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
            </div> */}
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
      </section>
    </>
  );
};

export default Hero;