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
                <g transform="translate(358,34) rotate(-30)">
                  <path d="M28 0 L18 -5 L8 -5 L-2 -26 L-8 -26 L-2 -7 L-18 -10 L-22 -18 L-26 -18 L-24 -10 L-28 -9 L-28 0" fill="#d4ccb0" />
                  <path d="M28 0 L18 5 L8 5 L-2 26 L-8 26 L-2 7 L-18 10 L-22 18 L-26 18 L-24 10 L-28 9 L-28 0" fill="#d4ccb0" />
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
              <svg viewBox="0 0 300 300" className="passport-monogram-svg">
                {/* ── Top crown flourish ── */}
                <path d="M150 30 Q155 20 162 24 Q166 16 172 22 Q170 14 177 18 Q180 12 184 17" stroke="#c9a96e" strokeWidth="1.3" fill="none" />
                <path d="M150 30 Q145 20 138 24 Q134 16 128 22 Q130 14 123 18 Q120 12 116 17" stroke="#c9a96e" strokeWidth="1.3" fill="none" />
                <path d="M150 30 Q153 25 156 27" stroke="#c9a96e" strokeWidth="1" fill="none" />
                <path d="M150 30 Q147 25 144 27" stroke="#c9a96e" strokeWidth="1" fill="none" />

                {/* ── Frame - top arcs ── */}
                <path d="M116 17 Q100 24 90 38 Q82 50 78 64 Q75 74 74 84" stroke="#c9a96e" strokeWidth="1.5" fill="none" />
                <path d="M184 17 Q200 24 210 38 Q218 50 222 64 Q225 74 226 84" stroke="#c9a96e" strokeWidth="1.5" fill="none" />

                {/* ── Outer scrollwork - top ── */}
                <path d="M90 38 Q82 32 78 40 Q74 48 80 50" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M78 64 Q70 58 68 66 Q66 76 72 76" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M210 38 Q218 32 222 40 Q226 48 220 50" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M222 64 Q230 58 232 66 Q234 76 228 76" stroke="#c9a96e" strokeWidth="1.1" fill="none" />

                {/* ── Frame - sides ── */}
                <path d="M74 84 Q70 100 68 118 Q66 136 68 154 Q70 168 74 180" stroke="#c9a96e" strokeWidth="1.5" fill="none" />
                <path d="M226 84 Q230 100 232 118 Q234 136 232 154 Q230 168 226 180" stroke="#c9a96e" strokeWidth="1.5" fill="none" />

                {/* ── Side scrollwork ── */}
                <path d="M68 110 Q60 106 58 114 Q56 122 62 123" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M68 148 Q60 144 58 152 Q56 160 62 161" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M232 110 Q240 106 242 114 Q244 122 238 123" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M232 148 Q240 144 242 152 Q244 160 238 161" stroke="#c9a96e" strokeWidth="1.1" fill="none" />

                {/* ── Frame - bottom arcs ── */}
                <path d="M74 180 Q78 196 88 210 Q100 224 115 234 Q130 242 150 246" stroke="#c9a96e" strokeWidth="1.5" fill="none" />
                <path d="M226 180 Q222 196 212 210 Q200 224 185 234 Q170 242 150 246" stroke="#c9a96e" strokeWidth="1.5" fill="none" />

                {/* ── Bottom scrollwork ── */}
                <path d="M88 210 Q80 216 84 224 Q88 230 94 226" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M115 234 Q110 242 116 248 Q122 252 126 246" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M212 210 Q220 216 216 224 Q212 230 206 226" stroke="#c9a96e" strokeWidth="1.1" fill="none" />
                <path d="M185 234 Q190 242 184 248 Q178 252 174 246" stroke="#c9a96e" strokeWidth="1.1" fill="none" />

                {/* ── Bottom center pendant ── */}
                <path d="M150 246 Q148 254 150 260 Q152 254 150 246" stroke="#c9a96e" strokeWidth="1.3" fill="none" />
                <circle cx="150" cy="262" r="2" stroke="#c9a96e" strokeWidth="0.8" fill="none" />

                {/* ── Inner vine accents ── */}
                <path d="M105 52 Q112 44 120 48 Q114 54 108 50" stroke="#c9a96e" strokeWidth="0.9" fill="none" />
                <path d="M195 52 Q188 44 180 48 Q186 54 192 50" stroke="#c9a96e" strokeWidth="0.9" fill="none" />
                <path d="M105 218 Q112 226 120 222 Q114 216 108 220" stroke="#c9a96e" strokeWidth="0.9" fill="none" />
                <path d="M195 218 Q188 226 180 222 Q186 216 192 220" stroke="#c9a96e" strokeWidth="0.9" fill="none" />

                {/* ── Petal details ── */}
                <path d="M78 90 Q72 84 76 78 Q80 82 78 90" stroke="#c9a96e" strokeWidth="0.8" fill="none" />
                <path d="M222 90 Q228 84 224 78 Q220 82 222 90" stroke="#c9a96e" strokeWidth="0.8" fill="none" />
                <path d="M78 176 Q72 182 76 188 Q80 184 78 176" stroke="#c9a96e" strokeWidth="0.8" fill="none" />
                <path d="M222 176 Q228 182 224 188 Q220 184 222 176" stroke="#c9a96e" strokeWidth="0.8" fill="none" />

                {/* ── Small anchor at top of monogram ── */}
                <g transform="translate(150, 65) scale(0.35)" opacity="0.5">
                  <circle cx="0" cy="-12" r="6" stroke="#c9a96e" strokeWidth="2" fill="none" />
                  <line x1="0" y1="-6" x2="0" y2="30" stroke="#c9a96e" strokeWidth="2" />
                  <line x1="-14" y1="10" x2="14" y2="10" stroke="#c9a96e" strokeWidth="2" />
                  <path d="M0 30 Q-12 26 -18 16" stroke="#c9a96e" strokeWidth="2" fill="none" />
                  <path d="M0 30 Q12 26 18 16" stroke="#c9a96e" strokeWidth="2" fill="none" />
                </g>

                {/* ── M ── */}
                <text x="110" y="140" fontSize="62" fill="#c9a96e" fontFamily="'Cormorant Garamond', serif" fontWeight="600" fontStyle="normal">M</text>
                {/* ── & ── */}
                <text x="140" y="166" fontSize="30" fill="#9a9070" fontFamily="'Great Vibes', cursive">&amp;</text>
                {/* ── S ── */}
                <text x="140" y="200" fontSize="62" fill="#c9a96e" fontFamily="'Cormorant Garamond', serif" fontWeight="600" fontStyle="normal">S</text>
              </svg>
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
        Embark on Our Journey
      </button>
    </div>
  );
};

export default WeddingPassport;
