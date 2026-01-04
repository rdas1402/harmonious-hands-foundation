import React, { useState, useEffect } from 'react';
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
import './App.css';

function App() {
  const [showDonationPage, setShowDonationPage] = useState(false);

  const handleDonateClick = () => {
    // Scroll to top before opening donation page
    window.scrollTo(0, 0);
    setShowDonationPage(true);
  };

  const handleCloseDonation = () => {
    // Scroll to top when closing donation page
    window.scrollTo(0, 0);
    setShowDonationPage(false);
  };

  // Reset scroll when donation page opens
  useEffect(() => {
    if (showDonationPage) {
      window.scrollTo(0, 0);
    }
  }, [showDonationPage]);

  return (
    <div className="App">
      {!showDonationPage ? (
        <>
          <Header onDonateClick={handleDonateClick} isDonationPage={false} />
          <main>
            <Hero onDonateClick={handleDonateClick} />
            <About />
            <WhatWeDo />
            <Team />
            <Approach />
            <Impact />
            <Stories />
          </main>
          <Footer onDonateClick={handleDonateClick} isDonationPage={false} />
        </>
      ) : (
        <DonationPage onClose={handleCloseDonation} />
      )}
    </div>
  );
}

export default App;