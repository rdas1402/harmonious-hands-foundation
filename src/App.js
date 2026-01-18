// App.js - Updated with proper navigation handling
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Team from './components/Team';
import Approach from './components/Approach';
import Impact from './components/Impact';
import Stories from './components/Stories';
import Footer from './components/Footer';
import DonationPage from './components/DonationPage';
import Volunteer from './components/Volunteer';
import TermsPage from './components/TermsPage';
import ContactUs from './components/ContactUs';
import './App.css';
import './styles/global.css';

// Helper function to check if we're on a special page
const isSpecialPage = (pathname) => {
  return ['/donate', '/volunteer', '/contact', '/terms'].some(page => 
    pathname.startsWith(page)
  );
};

function App() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a special page
  const isOnSpecialPage = isSpecialPage(location.pathname);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const handleModalOpen = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  const handleNavClick = (sectionId) => {
    if (isOnSpecialPage) {
      // If we're on a special page, navigate to home first
      navigate('/');
      
      // Wait for page transition, then scroll to section
      setTimeout(() => {
        // First ensure we're at the top
        window.scrollTo(0, 0);
        
        // Then scroll to the section after a small delay
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 100);
    } else {
      // For main page navigation
      const element = document.getElementById(sectionId);
      if (element) {
        // First scroll to top to ensure consistent behavior
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  const showDonation = () => {
    // Reset scroll before navigating
    window.scrollTo(0, 0);
    navigate('/donate');
  };

  const showVolunteer = () => {
    navigate('/volunteer');
  };

  const showContactUs = () => {
    navigate('/contact');
  };

  return (
    <div className="App">
      <Header
        onDonateClick={showDonation}
        onVolunteerClick={showVolunteer}
        expandedSection={expandedSection}
        onSectionToggle={setExpandedSection}
        onNavClick={handleNavClick}
        forceHide={isModalOpen}
      />

      <Routes>
        <Route path="/" element={
          <main>
            <Hero 
              onDonateClick={showDonation} 
              onVolunteerClick={showVolunteer} 
            />
            <About />
            <WhatWeDo />
            <Team />
            <Approach />
            <Impact />
            <Stories onModalOpen={handleModalOpen} />
          </main>
        } />
        
        <Route path="/donate" element={
          <div className="donation-page">
            <DonationPage 
              onClose={() => {
                // Reset scroll and navigate to home
                window.scrollTo(0, 0);
                navigate('/', { state: { fromDonation: true } });
              }}
              onShowTerms={() => navigate('/terms')}
            />
          </div>
        } />
        
        <Route path="/volunteer" element={
          <div className="volunteer-page">
            <Volunteer onDonateClick={showDonation} />
          </div>
        } />
        
        <Route path="/terms" element={
          <div className="terms-page">
            <TermsPage onClose={() => navigate('/donate')} />
          </div>
        } />
        
        <Route path="/contact" element={
          <div className="contact-page">
            <ContactUs onClose={() => navigate(-1)} />
          </div>
        } />
      </Routes>

      <Footer
        onDonateClick={showDonation}
        onVolunteerClick={showVolunteer}
        onNavClick={handleNavClick}
        isDonationPage={isOnSpecialPage}
      />
    </div>
  );
}

// Wrap App with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}