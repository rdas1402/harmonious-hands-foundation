// components/Volunteer.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUsers, FaClock, FaMapMarkerAlt, FaCheckCircle, FaPlay, FaCalendarAlt, FaCertificate, FaShareAlt, FaBook, FaChild, FaHandsHelping, FaStar, FaQuoteLeft, FaArrowRight, FaDownload, FaLaptop, FaGraduationCap, FaPlus, FaMinus } from 'react-icons/fa';
import VolunteerSignupPopup from './VolunteerSignupPopup';
import ContactUs from './ContactUs';

const Volunteer = ({ onDonateClick }) => {
  const navigate = useNavigate();
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Initialize
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (showSignupPopup) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      // Optional: Prevent touch scrolling on mobile
      document.body.style.touchAction = 'none';
      // Prevent scroll on body
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore scrolling when popup closes
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    }
  
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    };
  }, [showSignupPopup]);

  const volunteerStats = [
    { number: '10,555', label: 'volunteers' },
    { number: '1,264', label: 'interns' },
    { number: '20,74,526', label: 'volunteering hours generated' },
    { number: '13', label: 'states' },
    { number: '75,000', label: 'children reached through volunteers' }
  ];

  const handleContactUsClick = () => {
    navigate('/contact');
  };

  const programs = [
    {
      title: 'Field Volunteering',
      description: 'Work directly with communities on the ground',
      benefits: ['Hands-on experience', 'Community immersion', 'Skill development'],
      duration: '1-12 months',
      icon: <FaUsers />
    },
    {
      title: 'Virtual Volunteering',
      description: 'Contribute remotely from anywhere',
      benefits: ['Flexible hours', 'Remote work', 'Digital skills'],
      duration: '3-6 months',
      icon: <FaLaptop />
    },
    {
      title: 'Skill-Based Internship',
      description: 'Apply your professional skills',
      benefits: ['Professional growth', 'Project experience', 'Mentorship'],
      duration: '3-6 months',
      icon: <FaGraduationCap />
    },
    {
      title: 'Summer Fellowship',
      description: 'Intensive summer program',
      benefits: ['Structured learning', 'Leadership training', 'Certificate'],
      duration: '2 months',
      icon: <FaCalendarAlt />
    }
  ];

  const testimonials = [
    {
      quote: "My experience with the foundation has been transformative. Working with underprivileged children taught me invaluable lessons in resilience, gratitude, and the power of education.",
      author: "Saina Sabu",
      role: "Volunteer, 3 years"
    },
    {
      quote: "The volunteering experience helped me develop professional skills and build leadership capabilities. Every moment spent with the community has been overwhelming in the best way.",
      author: "Ritvik Sharma",
      role: "Corporate Volunteer"
    }
  ];

  const faqs = [
    {
      question: "How many active volunteers does the foundation have?",
      answer: "We have over 10,555 active volunteers across 13 states in India, contributing more than 2 million volunteering hours."
    },
    {
      question: "What kind of backgrounds do volunteers come from?",
      answer: "Our volunteers come from diverse backgrounds including students, working professionals, homemakers, and retirees. Skills range from education and healthcare to technology and arts."
    },
    {
      question: "How do I become a volunteer?",
      answer: "You can sign up through our website, attend an orientation session, and choose a volunteering program that matches your interests and skills."
    },
    {
      question: "How long does it take to respond to volunteering applications?",
      answer: "We typically respond within 3-5 working days. During peak seasons, it might take up to 7 working days."
    },
    {
      question: "I have no prior volunteering experience. Can I still apply?",
      answer: "Absolutely! We provide training and orientation for all new volunteers. Your enthusiasm and willingness to learn are what matter most."
    }
  ];

  const benefits = [
    "Develop invaluable professional skills",
    "Build leadership capabilities",
    "Make India a better place for children",
    "Wide range of volunteering options",
    "Flexible time commitments",
    "Certificate of participation",
    "Network with like-minded individuals",
    "Make a real difference in lives"
  ];

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
    }
    return name.charAt(0);
  };

  const handleSignupClick = () => {
    setShowSignupPopup(true);
  };

  const handlePopupClose = () => {
    setShowSignupPopup(false);
  };

  const handleSignupSuccess = (response) => {
    console.log('Volunteer registered successfully:', response);
    // You can add any additional logic here
  };

  return (
    <section id="volunteer" className="section volunteer">
      {/* Background Image Overlay - Very subtle */}
      <div 
        className="background-overlay"
        style={{ 
          backgroundImage: `url(${require('../assets/abstract-img.jpeg')})`
        }}
      />
      
      <div className="container">
        {/* Hero Section */}
        <div className="volunteer-hero">
          <div className="hero-title-wrapper">
            <h1 className="section-title"><em>Volunteers are our everyday heroes</em></h1>
            <div className="title-underline"></div>
          </div>
          
          <div className="stats-grid">
            {volunteerStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="cta-buttons">
            <button className="btn btn-primary btn-yellow-black" onClick={handleSignupClick}>
              Sign Up Now <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Celebrate Children's Day Section */}
        <div className="simple-children-day">
          <h2 className="simple-title"><em>Celebrate Children's Day with Small Acts, Big Rights</em></h2>
          <p className="simple-subtitle">
            Complete Full Bingo & Get Rewarded!
          </p>
          
          <div className="simple-content">
            <div className="simple-text">
              <div className="simple-text-content">
                <h3>CHAPTER 1: The Children's Party</h3>
                <p>
                  Our actions create a world of impact for every child's right to learn, play and grow unity.
                </p>
                
                {/* <div className="gift-box">
                  <h4>Our GIFT Valuation Blog (2025) - Available: Big Rights!</h4>
                  <p>Complete the Full Bingo for a chance to be featured on GIFty ValuationBike and campaign highlights.</p>
                </div> */}
                
                <div className="instructions">
                  <p><strong>How to participate:</strong></p>
                  <ul>
                    <li>Complete as many children's lives from Bingo activities</li>
                    <li>Help children live healthy lives with small acts</li>
                    <li>You can change when they live next</li>
                  </ul>
                </div>
                
                <div className="motto">
                  <p><em>"The world will always be forever out of life throughout."</em></p>
                </div>
              </div>
            </div>
            
            <div className="simple-image">
              <img 
                src={require('../assets/brochure.png')} 
                alt="Children's Day Bingo" 
                className="bingo-image"
              />
            </div>
          </div>          
        </div>

        {/* Why Volunteer Section - SIMPLIFIED WITHOUT BOX */}
        <div className="why-volunteer-simple">
          <div className="section-header">
            <h2>Why Volunteer With Us?</h2>
            <div className="header-underline"></div>
          </div>
          <p className="section-subtitle">
            Volunteering is a simple, yet rewarding way to support a cause you care about.
          </p>

          <div className="benefits-grid-simple">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item-simple">
                <FaCheckCircle className="check-icon" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="quote-simple">
            <FaQuoteLeft className="quote-icon" />
            <p>"What I can do, I must do! - Our efforts are made possible only because of your support."</p>
            <cite>Harmonious Hands Foundation</cite>
          </div>
        </div>

        {/* Programs Section - REDUCED CARD SIZE */}
        <div className="programs-section-compact">
          <div className="section-header">
            <h2>Our Volunteering Programs</h2>
            <div className="header-underline"></div>
          </div>
          <p className="section-subtitle">
            We believe everyone can make a difference in their own unique way.
          </p>

          <div className="programs-grid-compact">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="program-card-compact"
                style={{ 
                  backgroundImage: `url(${require('../assets/volunteer_child.jpeg')})`
                }}
              >
                <div className="program-overlay-compact"></div>
                
                <div className="program-content-compact">
                  <div className="program-header-compact">
                    <div className="program-icon-compact">
                      {program.icon}
                    </div>
                    <div className="program-duration-compact">
                      {program.duration}
                    </div>
                  </div>
                  
                  <div className="program-body-compact">
                    <h3>{program.title}</h3>
                    <p className="program-description-compact">{program.description}</p>
                    
                    <div className="program-benefits-compact">
                      {program.benefits.map((benefit, idx) => (
                        <div key={idx} className="benefit-compact">
                          <FaCheckCircle className="benefit-icon-compact" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* <div className="program-actions-compact">
                      <button className="btn-program-compact">
                        Learn More <FaArrowRight />
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section - SIMPLIFIED WITHOUT BOX */}
        <div className="testimonials-section-simple">
          <div className="section-header">
            <h2><em>What Our Volunteers Say</em></h2>
            <div className="header-underline"></div>
          </div>
          
          <div className="testimonials-grid-simple">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-simple">
                <div className="testimonial-content-simple">
                  <div className="rating-simple">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p className="testimonial-text-simple">{testimonial.quote}</p>
                  <div className="testimonial-author-simple">
                    <div className="author-avatar-simple">
                      {getInitials(testimonial.author)}
                    </div>
                    <div className="author-info-simple">
                      <strong>{testimonial.author}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section - CENTERED WITHOUT IMAGE */}
        <div className="faq-section-centered">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <div className="header-underline"></div>
          </div>
          <p className="section-subtitle">
            Here are some common questions you might have.
          </p>

          <div className="faq-content-centered">
            <div className="faq-table-centered">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-row-centered ${activeFAQ === index ? 'active' : ''}`}
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <div className="faq-question-row-centered">
                    <div className="faq-text-centered">{faq.question}</div>
                    <div className="faq-toggle-centered">
                      {activeFAQ === index ? <FaMinus /> : <FaPlus />}
                    </div>
                  </div>
                  {activeFAQ === index && (
                    <div className="faq-answer-row-centered">
                      <div className="faq-answer-text-centered">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Centered Contact Panel */}
            <div className="faq-contact-centered">
              <div className="contact-content-centered">
                <p>If you don't find what you're looking for, please write to us!</p>
                <button className="btn btn-yellow-black"  onClick={handleContactUsClick}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA - SIMPLIFIED */}
        <div className="final-cta-simple">
          <h2>Ready to Make a Difference?</h2>
          <p>Join our community of everyday heroes and create lasting change.</p>
          <div className="cta-buttons">
            <button 
              className="btn btn-yellow-black" 
              onClick={handleSignupClick} // Changed from onDonateClick
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>

      {/* Render the popup */}
      {showSignupPopup && (
        <VolunteerSignupPopup
          onClose={handlePopupClose}
          onSuccess={handleSignupSuccess}
        />
      )}

      {showContactPage && (
        <ContactUs onClose={() => setShowContactPage(false)} />
      )}

      <style jsx>{`
        /* ===== ELEGANT TYPOGRAPHY ===== */
        :root {
          --white: #FFFFFF;
          --yellow: #FFD700;
          --yellow-light: rgba(255, 215, 0, 0.9);
          --yellow-dark: #FFC107;
          --red: #FF6B6B;
          --dark-blue: #2C3E50;
          --light-gray: #F8F9FA;
          --medium-gray: #E9ECEF;
          --black: #000000;
          --overlay-dark: rgba(0, 0, 0, 0.7);
          --overlay-light: rgba(255, 255, 255, 0.1);
        }

        .volunteer {
          position: relative;
          background: var(--white);
          scroll-margin-top: 95px;
          padding: 60px 0 20px;
          overflow: hidden;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          top: 20px;
        }

        /* Background Image Overlay - Very subtle */
        .background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          z-index: 0;
          opacity: 0.2;
          pointer-events: none;
        }

        /* Ensure content stays above background */
        .container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ===== SECTION HEADER STYLES ===== */
        .section-header {
          text-align: center;
          margin-bottom: 25px;
          position: relative;
        }

        .section-header h2 {
          color: var(--dark-blue);
          font-size: 2.2rem;
          margin-bottom: 12px;
          font-weight: 600;
          letter-spacing: -0.5px;
          display: inline-block;
        }

        .header-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, var(--red), var(--yellow));
          margin: 0 auto;
          border-radius: 2px;
        }

        .section-subtitle {
          font-size: 1.05rem;
          color: #777;
          text-align: center;
          max-width: 650px;
          margin: 0 auto 30px;
          line-height: 1.6;
          font-weight: 400;
        }

        /* ===== HERO SECTION ===== */
        .volunteer-hero {
          text-align: center;
          margin-bottom: 60px;
          padding: 30px 20px;
        }

        .hero-title-wrapper {
          display: inline-block;
          margin-bottom: 40px;
          position: relative;
        }

        .section-title {
          color: var(--dark-blue);
          font-size: 2.8rem;
          margin-bottom: 0;
          font-weight: 600;
          text-align: center;
          position: relative;
          z-index: 2;
          letter-spacing: -0.5px;
          text-transform: none;
          font-style: normal;
          display: inline-block;
          padding-bottom: 15px;
        }

        .title-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--yellow);
          border-radius: 2px;
        }

        /* Hero Stats Grid - Simple inline text */
        .stats-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 5px;
          margin: 5px auto;
          max-width: 800px;
        }

        .stat-card {
          background: transparent;
          padding: 0;
          text-align: center;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--black);
          margin-bottom: 5px;
          display: block;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #555;
          font-weight: 400;
          line-height: 1.4;
          text-transform: none;
          max-width: 180px;
          margin: 0;
          font-style: normal;
        }

        /* Hero CTA Buttons */
        .cta-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 40px 0 0;
          flex-wrap: wrap;
        }

        /* ===== YELLOW BUTTONS WITH BLACK TEXT ===== */
        .btn-yellow-black {
          background: var(--yellow);
          color: var(--black) !important;
          border: 2px solid var(--yellow);
          font-weight: 600;
        }

        .btn-yellow-black:hover {
          background: var(--yellow-dark);
          border-color: var(--yellow-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 193, 7, 0.3);
          color: var(--black) !important;
        }

        .btn-yellow-black.btn-outline {
          background: transparent;
          color: var(--black) !important;
          border: 2px solid var(--yellow);
        }

        .btn-yellow-black.btn-outline:hover {
          background: var(--yellow);
          color: var(--black) !important;
        }

        /* Base Button Styles */
        .btn {
          padding: 12px 28px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          min-width: 160px;
          justify-content: center;
          font-family: inherit;
        }

        .btn-primary {
          background: var(--yellow);
          color: var(--black) !important;
          border-color: var(--yellow);
        }

        .btn-primary:hover {
          background: var(--yellow-dark);
          border-color: var(--yellow-dark);
          color: var(--black) !important;
        }

        /* ===== SIMPLE CHILDREN'S DAY SECTION ===== */
        .simple-children-day {
          margin-top: -20px;
          text-align: center;
          margin-bottom: 30px;
        }

        .simple-title {
          color: var(--black);
          font-size: 2.4rem;
          font-weight: 400;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
          line-height: 1.3;
        }

        .simple-subtitle {
          color: var(--dark-blue);
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 40px;
          letter-spacing: 0.3px;
        }

        .simple-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin: 40px 0;
          text-align: left;
        }

        .simple-text-content {
          max-width: 550px;
        }

        .simple-text-content h3 {
          color: var(--dark-blue);
          font-size: 1.5rem;
          margin-bottom: 16px;
          font-weight: 600;
          line-height: 1.4;
        }

        .simple-text-content p {
          color: #555;
          line-height: 1.7;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .gift-box {
          background: rgba(255, 215, 0, 0.03);
          padding: 18px;
          border-left: 2px solid var(--yellow);
          margin: 20px 0;
        }

        .gift-box h4 {
          color: var(--dark-blue);
          font-size: 1.1rem;
          margin-bottom: 8px;
          font-weight: 600;
          line-height: 1.4;
        }

        .gift-box p {
          font-size: 0.9rem;
          margin-bottom: 0;
          color: #666;
        }

        .instructions {
          margin: 20px 0;
        }

        .instructions strong {
          color: var(--red);
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .instructions ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .instructions li {
          margin-bottom: 8px;
          color: #555;
          padding-left: 20px;
          position: relative;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .instructions li:before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--red);
          font-size: 1.2rem;
        }

        .motto {
          font-style: italic;
          color: var(--dark-blue);
          margin: 25px 0;
          padding: 15px;
          border-top: 1px dashed var(--yellow);
          border-bottom: 1px dashed var(--yellow);
          font-size: 0.95rem;
        }

        .simple-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .bingo-image {
          width: 100%;
          max-width: 450px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        /* ===== WHY VOLUNTEER SECTION - SIMPLIFIED WITHOUT BOX ===== */
        .why-volunteer-simple {
          padding: 40px 0 30px;
          text-align: center;
          margin: 30px 0;
        }

        .benefits-grid-simple {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin: 40px 0 50px;
        }

        .benefit-item-simple {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 18px 20px;
          background: var(--white);
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          text-align: left;
          position: relative;
          border: 1.5px solid transparent;
        }

        .benefit-item-simple:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.1);
          border-color: var(--yellow);
        }

        .check-icon {
          color: var(--red);
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .benefit-item-simple span {
          color: var(--dark-blue);
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.5;
        }

        .quote-simple {
          max-width: 700px;
          margin: 50px auto 0;
          padding: 30px 0 0;
          text-align: center;
          position: relative;
          border-top: 2px solid var(--yellow);
        }

        .quote-icon {
          font-size: 2.5rem;
          color: rgba(255, 107, 107, 0.9);
          margin-bottom: 20px;
        }

        .quote-simple p {
          font-size: 1.15rem;
          font-style: italic;
          color: var(--dark-blue);
          line-height: 1.7;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .quote-simple cite {
          color: var(--red);
          font-style: normal;
          font-weight: 600;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ===== PROGRAMS SECTION - COMPACT CARDS ===== */
        .programs-section-compact {
          padding: 30px 0 40px;
          text-align: center;
          margin-top: -10px;
        }

        .programs-grid-compact {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
          margin: 30px 0;
        }

        .program-card-compact {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          height: 420px;
          width: 250px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .program-card-compact:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .program-overlay-compact {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.5) 30%,
            rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 1;
          transition: all 0.3s ease;
        }

        .program-card-compact:hover .program-overlay-compact {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.55) 30%,
            rgba(0, 0, 0, 0.85) 100%
          );
        }

        .program-content-compact {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 20px;
          z-index: 2;
          color: var(--white);
        }

        .program-header-compact {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .program-icon-compact {
          width: 50px;
          height: 50px;
          background: var(--white);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--dark-blue);
          font-size: 1.4rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
        }

        .program-duration-compact {
          background: var(--yellow);
          color: var(--black);
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .program-body-compact {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .program-body-compact h3 {
          color: var(--white);
          font-size: 1.3rem;
          margin: 0 0 10px 0;
          font-weight: 600;
          line-height: 1.3;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .program-description-compact {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 15px;
          line-height: 1.5;
          font-size: 0.9rem;
          flex: 1;
        }

        .program-benefits-compact {
          margin: 15px 0;
        }

        .benefit-compact {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }

        .benefit-compact:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateX(3px);
        }

        .benefit-icon-compact {
          color: var(--yellow);
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .benefit-compact span {
          color: var(--white);
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 1.3;
        }

        .program-actions-compact {
          margin-top: auto;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-program-compact {
          background: var(--yellow);
          color: var(--black);
          border: none;
          padding: 8px 20px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          width: 100%;
          justify-content: center;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-program-compact:hover {
          background: var(--white);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }

        /* ===== TESTIMONIALS SECTION - SIMPLIFIED ===== */
        .testimonials-section-simple {
          padding: 30px 0 20px;
          text-align: center;
          margin: 20px 0;
        }

        .testimonials-grid-simple {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
          margin: 30px 0;
        }

        .testimonial-card-simple {
          background: transparent;
          padding: 0;
          text-align: left;
          position: relative;
        }

        .testimonial-content-simple {
          background: transparent;
          padding: 20px 0;
          border-bottom: 1px solid var(--medium-gray);
        }

        .rating-simple {
          display: flex;
          gap: 4px;
          color: var(--yellow);
          margin-bottom: 15px;
        }

        .testimonial-text-simple {
          color: #555;
          line-height: 1.7;
          margin-bottom: 20px;
          font-size: 1rem;
          font-style: italic;
        }

        .testimonial-author-simple {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .author-avatar-simple {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--red) 0%, var(--yellow) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .author-info-simple {
          text-align: left;
          flex: 1;
        }

        .author-info-simple strong {
          color: var(--dark-blue);
          font-size: 1rem;
          margin-bottom: 4px;
          font-weight: 600;
          display: block;
        }

        .author-info-simple span {
          color: #777;
          font-size: 0.9rem;
        }

        /* ===== FAQ SECTION - CENTERED WITHOUT IMAGE ===== */
        .faq-section-centered {
          padding: 1px 0 15px;
          text-align: center;
        }

        .faq-content-centered {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .faq-table-centered {
          background: var(--white);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.04);
          margin-bottom: 20px;
        }

        .faq-row-centered {
          border-bottom: 1px solid var(--medium-gray);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-row-centered:last-child {
          border-bottom: none;
        }

        .faq-row-centered:hover {
          background: rgba(255, 215, 0, 0.02);
        }

        .faq-row-centered.active {
          background: rgba(255, 107, 107, 0.02);
        }

        /* REDUCED ROW SIZE */
        .faq-question-row-centered {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          min-height: auto;
        }

        .faq-text-centered {
          flex: 1;
          color: var(--dark-blue);
          font-weight: 500;
          font-size: 0.9rem;
          text-align: left;
          line-height: 1.4;
          margin-right: 15px;
        }

        .faq-toggle-centered {
          width: 28px;
          height: 28px;
          background: var(--light-gray);
          color: var(--red);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .faq-row-centered.active .faq-toggle-centered {
          background: var(--red);
          color: white;
        }

        .faq-answer-row-centered {
          padding: 0 20px 12px;
          animation: fadeIn 0.2s ease;
        }

        .faq-answer-text-centered {
          text-align: left;
          color: #666;
          line-height: 1.5;
          font-size: 0.85rem;
          padding: 8px 0;
        }

        /* ===== CENTERED CONTACT PANEL ===== */
        .faq-contact-centered {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 25px 0 15px;
          text-align: center;
        }

        .contact-content-centered {
          max-width: 500px;
          width: 100%;
          padding: 25px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 107, 107, 0.05) 100%);
          border-radius: 12px;
          border: 1px solid rgba(255, 215, 0, 0.2);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .contact-content-centered p {
          color: var(--dark-blue);
          margin-bottom: 20px;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 500;
        }

        .contact-content-centered .btn {
          margin: 0 auto;
          display: block;
          width: auto;
          min-width: 140px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== SIMPLE FINAL CTA ===== */
        .final-cta-simple {
          text-align: center;
          padding: 25px 0 15px;
          margin: 5px 0 0;
          position: relative;
        }

        .final-cta-simple h2 {
          color: var(--dark-blue);
          font-size: 2rem;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .final-cta-simple p {
          font-size: 1rem;
          color: #666;
          margin-bottom: 20px;
          line-height: 1.5;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
        }

        .final-cta-simple .cta-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        /* Brush Decorations */
        .brush-decoration {
          position: absolute;
          left: 0;
          right: 0;
          height: 80px;
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
        
        .bottom-brush {
          bottom: 0;
          opacity: 0.8;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1200px) {
          .container {
            max-width: 960px;
          }
          
          .simple-content {
            gap: 40px;
          }
          
          .faq-content-centered {
            max-width: 700px;
          }
        }

        @media (max-width: 992px) {
          .volunteer {
            scroll-margin-top: 100px;
            padding: 40px 0 15px;
            top: 0;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .simple-title {
            font-size: 1.6rem;
          }
          
          .brush-decoration {
            height: 70px;
          }
          
          .stats-grid {
            gap: 25px;
          }
          
          .stat-number {
            font-size: 1.4rem;
          }
          
          .simple-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          
          .simple-text {
            order: 1;
          }
          
          .simple-image {
            order: 2;
          }
          
          .benefits-grid-simple {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .programs-grid-compact {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .testimonials-grid-simple {
            grid-template-columns: 1fr;
          }
          
          .program-card-compact {
            height: 300px;
          }
          
          .faq-content-centered {
            max-width: 650px;
          }
          
          .contact-content-centered {
            max-width: 450px;
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .volunteer {
            scroll-margin-top: 100px;
            font-size: 14px;
            top: 0;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .simple-title {
            font-size: 1.4rem;
          }
          
          .simple-subtitle {
            font-size: 1.05rem;
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }
          
          .stat-card {
            min-width: auto;
          }
          
          .stat-number {
            font-size: 1.3rem;
          }
          
          .stat-label {
            font-size: 0.85rem;
          }
          
          .benefits-grid-simple {
            grid-template-columns: 1fr;
          }
          
          .programs-grid-compact {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .program-card-compact {
            height: 280px;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          
          .btn {
            width: 100%;
            max-width: 260px;
            font-size: 0.85rem;
            padding: 10px 20px;
          }
          
          .brush-decoration {
            height: 50px;
          }
          
          .program-content-compact {
            padding: 16px;
          }
          
          .program-icon-compact {
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
          }
          
          .program-duration-compact {
            font-size: 0.7rem;
            padding: 5px 10px;
          }
          
          .program-body-compact h3 {
            font-size: 1.2rem;
          }
          
          .program-description-compact {
            font-size: 0.85rem;
          }
          
          .benefit-compact span {
            font-size: 0.75rem;
          }
          
          .faq-question-row-centered {
            padding: 10px 16px;
          }
          
          .faq-answer-row-centered {
            padding: 0 16px 10px;
          }
          
          .faq-text-centered {
            font-size: 0.85rem;
          }
          
          .faq-toggle-centered {
            width: 26px;
            height: 26px;
            font-size: 0.75rem;
          }
          
          .faq-answer-text-centered {
            font-size: 0.8rem;
          }
          
          .contact-content-centered {
            max-width: 400px;
            padding: 18px;
          }
          
          .contact-content-centered p {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.5rem;
          }
          
          .title-underline {
            height: 2px;
          }
          
          .simple-title {
            font-size: 1.2rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .stat-number {
            font-size: 1.2rem;
          }
          
          .simple-text-content h3 {
            font-size: 1.3rem;
          }
          
          .final-cta-simple h2 {
            font-size: 1.7rem;
          }
          
          .brush-decoration {
            height: 40px;
          }
          
          .program-card-compact {
            height: 260px;
          }
          
          .program-content-compact {
            padding: 14px;
          }
          
          .program-icon-compact {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
          
          .program-duration-compact {
            font-size: 0.65rem;
            padding: 4px 8px;
          }
          
          .program-body-compact h3 {
            font-size: 1.1rem;
          }
          
          .program-description-compact {
            font-size: 0.8rem;
          }
          
          .benefit-compact {
            padding: 5px 8px;
          }
          
          .benefit-compact span {
            font-size: 0.7rem;
          }
          
          .btn-program-compact {
            padding: 7px 16px;
            font-size: 0.8rem;
          }
          
          .faq-question-row-centered {
            padding: 8px 14px;
          }
          
          .faq-answer-row-centered {
            padding: 0 14px 8px;
          }
          
          .faq-text-centered {
            font-size: 0.8rem;
          }
          
          .faq-toggle-centered {
            width: 24px;
            height: 24px;
            font-size: 0.7rem;
          }
          
          .faq-answer-text-centered {
            font-size: 0.75rem;
          }
          
          .contact-content-centered {
            max-width: 100%;
            padding: 15px;
          }
          
          .contact-content-centered p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Volunteer;
