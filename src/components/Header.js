import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/components/Header.css';

const Header = ({ 
  onDonateClick, 
  onVolunteerClick, 
  expandedSection, 
  onSectionToggle, 
  onNavClick,
  forceHide = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // If forceHide is true, hide the header
    if (forceHide) {
      setIsHeaderVisible(false);
      return;
    }
    
    let ticking = false;
    
    const handleScroll = () => {
      // Don't hide header if mobile menu is open
      if (isMenuOpen) {
        setIsHeaderVisible(true);
        setIsScrolled(window.scrollY > 10);
        return;
      }
      
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsHeaderVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsHeaderVisible(true);
          }
          
          setIsScrolled(currentScrollY > 10);
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [lastScrollY, isMenuOpen, forceHide]);

  useEffect(() => {
    if (!isHeaderVisible) {
      setIsMenuOpen(false);
      document.body.classList.remove('mobile-menu-open');
      if (onSectionToggle) {
        onSectionToggle(null);
      }
    }
  }, [isHeaderVisible, onSectionToggle]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) &&
          !dropdownMenuRef.current?.contains(event.target)) {
        if (onSectionToggle) {
          onSectionToggle(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onSectionToggle]);

  // Close mobile menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutsideMobile = (event) => {
      if (isMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMobile);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMobile);
    };
  }, [isMenuOpen]);

  const handleDonateClick = (e) => {
    e.preventDefault();
    if (onDonateClick) {
      onDonateClick();
    }
    setIsMenuOpen(false);
    document.body.classList.remove('mobile-menu-open');
    if (onSectionToggle) {
      onSectionToggle(null);
    }
  };

  const handleVolunteerClick = (e) => {
    e.preventDefault();
    if (onVolunteerClick) {
      onVolunteerClick();
    }
    setIsMenuOpen(false);
    document.body.classList.remove('mobile-menu-open');
    if (onSectionToggle) {
      onSectionToggle(null);
    }
  };

  const handleNavItemClick = (sectionId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Close menu if open
    setIsMenuOpen(false);
    document.body.classList.remove('mobile-menu-open');
    
    // Close dropdown if open
    if (onSectionToggle) {
      onSectionToggle(null);
    }
    
    // Call the navigation callback
    if (onNavClick) {
      onNavClick(sectionId);
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (onSectionToggle) {
      onSectionToggle('about');
    }
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (onSectionToggle) {
        onSectionToggle(null);
      }
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (onSectionToggle) {
        onSectionToggle(null);
      }
    }, 200);
  };

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Toggle body class to prevent scrolling
    if (newMenuState) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  return (
    <>
      {/* Top Black Bar - Small Contact Header */}
      <div 
        className={`top-black-bar ${isHeaderVisible && !forceHide ? 'visible' : 'hidden'}`}
      >
        <div className="container">
          <div className="top-bar-content">
            
            {/* Logo ONLY in Top Black Bar (Left Side) - Hidden on Mobile */}
            <div className="top-bar-logo">
              <div className="logo-image">
                <img 
                  src={require('../assets/logo_10.jpeg')} 
                  alt="Harmonious Hands Foundation Logo"
                />
              </div>
            </div>
            
            <div className="top-bar-right">
              <div className="top-contact-info">
                <span className="top-contact-item">
                  <FaEnvelope className="top-icon" />
                  <a href="mailto:support@harmonioushandsfoundation.com" className="top-contact-link">
                    support@harmonioushandsfoundation.com
                  </a>
                </span>
                <span className="top-contact-item">
                  <FaPhone className="top-icon" />
                  <a href="tel:+918638656513" className="top-contact-link">
                    +91-86386-56513
                  </a>
                </span>
              </div>
              
              <div className="top-social-media">
                <span className="top-follow-text">Follow us:</span>
                <div className="social-icons-container">
                  <a href="https://www.facebook.com/profile.php?id=61583610363855" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="top-social-link">
                    <FaFacebook className="social-icon" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="top-social-link">
                    <FaTwitter className="social-icon" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="top-social-link">
                    <FaInstagram className="social-icon" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="top-social-link">
                    <FaYoutube className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main White Header - Navigation */}
      <header 
        className={`main-header ${isScrolled ? 'scrolled' : ''} ${isHeaderVisible && !forceHide ? 'visible' : 'hidden'}`}
      >
        <div className="container">
          <div className="header-content">
            {/* Menu toggle button on left for mobile */}
            <button 
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            
            {/* Mobile Logo - Visible on mobile */}
            <div className="mobile-logo-section">
              <div className="mobile-logo">
                <img 
                  src={require('../assets/logo_10.jpeg')} 
                  alt="Harmonious Hands Foundation Logo"
                  className="mobile-logo-img"
                />
              </div>
              <div className="mobile-logo-text">
                <h1 className="mobile-logo-title">Harmonious Hands Foundation</h1>
                <p className="mobile-tagline">Building Inclusive Communities</p>
              </div>
            </div>
            
            {/* Navigation moved closer to logo */}
            <div className="nav-section main-nav">
              <nav className="nav">
                <ul className="nav-menu">
                  <li>
                    <button 
                      onClick={(e) => handleNavItemClick('home', e)} 
                      className="nav-link"
                    >
                      Home
                    </button>
                  </li>
                  
                  {/* Expandable About Section - Now on hover */}
                  <li 
                    className="expandable-section"
                    ref={dropdownRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button 
                      className="nav-link expandable-toggle"
                    >
                      About Us
                      <span className="expand-icon">
                        {expandedSection === 'about' ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </button>
                    {expandedSection === 'about' && (
                      <div 
                        className="expandable-menu"
                        ref={dropdownMenuRef}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <button onClick={(e) => handleNavItemClick('about', e)} className="expandable-item">About</button>
                        <button onClick={(e) => handleNavItemClick('what-we-do', e)} className="expandable-item">What We Do</button>
                        <button onClick={(e) => handleNavItemClick('approach', e)} className="expandable-item">Our Approach</button>
                        <button onClick={(e) => handleNavItemClick('team', e)} className="expandable-item">Our Team</button>
                        <button onClick={(e) => handleNavItemClick('impact', e)} className="expandable-item">Our Impact</button>
                        <button onClick={(e) => handleNavItemClick('stories', e)} className="expandable-item">Stories</button>
                      </div>
                    )}
                  </li>
                  
                  <li>
                    <button onClick={handleVolunteerClick} className="nav-link">Volunteer</button>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Donate button moved to extreme right */}
            <div className="donate-section">
              <button 
                className="btn donate-btn"
                onClick={handleDonateClick}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Fixed with proper click handling */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        ref={mobileMenuRef}
      >
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-menu-logo">
              <img 
                src={require('../assets/logo_10.jpeg')} 
                alt="Harmonious Hands Foundation Logo"
              />
              <div className="mobile-menu-logo-text">
                <h2>Harmonious Hands Foundation</h2>
                <p>Building Inclusive Communities</p>
              </div>
            </div>
            <button 
              className="mobile-menu-close"
              onClick={() => {
                setIsMenuOpen(false);
                document.body.classList.remove('mobile-menu-open');
              }}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          
          <ul className="mobile-nav-menu">
            <li>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  document.body.classList.remove('mobile-menu-open');
                  onSectionToggle && onSectionToggle(null);
                  onNavClick && onNavClick('home');
                }} 
                className="mobile-nav-link"
              >
                Home
              </button>
            </li>
            
            <li className="mobile-expandable-section">
              <button 
                className="mobile-nav-link expandable-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Toggle between 'about' and null
                  if (onSectionToggle) {
                    onSectionToggle(expandedSection === 'about' ? null : 'about');
                  }
                }}
              >
                About Us
                <span className="expand-icon">
                  {expandedSection === 'about' ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              
              {/* FORCE DROPDOWN TO ALWAYS SHOW FOR TESTING */}
              {(expandedSection === 'about' || true) && (
                <div className="mobile-expandable-menu">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      document.body.classList.remove('mobile-menu-open');
                      onSectionToggle && onSectionToggle(null);
                      onNavClick && onNavClick('about');
                    }}
                    className="mobile-expandable-item"
                  >
                    About
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      document.body.classList.remove('mobile-menu-open');
                      onSectionToggle && onSectionToggle(null);
                      onNavClick && onNavClick('what-we-do');
                    }}
                    className="mobile-expandable-item"
                  >
                    What We Do
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      document.body.classList.remove('mobile-menu-open');
                      onSectionToggle && onSectionToggle(null);
                      onNavClick && onNavClick('approach');
                    }}
                    className="mobile-expandable-item"
                  >
                    Our Approach
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      document.body.classList.remove('mobile-menu-open');
                      onSectionToggle && onSectionToggle(null);
                      onNavClick && onNavClick('team');
                    }}
                    className="mobile-expandable-item"
                  >
                    Our Team
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      document.body.classList.remove('mobile-menu-open');
                      onSectionToggle && onSectionToggle(null);
                      onNavClick && onNavClick('impact');
                    }}
                    className="mobile-expandable-item"
                  >
                    Our Impact
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      document.body.classList.remove('mobile-menu-open');
                      onSectionToggle && onSectionToggle(null);
                      onNavClick && onNavClick('stories');
                    }}
                    className="mobile-expandable-item"
                  >
                    Stories
                  </button>
                </div>
              )}
            </li>
            
            <li>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleVolunteerClick(e);
                }} 
                className="mobile-nav-link"
              >
                Volunteer
              </button>
            </li>
            
            <li className="mobile-donate-item">
              <button 
                className="mobile-donate-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDonateClick(e);
                }}
              >
                Donate Now
              </button>
            </li>
          </ul>
          
          <div className="mobile-menu-contact">
            <a href="mailto:support@harmonioushandsfoundation.com" className="mobile-menu-contact-item">
              <FaEnvelope className="icon" />
              <span>support@harmonioushandsfoundation.com</span>
            </a>
            <a href="tel:+918638656513" className="mobile-menu-contact-item">
              <FaPhone className="icon" />
              <span>+91-86386-56513</span>
            </a>
            <div className="mobile-menu-social">
              <span>Follow us:</span>
              <div className="mobile-menu-social-icons">
                <a href="https://www.facebook.com/profile.php?id=61583610363855" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;