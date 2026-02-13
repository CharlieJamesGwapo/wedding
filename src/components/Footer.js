import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Shayne & Mark</h3>
            <p className="footer-date">February 14, 2026</p>
            <p className="footer-location">Cagayan de Oro City, Philippines</p>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Celebrate</h4>
            <Link to="/our-story" className="footer-link">Our Story</Link>
            <Link to="/wedding-details" className="footer-link">Wedding Details</Link>
            <Link to="/schedule" className="footer-link">Schedule</Link>
            <Link to="/wedding-party" className="footer-link">Wedding Party</Link>
          </div>

          <div className="footer-col">
            <h4>Guest Info</h4>
            <Link to="/rsvp" className="footer-link">RSVP</Link>
            <Link to="/travel" className="footer-link">Travel</Link>
            <Link to="/dress-code" className="footer-link">Dress Code</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <Link to="/gallery" className="footer-link">Gallery</Link>
            <Link to="/guestbook" className="footer-link">Guestbook</Link>
            <Link to="/registry" className="footer-link">Registry</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p>Made with love for our special day</p>
          <p className="footer-copyright">&copy; 2026 Shayne Jayo & Mark</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
