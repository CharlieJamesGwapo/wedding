import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WeddingPassport from './pages/WeddingPassport';
import Home from './pages/Home';
import WeddingDetails from './pages/WeddingDetails';
import Gallery from './pages/Gallery';
import Guestbook from './pages/Guestbook';
import PhotoShare from './pages/PhotoShare';
import OurStory from './pages/OurStory';
import Entourage from './pages/Entourage';
import FAQ from './pages/FAQ';

function App() {
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem('wedding-passport-entered') === 'true';
  });

  useEffect(() => {
    if (hasEntered) {
      sessionStorage.setItem('wedding-passport-entered', 'true');
    }
  }, [hasEntered]);

  return (
    <Router>
      <div className="App">
        {!hasEntered && <WeddingPassport onEnter={() => setHasEntered(true)} />}
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wedding-details" element={<WeddingDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/photo-share" element={<PhotoShare />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/entourage" element={<Entourage />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
