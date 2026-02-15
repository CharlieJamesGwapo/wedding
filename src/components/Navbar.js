import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenMobileSection(null);
  };

  const isActive = (path) => location.pathname === path;
  const isGroupActive = (paths) => paths.some(p => location.pathname === p);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileSection = (name) => {
    setOpenMobileSection(openMobileSection === name ? null : name);
  };

  const navGroups = {
    wedding: {
      label: 'Wedding',
      paths: ['/wedding-details', '/schedule', '/dress-code'],
      links: [
        { to: '/wedding-details', label: 'Details' },
        { to: '/schedule', label: 'Schedule' },
        { to: '/dress-code', label: 'Dress Code' },
      ]
    },
    guests: {
      label: 'Guests',
      paths: ['/rsvp', '/guestbook', '/gallery', '/photo-share'],
      links: [
        { to: '/rsvp', label: 'RSVP' },
        { to: '/guestbook', label: 'Guestbook' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/photo-share', label: 'Photo Share' },
      ]
    },
    info: {
      label: 'Info',
      paths: ['/faq', '/contact'],
      links: [
        { to: '/faq', label: 'FAQ' },
        { to: '/contact', label: 'Contact' },
      ]
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Shayne &amp; Mark
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/our-story" className={`nav-link ${isActive('/our-story') ? 'active' : ''}`}>Our Story</Link>

          {Object.entries(navGroups).map(([key, group]) => (
            <div
              key={key}
              className={`nav-dropdown ${openDropdown === key ? 'open' : ''}`}
              onMouseEnter={() => setOpenDropdown(key)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`nav-link dropdown-trigger ${isGroupActive(group.paths) ? 'active' : ''}`}
                onClick={() => toggleDropdown(key)}
                aria-expanded={openDropdown === key}
              >
                {group.label}
                <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-menu">
                {group.links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`dropdown-item ${isActive(link.to) ? 'active' : ''}`}
                    onClick={() => setOpenDropdown(null)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link to="/rsvp" className="nav-rsvp-btn">RSVP</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Backdrop */}
      <div className={`mobile-backdrop ${isOpen ? 'visible' : ''}`} onClick={closeMenu} />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Menu</span>
          <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="drawer-links">
          <Link to="/" className={`drawer-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/our-story" className={`drawer-link ${isActive('/our-story') ? 'active' : ''}`} onClick={closeMenu}>Our Story</Link>

          {Object.entries(navGroups).map(([key, group]) => (
            <div key={key} className="drawer-section">
              <button
                className={`drawer-section-toggle ${isGroupActive(group.paths) ? 'active' : ''} ${openMobileSection === key ? 'expanded' : ''}`}
                onClick={() => toggleMobileSection(key)}
              >
                {group.label}
                <svg className="section-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`drawer-section-links ${openMobileSection === key ? 'open' : ''}`}>
                {group.links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`drawer-link sub ${isActive(link.to) ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          <Link to="/rsvp" className="drawer-rsvp-btn" onClick={closeMenu}>RSVP Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
