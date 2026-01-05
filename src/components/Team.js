import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaUsers, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Team = () => {
  // Board of Directors (Previously Trustees)
  const boardMembers = [
    {
      id: 1,
      name: "SriSri Dr. Pitamber Deba Goswami",
      role: "Chief Advisor",
      image: require('../assets/team/Pitamber_Deba_Goswami.avif'),
      description: "Satradhikar SriSri Anniati Satra, Majuli"
    },
    {
      id: 2,
      name: "Rinkumoni Dutta",
      role: "Director",
      image: require('../assets/team/rinku_dutta.avif'),
      description: "Oversees health and nutrition programs"
    },
    {
      id: 3,
      name: "Manoj Kumar Goswami",
      role: "Director",
      image: require('../assets/team/Manoj_Kumar_Goswami.avif'),
      description: "Preserves and promotes local cultural traditions"
    },
    {
      id: 4,
      name: "Purnakanta Borah",
      role: "Director",
      image: require('../assets/team/Purnakanta_Borah.avif'),
      description: "Creates sustainable income opportunities"
    }
  ];

  // Managing Committee (Previously Directors)
  const committeeMembers = [
    {
      id: 1,
      name: "Aditya Goswami",
      role: "President",
      image: require('../assets/team/Aditya_Goswami.avif'),
      description: "Develops holistic education programs"
    },
    {
      id: 2,
      name: "Pratap Ch. Baruah",
      role: "Vice President",
      image: require('../assets/team/Pratap_Baruah.avif'),
      description: "Manages healthcare access initiatives"
    },
    {
      id: 3,
      name: "Mahendra Dutta",
      role: "Vice President",
      image: require('../assets/team/Mahendra_Dutta.avif'),
      description: "Manages healthcare access initiatives"
    },
    {
      id: 4,
      name: "Abhi Ruhan Handique",
      role: "General Secretary",
      image: require('../assets/team/Abhi_Ruhan_Handique.avif'),
      description: "Manages healthcare access initiatives"
    },
    {
      id: 5,
      name: "Utpal Borah",
      role: "Publicity Secretary",
      image: require('../assets/team/Utpal_Borah.avif'),
      description: "Manages healthcare access initiatives"
    },
    {
      id: 6,
      name: "Sibchand Hatibaruah",
      role: "Organising Secretary",
      image: require('../assets/team/sibchand.avif'),
      description: ""
    },
    {
      id: 7,
      name: "Arindam Hazarika",
      role: "Organising Secretary",
      image: require('../assets/team/arindam.avif'),
      description: ""
    },
    {
      id: 8,
      name: "Shekhar Jyoti Hazarika",
      role: "Project Coordinator",
      image: require('../assets/team/shekhar.avif'),
      description: ""
    },
    {
      id: 9,
      name: "Tulsi Rajkhowa",
      role: "Assistant Secretary",
      image: require('../assets/team/tulsi.avif'),
      description: ""
    },
    {
      id: 10,
      name: "Kapil Borah",
      role: "Treasurer",
      image: require('../assets/team/Kapil.avif'),
      description: ""
    },
    {
      id: 11,
      name: "Kumud Chandra Das",
      role: "Spokesman",
      image: require('../assets/team/kumud.avif'),
      description: ""
    },
    {
      id: 12,
      name: "Tonkham Buragohain",
      role: "Digital & Web Coordinator",
      image: require('../assets/team/tonkham.avif'),
      description: ""
    },
    {
      id: 13,
      name: "Depanjali Bharali Bora",
      role: "Ex Member",
      image: require('../assets/team/deepanjali.avif'),
      description: ""
    },
    {
      id: 14,
      name: "Chinmoy Gogoi",
      role: "Ex Member",
      image: require('../assets/team/chinmoy.avif'),
      description: ""
    },
    {
      id: 15,
      name: "Dr. Hemanta Borah",
      role: "Ex Member",
      image: require('../assets/team/hemanta.avif'),
      description: ""
    },
    {
      id: 16,
      name: "Naba Talukdar",
      role: "Ex Member",
      image: require('../assets/team/naba.avif'),
      description: ""
    },
    {
      id: 17,
      name: "Kalyan Dutta",
      role: "Ex Member",
      image: require('../assets/team/kalyan.avif'),
      description: ""
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [boardIndex, setBoardIndex] = useState(0);
  const [membersPerView, setMembersPerView] = useState(2);
  const [activeTab, setActiveTab] = useState('board');

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + membersPerView >= committeeMembers.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? committeeMembers.length - membersPerView : prevIndex - 1
    );
  };

  const nextBoardSlide = () => {
    setBoardIndex((prevIndex) => 
      prevIndex + membersPerView >= boardMembers.length ? 0 : prevIndex + 1
    );
  };

  const prevBoardSlide = () => {
    setBoardIndex((prevIndex) => 
      prevIndex === 0 ? boardMembers.length - membersPerView : prevIndex - 1
    );
  };

  // Update members per view based on screen size
  useEffect(() => {
    const updateMembersPerView = () => {
      if (window.innerWidth < 768) {
        setMembersPerView(1);
      } else if (window.innerWidth < 992) {
        setMembersPerView(2);
      } else {
        setMembersPerView(2);
      }
    };

    updateMembersPerView();
    window.addEventListener('resize', updateMembersPerView);
    return () => window.removeEventListener('resize', updateMembersPerView);
  }, []);

  const visibleCommitteeMembers = committeeMembers.slice(currentIndex, currentIndex + membersPerView);
  const visibleBoardMembers = boardMembers.slice(boardIndex, boardIndex + membersPerView);

  return (
    <section id="team" className="section team">
      {/* Top Brush Decoration */}
      <div 
        className="brush-decoration top-brush"
        style={{ 
          backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
        }}
      />
      
      {/* Background Painting Effect with orange color */}
      <div className="painting-background">
        <div className="paint-layer paint-layer-1"></div>
        <div className="paint-layer paint-layer-2"></div>
        <div className="paint-layer paint-layer-3"></div>
        <div className="paint-layer paint-layer-4"></div>
      </div>
      
      <div className="container">
        {/* Section Header */}
        <div className="team-header">
          <h2 className="section-title">Our Team</h2>
          <div className="team-header-divider"></div>
          <p className="team-subtitle">
            Meet the passionate individuals driving change at Harmonious Hands Foundation
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="team-tabs">
          <button 
            className={`team-tab ${activeTab === 'board' ? 'active' : ''}`}
            onClick={() => setActiveTab('board')}
          >
            <FaUsers className="tab-icon" />
            Board of Directors
          </button>
          <button 
            className={`team-tab ${activeTab === 'committee' ? 'active' : ''}`}
            onClick={() => setActiveTab('committee')}
          >
            <FaQuoteLeft className="tab-icon" />
            Managing Committee
          </button>
        </div>
        
        {/* Board of Directors Panel (Now First) */}
        {activeTab === 'board' && (
          <div className="team-unified-panel">
            {/* Left Column - Board Description */}
            <div className="committee-column">
              <div className="committee-card">
                <div className="committee-header">
                  <div className="committee-icon">
                    <FaUsers />
                  </div>
                  <h3>Board of Directors</h3>
                </div>
                <div className="committee-content">
                  <p>
                    Harmonious Hands Foundation's leadership collective which provides strategic 
                    direction and oversees organizational governance. Our Board of Directors 
                    brings together diverse expertise to drive meaningful change and ensure 
                    ethical governance across all initiatives.
                  </p>
                  <div className="committee-stats">
                    <div className="stat-item">
                      <span className="stat-number">{boardMembers.length}</span>
                      <span className="stat-label">Dedicated Members</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">45+</span>
                      <span className="stat-label">Years Combined Experience</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">100%</span>
                      <span className="stat-label">Commitment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Board Members with Navigation */}
            <div className="members-column">
              <div className="team-members-section">
                <div className="team-members-header">
                  <h3>Our Directors</h3>
                  <div className="team-counter">
                    {boardIndex + 1}-{Math.min(boardIndex + membersPerView, boardMembers.length)} of {boardMembers.length}
                  </div>
                </div>
                
                <div className="team-members-navigation">
                  {/* Left Arrow Button */}
                  <button 
                    className="arrow-btn left-arrow" 
                    onClick={prevBoardSlide}
                    aria-label="Previous board members"
                  >
                    <FaArrowLeft />
                  </button>
                  
                  {/* Board Members Grid */}
                  <div className="team-members-grid">
                    {visibleBoardMembers.map((member) => (
                      <div key={member.id} className="team-member-card">
                        <div className="member-image-container">
                          <div className="member-image-wrapper">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="member-photo"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/400x500?text=Member+Photo';
                              }}
                            />
                          </div>
                          <div className="member-badge">
                            <span className="badge-text">{member.role}</span>
                          </div>
                        </div>
                        <div className="member-info">
                          <h4>{member.name}</h4>
                          <p className="member-description">{member.description}</p>
                          <div className="member-divider"></div>
                          <div className="member-contact">
                            <span className="contact-label">Role:</span>
                            <span className="contact-value">{member.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Right Arrow Button */}
                  <button 
                    className="arrow-btn right-arrow" 
                    onClick={nextBoardSlide}
                    aria-label="Next board members"
                  >
                    <FaArrowRight />
                  </button>
                </div>
                
                <div className="team-dots">
                  {Array.from({ length: Math.ceil(boardMembers.length / membersPerView) }).map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${Math.floor(boardIndex / membersPerView) === index ? 'active' : ''}`}
                      onClick={() => setBoardIndex(index * membersPerView)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Managing Committee Panel (Now Second) */}
        {activeTab === 'committee' && (
          <div className="team-unified-panel">
            {/* Left Column - Managing Committee Description */}
            <div className="committee-column">
              <div className="committee-card">
                <div className="committee-header">
                  <div className="committee-icon">
                    <FaQuoteLeft />
                  </div>
                  <h3>Managing Committee</h3>
                </div>
                <div className="committee-content">
                  <p className="committee-description">
                    Harmonious Hands Foundation's executive team comprising Regional and 
                    Functional Directors who provide day-to-day leadership and implement 
                    strategic objectives. Our Managing Committee brings together specialized 
                    expertise to drive operational excellence in communities across the region.
                  </p>
                  <div className="committee-stats">
                    <div className="stat-item">
                      <span className="stat-number">{committeeMembers.length}</span>
                      <span className="stat-label">Expert Directors</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">15+</span>
                      <span className="stat-label">Years Combined Experience</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">15+</span>
                      <span className="stat-label">Projects Managed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Committee Members with Navigation */}
            <div className="members-column">
              <div className="team-members-section">
                <div className="team-members-header">
                  <h3>Our Committee Members</h3>
                  <div className="team-counter">
                    {currentIndex + 1}-{Math.min(currentIndex + membersPerView, committeeMembers.length)} of {committeeMembers.length}
                  </div>
                </div>
                
                <div className="team-members-navigation">
                  {/* Left Arrow Button */}
                  <button 
                    className="arrow-btn left-arrow" 
                    onClick={prevSlide}
                    aria-label="Previous committee members"
                  >
                    <FaArrowLeft />
                  </button>
                  
                  {/* Committee Members Grid */}
                  <div className="team-members-grid">
                    {visibleCommitteeMembers.map((member) => (
                      <div key={member.id} className="team-member-card">
                        <div className="member-image-container">
                          <div className="member-image-wrapper">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="member-photo"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/400x500?text=Member+Photo';
                              }}
                            />
                          </div>
                          <div className="member-badge">
                            <span className="badge-text">{member.role}</span>
                          </div>
                        </div>
                        <div className="member-info">
                          <h4>{member.name}</h4>
                          <p className="member-description">{member.description}</p>
                          <div className="member-divider"></div>
                          <div className="member-contact">
                            <span className="contact-label">Role:</span>
                            <span className="contact-value">{member.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Right Arrow Button */}
                  <button 
                    className="arrow-btn right-arrow" 
                    onClick={nextSlide}
                    aria-label="Next committee members"
                  >
                    <FaArrowRight />
                  </button>
                </div>
                
                <div className="team-dots">
                  {Array.from({ length: Math.ceil(committeeMembers.length / membersPerView) }).map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${Math.floor(currentIndex / membersPerView) === index ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index * membersPerView)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .team {
          position: relative;
          scroll-margin-top: 95px;
          padding: 80px 0;
          color: #333;
          overflow: hidden;
          background: #ffffff;
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
        
        /* Painting Background Effect with orange color */
        .painting-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          overflow: hidden;
        }
        
        .paint-layer {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.08;
          animation: float 20s infinite linear;
          mix-blend-mode: multiply;
        }
        
        .paint-layer-1 {
          width: 500px;
          height: 500px;
          background: #FFA500;
          top: -200px;
          left: -100px;
          animation-delay: 0s;
        }
        
        .paint-layer-2 {
          width: 600px;
          height: 600px;
          background: #FFA500;
          top: 50%;
          right: -200px;
          transform: translateY(-50%);
          animation-delay: -5s;
          animation-direction: reverse;
        }
        
        .paint-layer-3 {
          width: 400px;
          height: 400px;
          background: #FFA500;
          bottom: -150px;
          left: 30%;
          animation-delay: -10s;
        }
        
        .paint-layer-4 {
          width: 300px;
          height: 300px;
          background: #FFA500;
          top: 20%;
          left: 40%;
          animation-delay: -15s;
          animation-direction: reverse;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, 20px) rotate(90deg);
          }
          50% {
            transform: translate(0, 40px) rotate(180deg);
          }
          75% {
            transform: translate(-20px, 20px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
        
        .team-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }
        
        .section-title {
          color: #2c3e50;
          font-size: 2.8rem;
          margin-bottom: 15px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
        
        .team-header-divider {
          width: 100px;
          height: 4px;
          background: #FFA500;
          margin: 0 auto 20px;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(255, 165, 0, 0.3);
        }
        
        .team-subtitle {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          color: #2c3e50;
          font-size: 1.2rem;
          line-height: 1.6;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.9);
          padding: 15px 30px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);
        }
        
        /* Tab Navigation */
        .team-tabs {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
          z-index: 2;
          position: relative;
        }
        
        .team-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 165, 0, 0.3);
          border-radius: 50px;
          padding: 15px 30px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.1);
        }
        
        .team-tab:hover {
          background: rgba(255, 165, 0, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 165, 0, 0.2);
        }
        
        .team-tab.active {
          background: #FFA500;
          color: #2c3e50;
          box-shadow: 0 6px 20px rgba(255, 165, 0, 0.4);
        }
        
        .tab-icon {
          font-size: 1.2rem;
        }
        
        /* SINGLE UNIFIED PANEL */
        .team-unified-panel {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          overflow: visible;
          position: relative;
          min-height: 600px;
          z-index: 2;
          width: 100%;
        }
        
        .team-unified-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: #FFA500;
        }
        
        /* Left Column Styles */
        .committee-column {
          padding: 40px;
          border-right: 1px solid rgba(255, 165, 0, 0.3);
          background: rgba(255, 255, 255, 0.95);
          width: 100%;
          overflow: visible;
        }
        
        .committee-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .committee-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          width: 100%;
        }
        
        .committee-icon {
          background: #FFA500;
          color: #2c3e50;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.4);
          flex-shrink: 0;
        }
        
        .committee-header h3 {
          color: #2c3e50;
          font-size: 1.8rem;
          margin: 0;
          font-weight: 700;
          line-height: 1.3;
          word-wrap: break-word;
        }
        
        .committee-content {
          flex: 1;
          width: 100%;
        }
        
        .committee-description {
          color: #555;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 30px;
          width: 100%;
          word-wrap: break-word;
        }
        
        .committee-content p {
          color: #555;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 30px;
          width: 100%;
          word-wrap: break-word;
        }
        
        .committee-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          background: rgba(255, 165, 0, 0.15);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 165, 0, 0.3);
          margin-bottom: 35px;
          width: 100%;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 0;
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #2c3e50;
          line-height: 1;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(255, 165, 0, 0.3);
          display: block;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.3;
          display: block;
        }
        
        /* Right Column Styles - Team Members */
        .members-column {
          padding: 40px;
          overflow: visible;
          width: 100%;
        }
        
        .team-members-section {
          height: 100%;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .team-members-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          width: 100%;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .team-members-header h3 {
          color: #2c3e50;
          font-size: 1.8rem;
          margin: 0;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .team-counter {
          color: #2c3e50;
          font-weight: 600;
          font-size: 0.9rem;
          background: rgba(255, 165, 0, 0.2);
          padding: 8px 18px;
          border-radius: 25px;
          border: 1px solid rgba(255, 165, 0, 0.3);
          flex-shrink: 0;
        }
        
        /* Navigation and Team Members - FIXED ARROW POSITIONING */
        .team-members-navigation {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 30px;
          width: 100%;
          position: relative;
        }
        
        .arrow-btn {
          background: #FFA500;
          color: #2c3e50;
          border: none;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.3rem;
          box-shadow: 0 5px 20px rgba(255, 165, 0, 0.4);
          flex-shrink: 0;
          position: relative;
          z-index: 10;
        }
        
        .arrow-btn:hover {
          background: #FF8C00;
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(255, 165, 0, 0.6);
        }
        
        /* Ensure both arrows are visible */
        .left-arrow, .right-arrow {
          visibility: visible;
          opacity: 1;
          display: flex;
        }
        
        .team-members-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 35px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        
        .team-member-card {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(255, 165, 0, 0.2);
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 165, 0, 0.3);
          display: flex;
          flex-direction: column;
          height: auto;
          min-height: 480px;
          width: 100%;
        }
        
        .team-member-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 45px rgba(255, 165, 0, 0.3);
          border-color: #FFA500;
        }
        
        .member-image-container {
          position: relative;
          height: 280px;
          overflow: hidden;
          flex-shrink: 0;
          width: 100%;
        }
        
        .member-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .member-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.6s ease;
          display: block;
        }
        
        .team-member-card:hover .member-photo {
          transform: scale(1.05);
        }
        
        .member-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 165, 0, 0.95);
          color: #2c3e50;
          padding: 12px 15px;
          text-align: center;
          backdrop-filter: blur(5px);
          z-index: 2;
        }
        
        .badge-text {
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.5px;
        }
        
        .member-info {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .member-info h4 {
          color: #2c3e50;
          font-size: 1.3rem;
          margin: 0 0 12px 0;
          font-weight: 700;
          line-height: 1.4;
          min-height: 40px;
          word-wrap: break-word;
        }
        
        .member-description {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
          word-wrap: break-word;
        }
        
        .member-divider {
          height: 2px;
          background: linear-gradient(90deg, #FFA500, transparent);
          margin: 18px 0;
          border-radius: 1px;
        }
        
        .member-contact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          width: 100%;
        }
        
        .contact-label {
          color: #888;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .contact-value {
          color: #2c3e50;
          font-weight: 700;
          font-size: 0.95rem;
          background: rgba(255, 165, 0, 0.15);
          padding: 6px 15px;
          border-radius: 20px;
          border: 1px solid rgba(255, 165, 0, 0.4);
        }
        
        .team-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid rgba(255, 165, 0, 0.3);
          width: 100%;
          flex-wrap: wrap;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          flex-shrink: 0;
        }
        
        .dot.active {
          background: #FFA500;
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(255, 165, 0, 0.5);
        }
        
        .dot:hover {
          background: #FFA500;
        }
        
        /* Responsive Design - FIXED FOR MOBILE */
        @media (max-width: 1200px) {
          .team-unified-panel {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          
          .committee-column {
            border-right: none;
            border-bottom: 1px solid rgba(255, 165, 0, 0.3);
          }
          
          .team-members-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .team-member-card {
            min-height: 450px;
          }
          
          .member-image-container {
            height: 260px;
          }
        }
        
        @media (max-width: 992px) {
          .team {
            padding: 60px 0;
            scroll-margin-top: 70px;
          }
          
          .section-title {
            font-size: 2.3rem;
          }
          
          .team-tabs {
            gap: 15px;
            flex-wrap: wrap;
          }
          
          .team-tab {
            padding: 12px 25px;
            font-size: 1rem;
          }
          
          .team-members-grid {
            grid-template-columns: 1fr;
            gap: 25px;
            margin: 0 auto;
          }
          
          .committee-stats {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .arrow-btn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }
          
          .brush-decoration {
            height: 100px;
          }
          
          .team-member-card {
            min-height: 460px;
            margin-bottom: 20px;
          }
          
          .member-image-container {
            height: 270px;
          }
          
          .team-unified-panel {
            margin: 0;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(255, 165, 0, 0.15);
            border: 1px solid rgba(255, 165, 0, 0.2);
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
            padding: 0 10px;
            text-align: center;
          }
          
          .team-subtitle {
            font-size: 1.1rem;
            padding: 15px 20px;
            margin: 0 10px;
          }
          
          .team-tabs {
            flex-direction: row;
            align-items: center;
            gap: 10px;
            padding: 0 15px;
            justify-content: center;
          }
          
          .team-tab {
            width: auto;
            max-width: none;
            justify-content: center;
            padding: 12px 20px;
            font-size: 0.95rem;
          }
          
          .team-unified-panel {
            border-radius: 15px;
            margin: 0;
            overflow: visible;
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          
          .committee-column,
          .members-column {
            padding: 25px 20px;
            width: 100%;
          }
          
          .committee-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 15px;
          }
          
          .committee-header {
            flex-direction: row;
            text-align: left;
            gap: 15px;
          }
          
          .committee-header h3 {
            font-size: 1.6rem;
          }
          
          .committee-description {
            font-size: 1rem;
            line-height: 1.7;
          }
          
          .committee-content p {
            font-size: 1rem;
            line-height: 1.7;
          }
          
          .team-members-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .arrow-btn {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
            position: static;
            display: flex;
            visibility: visible;
            opacity: 1;
          }
          
          .team-members-navigation {
            gap: 15px;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          
          .team-members-grid {
            order: 2;
            width: 100%;
            margin: 0;
          }
          
          .left-arrow {
            order: 1;
          }
          
          .right-arrow {
            order: 3;
          }
          
          .team-member-card {
            min-height: 420px;
            margin: 0;
          }
          
          .member-image-container {
            height: 220px;
          }
          
          .brush-decoration {
            height: 80px;
          }
          
          .container {
            padding-left: 15px;
            padding-right: 15px;
            width: 100%;
            max-width: 100%;
          }
          
          .team-members-grid {
            width: 100%;
          }
          
          .stat-number {
            font-size: 1.8rem;
          }
          
          .stat-label {
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
            padding: 0 10px;
          }
          
          .committee-column,
          .members-column {
            padding: 20px 15px;
          }
          
          .committee-header h3,
          .team-members-header h3 {
            font-size: 1.5rem;
          }
          
          .committee-header {
            gap: 12px;
          }
          
          .committee-icon {
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
          }
          
          .arrow-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            display: flex;
            visibility: visible;
            opacity: 1;
          }
          
          .team-members-grid {
            gap: 20px;
            margin: 0;
            width: 100%;
          }
          
          .brush-decoration {
            height: 60px;
          }
          
          .team-member-card {
            min-height: 380px;
            margin: 0;
          }
          
          .member-image-container {
            height: 200px;
          }
          
          .member-info {
            padding: 20px 15px;
          }
          
          .member-info h4 {
            font-size: 1.2rem;
          }
          
          .member-description {
            font-size: 0.9rem;
            line-height: 1.5;
          }
          
          .committee-description {
            font-size: 0.95rem;
            line-height: 1.6;
          }
          
          .committee-content p {
            font-size: 0.95rem;
            line-height: 1.6;
          }
          
          .stat-number {
            font-size: 1.6rem;
          }
          
          .stat-label {
            font-size: 0.8rem;
          }
          
          .committee-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 12px;
          }
          
          .team-members-navigation {
            gap: 10px;
          }
        }
        
        @media (max-width: 360px) {
          .team-member-card {
            min-height: 350px;
          }
          
          .member-image-container {
            height: 180px;
          }
          
          .committee-description {
            font-size: 0.9rem;
          }
          
          .committee-content p {
            font-size: 0.9rem;
          }
          
          .team-tab {
            padding: 10px 15px;
            font-size: 0.9rem;
          }
          
          .committee-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            padding: 10px;
          }
          
          .stat-number {
            font-size: 1.5rem;
          }
          
          .stat-label {
            font-size: 0.75rem;
          }
          
          .arrow-btn {
            width: 35px;
            height: 35px;
            font-size: 0.9rem;
          }
          
          .team-members-navigation {
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
};

export default Team;