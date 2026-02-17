import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './OurStory.css';

/* ===== NAUTICAL / SEAMAN SVG ICONS ===== */
const AnchorIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-icon-svg">
    <circle cx="40" cy="16" r="6" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <line x1="40" y1="22" x2="40" y2="62" stroke="#2c2c2c" strokeWidth="2" />
    <path d="M20 50 Q20 62 40 62 Q60 62 60 50" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <line x1="30" y1="30" x2="50" y2="30" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 50 L22 46 L22 54 Z" fill="#2c2c2c" />
    <path d="M64 50 L58 46 L58 54 Z" fill="#2c2c2c" />
  </svg>
);

const ShipWheelIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-icon-svg">
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

const CompassIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-icon-svg">
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

const WavesIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-icon-svg">
    <path d="M8 32 Q16 24 24 32 Q32 40 40 32 Q48 24 56 32 Q64 40 72 32" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M8 44 Q16 36 24 44 Q32 52 40 44 Q48 36 56 44 Q64 52 72 44" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M8 56 Q16 48 24 56 Q32 64 40 56 Q48 48 56 56 Q64 64 72 56" stroke="#2c2c2c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const ShipIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-icon-svg">
    <path d="M12 52 L18 62 L62 62 L68 52 Z" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <line x1="40" y1="18" x2="40" y2="52" stroke="#2c2c2c" strokeWidth="2" />
    <path d="M42 20 L42 46 L60 46 Z" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M38 20 L38 42 L24 42 Z" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M40 18 L50 22 L40 26" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M6 66 Q14 62 22 66 Q30 70 38 66 Q46 62 54 66 Q62 70 70 66 Q74 64 78 66" stroke="#2c2c2c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const AirplaneIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-icon-svg">
    <path d="M40 14 L40 66" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 34 L14 44 L14 48 L40 42" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M40 34 L66 44 L66 48 L40 42" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M40 58 L30 64 L30 66 L40 62" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M40 58 L50 64 L50 66 L40 62" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <circle cx="40" cy="14" r="3" fill="#2c2c2c" />
    <circle cx="40" cy="72" r="1.5" fill="#2c2c2c" opacity="0.5" />
    <circle cx="40" cy="76" r="1" fill="#2c2c2c" opacity="0.3" />
  </svg>
);

const LifebuoyIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="story-icon-svg">
    <circle cx="40" cy="40" r="22" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <circle cx="40" cy="40" r="12" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <line x1="40" y1="18" x2="40" y2="28" stroke="#2c2c2c" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1="52" x2="40" y2="62" stroke="#2c2c2c" strokeWidth="3" strokeLinecap="round" />
    <line x1="18" y1="40" x2="28" y2="40" stroke="#2c2c2c" strokeWidth="3" strokeLinecap="round" />
    <line x1="52" y1="40" x2="62" y2="40" stroke="#2c2c2c" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 8 Q36 10 40 14" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <line x1="40" y1="8" x2="40" y2="4" stroke="#2c2c2c" strokeWidth="1.5" />
  </svg>
);

/* Small inline airplane for header decorations */
const InlineAirplane = () => (
  <svg viewBox="0 0 24 24" className="inline-airplane-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#2c2c2c" />
  </svg>
);

