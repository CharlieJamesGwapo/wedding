import React, { useState, useEffect } from 'react';
import './WeddingPassport.css';

const WeddingPassport = ({ onEnter }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => onEnter(), 800);
  };

  return (
    <div className={`passport-splash ${isOpening ? 'passport-opening' : ''}`}>
      <div className="passport-scroll-wrap">
      <div className="passport-book">
        {/* ═══ LEFT PAGE ═══ */}
        <div className={`passport-page passport-left ${showContent ? 'passport-visible' : ''}`}>
          <div className="passport-left-content">
            {/* Bible Verse */}
            <div className="passport-verse">
              <p className="passport-verse-text">
                {"\u201C"}When the time is right, I,<br />
                the Lord will make it happen{"\u201D"}
              </p>
              <p className="passport-verse-ref">Isaiah 60:22</p>
            </div>

            {/* Compass Rose - subtle nautical element */}
            <div className="passport-compass">
              <svg viewBox="0 0 200 200" className="passport-compass-svg">
                {/* Outer ring */}
                <circle cx="100" cy="100" r="72" stroke="#c9a96e" strokeWidth="1.2" fill="none" opacity="0.6" />
                <circle cx="100" cy="100" r="68" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.4" />
                {/* Degree tick marks */}
                {[...Array(36)].map((_, i) => {
                  const angle = (i * 10) * Math.PI / 180;
                  const isMajor = i % 9 === 0;
                  const r1 = isMajor ? 60 : 64;
                  const r2 = 68;
                  return (
                    <line
                      key={i}
                      x1={100 + r1 * Math.sin(angle)}
                      y1={100 - r1 * Math.cos(angle)}
                      x2={100 + r2 * Math.sin(angle)}
                      y2={100 - r2 * Math.cos(angle)}
                      stroke="#c9a96e"
                      strokeWidth={isMajor ? "1.2" : "0.5"}
                      opacity={isMajor ? "0.7" : "0.4"}
                    />
                  );
                })}
                {/* Cardinal directions */}
                <text x="100" y="38" textAnchor="middle" fontSize="10" fill="#c9a96e" fontFamily="'Cormorant Garamond', serif" fontWeight="600" opacity="0.7">N</text>
                <text x="100" y="170" textAnchor="middle" fontSize="10" fill="#c9a96e" fontFamily="'Cormorant Garamond', serif" fontWeight="600" opacity="0.7">S</text>
                <text x="168" y="104" textAnchor="middle" fontSize="10" fill="#c9a96e" fontFamily="'Cormorant Garamond', serif" fontWeight="600" opacity="0.7">E</text>
                <text x="33" y="104" textAnchor="middle" fontSize="10" fill="#c9a96e" fontFamily="'Cormorant Garamond', serif" fontWeight="600" opacity="0.7">W</text>
                {/* North pointer - diamond */}
                <path d="M100 46 L104 100 L100 92 L96 100 Z" fill="#c9a96e" opacity="0.6" />
                <path d="M100 154 L104 100 L100 108 L96 100 Z" fill="#9a9070" opacity="0.4" />
                {/* East-West pointer */}
                <path d="M154 100 L100 96 L108 100 L100 104 Z" fill="#9a9070" opacity="0.4" />
                <path d="M46 100 L100 96 L92 100 L100 104 Z" fill="#9a9070" opacity="0.4" />
                {/* Inner circle */}
                <circle cx="100" cy="100" r="6" stroke="#c9a96e" strokeWidth="1" fill="none" opacity="0.5" />
                <circle cx="100" cy="100" r="2" fill="#c9a96e" opacity="0.6" />
              </svg>
            </div>

            {/* Airplane with dashed trail */}
            <div className="passport-airplane-trail">
              <svg viewBox="0 0 380 200" className="passport-plane-svg">
                <path
                  d="M30 160 C60 140 100 100 140 90 C180 80 220 95 260 85 C300 75 330 55 350 40"
                  stroke="#d4ccb0"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="14 10"
                  strokeLinecap="round"
                  className="passport-trail-path"
                />
                <g transform="translate(355,35) rotate(-32) scale(2) translate(-12,-12)">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#d4ccb0" />
                </g>
              </svg>
            </div>
          </div>

          {/* Subtle anchor watermark on left page */}
          <div className="passport-anchor-watermark">
            <svg viewBox="0 0 100 120" className="passport-anchor-wm-svg">
              {/* Anchor ring */}
              <circle cx="50" cy="22" r="10" stroke="#d4ccb0" strokeWidth="1.5" fill="none" />
              {/* Cross bar */}
              <line x1="30" y1="50" x2="70" y2="50" stroke="#d4ccb0" strokeWidth="2" strokeLinecap="round" />
              {/* Vertical shaft */}
              <line x1="50" y1="32" x2="50" y2="95" stroke="#d4ccb0" strokeWidth="2" strokeLinecap="round" />
              {/* Left fluke */}
              <path d="M50 95 Q30 90 20 75" stroke="#d4ccb0" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M20 75 L24 82 L28 76" stroke="#d4ccb0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* Right fluke */}
              <path d="M50 95 Q70 90 80 75" stroke="#d4ccb0" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M80 75 L76 82 L72 76" stroke="#d4ccb0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <div className="passport-spine" />
        </div>

        {/* ═══ RIGHT PAGE ═══ */}
        <div className={`passport-page passport-right ${showContent ? 'passport-visible' : ''}`}>
          {/* Ship wheel watermark - very subtle */}
          <div className="passport-wheel-watermark">
            <svg viewBox="0 0 200 200" className="passport-wheel-wm-svg">
              <circle cx="100" cy="100" r="60" stroke="#d4ccb0" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="100" r="50" stroke="#d4ccb0" strokeWidth="1" fill="none" />
              <circle cx="100" cy="100" r="14" stroke="#d4ccb0" strokeWidth="1.5" fill="none" />
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                return (
                  <g key={i}>
                    {/* Spoke */}
                    <line
                      x1={100 + 14 * Math.cos(angle)}
                      y1={100 + 14 * Math.sin(angle)}
                      x2={100 + 50 * Math.cos(angle)}
                      y2={100 + 50 * Math.sin(angle)}
                      stroke="#d4ccb0"
                      strokeWidth="1.2"
                    />
                    {/* Handle peg */}
                    <line
                      x1={100 + 60 * Math.cos(angle)}
                      y1={100 + 60 * Math.sin(angle)}
                      x2={100 + 76 * Math.cos(angle)}
                      y2={100 + 76 * Math.sin(angle)}
                      stroke="#d4ccb0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="passport-right-content">
            <h1 className="passport-title">
              WEDDING<br />PASSPORT
            </h1>

            <p className="passport-subtitle">to the marriage of</p>

            {/* Ornate Monogram Frame with M & S */}
            <div className="passport-monogram">
              <img src="/lego.png" alt="M & S Monogram" className="passport-monogram-img" />
            </div>

            <div className="passport-names">
              <h2 className="passport-groom">MARK DEMPHRIE R. JAYO</h2>
              <h2 className="passport-bride">SHAYNE PENALES</h2>
            </div>

            <p className="passport-date">FEBRUARY 25, 2026</p>

            {/* Subtle nautical badge */}
            <div className="passport-nautical-badge">
              <svg viewBox="0 0 180 30" className="passport-badge-svg">
                {/* Left wave line */}
                <path d="M10 15 Q20 8 30 15 Q40 22 50 15 Q60 8 70 15" stroke="#c9a96e" strokeWidth="1" fill="none" opacity="0.5" />
                {/* Center anchor */}
                <g transform="translate(90, 15) scale(0.4)">
                  <circle cx="0" cy="-10" r="5" stroke="#c9a96e" strokeWidth="2" fill="none" />
                  <line x1="0" y1="-5" x2="0" y2="20" stroke="#c9a96e" strokeWidth="2" />
                  <line x1="-10" y1="5" x2="10" y2="5" stroke="#c9a96e" strokeWidth="2" />
                  <path d="M0 20 Q-8 17 -12 10" stroke="#c9a96e" strokeWidth="2" fill="none" />
                  <path d="M0 20 Q8 17 12 10" stroke="#c9a96e" strokeWidth="2" fill="none" />
                </g>
                {/* Right wave line */}
                <path d="M110 15 Q120 8 130 15 Q140 22 150 15 Q160 8 170 15" stroke="#c9a96e" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Enter Button */}
      <button
        className={`passport-enter-btn ${showContent ? 'passport-btn-visible' : ''}`}
        onClick={handleEnter}
      >
        <span className="passport-btn-text">Tap to Embark on Our Journey</span>
        <span className="passport-btn-hint">&#x2022; &#x2022; &#x2022;</span>
      </button>
      </div>
    </div>
  );
};

export default WeddingPassport;
