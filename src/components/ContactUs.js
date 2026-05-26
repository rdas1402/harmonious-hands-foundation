// components/ContactUs.js - Fixed Version
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaGlobe, 
  FaHome, 
  FaUsers,
  FaPaperPlane,
  FaBuilding,
  FaClock,
  FaWhatsapp,
  FaExclamationCircle,
  FaCrown
} from 'react-icons/fa';
import { ContactUsService } from '../services/ContactUsService';

const ContactUs = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check sessionStorage for persisted success state
  const [isSuccessPersisted, setIsSuccessPersisted] = useState(() => {
    return sessionStorage.getItem('contactFormSuccess') === 'true';
  });
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: '',
    communicationPreferences: 'ALL',
    messageType: 'GENERAL'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(isSuccessPersisted);
  const [activeLocation, setActiveLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [contactInfo, setContactInfo] = useState({
    primaryEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@harmonioushandsfoundation.com',
    supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@harmonioushandsfoundation.com',
    primaryPhone: process.env.REACT_APP_SUPPORT_PHONE || '+91-86386-56513',
    whatsapp: process.env.REACT_APP_SUPPORT_PHONE || '+91-86386-56513',
    emergency: '+91-70990-41749',
    workingHours: 'Monday to Friday: 9:00 AM - 6:00 PM'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch locations from API on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const locationsData = await ContactUsService.getLocations();
        
        console.log(`[${process.env.REACT_APP_ENV}] Locations API Response:`, locationsData);
        
        let apiLocations = [];
        
        // Check if we have head office data
        if (locationsData.headOffice && locationsData.headOffice.city) {
          const headOfficeData = {
            id: 'head-office',
            city: locationsData.headOffice.city,
            address: locationsData.headOffice.address || 'Not specified',
            mapUrl: locationsData.headOffice.mapUrl || '#',
            phone: locationsData.headOffice.phone || contactInfo.primaryPhone,
            email: locationsData.headOffice.email || contactInfo.primaryEmail,
            hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
            description: 'Head Office & Operational Headquarter',
            isHeadQuarter: true
          };
          apiLocations.push(headOfficeData);
          
          // Set as active location by default
          setActiveLocation('head-office');
        }
        
        // Check if we have other locations array
        if (locationsData.otherLocations && Array.isArray(locationsData.otherLocations)) {
          locationsData.otherLocations.forEach((city, index) => {
            if (city && city.toLowerCase() !== 'jorhat') {
              const locationData = {
                id: `location-${index}`,
                city: city,
                address: `Address details for ${city}`,
                mapUrl: '#',
                phone: contactInfo.primaryPhone,
                email: contactInfo.supportEmail,
                hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
                description: 'Regional Office',
                isHeadQuarter: false
              };
              apiLocations.push(locationData);
            }
          });
        }
        
        // If no locations from API, use fallback
        if (apiLocations.length === 0) {
          apiLocations = [{
            id: 'jorhat',
            city: 'Jorhat',
            address: 'Kamalabaria Gaon, Na-Ali, Jorhat East, Jorhat, Assam – 785001',
            mapUrl: 'https://maps.app.goo.gl/VRSq9V3k3Vk2X6t59',
            phone: contactInfo.primaryPhone,
            email: contactInfo.supportEmail,
            hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
            description: 'Head Office & Operational Headquarters',
            isHeadQuarter: true
          }];
          setActiveLocation('jorhat');
        }
        
        setLocations(apiLocations);
        
        // Update contact info from API
        setContactInfo(prev => ({
          ...prev,
          primaryEmail: locationsData.primaryEmail || prev.primaryEmail,
          supportEmail: locationsData.supportEmail || prev.supportEmail,
          primaryPhone: locationsData.primaryPhone || prev.primaryPhone
        }));
        
      } catch (error) {
        console.error('Error fetching locations:', error);
        // Use fallback location if API fails
        const fallbackLocations = [{
          id: 'jorhat',
          city: 'Jorhat',
          address: 'Kamalabaria Gaon, Na-Ali, Jorhat East, Jorhat, Assam – 785001',
          mapUrl: 'https://maps.app.goo.gl/VRSq9V3k3Vk2X6t59',
          phone: contactInfo.primaryPhone,
          email: contactInfo.supportEmail,
          hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
          description: 'Head Office & Operational Headquarters',
          isHeadQuarter: true
        }];
        setLocations(fallbackLocations);
        setActiveLocation('jorhat');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);

  // Clear success state when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('contactFormSuccess');
    };
  }, []);

  // Persist success state in sessionStorage
  useEffect(() => {
    if (submitSuccess) {
      sessionStorage.setItem('contactFormSuccess', 'true');
      setIsSuccessPersisted(true);
    }
  }, [submitSuccess]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Call the backend endpoint using service
      const response = await ContactUsService.submitContactForm(formData);
      
      console.log(`[${process.env.REACT_APP_ENV}] Form submitted successfully:`, response);
      
      // Show success message
      setSubmitSuccess(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ 
        submit: error.message || 'Failed to submit form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setIsSuccessPersisted(false);
    sessionStorage.removeItem('contactFormSuccess');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      subject: '',
      message: '',
      communicationPreferences: 'ALL',
      messageType: 'GENERAL'
    });
    setErrors({});
  };

  const handleGoHome = () => {
    sessionStorage.removeItem('contactFormSuccess');
    navigate('/');
  };

  const handleGoToVolunteer = () => {
    sessionStorage.removeItem('contactFormSuccess');
    navigate('/volunteer');
  };

  const handleGoBack = () => {
    sessionStorage.removeItem('contactFormSuccess');
    navigate(-1);
  };

  const activeLocationData = locations.find(loc => loc.id === activeLocation);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading contact information...</p>
        <p className="environment-info">
          Environment: {process.env.REACT_APP_ENV}
        </p>
      </div>
    );
  }

  return (
    <section className="contact-us-page">
      {/* Background Image Overlay */}
      <div 
        className="background-overlay"
        style={{ 
          backgroundImage: `url(${require('../assets/abstract-img.jpeg')})`
        }}
      />
      
      <div className="container">
        {/* Environment Banner (Development/Staging only) */}
        {process.env.REACT_APP_ENV !== 'production' && (
          <div className="environment-banner">
            <span className="environment-label">
              {process.env.REACT_APP_ENV.toUpperCase()} ENVIRONMENT
            </span>
            <span className="api-info">
              API: {process.env.REACT_APP_API_BASE_URL}
            </span>
          </div>
        )}

        {/* Hero Section */}
        <div className="contact-hero">
          <div className="hero-title-wrapper">
            <h1 className="section-title"><em>Get in Touch With Us</em></h1>
            <div className="title-underline"></div>
          </div>
          
          <p className="hero-subtitle">
            We're here to help! Send us a message and our team will reach out to you within 24 hours.
          </p>

          <div className="contact-stats">
            <div className="contact-stat">
              <div className="stat-number">24</div>
              <div className="stat-label">Hour Response Time</div>
            </div>
            <div className="contact-stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="contact-stat">
              <div className="stat-number">{locations.length}</div>
              <div className="stat-label">Active Locations</div>
            </div>
            <div className="contact-stat">
              <div className="stat-number">365</div>
              <div className="stat-label">Days Active</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="contact-main-grid">
          {/* Left Column - Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <div className="form-icon">
                <FaPaperPlane />
              </div>
              <div>
                <h2 className="form-title">Write To Us</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
            </div>

            {/* Form with Success State */}
            {submitSuccess ? (
              <div className="success-state">
                <div className="success-icon-wrapper">
                  <FaCheckCircle />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We've received your message and our team will respond within 24 hours.</p>
                <p className="success-details">
                  A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
                <div className="success-actions">
                  <button 
                    onClick={handleResetForm}
                    className="btn btn-yellow-black"
                  >
                    Send Another Message
                  </button>
                  <button 
                    onClick={handleGoHome}
                    className="btn btn-outline"
                  >
                    Return to Home
                  </button>
                </div>
                <div className="persistence-notice">
                  <small>This message will remain until you navigate away from this page</small>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Name*</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                    />
                    {errors.fullName && (
                      <div className="error-message">
                        <FaExclamationCircle /> {errors.fullName}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">E-Mail*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                      <div className="error-message">
                        <FaExclamationCircle /> {errors.email}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject*</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                  />
                  {errors.subject && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.subject}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Type your message here..."
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                  />
                  {errors.message && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.message}
                    </div>
                  )}
                </div>
                
                {errors.submit && (
                  <div className="submit-error">
                    <FaExclamationCircle /> {errors.submit}
                  </div>
                )}
                
                <div className="consent-section">
                  <div className="consent-icon">
                    <FaCheckCircle />
                  </div>
                  <p className="consent-text">
                    By sharing your details, you agree to receive stories and updates from {process.env.REACT_APP_FOUNDATION_NAME} 
                    via mobile, Whatsapp, landline, email and post. If you'd like to change this, please send us an 
                    email on <a href={`mailto:${contactInfo.supportEmail}`}>{contactInfo.supportEmail}</a>
                  </p>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-yellow-black submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span> Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </button>
                  
                  <div className="volunteer-link">
                    <span>For volunteering and internship </span>
                    <button 
                      type="button" 
                      onClick={handleGoToVolunteer}
                      className="inline-link"
                    >
                      please click here
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column - Locations & Info */}
          <div className="locations-section">
            {/* Location Tabs */}
            <div className="location-tabs">
              <h2 className="section-title"><em>Our Locations</em></h2>
              <div className="tabs-container">
                {locations.map((locationItem) => (
                  <button
                    key={locationItem.id}
                    className={`location-tab ${activeLocation === locationItem.id ? 'active' : ''} ${locationItem.isHeadQuarter ? 'headquarter' : ''}`}
                    onClick={() => setActiveLocation(locationItem.id)}
                  >
                    <FaMapMarkerAlt />
                    <span>{locationItem.city}</span>
                    {locationItem.isHeadQuarter && (
                      <span className="headquarter-badge">
                        <FaCrown /> HQ
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Location Card */}
            {activeLocationData && (
              <div className="active-location-card">
                <div className="location-card-header">
                  <div className="location-card-icon">
                    <FaBuilding />
                  </div>
                  <div>
                    <h3>{activeLocationData.city}</h3>
                    <p className="location-description">
                      {activeLocationData.description}
                      {activeLocationData.isHeadQuarter && (
                        <span className="headquarter-tag">
                          <FaCrown /> Headquarter
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="location-card-body">
                  <div className="location-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <div>
                        <h4>Address</h4>
                        <p>{activeLocationData.address}</p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <div>
                        <h4>Working Hours</h4>
                        <p>{activeLocationData.hours}</p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <div>
                        <h4>Phone</h4>
                        <p>{activeLocationData.phone}</p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <FaEnvelope className="detail-icon" />
                      <div>
                        <h4>Email</h4>
                        <p>{activeLocationData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="location-actions">
                    <button 
                      onClick={() => window.open(activeLocationData.mapUrl, '_blank')}
                      className="btn btn-view-map"
                      disabled={activeLocationData.mapUrl === '#'}
                    >
                      <FaGlobe /> View On Google Maps
                    </button>
                    <button 
                      onClick={() => window.open(`tel:${activeLocationData.phone.replace(/\s+/g, '')}`)}
                      className="btn btn-call"
                    >
                      <FaPhone /> Call Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info Card */}
            <div className="contact-info-card">
              <div className="info-card-header">
                <h3><em>Quick Contact Info</em></h3>
              </div>

              <div className="info-card-body">
                <div className="info-item support-item">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <h4>Support Email</h4>
                    <a href={`mailto:${contactInfo.supportEmail}`} className="info-link">
                      {contactInfo.supportEmail}
                    </a>
                    <small>General inquiries & support</small>
                  </div>
                </div>

                <div className="info-item primary-item">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <h4>Main Phone Line</h4>
                    <a href={`tel:${contactInfo.primaryPhone.replace(/\s+/g, '')}`} className="info-link">
                      {contactInfo.primaryPhone}
                    </a>
                  </div>
                </div>

                <div className="info-item whatsapp-item">
                  <div className="info-icon">
                    <FaWhatsapp />
                  </div>
                  <div className="info-content">
                    <h4>WhatsApp Support</h4>
                    <p>{contactInfo.whatsapp}</p>
                    <small>Available for quick queries</small>
                  </div>
                </div>

                <div className="info-item hours-item">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-content">
                    <h4>Working Hours</h4>
                    <p>{contactInfo.workingHours}</p>
                    <small>Weekends: Limited support available</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="contact-faq">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What is the typical response time?</h3>
              <p>We aim to respond to all inquiries within 24 hours during business days. Emergency queries may receive faster responses.</p>
            </div>
            <div className="faq-item">
              <h3>Do you provide support in regional languages?</h3>
              <p>Yes, our support team can assist you in Hindi, English, Bengali, Assamese, and other regional languages.</p>
            </div>
            <div className="faq-item">
              <h3>Can I visit your office without an appointment?</h3>
              <p>While we welcome visitors, we recommend scheduling an appointment to ensure the right team member is available to assist you.</p>
            </div>
            <div className="faq-item">
              <h3>How can I volunteer or intern with you?</h3>
              <p>Please use the "Volunteer" link above or visit our Volunteer page for detailed information and application forms.</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="emergency-banner">
          <div className="emergency-content">
            <div className="emergency-icon">
              <FaPhone />
            </div>
            <div className="emergency-text">
              <h3>Emergency Contact</h3>
              <p>For urgent matters requiring immediate attention</p>
            </div>
            <div className="emergency-number">
              <a href={`tel:${contactInfo.emergency.replace(/\s+/g, '')}`}>
                {contactInfo.emergency}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ===== CONTACT US PAGE STYLES ===== */
        .contact-us-page {
          position: relative;
          background: var(--white);
          padding: 60px 0 40px;
          min-height: 100vh;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          font-size: 15px;
          scroll-margin-top: 95px;
          overflow-x: hidden;
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
          opacity: 0.1;
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

        /* CSS Variables */
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
          --success-green: #4CAF50;
          --gold: #FFD700;
        }

        /* Loading Container */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: var(--white);
        }

        .loading-container .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid var(--light-gray);
          border-top-color: var(--yellow);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        /* ===== HERO SECTION ===== */
        .contact-hero {
          text-align: center;
          margin-bottom: 60px;
          padding: 30px 0;
        }

        .hero-title-wrapper {
          display: inline-block;
          margin-bottom: 30px;
          position: relative;
        }

        .section-title {
          color: var(--dark-blue);
          font-size: 2.2rem;
          margin-bottom: 0;
          font-weight: 600;
          text-align: center;
          position: relative;
          z-index: 2;
          letter-spacing: -0.5px;
          font-style: italic;
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

        .hero-subtitle {
          font-size: 1.15rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        /* Contact Stats */
        .contact-stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          max-width: 800px;
          margin: 0 auto;
        }

        .contact-stat {
          background: var(--white);
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid var(--medium-gray);
          min-width: 150px;
          transition: all 0.3s ease;
        }

        .contact-stat:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.15);
          border-color: var(--yellow);
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--red);
          margin-bottom: 8px;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--dark-blue);
          font-weight: 500;
          line-height: 1.3;
        }

        /* ===== MAIN GRID LAYOUT ===== */
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        /* ===== CONTACT FORM SECTION ===== */
        .contact-form-section {
          background: var(--white);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border: 1px solid var(--medium-gray);
        }

        .form-header {
          background: linear-gradient(135deg, var(--dark-blue) 0%, #34495e 100%);
          color: var(--white);
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .form-icon {
          width: 60px;
          height: 60px;
          background: var(--yellow);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: var(--black);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .form-title {
          color: var(--white);
          font-size: 1.8rem;
          margin: 0 0 8px 0;
          font-weight: 600;
        }

        .form-subtitle {
          color: rgba(255,255,255,0.9);
          margin: 0;
          font-size: 0.95rem;
        }

        /* Form Content */
        .contact-form {
          padding: 30px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: var(--dark-blue);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid var(--medium-gray);
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.3s;
          background: var(--white);
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--yellow);
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
        }

        .form-input.error,
        .form-textarea.error {
          border-color: var(--red);
          background: rgba(255, 107, 107, 0.05);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .error-message {
          color: var(--red);
          font-size: 0.85rem;
          margin-top: 8px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .submit-error {
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid var(--red);
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          color: var(--red);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        /* Consent Section */
        .consent-section {
          display: flex;
          gap: 15px;
          margin: 25px 0;
          padding: 20px;
          background: rgba(255, 215, 0, 0.05);
          border-radius: 8px;
          border-left: 3px solid var(--yellow);
        }

        .consent-icon {
          color: var(--yellow);
          font-size: 1.2rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .consent-text {
          color: #666;
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        .consent-text a {
          color: var(--red);
          text-decoration: none;
          font-weight: 500;
        }

        /* Form Actions */
        .form-actions {
          margin-top: 30px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--yellow);
          color: var(--black);
          border: 2px solid var(--yellow);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--yellow-dark);
          border-color: var(--yellow-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 193, 7, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .volunteer-link {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 0.9rem;
        }

        .inline-link {
          background: none;
          border: none;
          color: var(--red);
          text-decoration: underline;
          cursor: pointer;
          font-weight: 600;
          padding: 0;
          font-size: inherit;
          font-family: inherit;
        }

        .inline-link:hover {
          color: #ff5252;
        }

        /* Success State */
        .success-state {
          padding: 40px 30px;
          text-align: center;
        }

        .success-icon-wrapper {
          width: 80px;
          height: 80px;
          background: var(--success-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: white;
          margin: 0 auto 25px;
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
        }

        .success-state h3 {
          color: var(--dark-blue);
          font-size: 1.8rem;
          margin-bottom: 15px;
        }

        .success-state p {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .success-details {
          background: rgba(76, 175, 80, 0.1);
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 3px solid var(--success-green);
        }

        .success-actions {
          display: flex;
          gap: 15px;
          margin-top: 25px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-outline {
          background: transparent;
          color: var(--dark-blue);
          border: 2px solid var(--dark-blue);
          padding: 14px 28px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
          font-size: 0.95rem;
        }

        .btn-outline:hover {
          background: var(--dark-blue);
          color: var(--white);
        }

        .persistence-notice {
          margin-top: 20px;
          padding: 10px;
          background: rgba(76, 175, 80, 0.1);
          border-radius: 6px;
          border-left: 3px solid var(--success-green);
        }

        .persistence-notice small {
          color: #666;
          font-size: 0.85rem;
        }

        /* ===== LOCATIONS SECTION ===== */
        .locations-section {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* Location Tabs */
        .location-tabs {
          background: var(--white);
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid var(--medium-gray);
        }

        .location-tabs .section-title {
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-align: left;
        }

        .tabs-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .location-tab {
          padding: 12px 24px;
          background: var(--light-gray);
          border: 1.5px solid var(--medium-gray);
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
          font-weight: 500;
          border: none;
          position: relative;
        }

        .location-tab:hover {
          background: var(--white);
          border-color: var(--dark-blue);
          transform: translateY(-2px);
        }

        .location-tab.active {
          background: var(--yellow);
          border-color: var(--yellow);
          color: var(--black);
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
        }

        .location-tab.headquarter.active {
          background: var(--gold);
          border-color: var(--gold);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .headquarter-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 8px;
          font-size: 0.8rem;
          color: var(--black);
          background: rgba(255, 215, 0, 0.2);
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .headquarter-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-left: 10px;
          background: var(--gold);
          color: var(--black);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Active Location Card */
        .active-location-card {
          background: var(--white);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border: 1px solid var(--medium-gray);
        }

        .location-card-header {
          background: linear-gradient(135deg, var(--red) 0%, #ff8a8a 100%);
          color: var(--white);
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .location-card-icon {
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .location-card-header h3 {
          margin: 0 0 5px 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .location-description {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .location-card-body {
          padding: 25px;
        }

        .location-details {
          margin-bottom: 25px;
        }

        .detail-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--medium-gray);
        }

        .detail-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .detail-icon {
          color: var(--red);
          font-size: 1.2rem;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .detail-item h4 {
          color: var(--dark-blue);
          margin: 0 0 5px 0;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-item p {
          color: #666;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .location-actions {
          display: flex;
          gap: 15px;
        }

        .btn-view-map, .btn-call {
          flex: 1;
          padding: 12px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          font-family: inherit;
          transition: all 0.3s;
        }

        .btn-view-map {
          background: var(--dark-blue);
          color: var(--white);
          border: 2px solid var(--dark-blue);
        }

        .btn-view-map:hover:not(:disabled) {
          background: #1a252f;
          border-color: #1a252f;
          transform: translateY(-2px);
        }

        .btn-view-map:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-call {
          background: var(--red);
          color: var(--white);
          border: 2px solid var(--red);
        }

        .btn-call:hover {
          background: #ff5252;
          border-color: #ff5252;
          transform: translateY(-2px);
        }

        /* Contact Info Card */
        .contact-info-card {
          background: linear-gradient(135deg, var(--yellow-light) 0%, rgba(255, 215, 0, 0.2) 100%);
          border-radius: 15px;
          padding: 25px;
          border: 1px solid rgba(255, 215, 0, 0.3);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);
        }

        .info-card-header h3 {
          color: var(--dark-blue);
          font-size: 1.4rem;
          margin: 0 0 20px 0;
          font-weight: 600;
          font-style: italic;
        }

        .info-card-body {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          border: 1px solid rgba(255, 215, 0, 0.2);
          transition: all 0.3s;
        }

        .info-item:hover {
          background: var(--white);
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .info-icon {
          color: var(--white);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .primary-item .info-icon {
          background: var(--red);
        }

        .whatsapp-item .info-icon {
          background: #25D366;
        }

        .support-item .info-icon {
          background: var(--dark-blue);
        }

        .hours-item .info-icon {
          background: var(--yellow);
          color: var(--black);
        }

        .info-content h4 {
          color: var(--dark-blue);
          margin: 0 0 5px 0;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-link {
          color: var(--dark-blue);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          display: block;
          margin-bottom: 3px;
        }

        .info-link:hover {
          color: var(--red);
        }

        .info-content p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }

        .info-content small {
          color: #888;
          font-size: 0.8rem;
        }

        /* ===== FAQ SECTION ===== */
        .contact-faq {
          background: var(--white);
          border-radius: 15px;
          padding: 40px;
          margin: 40px 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid var(--medium-gray);
        }

        .faq-title {
          color: var(--dark-blue);
          font-size: 2rem;
          text-align: center;
          margin-bottom: 40px;
          font-weight: 600;
          position: relative;
          padding-bottom: 15px;
        }

        .faq-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: var(--yellow);
          border-radius: 2px;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .faq-item {
          background: var(--light-gray);
          padding: 25px;
          border-radius: 10px;
          border: 1px solid var(--medium-gray);
          transition: all 0.3s;
        }

        .faq-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.1);
          border-color: var(--yellow);
        }

        .faq-item h3 {
          color: var(--dark-blue);
          font-size: 1.1rem;
          margin: 0 0 12px 0;
          font-weight: 600;
          line-height: 1.4;
        }

        .faq-item p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        /* ===== EMERGENCY BANNER ===== */
        .emergency-banner {
          background: linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%);
          color: var(--white);
          border-radius: 12px;
          padding: 25px;
          margin-top: 40px;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
        }

        .emergency-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .emergency-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        .emergency-text {
          flex: 1;
        }

        .emergency-text h3 {
          margin: 0 0 8px 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .emergency-text p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .emergency-number {
          background: var(--white);
          color: var(--red);
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.2rem;
          flex-shrink: 0;
          transition: all 0.3s;
        }

        .emergency-number a {
          color: var(--red);
          text-decoration: none;
        }

        .emergency-number:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        /* Spinner Animation */
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-radius: 50%;
          border-top-color: var(--black);
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Button Styles */
        .btn {
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
          font-family: inherit;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-yellow-black {
          background: var(--yellow);
          color: var(--black);
          border: 2px solid var(--yellow);
          font-weight: 600;
        }

        .btn-yellow-black:hover {
          background: var(--yellow-dark);
          border-color: var(--yellow-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 193, 7, 0.3);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1200px) {
          .contact-main-grid {
            gap: 30px;
          }
        }

        @media (max-width: 992px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .contact-stats {
            gap: 15px;
          }
          
          .contact-stat {
            min-width: 130px;
            padding: 15px;
          }
        }

        @media (max-width: 768px) {
          .contact-us-page {
            padding: 40px 0 20px;
            scroll-margin-top: 100px;
            top: 0;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .hero-subtitle {
            font-size: 1.05rem;
          }
          
          .contact-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .tabs-container {
            flex-direction: column;
          }
          
          .location-actions {
            flex-direction: column;
          }
          
          .emergency-content {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .form-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .form-icon {
            margin: 0 auto;
          }
          
          .success-actions {
            flex-direction: column;
          }
          
          .btn, .btn-outline {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.5rem;
          }
          
          .hero-subtitle {
            font-size: 0.95rem;
          }
          
          .contact-stats {
            grid-template-columns: 1fr;
          }
          
          .contact-stat {
            width: 100%;
          }
          
          .form-header,
          .contact-form,
          .location-tabs,
          .active-location-card,
          .contact-info-card,
          .contact-faq {
            padding: 20px;
          }
          
          .stat-number {
            font-size: 1.8rem;
          }
          
          .faq-grid {
            grid-template-columns: 1fr;
          }
          
          .headquarter-badge {
            font-size: 0.7rem;
            padding: 1px 6px;
          }
          
          .headquarter-tag {
            font-size: 0.7rem;
            padding: 2px 6px;
            margin-left: 5px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
