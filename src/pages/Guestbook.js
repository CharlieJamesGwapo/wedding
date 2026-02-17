import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Guestbook.css';

/* Retro SVG decorations */
const AnchorIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="gb-deco-svg">
    <circle cx="30" cy="12" r="5" stroke="#2c2c2c" strokeWidth="1.8" />
    <line x1="30" y1="17" x2="30" y2="50" stroke="#2c2c2c" strokeWidth="1.8" />
    <path d="M16 42 Q16 50 30 52 Q44 50 44 42" stroke="#2c2c2c" strokeWidth="1.8" fill="none" />
    <line x1="22" y1="30" x2="38" y2="30" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 42 L16 42" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 42 L46 42" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlaneIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="gb-deco-svg">
    <path d="M48 18 L28 30 L12 26 L16 30 L28 32 L28 44 L24 48 L28 46 L32 48 L28 44 L28 32 L48 38 L50 34 L32 30 L48 18Z" stroke="#2c2c2c" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    {/* Trail */}
    <path d="M10 20 Q6 22 8 24" stroke="#2c2c2c" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M6 16 Q2 18 4 20" stroke="#2c2c2c" strokeWidth="0.8" fill="none" strokeLinecap="round" />
  </svg>
);

const ShipIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="gb-deco-svg">
    {/* Hull */}
    <path d="M8 40 L14 50 L46 50 L52 40 Z" stroke="#2c2c2c" strokeWidth="1.8" fill="none" />
    {/* Deck */}
    <line x1="14" y1="40" x2="46" y2="40" stroke="#2c2c2c" strokeWidth="1.5" />
    {/* Mast */}
    <line x1="30" y1="14" x2="30" y2="40" stroke="#2c2c2c" strokeWidth="1.5" />
    {/* Flag */}
    <path d="M30 14 L42 18 L30 22" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
    {/* Porthole */}
    <circle cx="24" cy="45" r="2" stroke="#2c2c2c" strokeWidth="1" />
    <circle cx="36" cy="45" r="2" stroke="#2c2c2c" strokeWidth="1" />
    {/* Waves */}
    <path d="M2 54 Q8 50 14 54 Q20 58 26 54 Q32 50 38 54 Q44 58 50 54 Q56 50 58 54" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
  </svg>
);

const CompassIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="gb-deco-svg">
    <circle cx="30" cy="30" r="22" stroke="#2c2c2c" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="18" stroke="#2c2c2c" strokeWidth="0.8" />
    <circle cx="30" cy="30" r="3" fill="#2c2c2c" />
    {/* N S E W */}
    <line x1="30" y1="12" x2="30" y2="8" stroke="#2c2c2c" strokeWidth="1.5" />
    <line x1="30" y1="52" x2="30" y2="48" stroke="#2c2c2c" strokeWidth="1.5" />
    <line x1="8" y1="30" x2="12" y2="30" stroke="#2c2c2c" strokeWidth="1.5" />
    <line x1="48" y1="30" x2="52" y2="30" stroke="#2c2c2c" strokeWidth="1.5" />
    {/* Arrow N */}
    <polygon points="30,14 27,24 30,22 33,24" fill="#2c2c2c" />
    {/* Arrow S */}
    <polygon points="30,46 27,36 30,38 33,36" stroke="#2c2c2c" strokeWidth="0.8" fill="none" />
  </svg>
);

