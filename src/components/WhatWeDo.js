import React from 'react';
import '../styles/components/WhatWeDo.css';

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
    </section>
  );
};

export default WhatWeDo;