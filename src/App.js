import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WeddingDetails from './pages/WeddingDetails';
import Schedule from './pages/Schedule';
import RSVP from './pages/RSVP';
import DressCode from './pages/DressCode';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Guestbook from './pages/Guestbook';
import PhotoShare from './pages/PhotoShare';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wedding-details" element={<WeddingDetails />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/dress-code" element={<DressCode />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/photo-share" element={<PhotoShare />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