const Guestbook = () => {
  const [wishes, setWishes] = useState([]);
  const [newWish, setNewWish] = useState({
    name: '',
    message: '',
    relationship: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  useScrollAnimation();

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch('/api/guestbook');
        const data = await response.json();
        if (data.success) {
          setWishes(data.wishes);
        }
      } catch (error) {
        console.error('Error fetching wishes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish)
      });
      const data = await response.json();
      if (data.success) {
        setWishes(prev => [data.wish, ...prev]);
        setNewWish({ name: '', message: '', relationship: '' });
        setShowForm(false);
      } else {
        alert(data.message || 'Error submitting your wish. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      alert('There was an error submitting your wish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWish(prev => ({ ...prev, [name]: value }));
  };

  const featuredWishes = wishes.filter(wish => wish.featured);
  const regularWishes = wishes.filter(wish => !wish.featured);

  return (
    <div className="guestbook">
      {/* Hero - matching WeddingDetails clean white style */}
      <section className="gb-hero">
        <div className="container">
          <div className="gb-hero-decos">
            <PlaneIcon />
            <ShipIcon />
          </div>
          <h1 className="gb-hero-title" data-animate="fade-up">Guestbook</h1>
          <div className="gb-hero-divider" />
          <p className="gb-hero-subtitle" data-animate="fade-up" data-delay="0.15">Share your love and memories with us</p>
        </div>
      </section>

      {/* Intro with retro travel border */}
      <section className="gb-intro-section section">
        <div className="container">
          <div className="gb-passport-card" data-animate="fade-up">
            <div className="gb-passport-accent" />
            <div className="gb-passport-header">
              <div className="gb-passport-stamp">
                <CompassIcon />
              </div>
              <div>
                <h2 className="gb-passport-title">Leave Your Message</h2>
                <p className="gb-passport-route">on Our Love Story</p>
              </div>
            </div>
            <div className="gb-passport-divider" />
            <p className="gb-passport-text">
              Your words and wishes mean the world to us. Whether you've known us for years
              or are just joining our celebration, we'd love to hear from you. Share a memory,
              offer advice, or simply send your love &mdash; every message will be cherished forever.
            </p>
            <div className="gb-passport-footer">
              <div className="gb-deco-row">
                <AnchorIcon />
                <div className="gb-dotted-line" />
                <PlaneIcon />
              </div>
            </div>
            <button
              className="gb-cta-btn"
              onClick={() => setShowForm(true)}
              data-animate="scale-in"
              data-delay="0.2"
            >
              Leave a Message
            </button>
          </div>
        </div>
      </section>

      {/* Featured Messages */}
      {featuredWishes.length > 0 && (
        <section className="gb-featured-section section">
          <div className="container">
            <h3 className="gb-script-title" data-animate="fade-up">Featured Messages</h3>
            <div className="gb-wishes-grid gb-featured-grid">
              {featuredWishes.map((wish, index) => (
                <div key={wish.id} className="gb-wish-card gb-wish-featured" data-animate="fade-up" data-delay={index * 0.12}>
                  <div className="gb-wish-accent" />
                  <div className="gb-wish-badge">Featured</div>
                  <div className="gb-wish-header">
                    <h4 className="gb-wish-name">{wish.name}</h4>
                    <span className="gb-wish-rel">{wish.relationship}</span>
                  </div>
                  <div className="gb-wish-divider" />
                  <p className="gb-wish-message">"{wish.message}"</p>
                  <div className="gb-wish-footer">
                    <span className="gb-wish-date">{new Date(wish.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Messages */}
      <section className="gb-all-section section">
        <div className="container">
          <h3 className="gb-script-title" data-animate="fade-up">All Messages</h3>
          <div className="gb-wishes-grid">
            {[...regularWishes, ...featuredWishes].map((wish, index) => (
              <div key={wish.id} className={`gb-wish-card ${wish.featured ? 'gb-wish-featured' : ''}`} data-animate="fade-up" data-delay={index * 0.1}>
                <div className="gb-wish-accent" />
                <div className="gb-wish-header">
                  <h4 className="gb-wish-name">{wish.name}</h4>
                  <span className="gb-wish-rel">{wish.relationship}</span>
                </div>
                <div className="gb-wish-divider" />
                <p className="gb-wish-message">"{wish.message}"</p>
                <div className="gb-wish-footer">
                  <span className="gb-wish-date">{new Date(wish.date).toLocaleDateString()}</span>
                  {wish.featured && <span className="gb-wish-featured-tag">Featured</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <section className="gb-empty section">
          <div className="container">
            <div className="gb-empty-card" data-animate="scale-in">
              <CompassIcon />
              <h3 className="gb-empty-title">Loading Messages...</h3>
              <p className="gb-empty-text">Fetching wishes from our guestbook</p>
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!loading && wishes.length === 0 && (
        <section className="gb-empty section">
          <div className="container">
            <div className="gb-empty-card" data-animate="scale-in">
              <ShipIcon />
              <h3 className="gb-empty-title">Be the First to Share!</h3>
              <p className="gb-empty-text">No wishes yet. Start by leaving the first message for Shayne and Mark!</p>
            </div>
          </div>
        </section>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="gb-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="gb-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gb-modal-close" onClick={() => setShowForm(false)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="gb-modal-header">
              <h3 className="gb-modal-title">Share Your Wishes</h3>
              <div className="gb-modal-divider" />
              <p className="gb-modal-subtitle">Your message will be a cherished part of our wedding memories</p>
            </div>
            <form onSubmit={handleSubmit} className="gb-form">
              <div className="gb-form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newWish.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="gb-form-group">
                <label htmlFor="relationship">Your Relationship</label>
                <select
                  id="relationship"
                  name="relationship"
                  value={newWish.relationship}
                  onChange={handleInputChange}
                >
                  <option value="">Select relationship (optional)</option>
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Bridal Party">Bridal Party</option>
                  <option value="Groomsmen">Groomsmen</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="gb-form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={newWish.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Share your wishes, memories, or advice for the happy couple..."
                />
                <div className="gb-char-count">{newWish.message.length} characters</div>
              </div>
              <div className="gb-form-actions">
                <button type="submit" className="gb-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sharing...' : 'Share Your Wishes'}
                </button>
                <button type="button" className="gb-cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guestbook;
