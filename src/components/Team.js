import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaUsers, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/components/Team.css';

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

  // Managing Committee (Previously Directors) – All descriptions added
  const committeeMembers = [
    {
      id: 1,
      name: "Aditya Goswami",
      role: "Advisor",
      image: require('../assets/team/Aditya_Goswami.avif'),
      description: "Provides strategic guidance and helps shape the foundation's long-term vision."
    },
    {
      id: 2,
      name: "Brajen Kataki",
      role: "President",
      image: require('../assets/team/Brajen_Kataki.jpeg'),
      description: "Leads the overall governance and ensures alignment with the foundation's mission."
    },
    {
      id: 3,
      name: "Prabhat Borah Buhabhakat",
      role: "Working President",
      image: require('../assets/team/Prabhat_Borah_Buhabhakat.png'),
      description: "Manifies day-to-day operations and coordinates between different teams."
    },
    {
      id: 4,
      name: "Pratap Ch. Baruah",
      role: "Vice President",
      image: require('../assets/team/Pratap_Baruah.avif'),
      description: "Manages healthcare access initiatives and community health programs."
    },
    {
      id: 5,
      name: "Sri Sekhorjyoti Hazarika",
      role: "Vice President",
      image: require('../assets/team/shekhar.avif'),
      description: "Supports committee leadership and oversees program implementation."
    },
    {
      id: 6,
      name: "Kalyan Dutta",
      role: "General Secretary",
      image: require('../assets/team/kalyan.avif'),
      description: "Coordinates all administrative and operational functions of the foundation."
    },
    {
      id: 7,
      name: "Paban Borah",
      role: "Joint Secretary",
      image: require('../assets/team/paban_borah.jpeg'),
      description: "Assists in secretarial duties and ensures smooth communication within the team."
    },
    {
      id: 8,
      name: "Anshu Bikash Hazarika",
      role: "Joint Secretary",
      image: require('../assets/team/Anshu_Bikash_Hazarika.avif'),
      description: "Supports committee coordination and helps execute strategic decisions."
    },
    {
      id: 9,
      name: "Gajen Bhuyan",
      role: "Cultural Secretary",
      image: require('../assets/team/Gajen_Bhuyan.png'),
      transparentPhoto: true,
      description: "Coordinates cultural programs and fosters community participation in events."
    },
    {
      id: 10,
      name: "Satyajit Baruah",
      role: "Publicity Secretary",
      image: require('../assets/team/Satyajit_Baruah.png'),
      transparentPhoto: true,
      description: "Leads outreach, media relations, and public communications for the foundation."
    },
    {
      id: 11,
      name: "Abhi Ruhan Handique",
      role: "Organising Secretary",
      image: require('../assets/team/Abhi_Ruhan_Handique.avif'),
      description: "Plans and organizes foundation events, workshops, and volunteer activities."
    },
    {
      id: 12,
      name: "Nabo Talukder",
      role: "Treasurer",
      image: require('../assets/team/Nabo_Talukder.png'),
      transparentPhoto: true,
      description: "Oversees financial management, budgeting, and ensures transparent fund usage."
    },
    {
      id: 13,
      name: "Anil Kalita",
      role: "Executive Member",
      image: require('../assets/team/Anil_Kalita.png'),
      transparentPhoto: true,
      description: "Supports program planning and helps execute field-level initiatives."
    },
    {
      id: 14,
      name: "Chinmoy Gogoi",
      role: "Executive Member",
      image: require('../assets/team/chinmoy.avif'),
      description: "Contributes to project implementation and community engagement efforts."
    },
    {
      id: 15,
      name: "Dipankar Borah",
      role: "Executive Member",
      image: require('../assets/team/Dipankar_Borah.jpeg'),
      description: "Assists in monitoring and evaluation of ongoing foundation projects."
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
        
        {/* Board of Directors Panel */}
        {activeTab === 'board' && (
          <div className="team-unified-panel">
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
            
            <div className="members-column">
              <div className="team-members-section">
                <div className="team-members-header">
                  <h3>Our Directors</h3>
                  <div className="team-counter">
                    {boardIndex + 1}-{Math.min(boardIndex + membersPerView, boardMembers.length)} of {boardMembers.length}
                  </div>
                </div>
                
                <div className="team-members-navigation">
                  <button 
                    className="arrow-btn left-arrow" 
                    onClick={prevBoardSlide}
                    aria-label="Previous board members"
                  >
                    <FaArrowLeft />
                  </button>
                  
                  <div className="team-members-grid">
                    {visibleBoardMembers.map((member) => (
                      <div key={member.id} className="team-member-card">
                        <div className="member-image-container">
                          <div className="member-image-wrapper">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className={`member-photo ${member.transparentPhoto ? 'member-photo--transparent' : ''}`}
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
                          {member.description && (
                            <p className="member-description">{member.description}</p>
                          )}
                          <div className="member-divider"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
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

        {/* Managing Committee Panel */}
        {activeTab === 'committee' && (
          <div className="team-unified-panel">
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
                      <span className="stat-label">Committee Members</span>
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
            
            <div className="members-column">
              <div className="team-members-section">
                <div className="team-members-header">
                  <h3>Our Committee Members</h3>
                  <div className="team-counter">
                    {currentIndex + 1}-{Math.min(currentIndex + membersPerView, committeeMembers.length)} of {committeeMembers.length}
                  </div>
                </div>
                
                <div className="team-members-navigation">
                  <button 
                    className="arrow-btn left-arrow" 
                    onClick={prevSlide}
                    aria-label="Previous committee members"
                  >
                    <FaArrowLeft />
                  </button>
                  
                  <div className="team-members-grid">
                    {visibleCommitteeMembers.map((member) => (
                      <div key={member.id} className="team-member-card">
                        <div className="member-image-container">
                          <div className="member-image-wrapper">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className={`member-photo ${member.transparentPhoto ? 'member-photo--transparent' : ''}`}
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
                        </div>
                      </div>
                    ))}
                  </div>
                  
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
    </section>
  );
};

export default Team;