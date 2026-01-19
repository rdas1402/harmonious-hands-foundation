import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../styles/components/Footer.css';

const Footer = ({ onDonateClick, onVolunteerClick, onNavClick, isDonationPage = false }) => {
  const navigate = useNavigate();

  // Update handleDonateClick and handleVolunteerClick to use navigate
  const handleDonateClick = (e) => {
    e.preventDefault();
    navigate('/donate');
  };

  const handleVolunteerClick = (e) => {
    e.preventDefault();
    navigate('/volunteer');
  };

  // Add Contact Us handler
  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/contact');
  };

  // REMOVE or FIX the scrollToSection function since it has an undefined 'e'
  const handleSectionClick = (sectionId, e) => {
    e.preventDefault();
    
    // If we have an onNavClick prop (which we should have from App.js), use it
    if (onNavClick) {
      onNavClick(sectionId);
    } else {
      // Fallback behavior for main page
      window.scrollTo(0, 0);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section logo-section">
            <div className="footer-logo">
              <h3 className="footer-title">Harmonious Hands Foundation</h3>
              <p className="footer-tagline">Building Inclusive Communities</p>
              <p className="footer-description">
                Creating lasting change through education, health, and community empowerment.
              </p>
            </div>
          </div>
          
          <div className="footer-section links-section">
            <div className="links-grid">
              <div className="links-column">
                <h4 className="links-title">Navigation</h4>
                <ul className="footer-links">
                  <li><button onClick={(e) => handleSectionClick('home', e)} className="footer-link">Home</button></li>
                  <li><button onClick={(e) => handleSectionClick('about', e)} className="footer-link">About Us</button></li>
                  <li><button onClick={(e) => handleSectionClick('what-we-do', e)} className="footer-link">What We Do</button></li>
                  <li><button onClick={(e) => handleSectionClick('impact', e)} className="footer-link">Our Impact</button></li>                  
                  <li><button onClick={(e) => handleSectionClick('team', e)} className="footer-link">Our Team</button></li>
                  <li><button onClick={(e) => handleSectionClick('stories', e)} className="footer-link">Stories</button></li>
                </ul>
              </div>
              
              <div className="links-column">
                <h4 className="links-title">Get Involved</h4>
                <ul className="footer-links">
                  <li><button onClick={handleDonateClick} className="footer-link">
                    Donate Now
                  </button></li>
                  <li><button onClick={handleVolunteerClick} className="footer-link">Volunteer</button></li>
                  <li><button onClick={handleContactClick} className="footer-link">Contact Us</button></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-section contact-section">
            <h4 className="links-title">Contact Info</h4>
            <ul className="footer-links">
              <li><a href="mailto:support@harmonioushandsfoundation.com" className="footer-link">support@harmonioushandsfoundation.com</a></li>
              <li><a href="tel:+918638656513" className="footer-link">+91-86386-56513</a></li>
              <li><a href="tel:+917099041749" className="footer-link">+91-70990-41749</a></li>
              <li><span className="footer-link contact-text">Assam, India</span></li>
            </ul>
          </div>
        </div>
        
        {/* Simple Newsletter Form */}
        <div className="simple-newsletter">
          <h4 className="links-title">Subscribe to our newsletter</h4>
          <div className="simple-newsletter-form">
            <input 
              type="text" 
              placeholder="Name" 
              className="simple-input name-input" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="simple-input email-input" 
            />
            <button className="simple-newsletter-btn">Subscribe</button>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-social">
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61583610363855" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#twitter" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#instagram" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#youtube" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
            <span className="social-text">Follow our journey</span>
          </div>
          
          <div className="footer-legal">
            <p className="copyright">
              © {new Date().getFullYear()} Harmonious Hands Foundation. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="#privacy" className="legal-link">Privacy Policy</a>
              <span className="divider">•</span>
              <a href="#terms" className="legal-link">Terms & Conditions</a>
              <span className="divider">•</span>
              <a href="#tax" className="legal-link">80G Tax Exemption</a>
            </div>
            {/* Development credit added here */}
            <div className="development-credit">
              {/* <span className="credit-text">Developed by </span> */}
              <span className="company-name">Developed by RupiQ Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;