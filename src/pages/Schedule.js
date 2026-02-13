import React from 'react';
import './Schedule.css';

const Schedule = () => {
  const scheduleItems = [
    {
      time: '3:30 PM',
      title: 'Guest Arrival',
      description: 'Guests arrive, welcome drinks served',
      icon: '👋',
      location: 'Church Grounds'
    },
    {
      time: '4:00 PM',
      title: 'Ceremony',
      description: 'Wedding ceremony begins',
      icon: '💒',
      location: 'Our Lady of Mt. Carmel Parish'
    },
    {
      time: '5:00 PM',
      title: 'Cocktail Hour',
      description: 'Celebratory drinks and hors d\'oeuvres',
      icon: '🍹',
      location: 'Hotel Garden'
    },
    {
      time: '6:30 PM',
      title: 'Dinner',
      description: 'Three-course dinner service begins',
      icon: '🍽️',
      location: 'Carmen Hotel Ballroom'
    },
    {
      time: '8:00 PM',
      title: 'Dancing',
      description: 'Music, dancing, and celebration',
      icon: '💃',
      location: 'Grand Ballroom'
    },
    {
      time: '10:00 PM',
      title: 'Late Night Snacks',
      description: 'Filipino dessert station opens',
      icon: '🍕',
      location: 'Hotel Terrace'
    },
    {
      time: '11:00 PM',
      title: 'Cake Cutting',
      description: 'Wedding cake and desserts',
      icon: '🎂',
      location: 'Grand Ballroom'
    },
    {
      time: '12:00 AM',
      title: 'Grand Exit',
      description: 'Farewell celebration',
      icon: '✨',
      location: 'Main Entrance'
    }
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
              <div key={index} className="schedule-item">
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
            <h2 className="section-title">Important Notes</h2>
            <div className="notes-grid">
              <div className="note-card">
                <div className="note-icon">⏰</div>
                <h3>Timing</h3>
                <p>
                  All times are approximate. We recommend arriving 15-30 minutes early 
                  for key events to ensure you don't miss any special moments.
                </p>
              </div>
              <div className="note-card">
                <div className="note-icon">📸</div>
                <h3>Photos</h3>
                <p>
                  Professional photography will be taken throughout the day. 
                  We'll share all photos with guests after the wedding.
                </p>
              </div>
              <div className="note-card">
                <div className="note-icon">🍷</div>
                <h3>Beverages</h3>
                <p>
                  An open bar will be available during cocktail hour and reception. 
                  Non-alcoholic options will also be plentiful.
                </p>
              </div>
              <div className="note-card">
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
            <h2 className="section-title">Day Highlights</h2>
            <div className="highlights-container">
              <div className="highlight-item">
                <h3>🌅 Sunset Views</h3>
                <p>Don't miss the stunning sunset during cocktail hour</p>
              </div>
              <div className="highlight-item">
                <h3>🍝 Authentic Filipino Cuisine</h3>
                <p>Traditional Filipino dishes prepared by local chefs</p>
              </div>
              <div className="highlight-item">
                <h3>💫 Surprise Performances</h3>
                <p>Special entertainment throughout the evening</p>
              </div>
              <div className="highlight-item">
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
