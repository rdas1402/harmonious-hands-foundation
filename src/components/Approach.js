import React from 'react';
import '../styles/components/Approach.css';

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
    </section>
  );
};

export default Approach;