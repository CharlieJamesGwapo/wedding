import React from 'react';
import './DressCode.css';

const DressCode = () => {
  const colorPalette = [
    { name: 'Sage Green', hex: '#87A96B' },
    { name: 'Champagne', hex: '#F7E7CE' },
    { name: 'Navy', hex: '#2C3E50' },
    { name: 'Blush Pink', hex: '#F4C2C2' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Muted Gold', hex: '#D4A574' }
  ];

  return (
    <div className="dress-code">
      <section className="hero-section">
        <div className="container">
          <h1>Dress Code</h1>
          <p>Formal Garden Attire</p>
        </div>
      </section>

      <section className="dress-code-content section">
        <div className="container">
          <div className="dress-code-intro">
            <h2>What to Wear</h2>
            <p>
              We want our guests to feel comfortable and elegant while celebrating with us in 
              the beautiful Cagayan de Oro. Our dress code is formal garden attire - 
              think sophisticated yet comfortable for an outdoor celebration.
            </p>
          </div>

          <div className="attire-guide">
            <div className="attire-section">
              <h3>For the Ladies</h3>
              <div className="attire-recommendations">
                <div className="attire-item">
                  <span className="attire-icon">👗</span>
                  <div>
                    <h4>Cocktail Dresses</h4>
                    <p>Long or short dresses in elegant fabrics</p>
                  </div>
                </div>
                <div className="attire-item">
                  <span className="attire-icon">👠</span>
                  <div>
                    <h4>Heels or Wedges</h4>
                    <p>Consider block heels for grass areas</p>
                  </div>
                </div>
                <div className="attire-item">
                  <span className="attire-icon">🧥</span>
                  <div>
                    <h4>Light Wraps</h4>
                    <p>Evenings are warm and tropical</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="attire-section">
              <h3>For the Gentlemen</h3>
              <div className="attire-recommendations">
                <div className="attire-item">
                  <span className="attire-icon">🤵</span>
                  <div>
                    <h4>Suits or Sport Coats</h4>
                    <p>Light colors work beautifully for outdoor settings</p>
                  </div>
                </div>
                <div className="attire-item">
                  <span className="attire-icon">👔</span>
                  <div>
                    <h4>Dress Shirts</h4>
                    <p>Ties optional but welcome</p>
                  </div>
                </div>
                <div className="attire-item">
                  <span className="attire-icon">👞</span>
                  <div>
                    <h4>Dress Shoes</h4>
                    <p>Loafers or dress shoes, avoid casual sneakers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="color-palette-section">
            <h2>Suggested Color Palette</h2>
            <p className="palette-description">
              While not required, these colors complement our wedding theme and our tropical wedding setting:
            </p>
            <div className="color-palette">
              {colorPalette.map((color, index) => (
                <div key={index} className="color-item">
                  <div 
                    className="color-swatch" 
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <span className="color-name">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="practical-tips">
            <h2>Practical Considerations</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🌤️</div>
                <h3>Weather</h3>
                <p>
                  February in Cagayan de Oro is warm and tropical (82-90°F) with occasional rain showers. 
                  Layers are recommended for comfort throughout the day.
                </p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🌿</div>
                <h3>Outdoor Venue</h3>
                <p>
                  Both ceremony and cocktail hour will be outdoors on grass. 
                  Consider heel type and avoid stilettos that might sink into soft ground.
                </p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📸</div>
                <h3>Photos</h3>
                <p>
                  Solid colors and elegant patterns photograph beautifully. 
                  Avoid large logos or very casual attire.
                </p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🍷</div>
                <h3>Comfort</h3>
                <p>
                  You'll be celebrating with us for several hours. 
                  Choose outfits that allow you to dance and enjoy the evening comfortably.
                </p>
              </div>
            </div>
          </div>

          <div className="what-to-avoid">
            <h2>What to Avoid</h2>
            <div className="avoid-list">
              <div className="avoid-item">
                <span className="avoid-icon">❌</span>
                <p>Denim, shorts, or t-shirts</p>
              </div>
              <div className="avoid-item">
                <span className="avoid-icon">❌</span>
                <p>Athletic wear or sneakers</p>
              </div>
              <div className="avoid-item">
                <span className="avoid-icon">❌</span>
                <p>Very casual beachwear (flip-flops, tank tops)</p>
              </div>
              <div className="avoid-item">
                <span className="avoid-icon">❌</span>
                <p>White or ivory colors (reserved for the bride)</p>
              </div>
            </div>
          </div>

          <div className="final-note">
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
