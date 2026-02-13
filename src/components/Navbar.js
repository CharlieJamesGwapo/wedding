import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Shayne & DR
        </Link>
        
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <div className="menu-section">
            <h4 className="menu-section-title">Main</h4>
            <Link to="/" className="navbar-link" onClick={closeMenu}>Home</Link>
            <Link to="/wedding-details" className="navbar-link" onClick={closeMenu}>Wedding Details</Link>
            <Link to="/rsvp" className="navbar-rsvp-btn" onClick={closeMenu}>RSVP</Link>
          </div>
          
          <div className="menu-section">
            <h4 className="menu-section-title">Wedding</h4>
                        <Link to="/schedule" className="navbar-link" onClick={closeMenu}>Schedule</Link>
            <Link to="/gallery" className="navbar-link" onClick={closeMenu}>Gallery</Link>
            <Link to="/photo-share" className="navbar-link" onClick={closeMenu}>Photo Share</Link>
          </div>
          
          <div className="menu-section">
            <h4 className="menu-section-title">Guest Info</h4>
            <Link to="/dress-code" className="navbar-link" onClick={closeMenu}>Dress Code</Link>
                        <Link to="/guestbook" className="navbar-link" onClick={closeMenu}>Guestbook</Link>
            <Link to="/faq" className="navbar-link" onClick={closeMenu}>FAQ</Link>
            <Link to="/contact" className="navbar-link" onClick={closeMenu}>Contact</Link>
          </div>
        </div>
        
        <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
