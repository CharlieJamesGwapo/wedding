import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './DressCode.css';

const AirplaneIcon = () => (
  <svg viewBox="0 0 24 24" className="airplane-svg-dc" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#2c2c2c" />
  </svg>
);

const DressCode = () => {
  useScrollAnimation();

  return (
    <div className="dress-code">
      <section className="hero-section">
        <div className="container">
          <h1>Dress Code</h1>
          <p>Finer Details</p>
        </div>
      </section>

      <section className="dress-code-content section">
        <div className="container">
          <h2 className="finer-title">Finer Details</h2>

          {/* ATTIRE */}
          <div className="attire-inv" data-animate="fade-up">
            <div className="attire-header-row-dc">
              <h3 className="attire-typewriter">ATTIRE</h3>
              <div className="attire-dots" />
              <AirplaneIcon />
            </div>

            <div className="attire-block" data-animate="fade-up" data-delay="0.1">
              <h4 className="attire-label">FOR NINONG & NINANG</h4>
              <div className="attire-row">
                <div className="attire-colors">
                  <div className="dc-swatch" style={{ background: '#8a8068' }} />
                  <div className="dc-swatch" style={{ background: '#c8b99a' }} />
                  <div className="dc-swatch" style={{ background: '#c9a96e' }} />
                </div>
                <p className="attire-desc">
                  Barong Tagalog/ Long sleeves/ Filipiniana/ Formal Dress in shade of camel, brown, & tan colors.
                </p>
              </div>
            </div>

            <div className="attire-block" data-animate="fade-up" data-delay="0.2">
              <h4 className="attire-label">FOR GUESTS</h4>
              <div className="attire-row">
                <div className="attire-colors">
                  <div className="dc-swatch" style={{ background: '#4a4a4a' }} />
                  <div className="dc-swatch" style={{ background: '#808080' }} />
                  <div className="dc-swatch" style={{ background: '#b0b0b0' }} />
                </div>
                <p className="attire-desc">
                  Formal attire in shade of gray.<br />
                  *No jeans and no white color, please.
                </p>
              </div>
            </div>
          </div>

          <div className="what-to-avoid" data-animate="fade-up">
            <h2>What to Avoid</h2>
            <div className="avoid-list">
              <div className="avoid-item" data-animate="fade-left" data-delay="0.1">
                <div className="avoid-number">&#10005;</div>
                <p>Denim, shorts, or t-shirts</p>
              </div>
              <div className="avoid-item" data-animate="fade-left" data-delay="0.15">
                <div className="avoid-number">&#10005;</div>
                <p>Athletic wear or sneakers</p>
              </div>
              <div className="avoid-item" data-animate="fade-left" data-delay="0.2">
                <div className="avoid-number">&#10005;</div>
                <p>Very casual beachwear (flip-flops, tank tops)</p>
              </div>
              <div className="avoid-item" data-animate="fade-left" data-delay="0.25">
                <div className="avoid-number">&#10005;</div>
                <p>White or ivory colors (reserved for the bride)</p>
              </div>
            </div>
          </div>

          <div className="final-note" data-animate="scale-in">
            <h2>Most Importantly...</h2>
            <p>
              What matters most to us is having you there to celebrate our special day.
              Please wear what makes you feel comfortable and confident.
              We can't wait to see you dressed in your best to share in our joy!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DressCode;
