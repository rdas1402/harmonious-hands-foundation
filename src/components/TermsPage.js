import React, { useState } from 'react';
import { FaArrowLeft, FaFileContract, FaHandshake, FaMoneyBillWave, FaShieldAlt, FaLock, FaBalanceScale, FaGavel, FaCheckCircle, FaExclamationTriangle, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const TermsPage = ({ onClose }) => {
  const [acceptedSections, setAcceptedSections] = useState([]);

  const toggleSection = (sectionId) => {
    setAcceptedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const allAccepted = acceptedSections.length === 9;

  return (
    <section id="terms" className="terms-page-section">
      {/* Top Brush Decoration - Same as Team.js */}
      <div 
        className="brush-decoration top-brush"
        style={{ 
          backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
        }}
      />
      
      {/* Background Painting Effect - Same as Team.js */}
      <div className="painting-background">
        <div className="paint-layer paint-layer-1"></div>
        <div className="paint-layer paint-layer-2"></div>
        <div className="paint-layer paint-layer-3"></div>
        <div className="paint-layer paint-layer-4"></div>
      </div>
      
      <div className="container">
        {/* Header */}
        <div className="terms-header">
          <button onClick={onClose} className="back-btn">
            <FaArrowLeft /> Back to Donation
          </button>
          <div className="terms-title-section">
            <h2 className="section-title">Terms & Conditions</h2>
            <div className="terms-header-divider"></div>
            <p className="terms-subtitle">
              Please read these terms carefully before making your donation
            </p>
          </div>
        </div>

        <div className="terms-container">
          {/* Summary Card */}
          <div className="summary-card">
            <div className="summary-header">
              <FaHandshake className="summary-icon" />
              <h3>Your Donation Matters</h3>
            </div>
            <div className="summary-content">
              <p>
                By making a donation to Harmonious Hands Foundation, you're joining hands with us to create 
                lasting change in communities. These terms ensure transparency, security, and accountability 
                for every contribution.
              </p>
              <div className="acceptance-indicator">
                <div className="acceptance-status">
                  <span className="status-text">
                    {allAccepted ? 'All sections accepted ✓' : `Accepted: ${acceptedSections.length}/9 sections`}
                  </span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(acceptedSections.length / 9) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="terms-sections">
            {[
              {
                id: 1,
                icon: FaFileContract,
                title: "1. General Terms",
                content: "By making a donation to Harmonious Hands Foundation through our website or via any other payment method, you agree to the following terms and conditions. We encourage all donors to read these terms carefully before proceeding with any contribution. These terms apply to all donations made online, through bank transfers, in-kind contributions, or other payment platforms we may integrate in the future."
              },
              {
                id: 2,
                icon: FaMoneyBillWave,
                title: "2. Donation Policy",
                content: (
                  <ul>
                    <li>All donations are made voluntarily and must be used only for lawful, ethical purposes.</li>
                    <li>Donations will be used to support our various programs in education, healthcare, women's empowerment, cultural preservation, sustainable development, and social welfare.</li>
                    <li>Donations can be made in Indian Rupees (INR). Harmonious Hands Foundation reserves the right to update the accepted modes of donation (online or offline) at any time.</li>
                  </ul>
                )
              },
              {
                id: 3,
                icon: FaExclamationTriangle,
                title: "3. Refund Policy",
                content: (
                  <ul>
                    <li>All donations are non-refundable. Once a donation is confirmed, it is considered final.</li>
                    <li>Refunds may only be issued in cases of technical error (e.g., duplicate transactions or unauthorized charges).</li>
                    <li>To request a resolution, please email us at hhfoundation24@gmail.com within 7 days of the transaction with the necessary details.</li>
                  </ul>
                )
              },
              {
                id: 4,
                icon: FaCheckCircle,
                title: "4. Tax Deductibility",
                content: (
                  <ul>
                    <li>Harmonious Hands Foundation is a registered Section 8 non-profit company under the Companies Act, 2013.</li>
                    <li>Donations are eligible for tax exemption under Section 80G of the Income Tax Act, subject to approval and prevailing laws.</li>
                    <li>Upon successful donation, you will receive an official receipt via email, which can be used for claiming tax benefits where applicable.</li>
                    <li>Donors are advised to consult their tax advisors for specific guidance.</li>
                  </ul>
                )
              },
              {
                id: 5,
                icon: FaShieldAlt,
                title: "5. Privacy Policy",
                content: "We are committed to safeguarding your privacy. Your personal and payment information will be handled with strict confidentiality and used only for purposes related to your donation. We do not sell, share, or rent your personal information to third parties unless required by law or with your explicit consent."
              },
              {
                id: 6,
                icon: FaLock,
                title: "6. Security",
                content: "Our website uses SSL encryption and secure payment gateways to protect your sensitive data during transactions. While we take all reasonable precautions to protect your information, you acknowledge that no data transmission over the internet is entirely secure. Donations are made at your own discretion and risk."
              },
              {
                id: 7,
                icon: FaHandshake,
                title: "7. Use of Donations",
                content: (
                  <ul>
                    <li>Donations will be used at the discretion of Harmonious Hands Foundation to further our mission and maximize community impact.</li>
                    <li>While you may specify a preference for how your contribution is used (e.g., for education or healthcare), the Foundation reserves the right to allocate funds where most urgently needed.</li>
                    <li>We ensure that all donations are applied with accountability and purpose.</li>
                  </ul>
                )
              },
              {
                id: 8,
                icon: FaBalanceScale,
                title: "8. Changes to these Terms",
                content: "Harmonious Hands Foundation reserves the right to update or modify these terms and conditions at any time. Any changes will be reflected on this page, and continued donations after such changes constitute your acceptance of the revised terms."
              },
              {
                id: 9,
                icon: FaGavel,
                title: "9. Governing Law",
                content: "These terms are governed by and construed in accordance with the laws of India, particularly within the jurisdiction of Assam. Any legal disputes related to donations shall fall under the exclusive jurisdiction of the courts located in Jorhat, Assam."
              }
            ].map((section) => (
              <div key={section.id} className="term-section-card">
                <div className="term-section-header">
                  <div className="term-icon">
                    <section.icon />
                  </div>
                  <h3>{section.title}</h3>
                  <button
                    className={`accept-btn ${acceptedSections.includes(section.id) ? 'accepted' : ''}`}
                    onClick={() => toggleSection(section.id)}
                  >
                    {acceptedSections.includes(section.id) ? '✓ Accepted' : 'Mark as Read'}
                  </button>
                </div>
                <div className="term-content">
                  {typeof section.content === 'string' ? (
                    <p>{section.content}</p>
                  ) : (
                    section.content
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Card */}
          <div className="contact-card">
            <h3>Need Assistance?</h3>
            <p>
              For any questions regarding donations, tax receipts, or these terms and conditions, 
              please contact us:
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <span className="contact-label">Email:</span>
                  <a href="mailto:hhfoundation24@gmail.com" className="contact-link">hhfoundation24@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <span className="contact-label">Phone:</span>
                  <a href="tel:+918638656513" className="contact-link">+91-86386-56513</a>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <span className="contact-label">Address:</span>
                  <span className="contact-text">Harmonious Hands Foundation, Assam, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Acceptance */}
          <div className="final-acceptance">
            <div className="acceptance-box">
              <label className="final-checkbox">
                <input
                  type="checkbox"
                  checked={allAccepted}
                  onChange={() => {
                    if (allAccepted) {
                      setAcceptedSections([]);
                    } else {
                      setAcceptedSections([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    }
                  }}
                />
                <span className="checkbox-text">
                  I have read, understood, and accept all the Terms and Conditions stated above
                </span>
              </label>
              <p className="acceptance-note">
                By proceeding with your donation, you acknowledge that you have read, understood, 
                and agree to these Terms and Conditions.
              </p>
            </div>
            
            <div className="action-buttons">
              <button onClick={onClose} className="btn btn-secondary">
                Back to Donation
              </button>
              <button 
                onClick={() => {
                  if (allAccepted) {
                    onClose();
                  }
                }}
                className="btn btn-primary"
                disabled={!allAccepted}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terms-page-section {
          position: relative;
          padding: 80px 0;
          color: #333;
          overflow: hidden;
          background: #ffffff;
          min-height: 100vh;
        }
        
        /* Brush Decorations - Same as Team.js */
        .brush-decoration {
          position: absolute;
          left: 0;
          right: 0;
          height: 150px;
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
        
        /* Painting Background Effect - Same as Team.js */
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
        
        /* Header */
        .terms-header {
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }
        
        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #2c3e50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          margin-bottom: 20px;
        }
        
        .back-btn:hover {
          background: #1a252f;
          transform: translateX(-3px);
        }
        
        .terms-title-section {
          text-align: center;
        }
        
        .section-title {
          color: #2c3e50;
          font-size: 2.8rem;
          margin-bottom: 15px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
        
        .terms-header-divider {
          width: 100px;
          height: 4px;
          background: #FFA500;
          margin: 0 auto 20px;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(255, 165, 0, 0.3);
        }
        
        .terms-subtitle {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          color: #2c3e50;
          font-size: 1.2rem;
          line-height: 1.6;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.9);
          padding: 15px 30px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);
        }
        
        /* Main Container */
        .terms-container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        /* Summary Card */
        .summary-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          padding: 40px;
          margin-bottom: 40px;
          position: relative;
        }
        
        .summary-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: #FFA500;
        }
        
        .summary-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }
        
        .summary-icon {
          background: #FFA500;
          color: #2c3e50;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.4);
        }
        
        .summary-header h3 {
          color: #2c3e50;
          font-size: 1.8rem;
          margin: 0;
          font-weight: 700;
        }
        
        .summary-content p {
          color: #555;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 25px;
        }
        
        .acceptance-indicator {
          background: rgba(255, 165, 0, 0.1);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 165, 0, 0.3);
        }
        
        .acceptance-status {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .status-text {
          color: #2c3e50;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .progress-bar {
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
          transition: width 0.3s ease;
        }
        
        /* Terms Sections */
        .terms-sections {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 40px;
        }
        
        .term-section-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(255, 165, 0, 0.15);
          border: 1px solid rgba(255, 165, 0, 0.3);
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .term-section-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
        }
        
        .term-section-header {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 25px;
          background: rgba(255, 165, 0, 0.05);
          border-bottom: 1px solid rgba(255, 165, 0, 0.2);
        }
        
        .term-icon {
          background: #FFA500;
          color: #2c3e50;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .term-section-header h3 {
          color: #2c3e50;
          font-size: 1.3rem;
          margin: 0;
          font-weight: 700;
          flex: 1;
        }
        
        .accept-btn {
          background: #f8f9fa;
          border: 2px solid #dee2e6;
          color: #666;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }
        
        .accept-btn:hover {
          background: #e9ecef;
        }
        
        .accept-btn.accepted {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }
        
        .term-content {
          padding: 25px;
        }
        
        .term-content p {
          color: #555;
          line-height: 1.8;
          margin: 0;
          font-size: 1.05rem;
        }
        
        .term-content ul {
          margin: 15px 0;
          padding-left: 20px;
        }
        
        .term-content li {
          color: #555;
          line-height: 1.8;
          margin-bottom: 10px;
          font-size: 1.05rem;
        }
        
        /* Contact Card */
        .contact-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          padding: 40px;
          margin-bottom: 40px;
          position: relative;
        }
        
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: #FFA500;
        }
        
        .contact-card h3 {
          color: #2c3e50;
          font-size: 1.8rem;
          margin: 0 0 20px 0;
          font-weight: 700;
        }
        
        .contact-card p {
          color: #555;
          line-height: 1.8;
          margin: 0 0 25px 0;
          font-size: 1.05rem;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .contact-icon {
          color: #FFA500;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .contact-label {
          display: block;
          color: #2c3e50;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 5px;
        }
        
        .contact-link {
          color: #FFA500;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
        }
        
        .contact-link:hover {
          text-decoration: underline;
        }
        
        .contact-text {
          color: #555;
          font-size: 1.05rem;
        }
        
        /* Final Acceptance */
        .final-acceptance {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 165, 0, 0.3);
          padding: 40px;
          position: relative;
        }
        
        .final-acceptance::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: #FFA500;
        }
        
        .acceptance-box {
          margin-bottom: 30px;
        }
        
        .final-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          color: #2c3e50;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 15px;
        }
        
        .final-checkbox input {
          margin-top: 5px;
          flex-shrink: 0;
        }
        
        .checkbox-text {
          line-height: 1.6;
        }
        
        .acceptance-note {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          padding-left: 35px;
        }
        
        .action-buttons {
          display: flex;
          gap: 20px;
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
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .terms-page-section {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2.3rem;
          }
          
          .terms-subtitle {
            font-size: 1.1rem;
            padding: 15px 20px;
          }
          
          .summary-card,
          .contact-card,
          .final-acceptance {
            padding: 30px;
          }
          
          .term-section-header {
            padding: 20px;
          }
          
          .term-content {
            padding: 20px;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .summary-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .term-section-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .term-section-header h3 {
            text-align: center;
          }
          
          .accept-btn {
            width: 100%;
          }
          
          .contact-item {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .brush-decoration {
            height: 80px;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .summary-card,
          .contact-card,
          .final-acceptance {
            padding: 25px;
          }
          
          .summary-header h3 {
            font-size: 1.5rem;
          }
          
          .contact-card h3 {
            font-size: 1.5rem;
          }
          
          .final-checkbox {
            font-size: 1rem;
          }
          
          .brush-decoration {
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
};

export default TermsPage;