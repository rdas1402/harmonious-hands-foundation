import React from 'react';
import '../styles/components/About.css';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title" style={{ fontWeight: '500' }}>About Harmonious Hands Foundation</h2>
            
            <div className="mission-statement" style={{ marginTop: '100px' }}>
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
    </section>
  );
};

export default About;