import React from 'react';
import '../styles/components/Impact.css';

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
    </section>
  );
};

export default Impact;