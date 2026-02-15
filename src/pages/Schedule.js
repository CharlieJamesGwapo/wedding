import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Schedule.css';

const Schedule = () => {
  useScrollAnimation();

  const scheduleItems = [
    { time: '8:30 AM', title: 'Guest Arrival', description: 'Guests arrive at the church', icon: '👋', location: 'Our Lady of Mount Carmel Parish Church' },
    { time: '9:00 AM', title: 'Ceremony', description: 'Wedding ceremony begins', icon: '💒', location: 'Our Lady of Mount Carmel Parish Church' },
    { time: '10:30 AM', title: 'Photo Session', description: 'Couple and family photos', icon: '📸', location: 'Church Grounds' },
    { time: '12:00 PM', title: 'Reception', description: 'Lunch reception begins', icon: '🍽️', location: 'Somewhere by Casa de Canitoan' },
    { time: '1:00 PM', title: 'Program', description: 'Wedding program and entertainment', icon: '🎤', location: 'Somewhere by Casa de Canitoan' },
    { time: '3:00 PM', title: 'Cake Cutting', description: 'Wedding cake and desserts', icon: '🎂', location: 'Somewhere by Casa de Canitoan' },
    { time: '4:00 PM', title: 'Dancing', description: 'Music and celebration', icon: '💃', location: 'Somewhere by Casa de Canitoan' },
    { time: '5:00 PM', title: 'Send Off', description: 'Farewell celebration', icon: '✨', location: 'Somewhere by Casa de Canitoan' }
  ];

  return (
    <div className="schedule">
      <section className="hero-section">
        <div className="container">
          <h1>Schedule of Events</h1>
          <p>Join us for a day filled with love, laughter, and celebration</p>
        </div>
      </section>

      <section className="schedule-content section">
        <div className="container">
          <div className="schedule-timeline">
            {scheduleItems.map((item, index) => (
              <div key={index} className="schedule-item" data-animate={index % 2 === 0 ? "fade-left" : "fade-right"} data-delay={index * 0.08}>
                <div className="schedule-time">
                  <span className="time-badge">{item.time}</span>
                </div>
                <div className="schedule-content">
                  <div className="event-icon">{item.icon}</div>
                  <div className="event-details">
                    <h3>{item.title}</h3>
                    <p className="event-description">{item.description}</p>
                    <p className="event-location">📍 {item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="schedule-notes">
            <h2 className="section-title" data-animate="fade-up">Important Notes</h2>
            <div className="notes-grid">
              <div className="note-card" data-animate="fade-up" data-delay="0.1">
                <div className="note-icon">⏰</div>
                <h3>Timing</h3>
                <p>
                  All times are approximate. We recommend arriving 15-30 minutes early
                  for key events to ensure you don't miss any special moments.
                </p>
              </div>
              <div className="note-card" data-animate="fade-up" data-delay="0.2">
                <div className="note-icon">📸</div>
                <h3>Photos</h3>
                <p>
                  Professional photography will be taken throughout the day.
                  We'll share all photos with guests after the wedding.
                </p>
              </div>
              <div className="note-card" data-animate="fade-up" data-delay="0.3">
                <div className="note-icon">🍷</div>
                <h3>Beverages</h3>
                <p>
                  An open bar will be available during cocktail hour and reception.
                  Non-alcoholic options will also be plentiful.
                </p>
              </div>
              <div className="note-card" data-animate="fade-up" data-delay="0.4">
                <div className="note-icon">🎵</div>
                <h3>Music</h3>
                <p>
                  Live music during ceremony and cocktail hour, followed by a DJ
                  playing your favorite hits all night long.
                </p>
              </div>
            </div>
          </div>

          <div className="day-highlights">
            <h2 className="section-title" data-animate="fade-up">Day Highlights</h2>
            <div className="highlights-container">
              <div className="highlight-item" data-animate="zoom-in" data-delay="0.1">
                <h3>🌅 Sunset Views</h3>
                <p>Don't miss the stunning sunset during cocktail hour</p>
              </div>
              <div className="highlight-item" data-animate="zoom-in" data-delay="0.2">
                <h3>🍝 Authentic Filipino Cuisine</h3>
                <p>Traditional Filipino dishes prepared by local chefs</p>
              </div>
              <div className="highlight-item" data-animate="zoom-in" data-delay="0.3">
                <h3>💫 Surprise Performances</h3>
                <p>Special entertainment throughout the evening</p>
              </div>
              <div className="highlight-item" data-animate="zoom-in" data-delay="0.4">
                <h3>🌟 Late Night Celebration</h3>
                <p>Party continues with Filipino street food and dancing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
