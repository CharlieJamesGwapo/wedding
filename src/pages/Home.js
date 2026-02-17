import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedCountdown from '../components/AnimatedCountdown';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Home.css';

/* ===== NAUTICAL / RETRO SVG ICONS ===== */
const AnchorIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="retro-icon-svg">
    <circle cx="40" cy="16" r="6" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <line x1="40" y1="22" x2="40" y2="62" stroke="#2c2c2c" strokeWidth="2" />
    <path d="M20 50 Q20 62 40 62 Q60 62 60 50" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <line x1="30" y1="30" x2="50" y2="30" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 50 L22 46 L22 54 Z" fill="#2c2c2c" />
    <path d="M64 50 L58 46 L58 54 Z" fill="#2c2c2c" />
  </svg>
);

const CompassIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="retro-icon-svg">
    <circle cx="40" cy="40" r="24" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <circle cx="40" cy="40" r="20" stroke="#2c2c2c" strokeWidth="1" fill="none" />
    <text x="40" y="20" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2c2c2c" fontFamily="serif">N</text>
    <text x="40" y="66" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2c2c2c" fontFamily="serif">S</text>
    <text x="16" y="44" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2c2c2c" fontFamily="serif">W</text>
    <text x="64" y="44" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2c2c2c" fontFamily="serif">E</text>
    <polygon points="40,24 37,40 43,40" fill="#2c2c2c" />
    <polygon points="40,56 37,40 43,40" fill="none" stroke="#2c2c2c" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="3" fill="#2c2c2c" />
  </svg>
);

const ShipWheelIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="retro-icon-svg">
    <circle cx="40" cy="40" r="18" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <circle cx="40" cy="40" r="6" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <line x1="40" y1="22" x2="40" y2="12" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="58" x2="40" y2="68" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="40" x2="12" y2="40" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <line x1="58" y1="40" x2="68" y2="40" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <line x1="27" y1="27" x2="20" y2="20" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <line x1="53" y1="53" x2="60" y2="60" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <line x1="53" y1="27" x2="60" y2="20" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <line x1="27" y1="53" x2="20" y2="60" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="12" r="3" fill="#2c2c2c" />
    <circle cx="40" cy="68" r="3" fill="#2c2c2c" />
    <circle cx="12" cy="40" r="3" fill="#2c2c2c" />
    <circle cx="68" cy="40" r="3" fill="#2c2c2c" />
  </svg>
);

/* Inline airplane for header decorations */
const InlineAirplane = () => (
  <svg viewBox="0 0 24 24" className="inline-airplane-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#2c2c2c" />
  </svg>
);

