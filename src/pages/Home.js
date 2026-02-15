import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedCountdown from '../components/AnimatedCountdown';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Home.css';

const Home = () => {
  useScrollAnimation();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            <span>SHAYNE</span>
            <span>&</span>
            <span>MARK</span>
          </h1>
          <div className="date-time">
            <div className="day-of-week">WEDNESDAY</div>
            <div className="date-number">25</div>
            <div className="time">AT 9AM</div>
          </div>
          <div className="month-year">FEBRUARY 2026</div>

          <div className="venue-details" data-animate="fade-up" data-delay="0.3">
            <p className="church-name">
              OUR LADY OF MOUNT CARMEL PARISH CHURCH
            </p>
            <p className="church-address">
              J.V. Serina St. Carmen, CDO City
            </p>
            <p className="reception-label">
              Reception will follow at
            </p>
            <p className="reception-venue">
              Somewhere by Casa de Canitoan
            </p>
            <p className="reception-address">
              Canitoan-Macapagal Drive, CDO City
            </p>
          </div>

          <div className="hero-buttons" data-animate="fade-up" data-delay="0.5">
            <Link to="/rsvp" className="btn btn-primary">RSVP</Link>
            <Link to="/wedding-details" className="btn">Wedding Details</Link>
            <Link to="/our-story" className="btn">Our Story</Link>
          </div>
        </div>
      </section>

      <section className="countdown-section" data-animate="fade-up">
        <div className="container">
          <AnimatedCountdown />
        </div>
      </section>

      <section className="announcement section">
        <div className="container">
          <h2 className="section-title" data-animate="fade-up">You're Invited</h2>
          <div className="announcement-content" data-animate="fade-up" data-delay="0.15">
            <p>
              We are so excited to celebrate our special day with you!
              Join us as we begin our journey together in the beautiful City of Golden Friendship.
            </p>

            <div className="announcement-details">
              <div className="detail-item" data-animate="fade-up" data-delay="0.1">
                <div className="icon">25</div>
                <div>
                  <h3>February</h3>
                  <p>2026</p>
                </div>
              </div>
              <div className="detail-item" data-animate="fade-up" data-delay="0.2">
                <div className="icon">9:00</div>
                <div>
                  <h3>Ceremony</h3>
                  <p>Our Lady of Mount Carmel Parish</p>
                </div>
              </div>
              <div className="detail-item" data-animate="fade-up" data-delay="0.3">
                <div className="icon">After</div>
                <div>
                  <h3>Reception</h3>
                  <p>Somewhere by Casa de Canitoan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
