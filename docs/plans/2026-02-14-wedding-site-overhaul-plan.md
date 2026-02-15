# Wedding Site Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Modernize the wedding website with a redesigned navbar, interactive Leaflet map, fixed routes/content, and backend improvements.

**Architecture:** Phased approach — navbar first (affects all pages), then map component, then route/content fixes, then polish/backend. Each phase is independently testable.

**Tech Stack:** React 18, React Router 6, Leaflet.js (new), CSS (no preprocessor), Node.js/Express backend

---

## Task 1: Install Leaflet.js dependency

**Files:**
- Modify: `package.json`

**Step 1: Install leaflet and react-leaflet**

Run: `cd /Users/dev3/wedding && npm install leaflet react-leaflet`
Expected: packages added to dependencies

**Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add leaflet and react-leaflet dependencies"
```

---

## Task 2: Rewrite Navbar with dropdowns and active route

**Files:**
- Modify: `src/components/Navbar.js`
- Modify: `src/components/Navbar.css`

**Step 1: Rewrite Navbar.js**

Replace the entire Navbar component with a new version that includes:
- `useLocation()` from react-router-dom for active route detection
- Desktop: horizontal nav with dropdown groups (Wedding, Guests, Info)
- Mobile: slide-in drawer from the right with backdrop overlay
- Collapsible sections in mobile drawer
- Active link highlighting (gold underline desktop, gold bg mobile)
- Keep existing: scroll detection, click-outside close, escape key close

```jsx
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

  // Lock body scroll when mobile menu is open
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
          Shayne & Mark
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
```

**Step 2: Rewrite Navbar.css**

Complete CSS rewrite with:
- Desktop: fixed top bar, dropdown menus with slide-down animation, active gold underline
- Mobile: right-side drawer (width: 300px), backdrop overlay, collapsible sections
- Responsive breakpoints at 768px and 1024px
- Glass-morphism on scroll
- Gold (#d4af37) accent throughout
- Reduced motion support

```css
/* ===== NAVBAR BASE ===== */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(250, 248, 245, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.navbar.scrolled {
  background: rgba(250, 248, 245, 1);
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.12);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ===== LOGO ===== */
.navbar-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: #3a3a3a;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
  z-index: 1001;
}

.navbar-logo:hover {
  color: #d4af37;
}

/* ===== DESKTOP NAV ===== */
.navbar-desktop {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .navbar-desktop {
    display: flex;
  }
}

.nav-link {
  color: #3a3a3a;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.nav-link:hover {
  color: #d4af37;
}

.nav-link.active {
  color: #d4af37;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background: #d4af37;
  border-radius: 1px;
}

/* ===== DROPDOWNS ===== */
.nav-dropdown {
  position: relative;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
}

.nav-dropdown.open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-trigger {
  color: #3a3a3a;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(212, 175, 55, 0.15);
  padding: 0.5rem;
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 100;
}

.nav-dropdown.open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item {
  display: block;
  padding: 0.6rem 1rem;
  color: #3a3a3a;
  text-decoration: none;
  font-size: 0.85rem;
  border-radius: 8px;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: rgba(212, 175, 55, 0.08);
  color: #d4af37;
}

.dropdown-item.active {
  color: #d4af37;
  background: rgba(212, 175, 55, 0.06);
  font-weight: 600;
}

/* ===== RSVP BUTTON ===== */
.nav-rsvp-btn {
  background: linear-gradient(135deg, #d4af37, #b8941f);
  color: #fff !important;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
  margin-left: 0.5rem;
}

.nav-rsvp-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
}

/* ===== MOBILE TOGGLE ===== */
.navbar-toggle {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  z-index: 1001;
  background: rgba(212, 175, 55, 0.06);
  border: none;
  transition: all 0.3s ease;
  gap: 5px;
}

.navbar-toggle span {
  width: 22px;
  height: 2px;
  background: #3a3a3a;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.navbar-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.navbar-toggle.active span:nth-child(2) {
  opacity: 0;
}
.navbar-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (min-width: 768px) {
  .navbar-toggle {
    display: none;
  }
}

/* ===== MOBILE BACKDROP ===== */
.mobile-backdrop {
  display: none;
}

@media (max-width: 767px) {
  .mobile-backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .mobile-backdrop.visible {
    opacity: 1;
    visibility: visible;
  }
}

/* ===== MOBILE DRAWER ===== */
.mobile-drawer {
  display: none;
}

@media (max-width: 767px) {
  .mobile-drawer {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    max-width: 85vw;
    height: 100vh;
    height: 100dvh;
    background: #faf8f5;
    z-index: 999;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  }

  .mobile-drawer.open {
    transform: translateX(0);
  }
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
}

.drawer-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

.drawer-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  color: #3a3a3a;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-close:hover {
  background: rgba(212, 175, 55, 0.1);
  color: #d4af37;
}

.drawer-links {
  flex: 1;
  padding: 1rem 0;
}

.drawer-link {
  display: block;
  padding: 0.9rem 1.5rem;
  color: #3a3a3a;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.drawer-link:hover,
.drawer-link:active {
  background: rgba(212, 175, 55, 0.06);
  color: #d4af37;
}

.drawer-link.active {
  color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
  border-left-color: #d4af37;
  font-weight: 600;
}

.drawer-link.sub {
  padding-left: 2.5rem;
  font-size: 0.95rem;
}

/* ===== MOBILE SECTIONS ===== */
.drawer-section {
  border-bottom: 1px solid rgba(212, 175, 55, 0.08);
}

.drawer-section-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.9rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #3a3a3a;
  font-size: 1rem;
  font-family: inherit;
  text-align: left;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.drawer-section-toggle:hover {
  background: rgba(212, 175, 55, 0.06);
  color: #d4af37;
}

.drawer-section-toggle.active {
  color: #d4af37;
  font-weight: 600;
}

.section-arrow {
  transition: transform 0.2s ease;
}

.drawer-section-toggle.expanded .section-arrow {
  transform: rotate(180deg);
}

.drawer-section-links {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.drawer-section-links.open {
  max-height: 300px;
}

/* ===== DRAWER FOOTER ===== */
.drawer-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
}

.drawer-rsvp-btn {
  display: block;
  text-align: center;
  background: linear-gradient(135deg, #d4af37, #b8941f);
  color: #fff !important;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}

.drawer-rsvp-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

/* ===== TABLET ===== */
@media (min-width: 768px) and (max-width: 1023px) {
  .nav-link { font-size: 0.72rem; padding: 0.4rem 0.5rem; }
  .nav-rsvp-btn { font-size: 0.72rem; padding: 0.45rem 0.9rem; }
  .navbar-logo { font-size: 1.2rem; }
}

/* ===== FOCUS & ACCESSIBILITY ===== */
.nav-link:focus-visible,
.nav-rsvp-btn:focus-visible,
.navbar-toggle:focus-visible,
.dropdown-item:focus-visible,
.drawer-link:focus-visible {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .navbar, .navbar-toggle, .nav-link, .dropdown-menu,
  .mobile-drawer, .mobile-backdrop, .drawer-section-links {
    transition: none !important;
    animation: none !important;
  }
}

/* Touch optimizations */
@media (hover: none) and (pointer: coarse) {
  .drawer-link { padding: 1rem 1.5rem; }
  .drawer-link.sub { padding: 1rem 1.5rem 1rem 2.5rem; }
  .drawer-section-toggle { padding: 1rem 1.5rem; }
}
```

**Step 3: Verify the app compiles**

Run: `cd /Users/dev3/wedding && npm run build 2>&1 | tail -20`
Expected: "Compiled successfully"

**Step 4: Commit**

```bash
git add src/components/Navbar.js src/components/Navbar.css
git commit -m "feat: redesign navbar with dropdowns, active route, and mobile drawer"
```

---

## Task 3: Create InteractiveMap component with Leaflet

**Files:**
- Create: `src/components/InteractiveMap.js`
- Create: `src/components/InteractiveMap.css`

**Step 1: Create InteractiveMap.js**

```jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';

// Fix Leaflet default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

// Custom gold marker icon
const goldIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="marker-pin"><svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.716 23.284 0 15 0z" fill="#d4af37"/>
    <circle cx="15" cy="14" r="6" fill="white"/>
  </svg></div>`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -42],
});

const venues = [
  {
    id: 'ceremony',
    name: 'Our Lady of Mount Carmel Parish Church',
    type: 'Ceremony',
    time: '9:00 AM',
    address: 'J.V. Serina St. Carmen, CDO City',
    position: [8.4684, 124.6335],
    googleMapsUrl: 'https://www.google.com/maps/search/Our+Lady+of+Mount+Carmel+Parish+Church+J.V.+Serina+St.+Carmen+CDO+City',
    wazeUrl: 'https://www.waze.com/ul?ll=8.4684,124.6335&navigate=yes',
  },
  {
    id: 'reception',
    name: 'Somewhere by Casa de Canitoan',
    type: 'Reception',
    time: 'Following Ceremony',
    address: 'Canitoan-Macapagal Drive, CDO City',
    position: [8.4936, 124.6575],
    googleMapsUrl: 'https://www.google.com/maps/search/Somewhere+by+Casa+de+Canitoan+Canitoan-Macapagal+Drive+CDO+City',
    wazeUrl: 'https://www.waze.com/ul?ll=8.4936,124.6575&navigate=yes',
  },
];

const InteractiveMap = () => {
  const center = [8.48, 124.645];

  return (
    <div className="interactive-map-wrapper">
      <div className="map-legend">
        {venues.map(venue => (
          <div key={venue.id} className="legend-item">
            <div className="legend-marker" />
            <div>
              <strong>{venue.type}</strong>
              <span>{venue.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="interactive-map-container">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '450px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Tiles &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {venues.map(venue => (
            <Marker key={venue.id} position={venue.position} icon={goldIcon}>
              <Popup className="venue-popup">
                <div className="popup-content">
                  <span className="popup-type">{venue.type}</span>
                  <h3 className="popup-name">{venue.name}</h3>
                  <p className="popup-address">{venue.address}</p>
                  <p className="popup-time">{venue.time}</p>
                  <div className="popup-actions">
                    <a href={venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="popup-btn google">
                      Google Maps
                    </a>
                    <a href={venue.wazeUrl} target="_blank" rel="noopener noreferrer" className="popup-btn waze">
                      Waze
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
```

**Step 2: Create InteractiveMap.css**

```css
.interactive-map-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(212, 175, 55, 0.2);
}

.map-legend {
  display: flex;
  gap: 2rem;
  padding: 1.25rem 1.5rem;
  background: #faf8f5;
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-marker {
  width: 12px;
  height: 12px;
  background: #d4af37;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-item strong {
  display: block;
  font-size: 0.8rem;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.legend-item span {
  display: block;
  font-size: 0.85rem;
  color: #666;
}

.interactive-map-container {
  position: relative;
}

.interactive-map-container .leaflet-container {
  border-radius: 0 0 14px 14px;
  font-family: inherit;
}

/* Custom marker */
.custom-marker {
  background: none !important;
  border: none !important;
}

.marker-pin {
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
  transition: transform 0.2s ease;
}

.marker-pin:hover {
  transform: scale(1.1);
}

/* Popup */
.venue-popup .leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.venue-popup .leaflet-popup-tip {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.popup-content {
  padding: 0.5rem 0.25rem;
  min-width: 200px;
}

.popup-type {
  display: inline-block;
  font-size: 0.7rem;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  background: rgba(212, 175, 55, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.popup-name {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0 0.25rem;
  font-weight: 600;
}

.popup-address {
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 0.25rem;
}

.popup-time {
  font-size: 0.85rem;
  color: #d4af37;
  font-weight: 600;
  margin: 0 0 0.75rem;
}

.popup-actions {
  display: flex;
  gap: 0.5rem;
}

.popup-btn {
  flex: 1;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;
}

.popup-btn.google {
  background: #d4af37;
  color: white;
}

.popup-btn.google:hover {
  background: #b8941f;
}

.popup-btn.waze {
  background: white;
  color: #333;
  border: 1px solid #ddd;
}

.popup-btn.waze:hover {
  border-color: #d4af37;
  color: #d4af37;
}

@media (max-width: 768px) {
  .map-legend {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }

  .interactive-map-container .leaflet-container {
    height: 350px !important;
  }

  .popup-content {
    min-width: 180px;
  }
}
```

**Step 3: Replace iframe map in WeddingDetails.js**

In `src/pages/WeddingDetails.js`, replace the map-section (lines 225-255) with:

```jsx
// Add import at top of file:
import InteractiveMap from '../components/InteractiveMap';

// Replace the map-section with:
<div className="map-section">
  <h3>Venue Locations</h3>
  <InteractiveMap />
</div>
```

**Step 4: Verify the app compiles**

Run: `cd /Users/dev3/wedding && npm run build 2>&1 | tail -20`
Expected: "Compiled successfully"

**Step 5: Commit**

```bash
git add src/components/InteractiveMap.js src/components/InteractiveMap.css src/pages/WeddingDetails.js
git commit -m "feat: add interactive Leaflet map with ceremony and reception markers"
```

---

## Task 4: Fix routes — restore FAQ/Contact, remove dead links

**Files:**
- Modify: `src/App.js` — add FAQ and Contact routes
- Modify: `src/components/Footer.js` — remove dead links, fix date

**Step 1: Update App.js to add FAQ and Contact routes**

Add imports:
```jsx
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
```

Add routes inside `<Routes>`:
```jsx
<Route path="/faq" element={<FAQ />} />
<Route path="/contact" element={<Contact />} />
```

**Step 2: Fix Footer.js**

Replace the footer-links section to remove dead links (Wedding Party, Travel, Registry) and fix the date:

```jsx
<div className="footer-links">
  <div className="footer-col">
    <h4>Celebrate</h4>
    <Link to="/our-story" className="footer-link">Our Story</Link>
    <Link to="/wedding-details" className="footer-link">Wedding Details</Link>
    <Link to="/schedule" className="footer-link">Schedule</Link>
  </div>

  <div className="footer-col">
    <h4>Guest Info</h4>
    <Link to="/rsvp" className="footer-link">RSVP</Link>
    <Link to="/dress-code" className="footer-link">Dress Code</Link>
    <Link to="/faq" className="footer-link">FAQ</Link>
  </div>

  <div className="footer-col">
    <h4>Connect</h4>
    <Link to="/gallery" className="footer-link">Gallery</Link>
    <Link to="/guestbook" className="footer-link">Guestbook</Link>
    <Link to="/photo-share" className="footer-link">Photo Share</Link>
    <Link to="/contact" className="footer-link">Contact Us</Link>
  </div>
</div>
```

Also fix the date and names in footer-brand:
```jsx
<p className="footer-date">February 25, 2026</p>
```
and:
```jsx
<p className="footer-copyright">&copy; 2026 Shayne & Mark</p>
```

**Step 3: Verify**

Run: `cd /Users/dev3/wedding && npm run build 2>&1 | tail -20`

**Step 4: Commit**

```bash
git add src/App.js src/components/Footer.js
git commit -m "fix: restore FAQ/Contact routes, remove dead footer links, fix wedding date"
```

---

## Task 5: Fix content across all pages to match real invitation

**Files:**
- Modify: `src/pages/Home.js` — fix announcement section (wrong date/times/venue)
- Modify: `src/pages/WeddingDetails.js` — fix countdown date (Feb 14 → Feb 25), fix calendar event times
- Modify: `src/pages/Schedule.js` — fix schedule times (currently starts at 3:30 PM, should start at 8:30 AM)
- Modify: `src/pages/FAQ.js` — fix answers to match real invitation info
- Modify: `src/pages/Contact.js` — update email from shayneanddr to shayneandmark
- Modify: `src/components/AnimatedCountdown.js` — fix target date if hardcoded

**Step 1: Fix Home.js announcement section**

The hero section (lines 8-46) looks correct with the invitation info. Fix the announcement section (lines 55-88) which has wrong date/times:

Replace announcement-details div:
```jsx
<div className="announcement-details">
  <div className="detail-item">
    <div className="icon">25</div>
    <div>
      <h3>February</h3>
      <p>2026</p>
    </div>
  </div>
  <div className="detail-item">
    <div className="icon">9:00</div>
    <div>
      <h3>Ceremony</h3>
      <p>Our Lady of Mount Carmel Parish</p>
    </div>
  </div>
  <div className="detail-item">
    <div className="icon">After</div>
    <div>
      <h3>Reception</h3>
      <p>Somewhere by Casa de Canitoan</p>
    </div>
  </div>
</div>
```

**Step 2: Fix WeddingDetails.js countdown date**

Change line 40 from:
```jsx
const weddingDate = new Date('2026-02-14T09:00:00');
```
to:
```jsx
const weddingDate = new Date('2026-02-25T09:00:00');
```

Fix calendar event times in handleAddToCalendar (lines 66-78):
```jsx
const eventDetails = {
  ceremony: {
    title: 'Shayne & Mark Wedding Ceremony',
    date: '20260225T010000Z',
    endDate: '20260225T030000Z',
    location: 'Our Lady of Mount Carmel Parish Church, J.V. Serina St. Carmen, CDO City'
  },
  reception: {
    title: 'Shayne & Mark Wedding Reception',
    date: '20260225T040000Z',
    endDate: '20260225T100000Z',
    location: 'Somewhere by Casa de Canitoan, Canitoan-Macapagal Drive, CDO City'
  }
};
```

**Step 3: Fix Schedule.js times**

Replace scheduleItems array with corrected times:
```jsx
const scheduleItems = [
  {
    time: '8:30 AM',
    title: 'Guest Arrival',
    description: 'Guests arrive at the church',
    icon: '👋',
    location: 'Our Lady of Mount Carmel Parish Church'
  },
  {
    time: '9:00 AM',
    title: 'Ceremony',
    description: 'Wedding ceremony begins',
    icon: '💒',
    location: 'Our Lady of Mount Carmel Parish Church'
  },
  {
    time: '10:30 AM',
    title: 'Photo Session',
    description: 'Couple and family photos',
    icon: '📸',
    location: 'Church Grounds'
  },
  {
    time: '12:00 PM',
    title: 'Reception',
    description: 'Lunch reception begins',
    icon: '🍽️',
    location: 'Somewhere by Casa de Canitoan'
  },
  {
    time: '1:00 PM',
    title: 'Program',
    description: 'Wedding program and entertainment',
    icon: '🎤',
    location: 'Somewhere by Casa de Canitoan'
  },
  {
    time: '3:00 PM',
    title: 'Cake Cutting',
    description: 'Wedding cake and desserts',
    icon: '🎂',
    location: 'Somewhere by Casa de Canitoan'
  },
  {
    time: '4:00 PM',
    title: 'Dancing',
    description: 'Music and celebration',
    icon: '💃',
    location: 'Somewhere by Casa de Canitoan'
  },
  {
    time: '5:00 PM',
    title: 'Send Off',
    description: 'Farewell celebration',
    icon: '✨',
    location: 'Somewhere by Casa de Canitoan'
  }
];
```

**Step 4: Fix FAQ.js answers**

Update faqItems array to match real invitation details:
- Q about plus one → "Due to limited space, we can only accommodate guests named on the invitation."
- Q about children → "We are only able to accommodate children who are part of the wedding or those specifically invited."
- Q about arrival → "Please arrive by 8:30 AM for the 9:00 AM ceremony."
- Q about parking → Update location references
- Q about dress code → "Formal attire in shades of gray. No jeans & no white color."
- Q about gifts → "Your presence and prayers are all that we request, but if you desire to give nonetheless, a monetary gift for our future is a delightful blessing."
- Remove reference to "Registry page"

**Step 5: Fix Contact.js email**

Change `wedding@shayneanddr.com` to `wedding@shayneandmark.com`

**Step 6: Check and fix AnimatedCountdown.js date**

Read the file and fix the target date if it's wrong.

**Step 7: Verify**

Run: `cd /Users/dev3/wedding && npm run build 2>&1 | tail -20`

**Step 8: Commit**

```bash
git add src/pages/Home.js src/pages/WeddingDetails.js src/pages/Schedule.js src/pages/FAQ.js src/pages/Contact.js src/components/AnimatedCountdown.js
git commit -m "fix: update all page content to match real wedding invitation details"
```

---

## Task 6: Backend fixes — RSVP email field, env vars, name corrections

**Files:**
- Modify: `src/pages/RSVP.js` — add email field to RSVP form
- Modify: `server.js` — fix guest email handling, update names from "DR" to "Mark"

**Step 1: Add email field to RSVP form**

In RSVP.js, add an email input field after the name field. Update the form state to include `email`. Pass email in the API request body.

**Step 2: Fix server.js**

- Update `sendGuestConfirmation` to use `rsvp.email` instead of parsing from fullName
- Change all "Shayne & DR" references to "Shayne & Mark"
- Change email domain from `shayneanddr.com` to `shayneandmark.com`

**Step 3: Create .env.example**

Create a `.env.example` file to document required environment variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

**Step 4: Verify**

Run: `cd /Users/dev3/wedding && npm run build 2>&1 | tail -20`

**Step 5: Commit**

```bash
git add src/pages/RSVP.js server.js .env.example
git commit -m "fix: add email to RSVP form, fix guest email sending, update names"
```

---

## Task 7: Visual polish and final cleanup

**Files:**
- Modify: `src/pages/Home.js` — update hero "DR" to "Mark"
- Modify: `src/pages/DressCode.js` — verify attire info matches invitation
- Review all pages for remaining "DR", "Jayo", or wrong dates

**Step 1: Fix Home.js hero**

Change `<span>DR</span>` to `<span>MARK</span>` in the hero section.

**Step 2: Search all files for remaining "DR" or wrong references**

Run: `grep -rn "DR\b\|Shayne Jayo\|February 14\|Feb 14\|shayneanddr" src/`

Fix any remaining occurrences.

**Step 3: Verify full build**

Run: `cd /Users/dev3/wedding && npm run build 2>&1 | tail -20`

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: final cleanup - update all name and date references across site"
```

---

## Summary

| Task | Description | Files Changed |
|------|-------------|---------------|
| 1 | Install Leaflet.js | package.json |
| 2 | Navbar redesign | Navbar.js, Navbar.css |
| 3 | Interactive map | InteractiveMap.js/css, WeddingDetails.js |
| 4 | Fix routes & footer | App.js, Footer.js |
| 5 | Fix page content | Home, WeddingDetails, Schedule, FAQ, Contact |
| 6 | Backend fixes | RSVP.js, server.js, .env.example |
| 7 | Final cleanup | Home.js, grep for remaining issues |
