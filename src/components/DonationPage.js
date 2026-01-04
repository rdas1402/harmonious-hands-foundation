import React, { useState, useEffect } from 'react';
import { FaCheck, FaRupeeSign, FaShieldAlt, FaLock, FaReceipt, FaUserCheck, FaTimes, FaHandHoldingHeart } from 'react-icons/fa';

// Import shared components
import Header from './Header';
import Footer from './Footer';

const DonationPage = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [citizenship, setCitizenship] = useState('indian');
  const [donationType, setDonationType] = useState('once');
  const [category, setCategory] = useState('education');
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: 'INDIA',
    panNumber: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [citizenDeclaration, setCitizenDeclaration] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [allTermsAccepted, setAllTermsAccepted] = useState(false);

  // Reset scroll to top when donation page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const presetAmounts = [500, 1000, 2000, 5000];
  const categories = [
    { id: 'education', title: 'Support Children\'s Education', description: 'Help them stay in school' },
    { id: 'girls-education', title: 'Girl Child Education', description: 'Help girls complete their education' },
    { id: 'healthcare', title: 'Healthcare Access', description: 'Provide medical care to children' },
    { id: 'nutrition', title: 'Nutrition Programs', description: 'Ensure children get proper nutrition' },
    { id: 'women-empowerment', title: 'Women Empowerment', description: 'Empower women through skill development' },
    { id: 'general', title: 'General Fund', description: 'Support where needed most' }
  ];

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) setDonationAmount('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'fullName') {
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, pincode: value }));
    
    if (value.length === 6) {
      const mockCityState = {
        '785001': { city: 'Jorhat', state: 'Assam' },
        '781001': { city: 'Guwahati', state: 'Assam' },
        '110001': { city: 'New Delhi', state: 'Delhi' },
        '400001': { city: 'Mumbai', state: 'Maharashtra' },
        '700001': { city: 'Kolkata', state: 'West Bengal' },
        '600001': { city: 'Chennai', state: 'Tamil Nadu' }
      };
      
      if (mockCityState[value]) {
        setFormData(prev => ({
          ...prev,
          city: mockCityState[value].city,
          state: mockCityState[value].state
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!donationAmount && !customAmount) {
      alert('Please select or enter a donation amount');
      return;
    }

    if (step === 1) {
      setStep(2);
    } else {
      const finalAmount = donationAmount || customAmount;
      alert(`Thank you for your donation of ₹${finalAmount}! You will receive a tax receipt shortly.`);
      if (onClose) onClose();
    }
  };

  const isStep2Valid = () => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.mobile.trim().length === 10 &&
      formData.address.trim() &&
      formData.pincode.trim().length === 6 &&
      termsAccepted &&
      citizenDeclaration
    );
  };

  const handleAcceptAllTerms = () => {
    setAllTermsAccepted(true);
    setTermsAccepted(true);
    setShowTermsModal(false);
  };

  // Terms Modal Component
  const TermsModal = () => (
    <div className="terms-modal-overlay" onClick={() => setShowTermsModal(false)}>
      <div className="terms-modal-content" onClick={e => e.stopPropagation()}>
        <button className="terms-modal-close" onClick={() => setShowTermsModal(false)}>
          <FaTimes />
        </button>
        
        <h3>Terms and Conditions</h3>
        
        <div className="terms-modal-scroll">
          <div className="terms-section">
            <h4>1. General Terms</h4>
            <p>
              By making a donation to Harmonious Hands Foundation through our website or via any other 
              payment method, you agree to the following terms and conditions. We encourage all donors to 
              read these terms carefully before proceeding with any contribution.
            </p>
          </div>
          
          <div className="terms-section">
            <h4>2. Donation Policy</h4>
            <ul>
              <li>All donations are made voluntarily and must be used only for lawful, ethical purposes.</li>
              <li>Donations will be used to support our various programs in education, healthcare, women's empowerment, cultural preservation, sustainable development, and social welfare.</li>
              <li>Donations can be made in Indian Rupees (INR).</li>
            </ul>
          </div>
          
          <div className="terms-section">
            <h4>3. Refund Policy</h4>
            <ul>
              <li>All donations are non-refundable. Once a donation is confirmed, it is considered final.</li>
              <li>Refunds may only be issued in cases of technical error.</li>
              <li>To request a resolution, please email us at hhfoundation24@gmail.com within 7 days.</li>
            </ul>
          </div>
          
          <div className="terms-section">
            <h4>4. Tax Deductibility</h4>
            <ul>
              <li>Harmonious Hands Foundation is a registered Section 8 non-profit company.</li>
              <li>Donations are eligible for tax exemption under Section 80G of the Income Tax Act.</li>
              <li>Upon successful donation, you will receive an official receipt via email.</li>
            </ul>
          </div>
          
          <div className="terms-section">
            <h4>5. Privacy Policy</h4>
            <p>
              We are committed to safeguarding your privacy. Your personal and payment information 
              will be handled with strict confidentiality and used only for purposes related to your 
              donation.
            </p>
          </div>
          
          <div className="terms-section">
            <h4>6. Security</h4>
            <p>
              Our website uses SSL encryption and secure payment gateways to protect your sensitive 
              data during transactions.
            </p>
          </div>
          
          <div className="terms-section">
            <h4>7. Use of Donations</h4>
            <ul>
              <li>Donations will be used at the discretion of Harmonious Hands Foundation to further our mission.</li>
              <li>While you may specify a preference, the Foundation reserves the right to allocate funds where most urgently needed.</li>
            </ul>
          </div>
          
          <div className="terms-section">
            <h4>8. Changes to these Terms</h4>
            <p>
              Harmonious Hands Foundation reserves the right to update or modify these terms and 
              conditions at any time.
            </p>
          </div>
          
          <div className="terms-section">
            <h4>9. Governing Law</h4>
            <p>
              These terms are governed by and construed in accordance with the laws of India, 
              particularly within the jurisdiction of Assam.
            </p>
          </div>
        </div>
        
        <div className="terms-modal-actions">
          <button className="btn btn-secondary" onClick={() => setShowTermsModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAcceptAllTerms}>
            I Accept All Terms
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="donation-page">
      {/* Use the shared Header component with onClose for navigation */}
      <Header onDonateClick={onClose} isDonationPage={true} />
      
      {/* Main Content */}
      <main className="donation-main">
        <section className="donation-page-section">
          {/* Top Brush Decoration */}
          <div 
            className="brush-decoration top-brush"
            style={{ 
              backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
            }}
          />
          
          {/* Background Painting Effect */}
          <div className="painting-background">
            <div className="paint-layer paint-layer-1"></div>
            <div className="paint-layer paint-layer-2"></div>
            <div className="paint-layer paint-layer-3"></div>
            <div className="paint-layer paint-layer-4"></div>
          </div>
          
          <div className="container">
            {/* Section Header - Reduced margin for less space */}
            <div className="donation-header-section">
              <h2 className="section-title">Donate & Save Tax</h2>
              <div className="donation-header-divider"></div>
              <p className="donation-subtitle">
                Your generosity creates lasting change in communities across Assam
              </p>
            </div>

            <div className="donation-container">
              {/* Left Column - Impact Info */}
              <div className="donation-info-column">
                <div className="impact-card">
                  <div className="impact-header">
                    <div className="impact-icon">
                      <FaHandHoldingHeart />
                    </div>
                    <h3>Your Impact Matters</h3>
                  </div>
                  <div className="impact-content">
                    <p>
                      At Harmonious Hands Foundation, we believe that every hand joined in generosity becomes a step toward dignity, equity, and lasting change. Your contribution helps us uplift rural communities, educate children, empower women, protect cultural heritage, provide healthcare, and build sustainable livelihoods.
                    </p>
                    
                    <div className="impact-stats">
                      <div className="impact-stat-item">
                        <span className="impact-stat-number">50+</span>
                        <span className="impact-stat-label">Communities Served</span>
                      </div>
                      <div className="impact-stat-item">
                        <span className="impact-stat-number">1000+</span>
                        <span className="impact-stat-label">Lives Impacted</span>
                      </div>
                      <div className="impact-stat-item">
                        <span className="impact-stat-number">20+</span>
                        <span className="impact-stat-label">Projects Completed</span>
                      </div>
                    </div>

                    <div className="security-features">
                      <div className="security-item">
                        <FaLock className="security-icon" />
                        <div>
                          <h4>Secure Donation</h4>
                          <p>SSL encrypted payment processing</p>
                        </div>
                      </div>
                      <div className="security-item">
                        <FaReceipt className="security-icon" />
                        <div>
                          <h4>Tax Exemption</h4>
                          <p>80G tax benefit on every donation</p>
                        </div>
                      </div>
                      <div className="security-item">
                        <FaShieldAlt className="security-icon" />
                        <div>
                          <h4>100% Trusted</h4>
                          <p>Registered Section 8 non-profit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Donation Form */}
              <div className="donation-form-column">
                <form onSubmit={handleSubmit} className="donation-form-card">
                  {/* Step Indicator */}
                  <div className="step-indicator">
                    <div className={`step ${step === 1 ? 'active' : ''}`}>
                      <span className="step-number">1</span>
                      <span className="step-text">Donation Details</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${step === 2 ? 'active' : ''}`}>
                      <span className="step-number">2</span>
                      <span className="step-text">Personal Details</span>
                    </div>
                  </div>

                  {/* Step 1: Donation Details */}
                  {step === 1 && (
                    <>
                      <div className="form-section">
                        <h3 className="form-section-title">Citizenship *</h3>
                        <div className="citizenship-options">
                          <button
                            type="button"
                            className={`citizenship-btn ${citizenship === 'indian' ? 'active' : ''}`}
                            onClick={() => setCitizenship('indian')}
                          >
                            <FaUserCheck /> Indian Citizen
                          </button>
                          <button
                            type="button"
                            className={`citizenship-btn ${citizenship === 'foreign' ? 'active' : ''}`}
                            onClick={() => setCitizenship('foreign')}
                          >
                            Foreign Citizen/NRI
                          </button>
                        </div>
                        <p className="form-note">
                          Indian citizen option is for transacting through Indian bank accounts or cards issued by Indian banks.
                        </p>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Donation Type</h3>
                        <div className="donation-type-options">
                          <button
                            type="button"
                            className={`type-btn ${donationType === 'once' ? 'active' : ''}`}
                            onClick={() => setDonationType('once')}
                          >
                            Give Once
                          </button>
                          <button
                            type="button"
                            className={`type-btn ${donationType === 'monthly' ? 'active' : ''}`}
                            onClick={() => setDonationType('monthly')}
                          >
                            Give Monthly
                          </button>
                        </div>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Choose Amount (₹)</h3>
                        <div className="amount-options-grid">
                          {presetAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              className={`amount-option-btn ${donationAmount === amount ? 'active' : ''}`}
                              onClick={() => handleAmountSelect(amount)}
                            >
                              <FaRupeeSign /> {amount.toLocaleString('en-IN')}
                            </button>
                          ))}
                        </div>
                        <p className="form-note">
                          Help children go to school, stay healthy, and grow up in a safe environment
                        </p>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Other Amount</h3>
                        <div className="custom-amount-input">
                          <FaRupeeSign className="currency-icon" />
                          <input
                            type="number"
                            placeholder="Enter custom amount"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            min="1"
                            step="1"
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Choose Where to Help</h3>
                        <div className="category-options-grid">
                          {categories.map((cat) => (
                            <label key={cat.id} className="category-option">
                              <input
                                type="radio"
                                name="category"
                                value={cat.id}
                                checked={category === cat.id}
                                onChange={() => setCategory(cat.id)}
                              />
                              <div className="category-content">
                                <h4>{cat.title}</h4>
                                <p>{cat.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: Personal Details */}
                  {step === 2 && (
                    <>
                      <div className="form-section">
                        <h3 className="form-section-title">Personal Details</h3>
                        
                        <div className="form-group">
                          <label htmlFor="fullName">
                            Full Name * 
                            <span className="form-hint">(Special characters not allowed)</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="dob">Date of Birth</label>
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group half">
                            <label htmlFor="email">Email *</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="form-group half">
                            <label htmlFor="mobile">Mobile Number *</label>
                            <input
                              type="tel"
                              id="mobile"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleInputChange}
                              pattern="[0-9]{10}"
                              maxLength="10"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="address">Address *</label>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            required
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group half">
                            <label htmlFor="pincode">Pincode *</label>
                            <input
                              type="text"
                              id="pincode"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handlePincodeChange}
                              maxLength="6"
                              pattern="[0-9]{6}"
                              required
                            />
                            <small className="form-hint">Entering Pincode will autofill City and State</small>
                          </div>
                          <div className="form-group half">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group half">
                            <label htmlFor="state">State</label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              readOnly
                            />
                          </div>
                          <div className="form-group half">
                            <label htmlFor="country">Country</label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={formData.country}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="panNumber">PAN Number</label>
                          <input
                            type="text"
                            id="panNumber"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleInputChange}
                            placeholder="Enter 10-digit PAN"
                            maxLength="10"
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                          />
                          <small className="form-warning">
                            Please note that if you do not provide your PAN Number, you will not be able to claim 50% tax exemption u/s 80G in India
                          </small>
                        </div>

                        <div className="terms-section">
                          <label className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={termsAccepted}
                              onChange={(e) => {
                                setTermsAccepted(e.target.checked);
                                if (!e.target.checked) {
                                  setAllTermsAccepted(false);
                                }
                              }}
                              required
                            />
                            <span className="checkbox-text">
                              I agree to the <button type="button" className="terms-link" onClick={() => setShowTermsModal(true)}>Terms and Conditions</button> and confirm that information is being collected to comply with government regulations and shall be treated as confidential.
                            </span>
                          </label>

                          <label className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={citizenDeclaration}
                              onChange={(e) => setCitizenDeclaration(e.target.checked)}
                              required
                            />
                            <span className="checkbox-text">
                              I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided is true and correct to the best of my knowledge.
                            </span>
                          </label>
                        </div>

                        <div className="payment-methods-section">
                          <h4>We accept all major payment methods</h4>
                          <div className="payment-methods">
                            <span className="payment-method">RuPay</span>
                            <span className="payment-method">VISA</span>
                            <span className="payment-method">Mastercard</span>
                            <span className="payment-method">UPI</span>
                            <span className="payment-method">Net Banking</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Navigation Buttons */}
                  <div className="form-navigation">
                    {step === 2 && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={step === 2 && !isStep2Valid()}
                    >
                      {step === 1 ? 'Continue to Donor Details' : 'Continue to Payment'}
                    </button>
                  </div>
                </form>

                {/* Donation Summary Sidebar */}
                <div className="donation-summary-card">
                  <h3>Your Donation Summary</h3>
                  <div className="summary-item">
                    <span>Amount:</span>
                    <span className="donation-amount">
                      ₹{(donationAmount || customAmount || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Type:</span>
                    <span className="donation-type">{donationType === 'once' ? 'One-time' : 'Monthly'}</span>
                  </div>
                  <div className="summary-item">
                    <span>Category:</span>
                    <span className="donation-category">{categories.find(c => c.id === category)?.title}</span>
                  </div>
                  <div className="summary-item">
                    <span>Tax Benefit:</span>
                    <span className="tax-benefit-badge">
                      <FaCheck /> Eligible for 80G
                    </span>
                  </div>
                  <div className="security-badge">
                    <FaLock /> 100% Secure Donation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Use the shared Footer component */}
      <Footer onDonateClick={onClose} isDonationPage={true} />

      {/* Terms Modal */}
      {showTermsModal && <TermsModal />}

      <style jsx>{`
        .donation-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }
        
        /* Main Content - REDUCED margin to remove extra space */
        .donation-main {
          flex: 1;
          margin-top: 30px; /* Reduced from 110px to 30px */
        }
        
        .donation-page-section {
          position: relative;
          padding: 40px 0; /* Reduced padding */
          color: #333;
          overflow: hidden;
          background: #ffffff;
        }
        
        /* Brush Decorations */
        .brush-decoration {
          position: absolute;
          left: 0;
          right: 0;
          height: 100px; /* Reduced height */
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
        
        /* Painting Background Effect */
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
        
        /* Section Header - Reduced margins */
        .donation-header-section {
          text-align: center;
          margin-bottom: 30px; /* Reduced from 40px */
          position: relative;
          z-index: 2;
        }
        
        .section-title {
          color: #2c3e50;
          font-size: 2.5rem; /* Slightly reduced */
          margin-bottom: 10px; /* Reduced from 15px */
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
        
        .donation-header-divider {
          width: 100px;
          height: 4px;
          background: #FFA500;
          margin: 0 auto 15px; /* Reduced bottom margin */
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(255, 165, 0, 0.3);
        }
        
        .donation-subtitle {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          color: #2c3e50;
          font-size: 1.1rem; /* Slightly smaller */
          line-height: 1.6;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.9);
          padding: 12px 25px; /* Reduced padding */
          border-radius: 25px; /* Slightly smaller radius */
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          box-shadow: 0 3px 12px rgba(255, 165, 0, 0.2); /* Reduced shadow */
        }
        
        /* Main Container */
        .donation-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 30px; /* Reduced from 40px */
          position: relative;
          z-index: 2;
        }
        
        /* Left Column - Impact Info */
        .donation-info-column {
          position: sticky;
          top: 20px;
          height: fit-content;
        }
        
        .impact-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          overflow: hidden;
          position: relative;
        }
        
        .impact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: #FFA500;
        }
        
        .impact-header {
          padding: 25px 25px 15px; /* Reduced padding */
          border-bottom: 1px solid rgba(255, 165, 0, 0.3);
        }
        
        .impact-icon {
          background: #FFA500;
          color: #2c3e50;
          width: 55px; /* Slightly smaller */
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem; /* Slightly smaller */
          margin-bottom: 12px; /* Reduced */
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.4);
        }
        
        .impact-header h3 {
          color: #2c3e50;
          font-size: 1.6rem; /* Slightly smaller */
          margin: 0;
          font-weight: 700;
        }
        
        .impact-content {
          padding: 25px; /* Reduced */
        }
        
        .impact-content p {
          color: #555;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 15px; /* Reduced */
        }
        
        .impact-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px; /* Reduced */
          background: rgba(255, 165, 0, 0.15);
          padding: 18px; /* Reduced */
          border-radius: 10px; /* Slightly smaller */
          border: 1px solid rgba(255, 165, 0, 0.3);
          margin: 20px 0; /* Reduced */
        }
        
        .impact-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .impact-stat-number {
          font-size: 1.8rem; /* Reduced */
          font-weight: 800;
          color: #2c3e50;
          line-height: 1;
          margin-bottom: 6px; /* Reduced */
          text-shadow: 0 2px 4px rgba(255, 165, 0, 0.3);
        }
        
        .impact-stat-label {
          font-size: 0.85rem; /* Slightly smaller */
          color: #666;
          line-height: 1.3;
        }
        
        .security-features {
          margin-top: 20px; /* Reduced */
        }
        
        .security-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px; /* Reduced */
          padding: 12px; /* Reduced */
          background: rgba(255, 255, 255, 0.9);
          border-radius: 10px;
          border: 1px solid rgba(255, 165, 0, 0.2);
        }
        
        .security-icon {
          color: #FFA500;
          font-size: 1.3rem; /* Slightly smaller */
          flex-shrink: 0;
        }
        
        .security-item h4 {
          color: #2c3e50;
          margin: 0 0 5px 0;
          font-size: 1rem; /* Slightly smaller */
        }
        
        .security-item p {
          color: #666;
          margin: 0;
          font-size: 0.85rem; /* Slightly smaller */
        }
        
        /* Right Column - Donation Form */
        .donation-form-column {
          display: flex;
          flex-direction: column;
          gap: 25px; /* Reduced */
        }
        
        .donation-form-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          padding: 35px; /* Reduced */
          position: relative;
        }
        
        .donation-form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: #FFA500;
        }
        
        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 35px; /* Reduced */
          padding-bottom: 15px; /* Reduced */
          border-bottom: 1px solid rgba(255, 165, 0, 0.3);
        }
        
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          opacity: 0.5;
          transition: all 0.3s;
        }
        
        .step.active {
          opacity: 1;
        }
        
        .step-number {
          width: 40px;
          height: 40px;
          background: #ddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #666;
          transition: all 0.3s;
        }
        
        .step.active .step-number {
          background: #FFA500;
          color: white;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.4);
        }
        
        .step-text {
          font-size: 0.9rem;
          color: #666;
        }
        
        .step.active .step-text {
          color: #2c3e50;
          font-weight: 600;
        }
        
        .step-line {
          flex: 1;
          height: 2px;
          background: #ddd;
          max-width: 100px;
        }
        
        .form-section {
          margin-bottom: 35px;
        }
        
        .form-section:last-child {
          margin-bottom: 0;
        }
        
        .form-section-title {
          color: #2c3e50;
          margin: 0 0 15px 0;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .form-note {
          color: #666;
          font-size: 0.9rem;
          margin: 10px 0 0 0;
          line-height: 1.5;
        }
        
        /* Citizenship Options */
        .citizenship-options {
          display: flex;
          gap: 15px;
        }
        
        .citizenship-btn {
          flex: 1;
          padding: 15px;
          background: #f8f9fa;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .citizenship-btn.active {
          background: #FFA500;
          color: white;
          border-color: #FFA500;
          box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
        }
        
        /* Donation Type */
        .donation-type-options {
          display: flex;
          gap: 15px;
        }
        
        .type-btn {
          flex: 1;
          padding: 15px;
          background: #f8f9fa;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .type-btn.active {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }
        
        /* Amount Options */
        .amount-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        @media (min-width: 768px) {
          .amount-options-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .amount-option-btn {
          padding: 20px 15px;
          background: #f8f9fa;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .amount-option-btn.active {
          background: #FFA500;
          color: white;
          border-color: #FFA500;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
        }
        
        /* Custom Amount */
        .custom-amount-input {
          display: flex;
          align-items: center;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }
        
        .currency-icon {
          padding: 0 15px;
          color: #666;
          font-size: 1.2rem;
        }
        
        .custom-amount-input input {
          flex: 1;
          padding: 15px;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          outline: none;
          width: 100%;
        }
        
        /* Categories */
        .category-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .category-option {
          display: flex;
          align-items: flex-start;
          padding: 15px;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          background: #f8f9fa;
        }
        
        .category-option:hover {
          border-color: #FFA500;
          background: #fff8e1;
        }
        
        .category-option input {
          margin-top: 5px;
          margin-right: 12px;
        }
        
        .category-content h4 {
          color: #2c3e50;
          margin: 0 0 5px 0;
          font-size: 1rem;
        }
        
        .category-content p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.4;
        }
        
        /* Form Inputs */
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: 600;
          font-size: 0.95rem;
        }
        
        .form-hint {
          font-weight: normal;
          color: #666;
          font-size: 0.85rem;
          margin-left: 5px;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #dee2e6;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.3s;
          background: white;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #FFA500;
          box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
        }
        
        .form-group input:read-only {
          background: #f5f5f5;
          cursor: not-allowed;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .half {
          flex: 1;
        }
        
        .form-warning {
          display: block;
          margin-top: 5px;
          color: #d32f2f;
          font-size: 0.85rem;
          line-height: 1.4;
        }
        
        /* Terms Section */
        .terms-section {
          margin: 25px 0;
          padding: 20px;
          background: rgba(255, 165, 0, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 165, 0, 0.2);
        }
        
        .checkbox-option {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
          color: #2c3e50;
          font-size: 0.95rem;
          line-height: 1.6;
          cursor: pointer;
        }
        
        .checkbox-option:last-child {
          margin-bottom: 0;
        }
        
        .checkbox-option input {
          margin-right: 12px;
          margin-top: 5px;
          flex-shrink: 0;
        }
        
        .checkbox-text {
          display: inline;
        }
        
        .terms-link {
          background: none;
          border: none;
          color: #FFA500;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
        }
        
        .terms-link:hover {
          text-decoration: underline;
        }
        
        /* Payment Methods */
        .payment-methods-section {
          margin: 25px 0;
          padding: 20px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 8px;
          border: 1px solid #90caf9;
        }
        
        .payment-methods-section h4 {
          color: #1565c0;
          margin: 0 0 15px 0;
          text-align: center;
        }
        
        .payment-methods {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .payment-method {
          background: white;
          padding: 8px 15px;
          border-radius: 4px;
          font-weight: 600;
          color: #2c3e50;
          border: 1px solid #ddd;
          font-size: 0.9rem;
        }
        
        /* Form Navigation */
        .form-navigation {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-top: 30px;
        }
        
        .btn {
          flex: 1;
          padding: 15px 25px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }
        
        .btn-primary {
          background: #FFA500;
          color: white;
        }
        
        .btn-primary:hover:not(:disabled) {
          background: #ff8c00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
        }
        
        .btn-primary:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        
        .btn-secondary:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }
        
        /* Donation Summary */
        .donation-summary-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          padding: 30px;
          position: relative;
        }
        
        .donation-summary-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: #FFA500;
        }
        
        .donation-summary-card h3 {
          color: #2c3e50;
          margin: 0 0 25px 0;
          font-size: 1.3rem;
          font-weight: 700;
          padding-bottom: 15px;
          border-bottom: 2px solid #FFA500;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 165, 0, 0.2);
        }
        
        .summary-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .summary-item span:first-child {
          color: #666;
          font-weight: 500;
        }
        
        .summary-item span:last-child {
          color: #2c3e50;
          font-weight: 600;
        }
        
        .donation-amount {
          color: #FFA500 !important;
          font-size: 1.2rem;
        }
        
        .tax-benefit-badge {
          color: #4CAF50 !important;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .security-badge {
          margin-top: 25px;
          padding: 12px;
          background: rgba(76, 175, 80, 0.1);
          border-radius: 6px;
          text-align: center;
          color: #4CAF50;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }
        
        /* Terms Modal */
        .terms-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        
        .terms-modal-content {
          background: white;
          border-radius: 15px;
          max-width: 800px;
          width: 100%;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .terms-modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #666;
          cursor: pointer;
          z-index: 1;
        }
        
        .terms-modal-content h3 {
          background: #2c3e50;
          color: white;
          margin: 0;
          padding: 25px;
          font-size: 1.5rem;
          text-align: center;
        }
        
        .terms-modal-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
        }
        
        .terms-modal-scroll .terms-section {
          margin-bottom: 25px;
          padding-bottom: 25px;
          border-bottom: 1px solid #eee;
        }
        
        .terms-modal-scroll .terms-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .terms-modal-scroll h4 {
          color: #2c3e50;
          margin: 0 0 10px 0;
          font-size: 1.2rem;
        }
        
        .terms-modal-scroll p {
          color: #555;
          line-height: 1.6;
          margin: 0 0 10px 0;
        }
        
        .terms-modal-scroll ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        
        .terms-modal-scroll li {
          color: #555;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        
        .terms-modal-actions {
          padding: 20px;
          border-top: 1px solid #eee;
          display: flex;
          gap: 15px;
        }
        
        .terms-modal-actions .btn {
          flex: 1;
          padding: 12px 20px;
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
          .donation-container {
            grid-template-columns: 1fr;
            gap: 25px; /* Reduced */
          }
          
          .donation-info-column {
            position: static;
          }
          
          .section-title {
            font-size: 2.2rem; /* Adjusted */
          }
        }
        
        @media (max-width: 992px) {
          .donation-main {
            margin-top: 20px; /* Further reduced for mobile */
          }
          
          .donation-page-section {
            padding: 30px 0; /* Further reduced */
          }
          
          .section-title {
            font-size: 1.9rem; /* Adjusted */
          }
          
          .donation-subtitle {
            font-size: 1rem; /* Adjusted */
            padding: 10px 20px; /* Reduced */
          }
          
          .donation-form-card {
            padding: 25px; /* Reduced */
          }
          
          .category-options-grid {
            grid-template-columns: 1fr;
          }
          
          .impact-stats {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
        
        @media (max-width: 768px) {
          .donation-main {
            margin-top: 10px; /* Minimal margin for mobile */
          }
          
          .section-title {
            font-size: 1.7rem; /* Adjusted */
          }
          
          .donation-form-card,
          .impact-card,
          .donation-summary-card {
            padding: 20px; /* Reduced */
          }
          
          .amount-options-grid {
            grid-template-columns: 1fr;
          }
          
          .citizenship-options,
          .donation-type-options {
            flex-direction: column;
          }
          
          .impact-stats {
            grid-template-columns: 1fr;
            gap: 10px; /* Reduced */
          }
          
          .form-navigation {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
          
          .brush-decoration {
            height: 60px; /* Reduced */
          }
          
          .terms-modal-actions {
            flex-direction: column;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.4rem; /* Adjusted */
          }
          
          .donation-form-card,
          .impact-card,
          .donation-summary-card {
            padding: 15px; /* Reduced */
          }
          
          .impact-header {
            padding: 15px 15px 10px; /* Reduced */
          }
          
          .impact-header h3 {
            font-size: 1.3rem; /* Adjusted */
          }
          
          .brush-decoration {
            height: 40px; /* Reduced */
          }
          
          .donation-main {
            margin-top: 5px; /* Minimal margin */
          }
        }
      `}</style>
    </div>
  );
};

export default DonationPage;