/* Inline anchor for decorations */
const InlineAnchor = () => (
  <svg viewBox="0 0 24 24" className="inline-anchor-svg" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="2" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <line x1="12" y1="7" x2="12" y2="20" stroke="#2c2c2c" strokeWidth="1.5" />
    <path d="M6 16 Q6 20 12 20 Q18 20 18 16" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <line x1="9" y1="10" x2="15" y2="10" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChurchIcon = () => (
  <svg viewBox="0 0 120 140" className="venue-icon church-icon" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="0" x2="60" y2="18" stroke="#3a3a3a" strokeWidth="2" />
    <line x1="53" y1="7" x2="67" y2="7" stroke="#3a3a3a" strokeWidth="2" />
    <path d="M60 18 L40 45 L80 45 Z" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
    <path d="M60 28 L54 38 L66 38 Z" fill="none" stroke="#3a3a3a" strokeWidth="1" />
    <path d="M30 45 L20 65 L100 65 L90 45" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
    <line x1="25" y1="55" x2="95" y2="55" stroke="#3a3a3a" strokeWidth="0.8" />
    <circle cx="60" cy="78" r="10" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
    <circle cx="60" cy="78" r="6" fill="none" stroke="#3a3a3a" strokeWidth="0.8" />
    <line x1="60" y1="72" x2="60" y2="84" stroke="#3a3a3a" strokeWidth="0.8" />
    <line x1="54" y1="78" x2="66" y2="78" stroke="#3a3a3a" strokeWidth="0.8" />
    <rect x="25" y="65" width="70" height="55" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
    <path d="M50 120 L50 100 Q60 92 70 100 L70 120" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
    <line x1="60" y1="100" x2="60" y2="120" stroke="#3a3a3a" strokeWidth="0.8" />
    <rect x="30" y="95" width="10" height="14" rx="5" fill="none" stroke="#3a3a3a" strokeWidth="1" />
    <rect x="80" y="95" width="10" height="14" rx="5" fill="none" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="15" y1="120" x2="105" y2="120" stroke="#3a3a3a" strokeWidth="1.5" />
    <line x1="30" y1="120" x2="30" y2="128" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="27" y1="124" x2="33" y2="124" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="90" y1="120" x2="90" y2="128" stroke="#3a3a3a" strokeWidth="1" />
    <line x1="87" y1="124" x2="93" y2="124" stroke="#3a3a3a" strokeWidth="1" />
    <ellipse cx="22" cy="125" rx="6" ry="3" fill="none" stroke="#3a3a3a" strokeWidth="1" />
    <path d="M18 122 Q22 115 26 122" fill="none" stroke="#3a3a3a" strokeWidth="0.8" />
    <ellipse cx="98" cy="125" rx="6" ry="3" fill="none" stroke="#3a3a3a" strokeWidth="1" />
    <path d="M94 122 Q98 115 102 122" fill="none" stroke="#3a3a3a" strokeWidth="0.8" />
    <line x1="10" y1="132" x2="110" y2="132" stroke="#3a3a3a" strokeWidth="1" />
  </svg>
);

const CasaIcon = () => (
  <div className="casa-logo">
    <div className="casa-text">
      <span className="casa-name">C A S A</span>
      <span className="casa-sub">de Canitoan</span>
    </div>
    <svg viewBox="0 0 120 100" className="venue-icon casa-building-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 40 L60 8 L110 40" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
      <path d="M15 44 L60 14 L105 44" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <path d="M55 10 L60 4 L65 10" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <rect x="20" y="40" width="80" height="50" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
      <rect x="30" y="46" width="10" height="10" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <rect x="55" y="46" width="10" height="10" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <rect x="80" y="46" width="10" height="10" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <rect x="50" y="68" width="20" height="22" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
      <circle cx="67" cy="80" r="1.5" fill="#3a3a3a" />
      <rect x="26" y="68" width="14" height="12" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="33" y1="68" x2="33" y2="80" stroke="#3a3a3a" strokeWidth="0.8" />
      <rect x="80" y="68" width="14" height="12" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="87" y1="68" x2="87" y2="80" stroke="#3a3a3a" strokeWidth="0.8" />
      <line x1="15" y1="90" x2="105" y2="90" stroke="#3a3a3a" strokeWidth="1.5" />
      <line x1="15" y1="90" x2="15" y2="96" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="25" y1="90" x2="25" y2="96" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="35" y1="90" x2="35" y2="96" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="85" y1="90" x2="85" y2="96" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="95" y1="90" x2="95" y2="96" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="105" y1="90" x2="105" y2="96" stroke="#3a3a3a" strokeWidth="1" />
      <line x1="15" y1="96" x2="105" y2="96" stroke="#3a3a3a" strokeWidth="1" />
    </svg>
  </div>
);

const WorldMap = () => (
  <svg viewBox="0 0 1200 600" className="hero-worldmap-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M120 100 L140 85 L170 80 L200 75 L230 78 L250 85 L270 80 L290 90 L300 100 L310 95 L320 100 L310 120 L300 140 L290 155 L280 165 L275 180 L265 195 L250 205 L240 215 L250 225 L260 240 L255 250 L245 255 L235 250 L220 240 L210 230 L195 220 L180 210 L170 200 L160 190 L145 180 L130 175 L120 165 L110 155 L105 140 L110 125 L115 110 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M250 260 L265 255 L280 260 L290 275 L295 290 L298 310 L295 330 L290 350 L280 370 L270 390 L260 410 L250 425 L245 440 L240 455 L238 470 L240 480 L235 485 L225 475 L220 460 L218 440 L220 420 L225 400 L230 380 L235 360 L238 340 L240 320 L242 300 L245 280 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M480 70 L500 65 L520 68 L540 72 L555 80 L565 90 L570 100 L575 110 L570 120 L560 130 L550 135 L540 140 L525 145 L510 148 L500 145 L490 140 L480 135 L475 125 L470 115 L472 105 L475 95 L478 82 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M490 155 L510 150 L530 152 L550 155 L570 160 L585 170 L595 185 L600 200 L605 220 L608 240 L605 260 L600 280 L595 300 L585 320 L575 335 L560 345 L545 350 L530 348 L515 340 L505 325 L498 310 L492 290 L488 270 L485 250 L483 230 L482 210 L483 190 L485 175 L488 162 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M580 60 L610 55 L640 50 L680 48 L720 50 L760 55 L800 60 L840 65 L870 75 L890 85 L900 100 L905 115 L900 130 L890 145 L875 155 L860 165 L840 170 L820 175 L795 178 L770 180 L745 178 L720 175 L700 170 L680 165 L665 158 L650 150 L640 140 L630 130 L620 120 L615 110 L612 100 L610 90 L608 80 L600 70 L590 65 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M780 190 L800 185 L820 188 L840 195 L855 205 L865 215 L860 225 L848 230 L835 228 L820 225 L805 220 L795 215 L785 208 L780 200 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M870 220 L885 218 L895 225 L900 235 L895 242 L885 245 L875 240 L868 232 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M830 300 L860 290 L890 285 L920 290 L945 300 L960 315 L968 335 L965 355 L955 370 L940 380 L920 385 L900 383 L880 375 L860 365 L845 350 L835 335 L830 318 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M910 90 L920 85 L928 90 L932 100 L930 112 L925 120 L918 115 L912 105 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M870 175 L878 172 L882 180 L880 190 L875 195 L870 188 Z" fill="#d5d0c8" opacity="0.55" />
    <path d="M340 30 L370 25 L395 28 L410 38 L405 52 L390 60 L370 58 L355 50 L342 40 Z" fill="#d5d0c8" opacity="0.55" />
  </svg>
);

const Home = () => {
  useScrollAnimation();

  return (
    <div className="home">
      {/* ===== HERO / INVITATION CARD ===== */}
      <section className="hero">
        <WorldMap />
        <div className="hero-content">
          {/* Nautical anchor decoration above names */}
          <div className="hero-anchor-decor">
            <AnchorIcon />
          </div>

          <h1 className="names-script">
            <span className="name-mark">Mark</span>
            <span className="name-ampersand">&amp;</span>
            <span className="name-shayne">Shayne</span>
          </h1>

          <p className="invitation-text">
            WITH JOYFUL HEARTS, WE INVITE YOU TO WITNESS<br />
            THE BEGINNING OF OUR BIGGEST ADVENTURE YET.
          </p>

          {/* Retro dotted line with airplane */}
          <div className="hero-retro-divider">
            <InlineAnchor />
            <div className="hero-dotted-line" />
            <InlineAirplane />
          </div>

          <div className="date-block">
            <div className="date-month">FEBRUARY</div>
            <div className="date-row">
              <div className="date-rule-left" />
              <span className="date-day-name">WEDNESDAY</span>
              <span className="date-number">25</span>
              <span className="date-time">9:00AM</span>
              <div className="date-rule-right" />
            </div>
            <div className="date-year">2026</div>
          </div>

          <div className="venue-section">
            <div className="venue-row ceremony-row" data-animate="blur-in" data-delay="0.1">
              <ChurchIcon />
              <div className="venue-text">
                <p className="venue-name">OUR LADY OF MT. CARMEL PARISH</p>
                <p className="venue-address">J.V Serina St. Carmen, Cagayan de Oro City</p>
              </div>
            </div>

            <p className="reception-label" data-animate="fade-in" data-delay="0.2">reception to follow at</p>

            <div className="venue-row reception-row" data-animate="blur-in" data-delay="0.3">
              <CasaIcon />
              <div className="venue-text">
                <p className="venue-name">SOMEWHERE BY CASA DE CANITOAN</p>
                <p className="venue-address">Canitoan-Macapagal Drive, Cagayan de Oro City</p>
              </div>
            </div>
          </div>

          <div className="hero-buttons" data-animate="fade-up" data-delay="0.4">
            <Link to="/wedding-details" className="btn btn-primary">Wedding Details</Link>
            <Link to="/our-story" className="btn">Our Story</Link>
          </div>

          {/* Bottom wave decoration */}
          <div className="hero-wave-decor">
            <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10 Q15 4 30 10 Q45 16 60 10 Q75 4 90 10 Q105 16 120 10 Q135 4 150 10 Q165 16 180 10 Q195 4 210 10 Q225 16 240 10 Q255 4 270 10 Q285 16 300 10" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.4" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section className="countdown-section">
        <div className="container" data-animate="drift-up">
          <AnimatedCountdown />
        </div>
      </section>

      {/* ===== YOU'RE INVITED - Retro Nautical Style ===== */}
      <section className="announcement section">
        <div className="container">
          {/* Retro typewriter header */}
          <div className="ann-retro-header" data-animate="fade-up-blur">
            <InlineAnchor />
            <div className="ann-dotted-line" />
            <h2 className="ann-typewriter-title">YOU'RE INVITED</h2>
            <div className="ann-dotted-line" />
            <InlineAirplane />
          </div>

          <h3 className="announcement-title" data-animate="blur-in" data-delay="0.1">A Voyage of Forever</h3>
          <div className="announcement-divider" data-animate="expand-in" data-delay="0.15" />
          <p className="announcement-text" data-animate="fade-up" data-delay="0.2">
            We are so excited to celebrate our special day with you!
            Join us as we begin our journey together in the beautiful City of Golden Friendship.
          </p>

          <div className="announcement-cards">
            <div className="ann-card" data-animate="flip-up" data-delay="0.1">
              <div className="ann-card-icon-wrap">
                <CompassIcon />
              </div>
              <div className="ann-card-icon">25</div>
              <h3 className="ann-card-title">February</h3>
              <p className="ann-card-sub">2026</p>
            </div>
            <div className="ann-card" data-animate="flip-up" data-delay="0.2">
              <div className="ann-card-icon-wrap">
                <AnchorIcon />
              </div>
              <div className="ann-card-icon">9:00</div>
              <h3 className="ann-card-title">Ceremony</h3>
              <p className="ann-card-sub">Our Lady of Mt. Carmel Parish</p>
            </div>
            <div className="ann-card" data-animate="flip-up" data-delay="0.3">
              <div className="ann-card-icon-wrap">
                <ShipWheelIcon />
              </div>
              <div className="ann-card-icon">After</div>
              <h3 className="ann-card-title">Reception</h3>
              <p className="ann-card-sub">Somewhere by Casa de Canitoan</p>
            </div>
          </div>

          <div className="ann-cta" data-animate="bounce-in" data-delay="0.4">
            <Link to="/wedding-details" className="btn btn-primary">View Full Details</Link>
          </div>

          {/* Bottom nautical wave */}
          <div className="ann-wave-decor" data-animate="fade-in" data-delay="0.5">
            <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10 Q15 4 30 10 Q45 16 60 10 Q75 4 90 10 Q105 16 120 10 Q135 4 150 10 Q165 16 180 10 Q195 4 210 10 Q225 16 240 10 Q255 4 270 10 Q285 16 300 10" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.4" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
