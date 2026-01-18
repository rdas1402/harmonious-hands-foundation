// components/VolunteerSignupPopup.js - SEPARATE FILE
import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaCheck, FaCalendar, FaTransgender, FaStar, FaHeart, FaArrowRight } from 'react-icons/fa';
import '../styles/components/VolunteerSignupPopup.css';

const VolunteerSignupPopup = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    state: '',
    occupation: '',
    organization: '',
    volunteerType: 'onground',
    preferredLocation: '',
    skills: '',
    previousExperience: '',
    availability: 'weekends',
    timeCommitment: '1-3 months',
    motivation: '',
    termsAccepted: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    // Basic validation for current step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setError('Please fill in all required fields');
        return;
      }
      if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setError('');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/volunteers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        if (onSuccess) onSuccess(data);
        
        // Auto close after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label><FaUser /> Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label><FaEnvelope /> Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label><FaPhone /> Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              
              <div className="form-group">
                <label><FaCalendar /> Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label><FaTransgender /> Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              <div className="form-group">
                <label><FaMapMarkerAlt /> City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                />
              </div>
              
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Your state"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3>Professional Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label><FaBriefcase /> Occupation</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="homemaker">Homemaker</option>
                  <option value="retired">Retired</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Company/Institution (optional)"
                />
              </div>
              
              <div className="form-group">
                <label><FaStar /> Volunteer Type *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="volunteerType"
                      value="onground"
                      checked={formData.volunteerType === 'onground'}
                      onChange={handleChange}
                    />
                    <span>On-ground</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="volunteerType"
                      value="online"
                      checked={formData.volunteerType === 'online'}
                      onChange={handleChange}
                    />
                    <span>Online</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="volunteerType"
                      value="both"
                      checked={formData.volunteerType === 'both'}
                      onChange={handleChange}
                    />
                    <span>Both</span>
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Preferred Location</label>
                <select
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                >
                  <option value="">Select location</option>
                  <option value="delhi-ncr">Delhi NCR</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bengaluru">Bengaluru</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="pune">Pune</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="weekends">Weekends</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Time Commitment</label>
                <select
                  name="timeCommitment"
                  value={formData.timeCommitment}
                  onChange={handleChange}
                >
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
              
              <div className="form-group full-width">
                <label>Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="List your skills (teaching, healthcare, technology, etc.)"
                  rows="3"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Previous Experience</label>
                <textarea
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleChange}
                  placeholder="Any previous volunteering experience (optional)"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3>Motivation & Agreement</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label><FaHeart /> Why do you want to volunteer with us? *</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Share your motivation for volunteering"
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group full-width terms-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I understand that my information will be used for volunteer coordination purposes only.
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="volunteer-popup-overlay">
        <div className="volunteer-popup success-popup">
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
          
          <div className="success-content">
            <div className="success-icon">
              <FaCheck />
            </div>
            
            <h2>Thank You for Signing Up!</h2>
            
            <div className="success-message">
              <p>
                <strong>Thank you {formData.fullName} for signing up as a volunteer!</strong>
              </p>
              <p>
                We have received your application and our Volunteer Action team will 
                get in touch with you within 3-5 working days.
              </p>
              <p>
                You will receive a confirmation email and SMS shortly.
              </p>
            </div>
            
            <div className="next-steps">
              <h4>What's Next?</h4>
              <ul>
                <li>Check your email for the confirmation</li>
                <li>Our team will contact you for orientation</li>
                <li>You can read inspiring stories from our blog</li>
              </ul>
            </div>
            
            <div className="success-actions">
              <button className="btn btn-primary" onClick={onClose}>
                Close
              </button>
              <a 
                href="https://harmonioushandsfoundation.com/blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Visit Our Blog
              </a>
            </div>
            
            <div className="auto-close">
              <p>This popup will close automatically in 3 seconds...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="volunteer-popup-overlay">
      <div className="volunteer-popup">
        <div className="popup-header">
          <div className="header-content">
            <h2>Become a Volunteer</h2>
            <p>Join our community of everyday heroes</p>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            
            <div className="step-indicator">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="volunteer-form">
          {renderStep()}
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          <div className="form-actions">
            <div className="action-buttons">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleBack}
                  disabled={loading}
                >
                  Back
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next Step <FaArrowRight />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </form>
        
        <div className="popup-footer">
          <p className="disclaimer">
            Your information is secure and will only be used for volunteer coordination purposes.
            By submitting, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignupPopup;