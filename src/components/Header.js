import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

const Header = ({ onDonateClick, isDonationPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show/hide header based on scroll direction
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling DOWN and past 100px - hide header
            setIsHeaderVisible(false);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling UP - show header
            setIsHeaderVisible(true);
          }
          
          // Set scrolled state for styling
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
    };
  }, [lastScrollY]);

  // Close menu when header hides
  useEffect(() => {
    if (!isHeaderVisible) {
      setIsMenuOpen(false);
    }
  }, [isHeaderVisible]);

  const handleDonateClick = (e) => {
    e.preventDefault();
    if (onDonateClick) {
      onDonateClick();
    }
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    // If we're on the donation page, we need to close it first
    if (isDonationPage && onDonateClick) {
      // Close donation page first
      onDonateClick();
      
      // Then after a small delay, scroll to the section on the main page
      setTimeout(() => {
        // Reset scroll to top first
        window.scrollTo(0, 0);
        
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure donation page is closed
    } else {
      // Normal behavior for main page
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Black Bar - Small Contact Header */}
      <div 
        className={`top-black-bar ${isHeaderVisible ? 'visible' : 'hidden'}`}
        ref={headerRef}
      >
        <div className="container">
          <div className="top-bar-content">
            
            {/* Logo ONLY in Top Black Bar (Left Side) */}
            <div className="top-bar-logo">
              <div className="logo-image">
                <img 
                  src={require('../assets/logo.jpg')} 
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
        className={`main-header ${isScrolled ? 'scrolled' : ''} ${isHeaderVisible ? 'visible' : 'hidden'}`}
        ref={headerRef}
      >
        <div className="container">
          <div className="header-content">
            {/* Menu toggle button on left for mobile */}
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            
            {/* Logo Text in White Header (Center) */}
            <div className="logo-text-section">
              {/* Mobile Logo Image - Only visible on mobile */}
              <div className="mobile-logo">
                <img 
                  src={require('../assets/logo.jpg')} 
                  alt="Harmonious Hands Foundation Logo"
                  className="mobile-logo-img"
                />
              </div>
              <div className="logo-text-container">
                <h1 className="logo-title">Harmonious Hands Foundation</h1>
                <p className="tagline">Building Inclusive Communities</p>
              </div>
            </div>
            
            {/* Navigation Section - EXTREME RIGHT */}
            <div className="nav-section">
              <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                <ul className="nav-menu">
                  <li><button onClick={() => scrollToSection('home')} className="nav-link">Home</button></li>
                  <li><button onClick={() => scrollToSection('about')} className="nav-link">About Us</button></li>
                  <li><button onClick={() => scrollToSection('what-we-do')} className="nav-link">What We Do</button></li>
                  <li><button onClick={() => scrollToSection('team')} className="nav-link">Our Team</button></li>
                  <li><button onClick={() => scrollToSection('approach')} className="nav-link">Our Approach</button></li>
                  <li><button onClick={() => scrollToSection('impact')} className="nav-link">Impact</button></li>
                  <li><button onClick={() => scrollToSection('stories')} className="nav-link">Stories</button></li>
                  <li>
                    <button 
                      className="btn nav-btn"
                      onClick={handleDonateClick}
                    >
                      {isDonationPage ? 'Back to Home' : 'Donate Now'}
                    </button>
                  </li>
                </ul>
                
                <div className="mobile-contact">
                  <a href="mailto:support@harmonioushandsfoundation.com" className="mobile-contact-item">
                    <FaEnvelope className="icon" />
                    <span>support@harmonioushandsfoundation.com</span>
                  </a>
                  <a href="tel:+918638656513" className="mobile-contact-item">
                    <FaPhone className="icon" />
                    <span>+91-86386-56513</span>
                  </a>
                  <div className="mobile-social">
                    <span>Follow us:</span>
                    <div className="mobile-social-icons">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
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
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Inline CSS for the header */}
      <style jsx global>{`
        /* ============ TOP BLACK BAR STYLES ============ */
        .top-black-bar {
          background: #000000 !important;
          color: #FFA500 !important;
          padding: 0 !important;
          font-size: 0.75rem;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1002;
          height: 30px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #333;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          opacity: 1;
        }
        
        .top-black-bar.hidden {
          transform: translateY(-100%);
          opacity: 0;
        }
        
        .top-black-bar * {
          color: #FFA500 !important;
        }
        
        .top-black-bar .container {
          height: 100%;
          display: flex;
          align-items: center;
          width: 100%;
        }
        
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        /* Logo ONLY in Top Black Bar */
        .top-bar-logo {
          position: absolute;
          left: -110px;
          top: 5px;
          z-index: 1003;
          height: 100px;
          display: flex;
          align-items: center;
        }
        
        .top-bar-logo .logo-image {
          width: 110px;
          height: 110px;
          flex-shrink: 0;
          margin: 0;
          padding: 0;
        }
        
        .top-bar-logo .logo-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        /* Right side content in top bar */
        .top-bar-right {
          display: flex;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          flex: 1;
          padding-left: 100px;
          gap: 100px;
        }
        
        .top-contact-info {
          display: flex;
          gap: 25px;
          align-items: center;
          height: 100%;
        }
        
        .top-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 100%;
          transition: all 0.3s !important;
          padding: 0 5px;
          border-radius: 3px;
        }
        
        .top-contact-item:hover {
          background: rgba(255, 165, 0, 0.1);
        }
        
        .top-icon {
          font-size: 0.8rem;
          color: #FFA500 !important;
          transition: color 0.3s !important;
        }
        
        .top-contact-link {
          color: #FFA500 !important;
          text-decoration: none !important;
          transition: color 0.3s !important;
          font-size: 0.75rem;
          white-space: nowrap;
        }
        
        .top-contact-item:hover .top-contact-link,
        .top-contact-item:hover .top-icon {
          color: #FF8C00 !important;
        }
        
        .top-social-media {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 100%;
          left: 200px;
        }
        
        .social-icons-container {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .top-follow-text {
          color: #FFA500 !important;
          font-size: 0.75rem;
          transition: color 0.3s !important;
        }
        
        .top-social-media:hover .top-follow-text {
          color: #FF8C00 !important;
        }
        
        .social-icon {
          font-size: 0.9rem;
          transition: all 0.3s !important;
        }
        
        .top-social-link {
          color: #FFA500 !important;
          text-decoration: none !important;
          transition: all 0.3s !important;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 3px;
        }
        
        .top-social-link:hover {
          color: #FF8C00 !important;
          background: rgba(255, 165, 0, 0.1);
          transform: translateY(-1px);
        }
        
        .top-social-link:hover .social-icon {
          color: #FF8C00 !important;
          transform: scale(1.1);
        }
        
        /* ============ MAIN WHITE HEADER STYLES ============ */
        .main-header {
          background: #ffffff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: fixed;
          top: 30px;
          left: 0;
          right: 0;
          z-index: 1001;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 80px;
          display: flex;
          align-items: center;
          transform: translateY(0);
          opacity: 1;
        }
        
        .main-header.hidden {
          transform: translateY(-100%);
          opacity: 0;
        }
        
        .main-header.scrolled {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .main-header .container {
          height: 100%;
          display: flex;
          align-items: center;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          gap: 70px;
        }
        
        /* Logo Text Section in White Header (Center) */
        .logo-text-section {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          padding-right: 100px;
          height: 100%;
          flex-shrink: 0;
        }
        
        .mobile-logo {
          display: none;
        }
        
        .logo-text-container {
          text-align: left;
          margin: 0;
          padding: 0;
          min-width: 0;
        }
        
        .logo-title {
          color: #2c3e50;
          font-size: 1.5rem;
          margin: 0 0 5px 0;
          line-height: 1.2;
          font-weight: 700;
          white-space: nowrap;
        }
        
        .tagline {
          color: #ff6b6b;
          font-size: 0.85rem;
          margin: 0;
          font-weight: 500;
          white-space: nowrap;
        }
        
        /* NAV SECTION - EXTREME RIGHT */
        .nav-section {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin: 0;
          padding: 0;
          height: 100%;
          flex: 1;
          margin-right: -200px;
        }
        
        .nav {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          height: 100%;
        }
        
        .nav-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 20px;
          align-items: center;
          height: 100%;
          margin-right: 10px;
        }
        
        .nav-link {
          background: none;
          border: none;
          text-decoration: none;
          color: #333333;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
          font-size: 0.95rem;
          padding: 6px 0;
          position: relative;
          white-space: nowrap;
          height: 100%;
          display: flex;
          align-items: center;
          font-family: inherit;
        }
        
        .nav-link:hover {
          color: #ffa500;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffa500;
          transition: width 0.3s;
        }
        
        .nav-link:hover:after {
          width: 100%;
        }
        
        .nav-btn {
          background: #ffa500;
          color: white !important;
          padding: 10px 25px !important;
          border-radius: 5px;
          transition: background 0.3s;
          border: none;
          font-weight: 600;
          font-size: 0.95rem;
          margin-left: 15px;
          margin-right: 10px;
          height: auto;
          cursor: pointer;
          font-family: inherit;
        }
        
        .nav-btn:hover {
          background: #ff8c00;
          color: white !important;
        }
        
        /* MENU TOGGLE BUTTON - MOVED TO LEFT TOP */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #333333;
          cursor: pointer;
          padding: 0;
          margin: 0;
          z-index: 1003;
          order: -1; /* This ensures it appears first on the left */
        }
        
        /* ============ MOBILE CONTACT STYLES ============ */
        .mobile-contact {
          display: none;
          padding: 15px;
          background: #f8f9fa;
          border-top: 1px solid #eeeeee;
        }
        
        .mobile-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          color: #333333;
          text-decoration: none;
          font-size: 0.85rem;
        }
        
        .mobile-contact-item .icon {
          color: #ffa500;
          min-width: 20px;
        }
        
        .mobile-social {
          margin-top: 12px;
        }
        
        .mobile-social span {
          display: block;
          margin-bottom: 6px;
          color: #666666;
          font-size: 0.85rem;
        }
        
        .mobile-social-icons {
          display: flex;
          gap: 12px;
        }
        
        .mobile-social-icons a {
          color: #333333;
          font-size: 1rem;
          transition: color 0.3s;
        }
        
        .mobile-social-icons a:hover {
          color: #ffa500;
        }
        
        /* ============ RESPONSIVE STYLES ============ */
        @media (max-width: 1200px) {
          .nav-menu {
            gap: 18px;
          }
          
          .logo-title {
            font-size: 1.4rem;
          }
          
          .top-bar-right {
            padding-left: 95px;
          }
          
          .logo-text-section {
            padding-left: 100px;
          }
        }
        
        @media (max-width: 1100px) {
          .nav-menu {
            gap: 16px;
          }
          
          .nav-link {
            font-size: 0.9rem;
          }
          
          .logo-title {
            font-size: 1.3rem;
          }
          
          .top-bar-right {
            padding-left: 90px;
          }
          
          .logo-text-section {
            padding-left: 95px;
          }
        }
        
        @media (max-width: 992px) {
          .top-contact-info {
            gap: 15px;
          }
          
          .top-contact-link {
            font-size: 0.7rem;
          }
          
          .top-follow-text {
            font-size: 0.7rem;
          }
          
          .social-icon {
            font-size: 0.8rem;
          }
          
          .nav-menu {
            gap: 14px;
          }
          
          .nav-link {
            font-size: 0.88rem;
          }
          
          .nav-btn {
            padding: 8px 20px !important;
            font-size: 0.88rem;
          }
          
          .logo-title {
            font-size: 1.2rem;
          }
          
          .top-bar-logo .logo-image {
            width: 80px;
            height: 80px;
          }
          
          .tagline {
            font-size: 0.8rem;
          }
          
          .top-bar-right {
            padding-left: 85px;
          }
          
          .logo-text-section {
            padding-left: 90px;
          }
        }
        
        @media (max-width: 850px) {
          .top-contact-info {
            gap: 10px;
          }
          
          .top-contact-link {
            font-size: 0.65rem;
          }
          
          .social-icons-container {
            gap: 10px;
          }
          
          .logo-title {
            font-size: 1.1rem;
          }
          
          .nav-menu {
            gap: 12px;
          }
          
          .nav-link {
            font-size: 0.85rem;
          }
          
          .top-bar-logo .logo-image {
            width: 75px;
            height: 75px;
          }
          
          .top-bar-right {
            padding-left: 80px;
          }
          
          .logo-text-section {
            padding-left: 85px;
          }
        }
        
        @media (max-width: 768px) {
          /* FIX: Show top black bar on mobile with simplified content */
          .top-black-bar {
            display: flex !important;
            height: 40px; /* Slightly taller for mobile */
            font-size: 0.7rem;
          }
          
          .main-header {
            top: 40px !important; /* Adjust for taller top bar */
          }
          
          .top-bar-logo {
            display: none; /* Hide logo in top bar on mobile */
          }
          
          .top-bar-right {
            padding-left: 0;
            justify-content: center;
            width: 100%;
            gap: 20px;
          }
          
          .top-contact-info {
            flex-direction: column;
            gap: 5px;
            align-items: flex-start;
          }
          
          .top-social-media {
            display: none; /* Hide social media on mobile top bar */
          }
          
          .top-contact-link {
            font-size: 0.65rem;
          }
          
          .main-header {
            height: 70px;
            padding: 0 15px;
          }
          
          .menu-toggle {
            display: block;
            order: -1; /* Force it to be first/leftmost */
            margin-right: 10px;
          }
          
          .nav {
            position: fixed;
            top: 110px; /* 40px (top bar) + 70px (header) */
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            display: none;
            max-height: calc(100vh - 110px);
            overflow-y: auto;
            z-index: 1000;
            flex-direction: column;
            align-items: stretch;
            margin: 0;
            height: auto;
            padding: 0;
          }
          
          .nav.active {
            display: flex;
          }
          
          .nav-menu {
            flex-direction: column;
            padding: 20px;
            gap: 0;
            align-items: stretch;
            width: 100%;
            height: auto;
            margin: 0;
          }
          
          .nav-menu li {
            width: 100%;
            margin: 0;
            padding: 0;
          }
          
          .nav-link {
            display: block;
            padding: 15px 20px;
            font-size: 1rem;
            border-bottom: 1px solid #eee;
            height: auto;
            width: 100%;
            text-align: left;
            justify-content: flex-start;
          }
          
          .nav-btn {
            margin: 20px 20px 0 20px;
            width: calc(100% - 40px);
            text-align: center;
            font-size: 1rem;
            height: auto;
            padding: 12px !important;
          }
          
          .nav.active .mobile-contact {
            display: block;
          }
          
          /* Mobile logo styling */
          .mobile-logo {
            display: block;
            margin-right: 10px;
          }
          
          .mobile-logo-img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 5px;
            border: 2px solid #ffa500;
          }
          
          .logo-text-section {
            padding-left: 0;
            padding-right: 0;
            gap: 10px;
            flex: 1;
            justify-content: flex-start; /* Align to start */
            margin-left: 0;
          }
          
          .logo-text-container {
            text-align: left;
            display: flex;
            flex-direction: column;
          }
          
          /* FIX FOR TEXT WRAPPING: Ensure "Harmonious Hands Foundation" stays together */
          .logo-title {
            font-size: 1rem;
            white-space: nowrap;
            line-height: 1.2;
            margin-bottom: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }
          
          .tagline {
            font-size: 0.7rem;
            white-space: normal;
            line-height: 1.2;
            display: block;
          }
          
          .header-content {
            gap: 0;
            justify-content: flex-start;
            position: relative;
          }
          
          /* Keep nav-section visible on mobile */
          .nav-section {
            margin-right: 0;
            display: flex;
          }
        }
        
        /* Additional mobile optimization for social media */
        @media (max-width: 768px) and (min-width: 481px) {
          .top-bar-right {
            gap: 10px;
          }
          
          .top-social-media {
            display: flex;
            gap: 8px;
          }
          
          .social-icons-container {
            gap: 8px;
          }
          
          .social-icon {
            font-size: 0.7rem;
          }
          
          .top-follow-text {
            display: none; /* Hide "Follow us:" text to save space */
          }
        }
        
        @media (max-width: 480px) {
          .top-black-bar {
            height: 35px;
          }
          
          .main-header {
            top: 35px !important;
          }
          
          .top-contact-info {
            gap: 3px;
          }
          
          .top-contact-link {
            font-size: 0.6rem;
          }
          
          .main-header {
            height: 65px;
          }
          
          .nav {
            top: 100px; /* 35px (top bar) + 65px (header) */
            max-height: calc(100vh - 100px);
          }
          
          .logo-text-section {
            gap: 8px;
          }
          
          .mobile-logo-img {
            width: 45px;
            height: 45px;
          }
          
          .logo-title {
            font-size: 0.9rem;
          }
          
          .tagline {
            font-size: 0.65rem;
          }
          
          .mobile-contact-item {
            font-size: 0.8rem;
          }
          
          .header-content {
            padding: 8px 0;
          }
          
          .menu-toggle {
            margin-right: 5px;
          }
        }
        
        @media (max-width: 360px) {
          .top-black-bar {
            height: 32px;
          }
          
          .main-header {
            top: 32px !important;
          }
          
          .top-contact-link {
            font-size: 0.55rem;
          }
          
          .main-header {
            height: 60px;
          }
          
          .nav {
            top: 92px; /* 32px (top bar) + 60px (header) */
            max-height: calc(100vh - 92px);
          }
          
          .logo-title {
            font-size: 0.8rem;
          }
          
          .tagline {
            font-size: 0.6rem;
          }
          
          .mobile-logo-img {
            width: 40px;
            height: 40px;
          }
          
          .menu-toggle {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;