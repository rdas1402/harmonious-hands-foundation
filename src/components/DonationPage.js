import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaCheck, FaRupeeSign, FaShieldAlt, FaLock, FaReceipt, 
  FaUserCheck, FaTimes, FaHandHoldingHeart, FaSpinner,
  FaExclamationTriangle, FaInfoCircle, FaCreditCard,
  FaArrowLeft, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaUser, FaIdCard, FaHome
} from 'react-icons/fa';
import axios from 'axios';
import '../styles/components/DonationPage.css';

const DonationPage = ({ onClose, onShowTerms }) => {
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
  const [loading, setLoading] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [fieldTouched, setFieldTouched] = useState({});
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
  const razorpayLoadedRef = useRef(false);

  // Initialize
  useEffect(() => {
    window.scrollTo(0, 0);
    loadRazorpayScript();
    
    // Clean up on unmount
    return () => {
      if (currentOrderId) {
        handleAbandonedOrder(currentOrderId, 'component_unmount');
      }
    };
  }, []);

  // Load Razorpay script
  const loadRazorpayScript = async () => {
    try {
      if (window.Razorpay || razorpayLoadedRef.current) {
        return true;
      }
      
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          razorpayLoadedRef.current = true;
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          setError('Payment gateway failed to load. Please refresh the page or check your internet connection.');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    } catch (error) {
      console.error('Error loading Razorpay:', error);
      return false;
    }
  };

  // Categories
  const categories = [
    { id: 'education', title: 'Support Children\'s Education', description: 'Help them stay in school', icon: '📚' },
    { id: 'girls-education', title: 'Girl Child Education', description: 'Help girls complete their education', icon: '👧' },
    { id: 'healthcare', title: 'Healthcare Access', description: 'Provide medical care to children', icon: '🏥' },
    { id: 'nutrition', title: 'Nutrition Programs', description: 'Ensure children get proper nutrition', icon: '🍎' },
    { id: 'women-empowerment', title: 'Women Empowerment', description: 'Empower women through skill development', icon: '💪' },
    { id: 'general', title: 'General Fund', description: 'Support where needed most', icon: '❤️' }
  ];

  // Preset amounts
  const presetAmounts = [500, 1000, 2000, 5000, 10000, 50000];

  // Handle amount selection
  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
    setError('');
  };

  // Handle custom amount
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 10000000)) {
      setCustomAmount(value);
      if (value) setDonationAmount('');
    }
    setError('');
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for different fields
    let processedValue = value;
    
    switch (name) {
      case 'fullName':
        processedValue = value.replace(/[^a-zA-Z\s]/g, '');
        break;
      case 'mobile':
        processedValue = value.replace(/\D/g, '').slice(0, 10);
        break;
      case 'email':
        processedValue = value.toLowerCase();
        break;
      case 'panNumber':
        processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
        break;
      default:
        processedValue = value;
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    validateField(name, processedValue);
    setError('');
  };

  // Validate individual field
  const validateField = (name, value) => {
    const errors = { ...formErrors };
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          errors.fullName = 'Full name is required';
        } else if (value.length < 2) {
          errors.fullName = 'Name must be at least 2 characters';
        } else if (value.length > 100) {
          errors.fullName = 'Name must be less than 100 characters';
        } else {
          delete errors.fullName;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
        
      case 'mobile':
        if (!value.trim()) {
          errors.mobile = 'Mobile number is required';
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          errors.mobile = 'Please enter a valid 10-digit Indian mobile number';
        } else {
          delete errors.mobile;
        }
        break;
        
      case 'address':
        if (!value.trim()) {
          errors.address = 'Address is required';
        } else {
          delete errors.address;
        }
        break;
        
      case 'pincode':
        if (!value.trim()) {
          errors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(value)) {
          errors.pincode = 'Please enter a valid 6-digit pincode';
        } else {
          delete errors.pincode;
        }
        break;
        
      case 'panNumber':
        if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
          errors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
        } else {
          delete errors.panNumber;
        }
        break;
        
      default:
        break;
    }
    
    setFormErrors(errors);
  };

  // Handle field blur
  const handleFieldBlur = (e) => {
    const { name } = e.target;
    setFieldTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Handle pincode change with auto-fill
  const handlePincodeChange = async (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, pincode: value }));
    
    if (value.length === 6) {
      // You can integrate with a pincode API here
      // For now, using mock data
      const mockPincodeData = {
        '785001': { city: 'Jorhat', state: 'Assam' },
        '781001': { city: 'Guwahati', state: 'Assam' },
        '110001': { city: 'New Delhi', state: 'Delhi' },
        '400001': { city: 'Mumbai', state: 'Maharashtra' },
        '700001': { city: 'Kolkata', state: 'West Bengal' },
        '600001': { city: 'Chennai', state: 'Tamil Nadu' },
        '411057': { city: 'Pune', state: 'Maharashtra' }
      };
      
      if (mockPincodeData[value]) {
        setFormData(prev => ({
          ...prev,
          city: mockPincodeData[value].city,
          state: mockPincodeData[value].state
        }));
      } else {
        // Reset if pincode not found
        setFormData(prev => ({
          ...prev,
          city: '',
          state: ''
        }));
      }
    }
    
    validateField('pincode', value);
  };

  // Handle abandoned orders
  const handleAbandonedOrder = async (orderId, reason = 'user_cancelled') => {
    try {
      await axios.post(`${API_BASE_URL}/donations/order-abandoned`, { 
        orderId, 
        reason 
      });
      console.log('Abandoned order logged:', orderId);
    } catch (error) {
      console.error('Error logging abandoned order:', error);
    }
  };

  // Handle failed payments
  const handleFailedPayment = async (orderId, errorDetails) => {
    try {
      await axios.post(`${API_BASE_URL}/donations/payment-failed`, {
        orderId,
        error: errorDetails
      });
      console.log('Failed payment logged:', orderId);
    } catch (error) {
      console.error('Error reporting failed payment:', error);
    }
  };

  // Create Razorpay order in backend
  const createRazorpayOrder = async (donationData) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${API_BASE_URL}/donations/create-order`, donationData);
      
      if (response.data.success) {
        setCurrentOrderId(response.data.data.orderId);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create payment order';
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Initiate Razorpay payment
  const initiateRazorpayPayment = useCallback(async (orderData, donationData) => {
    try {
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error('Payment gateway not available. Please refresh the page.');
      }

      const options = {
        key: orderData.razorpayKey || process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Harmonious Hands Foundation',
        description: `Donation for ${categories.find(c => c.id === donationData.category)?.title}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          await verifyPayment(response, donationData);
        },
        prefill: {
          name: donationData.donorDetails.fullName,
          email: donationData.donorDetails.email,
          contact: donationData.donorDetails.mobile
        },
        theme: {
          color: '#FFA500'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed by user');
            setPaymentInProgress(false);
            handleAbandonedOrder(orderData.orderId, 'modal_dismissed');
            setCurrentOrderId(null);
          }
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: "Pay via Net Banking",
                instruments: [
                  {
                    method: "netbanking",
                    banks: ["HDFC", "ICICI", "SBI", "AXIS", "KOTAK"]
                  }
                ]
              },
              upi: {
                name: "Pay via UPI",
                instruments: [
                  {
                    method: "upi"
                  }
                ]
              },
              card: {
                name: "Pay via Card",
                instruments: [
                  {
                    method: "card"
                  }
                ]
              },
              wallets: {
                name: "Pay via Wallets",
                instruments: [
                  {
                    method: "wallet"
                  }
                ]
              }
            },
            sequence: ["block.banks", "block.upi", "block.card", "block.wallets"],
            preferences: {
              show_default_blocks: false
            }
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      // Handle payment events
      rzp.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        setPaymentInProgress(false);
        setCurrentOrderId(null);
        
        const errorMsg = response.error?.description || 'Payment failed. Please try again.';
        const errorCode = response.error?.code || 'PAYMENT_FAILED';
        
        setError(`Payment failed: ${errorMsg}`);
        setPaymentStatus('failed');
        
        // Notify backend about failed payment
        handleFailedPayment(orderData.orderId, {
          code: errorCode,
          description: errorMsg,
          reason: response.error?.reason
        });
      });
      
      rzp.on('payment.cancelled', () => {
        console.log('Payment cancelled by user');
        setPaymentInProgress(false);
        setCurrentOrderId(null);
        setPaymentStatus('cancelled');
        handleAbandonedOrder(orderData.orderId, 'user_cancelled');
      });
      
      rzp.open();
      setPaymentInProgress(true);
      setPaymentStatus('processing');
      
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      setPaymentInProgress(false);
      setCurrentOrderId(null);
      setError('Failed to initialize payment gateway. Please try again.');
      setPaymentStatus('error');
    }
  }, []);

  // Verify payment after success
  const verifyPayment = async (paymentResponse, donationData) => {
    try {
      setLoading(true);
      setPaymentStatus('verifying');
      
      const verificationData = {
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpaySignature: paymentResponse.razorpay_signature,
        donationDetails: donationData
      };

      const response = await axios.post(`${API_BASE_URL}/donations/verify-payment`, verificationData);
      
      if (response.data.success) {
        setCurrentOrderId(null);
        setPaymentStatus('success');
        setSuccess(true);
        
        // Show success message
        setTimeout(() => {
          alert('Thank you for your donation! 🎉\n\n' +
                `Payment ID: ${response.data.paymentId}\n` +
                `Receipt: ${response.data.receipt}\n` +
                `Amount: ₹${response.data.amount}\n\n` +
                'You will receive a tax receipt via email shortly.');
          
          if (onClose) onClose();
        }, 500);
        
      } else {
        throw new Error(response.data.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setCurrentOrderId(null);
      setPaymentStatus('verification_failed');
      
      const errorMsg = error.response?.data?.message || error.message || 'Payment verification failed';
      setError(`Payment verification failed: ${errorMsg}`);
      
      alert(`Payment verification failed.\n\nPlease contact support with your payment ID: ${paymentResponse.razorpay_payment_id}`);
    } finally {
      setLoading(false);
      setPaymentInProgress(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate step 1
      if (!donationAmount && !customAmount) {
        setError('Please select or enter a donation amount');
        return;
      }
      
      const finalAmount = donationAmount || customAmount;
      if (finalAmount < 1) {
        setError('Amount must be at least ₹1');
        return;
      }
      
      if (finalAmount > 10000000) {
        setError('Amount cannot exceed ₹1,00,00,000');
        return;
      }
      
      setStep(2);
      setError('');
      
    } else {
      // Validate step 2
      if (!isStep2Valid()) {
        setError('Please fill all required fields and accept terms');
        return;
      }
      
      try {
        setError('');
        setCurrentOrderId(null);
        setPaymentStatus('');

        const finalAmount = donationAmount || customAmount;
        
        // Prepare donation data
        const donationData = {
          amount: Math.round(finalAmount * 100), // Convert to paise
          currency: 'INR',
          receipt: `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          donorDetails: formData,
          category: category,
          donationType: donationType,
          termsAccepted: termsAccepted,
          citizenDeclaration: citizenDeclaration
        };

        // Step 1: Create order in backend
        const orderData = await createRazorpayOrder(donationData);
        
        // Step 2: Initiate Razorpay payment
        await initiateRazorpayPayment(orderData, donationData);
        
      } catch (error) {
        console.error('Payment initiation error:', error);
        setError(error.message || 'Failed to initiate payment. Please try again.');
        setPaymentInProgress(false);
        setPaymentStatus('initiation_failed');
      }
    }
  };

  // Validate step 2
  const isStep2Valid = () => {
    const requiredFields = ['fullName', 'email', 'mobile', 'address', 'pincode'];
    const hasAllRequiredFields = requiredFields.every(field => formData[field]?.trim());
    
    const hasNoErrors = Object.keys(formErrors).length === 0;
    const hasValidMobile = formData.mobile?.length === 10;
    const hasValidPincode = formData.pincode?.length === 6;
    
    return hasAllRequiredFields && hasNoErrors && hasValidMobile && hasValidPincode && 
           termsAccepted && citizenDeclaration;
  };

  // Calculate total amount
  const getTotalAmount = () => {
    return donationAmount || customAmount || 0;
  };

  // Get selected category title
  const getSelectedCategoryTitle = () => {
    const selectedCat = categories.find(c => c.id === category);
    return selectedCat ? selectedCat.title : 'Unknown';
  };

  // Format amount for display
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Handle back button
  const handleBack = () => {
    if (step === 2) {
      if (currentOrderId) {
        handleAbandonedOrder(currentOrderId, 'user_went_back');
        setCurrentOrderId(null);
      }
      setStep(1);
    }
  };

  // Terms Modal Component
  const TermsModal = () => (
    <div className="terms-modal-overlay" onClick={() => setShowTermsModal(false)}>
      <div className="terms-modal-content" onClick={e => e.stopPropagation()}>
        <button 
          className="terms-modal-close" 
          onClick={() => setShowTermsModal(false)}
          aria-label="Close terms modal"
        >
          <FaTimes />
        </button>
        
        <h3>Terms and Conditions</h3>
        
        <div className="terms-modal-scroll">
          <div className="terms-section">
            <h4>Donation Terms</h4>
            <p>
              1. All donations made to Harmonious Hands Foundation are voluntary and non-refundable.
            </p>
            <p>
              2. Donations are eligible for tax exemption under Section 80G of the Income Tax Act, 1961.
            </p>
            <p>
              3. Tax receipts will be issued within 15 working days of the donation.
            </p>
          </div>
          
          <div className="terms-section">
            <h4>Privacy Policy</h4>
            <p>
              1. Your personal information is collected solely for the purpose of issuing tax receipts and maintaining donor records.
            </p>
            <p>
              2. We do not share your personal information with third parties without your consent.
            </p>
          </div>
          
          <div className="terms-section">
            <h4>Payment Security</h4>
            <p>
              1. All payments are processed through Razorpay, a PCI-DSS compliant payment gateway.
            </p>
            <p>
              2. We do not store your payment card details.
            </p>
          </div>
        </div>
        
        <div className="terms-modal-actions">
          <button className="btn btn-secondary" onClick={() => setShowTermsModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => {
            setTermsAccepted(true);
            setShowTermsModal(false);
          }}>
            I Accept Terms
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="donation-page">
      {/* Main Content */}
      <main className="donation-main">
        <section className="donation-page-section">
          {/* Brush Decoration */}
          <div 
            className="brush-decoration top-brush"
            style={{ 
              backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
            }}
            aria-hidden="true"
          />
          
          {/* Background Painting Effect */}
          <div className="painting-background" aria-hidden="true">
            <div className="paint-layer paint-layer-1"></div>
            <div className="paint-layer paint-layer-2"></div>
            <div className="paint-layer paint-layer-3"></div>
            <div className="paint-layer paint-layer-4"></div>
          </div>
          
          <div className="container">
            {/* Section Header */}
            <div className="donation-header-section">
              <h1 className="section-title">Donate & Save Tax</h1>
              <div className="donation-header-divider"></div>
              <p className="donation-subtitle">
                Your generosity creates lasting change in communities across Assam
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message" role="alert">
                <FaExclamationTriangle /> 
                <div className="error-content">
                  <strong>Error:</strong> {error}
                  {paymentStatus === 'verification_failed' && (
                    <p className="error-note">
                      Please contact support with your payment ID for assistance.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="success-message" role="alert">
                <FaCheck /> 
                <div className="success-content">
                  <strong>Success!</strong> Your donation has been processed successfully.
                  <p className="success-note">
                    You will receive a tax receipt via email shortly.
                  </p>
                </div>
              </div>
            )}

            {/* Payment Status Indicator */}
            {paymentStatus && !success && (
              <div className={`payment-status payment-status-${paymentStatus}`}>
                {paymentStatus === 'processing' && (
                  <>
                    <FaSpinner className="spinner" /> 
                    Processing payment...
                  </>
                )}
                {paymentStatus === 'verifying' && (
                  <>
                    <FaSpinner className="spinner" /> 
                    Verifying payment...
                  </>
                )}
                {paymentStatus === 'failed' && (
                  <>
                    <FaExclamationTriangle /> 
                    Payment failed
                  </>
                )}
                {paymentStatus === 'cancelled' && (
                  <>
                    <FaTimes /> 
                    Payment cancelled
                  </>
                )}
              </div>
            )}

            {/* Loading Overlay */}
            {(paymentInProgress || loading) && (
              <div className="payment-overlay">
                <div className="payment-loading">
                  <FaSpinner className="spinner" />
                  <p>
                    {paymentInProgress ? 'Processing payment...' : 'Creating order...'}
                  </p>
                  <p className="payment-note">
                    Please do not close this window or refresh the page
                  </p>
                  <div className="payment-progress">
                    <div className="progress-bar"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="donation-container">
              {/* Left Column - Impact Info */}
              <div className="donation-info-column">
                <div className="impact-card">
                  <div className="impact-header">
                    <div className="impact-icon">
                      <FaHandHoldingHeart />
                    </div>
                    <h2>Your Impact Matters</h2>
                  </div>
                  <div className="impact-content">
                    <p>
                      At Harmonious Hands Foundation, we believe that every hand joined in generosity becomes a step toward dignity, equity, and lasting change.
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
                          <p>PCI-DSS compliant payment processing</p>
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
                <form onSubmit={handleSubmit} className="donation-form-card" noValidate>
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
                        <h3 className="form-section-title">Citizenship <span className="required">*</span></h3>
                        <div className="citizenship-options">
                          <button
                            type="button"
                            className={`citizenship-btn ${citizenship === 'indian' ? 'active' : ''}`}
                            onClick={() => setCitizenship('indian')}
                            disabled={loading || paymentInProgress}
                          >
                            <FaUserCheck /> Indian Citizen
                          </button>
                        </div>
                        <p className="form-note">
                          Indian citizen option is for transacting through Indian bank accounts or cards issued by Indian banks.
                        </p>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Donation Type <span className="required">*</span></h3>
                        <div className="donation-type-options">
                          <button
                            type="button"
                            className={`type-btn ${donationType === 'once' ? 'active' : ''}`}
                            onClick={() => setDonationType('once')}
                            disabled={loading || paymentInProgress}
                          >
                            <FaCalendarAlt /> Give Once
                          </button>
                          <button
                            type="button"
                            className={`type-btn ${donationType === 'monthly' ? 'active' : ''}`}
                            onClick={() => setDonationType('monthly')}
                            disabled={loading || paymentInProgress}
                          >
                            <FaCalendarAlt /> Give Monthly
                          </button>
                        </div>
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Choose Amount (₹) <span className="required">*</span></h3>
                        <div className="amount-options-grid">
                          {presetAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              className={`amount-option-btn ${donationAmount === amount ? 'active' : ''}`}
                              onClick={() => handleAmountSelect(amount)}
                              disabled={loading || paymentInProgress}
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
                            onBlur={handleFieldBlur}
                            min="1"
                            step="1"
                            max="10000000"
                            disabled={loading || paymentInProgress}
                            aria-label="Custom donation amount"
                          />
                        </div>
                        {customAmount && customAmount < 100 && (
                          <p className="form-error">Minimum donation amount is ₹100</p>
                        )}
                      </div>

                      <div className="form-section">
                        <h3 className="form-section-title">Choose Where to Help <span className="required">*</span></h3>
                        <div className="category-options-grid">
                          {categories.map((cat) => (
                            <label key={cat.id} className="category-option">
                              <input
                                type="radio"
                                name="category"
                                value={cat.id}
                                checked={category === cat.id}
                                onChange={() => setCategory(cat.id)}
                                disabled={loading || paymentInProgress}
                                aria-label={cat.title}
                              />
                              <div className="category-content">
                                <span className="category-icon">{cat.icon}</span>
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
                            <FaUser /> Full Name <span className="required">*</span>
                            {fieldTouched.fullName && formErrors.fullName && (
                              <span className="field-error">{formErrors.fullName}</span>
                            )}
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            onBlur={handleFieldBlur}
                            placeholder="Enter your full name"
                            required
                            disabled={loading || paymentInProgress}
                            aria-invalid={!!formErrors.fullName}
                            aria-describedby={formErrors.fullName ? "fullName-error" : undefined}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="dob">
                            <FaCalendarAlt /> Date of Birth
                          </label>
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            onBlur={handleFieldBlur}
                            max={new Date().toISOString().split('T')[0]}
                            disabled={loading || paymentInProgress}
                            aria-label="Date of birth"
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group half">
                            <label htmlFor="email">
                              <FaEnvelope /> Email <span className="required">*</span>
                              {fieldTouched.email && formErrors.email && (
                                <span className="field-error">{formErrors.email}</span>
                              )}
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onBlur={handleFieldBlur}
                              required
                              disabled={loading || paymentInProgress}
                              aria-invalid={!!formErrors.email}
                            />
                          </div>
                          <div className="form-group half">
                            <label htmlFor="mobile">
                              <FaPhone /> Mobile Number <span className="required">*</span>
                              {fieldTouched.mobile && formErrors.mobile && (
                                <span className="field-error">{formErrors.mobile}</span>
                            )}
                            </label>
                            <input
                              type="tel"
                              id="mobile"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleInputChange}
                              onBlur={handleFieldBlur}
                              pattern="[0-9]{10}"
                              maxLength="10"
                              required
                              disabled={loading || paymentInProgress}
                              aria-invalid={!!formErrors.mobile}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="address">
                            <FaHome /> Address <span className="required">*</span>
                            {fieldTouched.address && formErrors.address && (
                              <span className="field-error">{formErrors.address}</span>
                            )}
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            onBlur={handleFieldBlur}
                            rows="3"
                            required
                            disabled={loading || paymentInProgress}
                            aria-invalid={!!formErrors.address}
                            placeholder="Enter your complete address"
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group half">
                            <label htmlFor="pincode">
                              <FaMapMarkerAlt /> Pincode <span className="required">*</span>
                              {fieldTouched.pincode && formErrors.pincode && (
                                <span className="field-error">{formErrors.pincode}</span>
                              )}
                            </label>
                            <input
                              type="text"
                              id="pincode"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handlePincodeChange}
                              onBlur={handleFieldBlur}
                              maxLength="6"
                              pattern="[0-9]{6}"
                              required
                              disabled={loading || paymentInProgress}
                              aria-invalid={!!formErrors.pincode}
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
                              readOnly
                              disabled={loading || paymentInProgress}
                              aria-label="City (auto-filled from pincode)"
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
                              readOnly
                              disabled={loading || paymentInProgress}
                              aria-label="State (auto-filled from pincode)"
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
                              disabled={loading || paymentInProgress}
                              aria-label="Country"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="panNumber">
                            <FaIdCard /> PAN Number
                            {fieldTouched.panNumber && formErrors.panNumber && (
                              <span className="field-error">{formErrors.panNumber}</span>
                            )}
                          </label>
                          <input
                            type="text"
                            id="panNumber"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleInputChange}
                            onBlur={handleFieldBlur}
                            placeholder="Enter 10-digit PAN (e.g., ABCDE1234F)"
                            maxLength="10"
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                            disabled={loading || paymentInProgress}
                            aria-invalid={!!formErrors.panNumber}
                          />
                          <div className="form-warning">
                            <FaExclamationTriangle /> Please note: Without PAN Number, you cannot claim 50% tax exemption u/s 80G
                          </div>
                        </div>

                        <div className="terms-section">
                          <label className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={termsAccepted}
                              onChange={(e) => setTermsAccepted(e.target.checked)}
                              required
                              disabled={loading || paymentInProgress}
                              aria-required="true"
                            />
                            <span className="checkbox-text">
                              I agree to the <button 
                                type="button" 
                                className="terms-link"
                                onClick={() => setShowTermsModal(true)}
                                disabled={loading || paymentInProgress}
                              >
                                Terms and Conditions
                              </button> and confirm that information is being collected to comply with government regulations.
                            </span>
                          </label>

                          <label className="checkbox-option">
                            <input
                              type="checkbox"
                              checked={citizenDeclaration}
                              onChange={(e) => setCitizenDeclaration(e.target.checked)}
                              required
                              disabled={loading || paymentInProgress}
                              aria-required="true"
                            />
                            <span className="checkbox-text">
                              I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided is true and correct.
                            </span>
                          </label>
                        </div>

                        <div className="payment-methods-section">
                          <h4><FaCreditCard /> We accept all major payment methods</h4>
                          <div className="payment-methods">
                            <span className="payment-method">RuPay</span>
                            <span className="payment-method">VISA</span>
                            <span className="payment-method">Mastercard</span>
                            <span className="payment-method">UPI</span>
                            <span className="payment-method">Net Banking</span>
                            <span className="payment-method">Wallet</span>
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
                        onClick={handleBack}
                        disabled={loading || paymentInProgress}
                      >
                        <FaArrowLeft /> Back
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        (step === 1 && !donationAmount && !customAmount) ||
                        (step === 2 && !isStep2Valid()) ||
                        loading || 
                        paymentInProgress ||
                        success
                      }
                      aria-busy={loading || paymentInProgress}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="spinner" /> Processing...
                        </>
                      ) : paymentInProgress ? (
                        <>
                          <FaSpinner className="spinner" /> Payment in Progress...
                        </>
                      ) : step === 1 ? (
                        <>
                          Continue to Donor Details <FaArrowRight />
                        </>
                      ) : (
                        <>
                          Proceed to Payment <FaCreditCard />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Donation Summary Sidebar */}
                <div className="donation-summary-card">
                  <h3>Your Donation Summary</h3>
                  <div className="summary-item">
                    <span>Amount:</span>
                    <span className="donation-amount">
                      {formatAmount(getTotalAmount())}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Type:</span>
                    <span className="donation-type">
                      {donationType === 'once' ? 'One-time' : 'Monthly'}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Category:</span>
                    <span className="donation-category">
                      {getSelectedCategoryTitle()}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Tax Benefit:</span>
                    <span className="tax-benefit-badge">
                      <FaCheck /> Eligible for 80G
                    </span>
                  </div>
                  {formData.panNumber ? (
                    <div className="summary-item">
                      <span>PAN Provided:</span>
                      <span className="pan-badge">
                        <FaCheck /> {formData.panNumber}
                      </span>
                    </div>
                  ) : (
                    <div className="summary-item warning">
                      <span>PAN:</span>
                      <span className="pan-warning">
                        <FaExclamationTriangle /> Not provided
                      </span>
                    </div>
                  )}
                  <div className="security-badge">
                    <FaLock /> 100% Secure Donation
                  </div>
                  <div className="razorpay-badge">
                    <img 
                      src="https://razorpay.com/assets/razorpay-glyph.svg" 
                      alt="Razorpay"
                      className="razorpay-logo"
                      width="24"
                      height="24"
                    />
                    <span>Powered by Razorpay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Terms Modal */}
      {showTermsModal && <TermsModal />}
    </div>
  );
};

export default DonationPage;