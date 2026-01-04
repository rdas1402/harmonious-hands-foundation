import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = ({ onDonateClick, isDonationPage = false }) => { // Added isDonationPage prop
  const handleDonateClick = (e) => {
    e.preventDefault();
    if (onDonateClick) {
      onDonateClick();
    }
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
                  <li><button onClick={() => scrollToSection('home')} className="footer-link">Home</button></li>
                  <li><button onClick={() => scrollToSection('about')} className="footer-link">About Us</button></li>
                  <li><button onClick={() => scrollToSection('what-we-do')} className="footer-link">What We Do</button></li>
                  <li><button onClick={() => scrollToSection('impact')} className="footer-link">Our Impact</button></li>
                </ul>
              </div>
              
              <div className="links-column">
                <h4 className="links-title">Get Involved</h4>
                <ul className="footer-links">
                  <li><button onClick={handleDonateClick} className="footer-link">
                    {isDonationPage ? 'Back to Home' : 'Donate Now'}
                  </button></li>
                  <li><button onClick={() => scrollToSection('volunteer')} className="footer-link">Volunteer</button></li>
                  <li><button onClick={() => scrollToSection('partnership')} className="footer-link">Partnerships</button></li>
                  <li><button onClick={() => scrollToSection('careers')} className="footer-link">Careers</button></li>
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
              <a href="#facebook" className="social-link" aria-label="Facebook">
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
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background: #000000;
          color: #FFFFFF;
          padding: 50px 0 25px;
          border-top: 3px solid #FFA500;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        
        /* Logo Section */
        .logo-section {
          padding-right: 20px;
        }
        
        .footer-title {
          color: #FFFFFF;
          font-size: 1.5rem;
          margin-bottom: 8px;
          font-weight: 700;
        }
        
        .footer-tagline {
          color: #FFA500;
          font-size: 0.9rem;
          margin-bottom: 15px;
          font-weight: 600;
          opacity: 0.9;
        }
        
        .footer-description {
          color: #CCCCCC;
          font-size: 0.85rem;
          line-height: 1.5;
          opacity: 0.8;
          max-width: 280px;
        }
        
        /* Links Section */
        .links-section {
          display: flex;
          justify-content: center;
        }
        
        .links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          width: 100%;
        }
        
        /* Contact Section */
        .contact-section {
          /* Same as links sections */
        }
        
        .links-title {
          color: #FFFFFF;
          font-size: 1rem;
          margin-bottom: 15px;
          font-weight: 600;
          position: relative;
          padding-bottom: 8px;
        }
        
        .links-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: #FFA500;
          opacity: 0.7;
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 10px;
        }
        
        .footer-link {
          background: none;
          border: none;
          color: #CCCCCC !important;
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.3s;
          opacity: 0.8;
          display: inline-block;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          padding: 0;
        }
        
        .footer-link:hover {
          color: #FFA500 !important;
          opacity: 1;
          transform: translateX(3px);
        }
        
        .contact-text {
          color: #CCCCCC !important;
          opacity: 0.8;
          cursor: default;
        }
        
        /* Simple Newsletter */
        .simple-newsletter {
          margin-bottom: 30px;
          padding: 0;
        }
        
        .simple-newsletter-form {
          display: flex;
          gap: 10px;
          max-width: 600px;
        }
        
        .simple-input {
          padding: 10px 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
          font-size: 0.9rem;
          flex: 1;
        }
        
        .name-input {
          max-width: 200px;
        }
        
        .email-input {
          max-width: 250px;
        }
        
        .simple-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .simple-input:focus {
          outline: none;
          border-color: #FFA500;
          box-shadow: 0 0 0 1px rgba(255, 165, 0, 0.3);
        }
        
        .simple-newsletter-btn {
          background: #FFA500;
          color: #000000 !important;
          border: none;
          padding: 10px 25px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }
        
        .simple-newsletter-btn:hover {
          background: #FF8C00;
          transform: translateY(-1px);
        }
        
        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-social {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .social-icons {
          display: flex;
          gap: 15px;
        }
        
        .social-link {
          color: #FFFFFF !important;
          text-decoration: none;
          font-size: 1.1rem;
          transition: all 0.3s;
          opacity: 0.8;
        }
        
        .social-link:hover {
          color: #FFA500 !important;
          opacity: 1;
          transform: translateY(-2px);
        }
        
        .social-text {
          color: #CCCCCC;
          font-size: 0.85rem;
          opacity: 0.7;
        }
        
        .footer-legal {
          text-align: right;
        }
        
        .copyright {
          color: #CCCCCC;
          font-size: 0.8rem;
          margin-bottom: 8px;
          opacity: 0.7;
        }
        
        .legal-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .legal-link {
          color: #CCCCCC !important;
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.3s;
          opacity: 0.8;
        }
        
        .legal-link:hover {
          color: #FFA500 !important;
          opacity: 1;
        }
        
        .divider {
          color: #666666;
          opacity: 0.5;
          font-size: 0.8rem;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          
          .logo-section {
            grid-column: span 2;
            text-align: center;
            padding-right: 0;
          }
          
          .footer-description {
            max-width: 100%;
            margin: 0 auto;
          }
          
          .contact-section {
            grid-column: span 2;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .footer-legal {
            text-align: center;
          }
          
          .simple-newsletter-form {
            max-width: 500px;
          }
        }
        
        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 20px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .logo-section {
            grid-column: span 1;
          }
          
          .contact-section {
            grid-column: span 1;
          }
          
          .links-grid {
            gap: 40px;
          }
          
          .simple-newsletter-form {
            flex-direction: column;
            max-width: 300px;
          }
          
          .simple-input {
            max-width: 100% !important;
            width: 100%;
          }
          
          .footer-social {
            flex-direction: column;
            gap: 10px;
          }
          
          .social-icons {
            order: 2;
          }
          
          .social-text {
            order: 1;
          }
        }
        
        @media (max-width: 480px) {
          .links-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .legal-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;