/* Small inline anchor for decorations */
const InlineAnchor = () => (
  <svg viewBox="0 0 24 24" className="inline-anchor-svg" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="2" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <line x1="12" y1="7" x2="12" y2="20" stroke="#2c2c2c" strokeWidth="1.5" />
    <path d="M6 16 Q6 20 12 20 Q18 20 18 16" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <line x1="9" y1="10" x2="15" y2="10" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const OurStory = () => {
  useScrollAnimation();

  return (
    <div className="our-story">
      {/* Hero Section */}
      <section className="os-hero">
        <div className="container">
          <div className="os-hero-icon" data-animate="pop-in">
            <AnchorIcon />
          </div>
          <h1 className="os-hero-title">Our Story</h1>
          <div className="os-hero-divider" />
          <p className="os-hero-subtitle">A Voyage of Love Across the Seas</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="os-intro-section section">
        <div className="container">
          <div className="os-section-header" data-animate="fade-up-blur">
            <h2 className="os-typewriter-title">THE BEGINNING</h2>
            <div className="os-dotted-line" />
            <InlineAirplane />
          </div>

          <div className="os-intro-card" data-animate="tilt-in" data-delay="0.1">
            <div className="os-intro-photo" data-animate="blur-in" data-delay="0.15">
              <img src={`${process.env.PUBLIC_URL}/moments-2.jpg`} alt="Shayne and Mark together" />
            </div>
            <p className="os-intro-text" data-animate="drift-up" data-delay="0.25">
              It all began in 2016 with a simple introduction from a mutual friend.
              At the time, Shayne was working in a private school in the small town of Balingasag,
              while Mark was working overseas as a seaman. Though they were in completely different places in life,
              fate quietly began weaving their story together.
            </p>
          </div>
        </div>
      </section>

      {/* Voyage Timeline */}
      <section className="os-voyage-section section">
        <div className="container">
          <h2 className="os-script-title" data-animate="blur-in">
            <span className="os-title-script">Our</span>{' '}
            <span className="os-title-serif">Voyage</span>
          </h2>

          {/* Chapter 1 */}
          <div className="os-chapter-card" data-animate="flip-up" data-delay="0.05">
            <div className="os-chapter-badge" data-animate="fade-in" data-delay="0.15">Chapter 01</div>
            <div className="os-chapter-icon-row" data-animate="pop-in" data-delay="0.2">
              <div className="os-chapter-icon-circle">
                <ShipWheelIcon />
              </div>
            </div>
            <h3 className="os-chapter-title" data-animate="blur-in" data-delay="0.25">The First Message</h3>
            <div className="os-chapter-divider" data-animate="expand-in" data-delay="0.3" />
            <div className="os-chapter-photo" data-animate="zoom-in" data-delay="0.15">
              <img src={`${process.env.PUBLIC_URL}/moments-3.jpg`} alt="A cherished memory" />
            </div>
            <p className="os-chapter-text" data-animate="fade-up" data-delay="0.2">
              Mark made the first move and sent Shayne a message on Facebook.
              What started as casual conversations slowly became daily exchanges, then meaningful talks,
              and eventually something they both deeply looked forward to. Even with the distance of the open seas,
              their connection felt natural and effortless.
            </p>
          </div>

          {/* Chapter 2 */}
          <div className="os-chapter-card" data-animate="flip-up" data-delay="0.05">
            <div className="os-chapter-badge" data-animate="fade-in" data-delay="0.15">Chapter 02</div>
            <div className="os-chapter-icon-row" data-animate="pop-in" data-delay="0.2">
              <div className="os-chapter-icon-circle">
                <ShipIcon />
              </div>
            </div>
            <h3 className="os-chapter-title" data-animate="blur-in" data-delay="0.25">The Beautiful Twist</h3>
            <div className="os-chapter-divider" data-animate="expand-in" data-delay="0.3" />
            <div className="os-chapter-photo os-focus-bottom" data-animate="zoom-in" data-delay="0.15">
              <img src={`${process.env.PUBLIC_URL}/moments-5.jpg`} alt="Forever starts here" />
            </div>
            <p className="os-chapter-text" data-animate="fade-up" data-delay="0.2">
              Here's the beautiful twist — long before 2016, long before the messages and video calls,
              Mark was already in college in the same town where Shayne was still in high school.
              They walked the same streets, knew the same places, and breathed the same small-town air,
              yet their paths never crossed.
            </p>
            <div className="os-quote-card" data-animate="swing-in" data-delay="0.3">
              <InlineAnchor />
              <blockquote>
                Isn't it amazing how two people can be so close in proximity,
                yet meet only at the perfect time?
              </blockquote>
              <InlineAnchor />
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="os-chapter-card" data-animate="flip-up" data-delay="0.05">
            <div className="os-chapter-badge" data-animate="fade-in" data-delay="0.15">Chapter 03</div>
            <div className="os-chapter-icon-row" data-animate="pop-in" data-delay="0.2">
              <div className="os-chapter-icon-circle">
                <CompassIcon />
              </div>
            </div>
            <h3 className="os-chapter-title" data-animate="blur-in" data-delay="0.25">Perfect Timing</h3>
            <div className="os-chapter-divider" data-animate="expand-in" data-delay="0.3" />
            <div className="os-chapter-photo" data-animate="zoom-in" data-delay="0.15">
              <img src={`${process.env.PUBLIC_URL}/moments-12.jpg`} alt="Our journey of love" />
            </div>
            <p className="os-chapter-text" data-animate="fade-up" data-delay="0.2">
              Years passed. Seasons changed. Ships sailed and returned.
              And when the timing was finally right,
              God brought them together in a way they never expected.
            </p>
          </div>

          {/* Chapter 4 */}
          <div className="os-chapter-card" data-animate="flip-up" data-delay="0.05">
            <div className="os-chapter-badge" data-animate="fade-in" data-delay="0.15">Chapter 04</div>
            <div className="os-chapter-icon-row" data-animate="pop-in" data-delay="0.2">
              <div className="os-chapter-icon-circle">
                <AirplaneIcon />
              </div>
            </div>
            <h3 className="os-chapter-title" data-animate="blur-in" data-delay="0.25">The First Meeting</h3>
            <div className="os-chapter-divider" data-animate="expand-in" data-delay="0.3" />
            <div className="os-chapter-photo os-focus-bottom" data-animate="zoom-in" data-delay="0.15">
              <img src={`${process.env.PUBLIC_URL}/moments-4.jpg`} alt="Love in every glance" />
            </div>
            <p className="os-chapter-text" data-animate="fade-up" data-delay="0.2">
              After months of talking from afar, Mark finally disembarked and came home.
              Not long after, he visited Shayne for the very first time. That visit wasn't just a reunion —
              it was the moment their story truly began in person. The laughter felt warmer,
              the smiles more certain, and the connection even stronger face to face.
            </p>
          </div>

          {/* Chapter 5 */}
          <div className="os-chapter-card" data-animate="flip-up" data-delay="0.05">
            <div className="os-chapter-badge" data-animate="fade-in" data-delay="0.15">Chapter 05</div>
            <div className="os-chapter-icon-row" data-animate="pop-in" data-delay="0.2">
              <div className="os-chapter-icon-circle">
                <WavesIcon />
              </div>
            </div>
            <h3 className="os-chapter-title" data-animate="blur-in" data-delay="0.25">Written in the Stars</h3>
            <div className="os-chapter-divider" data-animate="expand-in" data-delay="0.3" />
            <div className="os-chapter-photo" data-animate="zoom-in" data-delay="0.15">
              <img src={`${process.env.PUBLIC_URL}/moments-6.jpg`} alt="Two hearts, one love" />
            </div>
            <p className="os-chapter-text" data-animate="fade-up" data-delay="0.2">
              What started as a simple Facebook message became a love story written in perfect timing —
              a reminder that what is meant for you will always find its way back,
              across any ocean, even if it takes years.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="os-conclusion-section section">
        <div className="container">
          <div className="os-section-header" data-animate="fade-up-blur">
            <InlineAnchor />
            <div className="os-dotted-line" />
            <h2 className="os-typewriter-title">FOREVER</h2>
            <div className="os-dotted-line" />
            <InlineAirplane />
          </div>

          <div className="os-conclusion-card">
            <div className="os-conclusion-photo" data-animate="blur-in" data-delay="0.1">
              <img src={`${process.env.PUBLIC_URL}/moments-1.jpg`} alt="Our beautiful moment together" />
            </div>
            <h3 className="os-conclusion-title" data-animate="blur-in" data-delay="0.2">Forever Begins</h3>
            <p className="os-conclusion-text" data-animate="drift-up" data-delay="0.25">
              And now, here they are — hand in hand — choosing each other every day,
              grateful for timing, distance, and a love that patiently waited for the right moment.
            </p>
            <p className="os-conclusion-final" data-animate="fade-up" data-delay="0.35">
              This is not just where it all began.<br />
              This is where forever begins.
            </p>
          </div>

          {/* Nautical End Symbol */}
          <div className="os-end-symbol" data-animate="bounce-in" data-delay="0.1">
            <div className="os-end-icon">
              <LifebuoyIcon />
            </div>
            <p className="os-end-tagline">Two Hearts, One Voyage</p>
            <div className="os-end-waves">
              <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q10 4 20 10 Q30 16 40 10 Q50 4 60 10 Q70 16 80 10 Q90 4 100 10 Q110 16 120 10 Q130 4 140 10 Q150 16 160 10 Q170 4 180 10 Q190 16 200 10" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
