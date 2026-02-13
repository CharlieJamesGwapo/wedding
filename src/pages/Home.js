import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedCountdown from '../components/AnimatedCountdown';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            <span>SHAYNE</span>
            <span>&</span>
            <span>DR</span>
          </h1>
          <div className="date-time">
            <div className="day-of-week">WEDNESDAY</div>
            <div className="date-number">25</div>
            <div className="time">AT 9AM</div>
          </div>
          <div className="month-year">FEBRUARY 2026</div>
          
          <div className="venue-details">
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
          
          <div className="hero-buttons">
            <Link to="/rsvp" className="btn btn-primary">RSVP</Link>
            <Link to="/wedding-details" className="btn">Wedding Details</Link>
            <Link to="/our-story" className="btn">Our Story</Link>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="container">
          <AnimatedCountdown />
        </div>
      </section>

      <section className="announcement section">
        <div className="container">
          <h2 className="section-title">You're Invited</h2>
          <div className="announcement-content">
            <p>
              We are so excited to celebrate our special day with you! 
              Join us as we begin our journey together in the beautiful City of Golden Friendship.
            </p>
            
            <div className="announcement-details">
              <div className="detail-item">
                <div className="icon">14</div>
                <div>
                  <h3>February</h3>
                  <p>2026</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="icon">4:00</div>
                <div>
                  <h3>Ceremony</h3>
                  <p>Carmen Hotel, CDO</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="icon">6:00</div>
                <div>
                  <h3>Reception</h3>
                  <p>Dinner & Dancing</p>
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
