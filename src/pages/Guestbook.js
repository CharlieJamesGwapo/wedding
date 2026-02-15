import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Guestbook.css';

const Guestbook = () => {
  const [wishes, setWishes] = useState([]);
  const [newWish, setNewWish] = useState({
    name: '',
    message: '',
    relationship: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const sampleWishes = [
      {
        id: 1,
        name: 'Margaret Thompson',
        relationship: 'Grandmother',
        message: 'My dearest Shayne, watching you grow into the beautiful woman you are today has been the greatest joy of my life. Mark, you are a wonderful match for my granddaughter. May your love story be as beautiful as the life you\'ll build together. With all my love.',
        date: '2024-01-15',
        featured: true
      },
      {
        id: 2,
        name: 'The Johnson Family',
        relationship: 'Family Friends',
        message: 'We\'ve known Shayne since she was this high! It\'s been an honor to watch her journey to this special day. Mark, welcome to the family! We can\'t wait to celebrate with you in beautiful Tuscany!',
        date: '2024-01-20',
        featured: false
      },
      {
        id: 3,
        name: 'Lisa Chen',
        relationship: 'Best Friend',
        message: 'To my soul sister Shayne and the amazing Mark - your love story inspires everyone around you. I\'m so honored to stand by your side as you begin this new chapter. Here\'s to a lifetime of laughter, adventure, and endless love!',
        date: '2024-01-22',
        featured: true
      },
      {
        id: 4,
        name: 'Robert & Maria Rodriguez',
        relationship: 'Mark\'s Parents',
        message: 'Mark, our son, finding you has been one of life\'s greatest blessings. Shayne, you\'ve brought so much joy into our son\'s life and our family. We welcome you with open arms and can\'t wait to officially call you our daughter-in-law.',
        date: '2024-01-25',
        featured: true
      }
    ];
    setWishes(sampleWishes);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newWish.name.trim() || !newWish.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const wish = {
        id: Date.now(),
        ...newWish,
        date: new Date().toISOString().split('T')[0],
        featured: false
      };

      setWishes(prev => [wish, ...prev]);
      setNewWish({ name: '', message: '', relationship: '' });
      setShowForm(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting wish:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your wish. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWish(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const featuredWishes = wishes.filter(wish => wish.featured);
  const regularWishes = wishes.filter(wish => !wish.featured);

  return (
    <div className="guestbook">
      <section className="hero-section">
        <div className="container">
          <h1>Guestbook & Wishes</h1>
          <p>Share your love and memories with us</p>
        </div>
      </section>

      <section className="guestbook-content section">
        <div className="container">
          <div className="guestbook-intro" data-animate="fade-up">
            <h2>Leave Your Message on Our Love Story</h2>
            <p>
              Your words and wishes mean the world to us. Whether you've known us for years
              or are just joining our celebration, we'd love to hear from you. Share a memory,
              offer advice, or simply send your love - every message will be cherished forever.
            </p>
            <button
              className="btn btn-primary add-wish-btn"
              onClick={() => setShowForm(true)}
            >
              ✍️ Leave a Message
            </button>
          </div>

          {featuredWishes.length > 0 && (
            <div className="featured-wishes">
              <h3 data-animate="fade-up">Featured Messages</h3>
              <div className="wishes-grid featured">
                {featuredWishes.map((wish, index) => (
                  <div key={wish.id} className="wish-card featured" data-animate="fade-up" data-delay={index * 0.12}>
                    <div className="wish-header">
                      <h4>{wish.name}</h4>
                      <span className="relationship">{wish.relationship}</span>
                    </div>
                    <div className="wish-content">
                      <p>"{wish.message}"</p>
                    </div>
                    <div className="wish-footer">
                      <span className="date">{new Date(wish.date).toLocaleDateString()}</span>
                      <span className="featured-badge">⭐ Featured</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="all-wishes">
            <h3 data-animate="fade-up">All Messages</h3>
            <div className="wishes-grid">
              {[...regularWishes, ...featuredWishes].map((wish, index) => (
                <div key={wish.id} className={`wish-card ${wish.featured ? 'featured' : ''}`} data-animate="fade-up" data-delay={index * 0.1}>
                  <div className="wish-header">
                    <h4>{wish.name}</h4>
                    <span className="relationship">{wish.relationship}</span>
                  </div>
                  <div className="wish-content">
                    <p>"{wish.message}"</p>
                  </div>
                  <div className="wish-footer">
                    <span className="date">{new Date(wish.date).toLocaleDateString()}</span>
                    {wish.featured && <span className="featured-badge">⭐ Featured</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {wishes.length === 0 && (
            <div className="no-wishes" data-animate="scale-in">
              <div className="no-wishes-icon">💌</div>
              <h3>Be the First to Share!</h3>
              <p>No wishes yet. Start by leaving the first message for Shayne and Mark!</p>
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <div className="wish-modal" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <div className="modal-header">
              <h3>Share Your Wishes</h3>
              <p>Your message will be a cherished part of our wedding memories</p>
            </div>
            <form onSubmit={handleSubmit} className="wish-form">
              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={newWish.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Share your wishes, memories, or advice for the happy couple..."
                ></textarea>
                <div className="character-count">
                  {newWish.message.length} characters
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sharing...' : 'Share Your Wishes'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                >
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
