import React, { useEffect, useState, useRef, useCallback } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './WeddingDetails.css';

const eventDetails = {
  ceremony: {
    title: 'Shayne & Mark Wedding Ceremony',
    date: '20260225T010000Z',
    endDate: '20260225T030000Z',
    location: 'Our Lady of Mount Carmel Parish Church, J.V. Serina St. Carmen, CDO City',
    description: 'Wedding Ceremony of Shayne & Mark'
  },
  reception: {
    title: 'Shayne & Mark Wedding Reception',
    date: '20260225T040000Z',
    endDate: '20260225T100000Z',
    location: 'Somewhere by Casa de Canitoan, Canitoan-Macapagal Drive, CDO City',
    description: 'Wedding Reception of Shayne & Mark'
  }
};

const generateICS = (details) => {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shayne & Mark Wedding//EN',
    'BEGIN:VEVENT',
    `DTSTART:${details.date}`,
    `DTEND:${details.endDate}`,
    `SUMMARY:${details.title}`,
    `DESCRIPTION:${details.description}`,
    `LOCATION:${details.location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  return ics;
};

const downloadICS = (details) => {
  const ics = generateICS(details);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${details.title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const CalendarDropdown = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const details = eventDetails[type];

  const closeDropdown = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, [closeDropdown]);

  const handleGoogle = () => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(details.title)}&dates=${details.date}/${details.endDate}&details=${encodeURIComponent(details.description)}&location=${encodeURIComponent(details.location)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleOutlook = () => {
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(details.title)}&startdt=${details.date}&enddt=${details.endDate}&body=${encodeURIComponent(details.description)}&location=${encodeURIComponent(details.location)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleApple = () => {
    downloadICS(details);
    setIsOpen(false);
  };

  return (
    <div className="calendar-dropdown-wrapper" ref={dropdownRef}>
      <button
        className="btn btn-primary calendar-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add to Calendar
        <span className={`calendar-arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
      </button>
      <div className={`calendar-dropdown ${isOpen ? 'calendar-dropdown-open' : ''}`}>
        <button className="calendar-option" onClick={handleGoogle}>
          <span className="calendar-option-icon google-icon">G</span>
          <span className="calendar-option-text">Google Calendar</span>
        </button>
        <button className="calendar-option" onClick={handleApple}>
          <span className="calendar-option-icon apple-icon">iCal</span>
          <span className="calendar-option-text">Apple Calendar</span>
        </button>
        <button className="calendar-option" onClick={handleOutlook}>
          <span className="calendar-option-icon outlook-icon">O</span>
          <span className="calendar-option-text">Outlook</span>
        </button>
        <button className="calendar-option" onClick={handleApple}>
          <span className="calendar-option-icon ics-icon">.ics</span>
          <span className="calendar-option-text">Download File</span>
        </button>
      </div>
    </div>
  );
};

const RetroCalendar = () => {
  const weddingDay = 25;
  const daysInFeb = 28;
  // Feb 2026 starts on Sunday (0)
  const firstDayOfWeek = 0;
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={`blank-${i}`} className="retro-cal-day retro-cal-blank" />
  ));

  const days = Array.from({ length: daysInFeb }, (_, i) => {
    const day = i + 1;
    const isWedding = day === weddingDay;
    return (
      <div
        key={day}
        className={`retro-cal-day ${isWedding ? 'retro-cal-wedding-day' : ''}`}
      >
        <span>{day}</span>
      </div>
    );
  });

  return (
    <div className="retro-calendar" data-animate="scale-in" data-delay="0.3">
      <div className="retro-cal-header">
        <span className="retro-cal-month">February</span>
        <span className="retro-cal-year">2026</span>
      </div>
      <div className="retro-cal-subheader">
        Save the Date
      </div>
      <div className="retro-cal-grid">
        {dayNames.map(d => (
          <div key={d} className="retro-cal-dayname">{d}</div>
        ))}
        {blanks}
        {days}
      </div>
      <div className="retro-cal-footer">
        <span className="retro-cal-event-label">Wedding Day</span>
        <span className="retro-cal-event-date">February 25, 2026 &middot; 9:00 AM</span>
      </div>
    </div>
  );
};

const WeddingDetails = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useScrollAnimation();

  useEffect(() => {
    const weddingDate = new Date('2026-02-25T09:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="wedding-details">
      <section className="hero-section">
        <div className="container">
          <h1>Wedding Details</h1>
          <p>All the information you need for our special day</p>
        </div>
      </section>

      <section className="countdown-section" data-animate="fade-up">
        <div className="container">
          <h2 className="countdown-title">Until We Say I Do</h2>
          <div className="countdown-grid">
            <div className="countdown-card" data-animate="scale-in" data-delay="0.1">
              <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-unit">Days</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-card" data-animate="scale-in" data-delay="0.2">
              <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-unit">Hours</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-card" data-animate="scale-in" data-delay="0.3">
              <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-unit">Minutes</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-card" data-animate="scale-in" data-delay="0.4">
              <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-unit">Seconds</span>
            </div>
          </div>
          <p className="countdown-subtitle">Every moment brings us closer to forever</p>
          <p className="countdown-date">February 25, 2026</p>
        </div>
      </section>

      <section className="events-content section" data-animate="fade-up">
        <div className="container">
          <h2 className="section-title">Wedding Events</h2>
          <div className="events-grid">
            <div className="event-card" data-animate="fade-left" data-delay="0.1">
              <div className="event-header">
                <h3>Ceremony</h3>
                <span className="event-time">9:00 AM</span>
              </div>
              <div className="event-details">
                <div className="event-info">
                  <h4>Our Lady of Mount Carmel Parish Church</h4>
                  <p>J.V. Serina St. Carmen, CDO City</p>
                </div>
                <div className="event-actions">
                  <CalendarDropdown type="ceremony" />
                </div>
              </div>
              <RetroCalendar />
            </div>

            <div className="event-card" data-animate="fade-right" data-delay="0.2">
              <div className="event-header">
                <h3>Reception</h3>
                <span className="event-time">Following Ceremony</span>
              </div>
              <div className="event-details">
                <div className="event-info">
                  <h4>Somewhere by Casa de Canitoan</h4>
                  <p>Canitoan-Macapagal Drive, CDO City</p>
                </div>
              </div>
              <div className="reception-details-list">
                <div className="reception-detail-item" data-animate="fade-up" data-delay="0.3">
                  <span className="reception-detail-label">Dinner & Celebration</span>
                  <span className="reception-detail-value">Following the ceremony</span>
                </div>
                <div className="reception-detail-item" data-animate="fade-up" data-delay="0.4">
                  <span className="reception-detail-label">Dress Code</span>
                  <span className="reception-detail-value">Semi-formal attire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="venue-section section">
        <div className="container">
          <h2 className="section-title" data-animate="fade-up">Venue Information</h2>

          <div className="venue-cards-grid">
            <div className="venue-detail-card" data-animate="fade-left" data-delay="0.1">
              <div className="venue-detail-card-accent" />
              <div className="venue-detail-card-badge">Ceremony</div>
              <h3 className="venue-detail-card-name">Our Lady of Mount Carmel Parish Church</h3>
              <div className="venue-detail-card-row">
                <div>
                  <p className="venue-detail-card-label">Address</p>
                  <p className="venue-detail-card-value">J.V. Serina St. Carmen, CDO City</p>
                </div>
              </div>
              <div className="venue-detail-card-row">
                <div>
                  <p className="venue-detail-card-label">Arrival Time</p>
                  <p className="venue-detail-card-value">Please arrive by 8:30 AM</p>
                  <p className="venue-detail-card-value">Ceremony begins at 9:00 AM</p>
                </div>
              </div>
              <div className="venue-detail-card-row">
                <div>
                  <p className="venue-detail-card-label">Dress Code</p>
                  <p className="venue-detail-card-value">Semi-formal attire</p>
                </div>
              </div>
              <div className="venue-detail-card-actions">
                <a
                  href="https://www.google.com/maps/search/Our+Lady+of+Mount+Carmel+Parish+Church+J.V.+Serina+St.+Carmen+CDO+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="venue-action-btn venue-action-primary"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="venue-detail-card" data-animate="fade-right" data-delay="0.2">
              <div className="venue-detail-card-accent" />
              <div className="venue-detail-card-badge">Reception</div>
              <h3 className="venue-detail-card-name">Somewhere by Casa de Canitoan</h3>
              <div className="venue-detail-card-row">
                <div>
                  <p className="venue-detail-card-label">Address</p>
                  <p className="venue-detail-card-value">Canitoan-Macapagal Drive, CDO City</p>
                </div>
              </div>
              <div className="venue-detail-card-row">
                <div>
                  <p className="venue-detail-card-label">Time</p>
                  <p className="venue-detail-card-value">Following Ceremony</p>
                </div>
              </div>
              <div className="venue-detail-card-row">
                <div>
                  <p className="venue-detail-card-label">Celebration</p>
                  <p className="venue-detail-card-value">Dinner, drinks & dancing</p>
                </div>
              </div>
              <div className="venue-detail-card-actions">
                <a
                  href="https://www.google.com/maps/search/Somewhere+by+Casa+de+Canitoan+Canitoan-Macapagal+Drive+CDO+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="venue-action-btn venue-action-primary"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          <div className="venue-map-full" data-animate="fade-up" data-delay="0.3">
            <h3 className="venue-map-title">Venue Locations</h3>
            <InteractiveMap />
          </div>
        </div>
      </section>

      <section className="attire-section section">
        <div className="container">
          <h2 className="section-title" data-animate="fade-up">Attire</h2>
          <div className="attire-content">
            <div className="attire-group" data-animate="fade-left" data-delay="0.1">
              <div className="attire-card">
                <div className="attire-header">
                  <h3>Principal Sponsors</h3>
                </div>
                <div className="attire-details">
                  <p className="attire-type">Barong Tagalog/Long Sleeve and Long Gown/Filipiniana/Dress</p>
                  <p className="attire-description">in shades of neutral colors</p>
                </div>
              </div>
            </div>

            <div className="attire-group" data-animate="fade-right" data-delay="0.2">
              <div className="attire-card">
                <div className="attire-header">
                  <h3>Guests</h3>
                </div>
                <div className="attire-details">
                  <p className="attire-type">Formal attire in shades of gray</p>
                  <p className="attire-restriction">No jeans & no white color</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gifts-section section">
        <div className="container">
          <h2 className="section-title" data-animate="fade-up">Gifts</h2>
          <div className="gifts-content" data-animate="scale-in" data-delay="0.15">
            <div className="gift-card">
              <div className="gift-header">
                <h3>Your Presence is Our Greatest Gift</h3>
              </div>
              <div className="gift-details">
                <p className="gift-main">Your presence and prayers are all that we request</p>
                <p className="gift-secondary">but if you desire to give nonetheless, a monetary gift for our future is a delightful blessing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="special-notes-section section">
        <div className="container">
          <h2 className="section-title" data-animate="fade-up">Special Notes</h2>
          <div className="notes-grid">
            <div className="note-card" data-animate="fade-left" data-delay="0.1">
              <div className="note-header">
                <h3>Children</h3>
              </div>
              <div className="note-content">
                <p className="note-question">Can we bring our kids to the wedding?</p>
                <p className="note-answer">As much as we love your little ones, we are only able to accommodate children who are part of the wedding or those specifically invited.</p>
              </div>
            </div>

            <div className="note-card" data-animate="fade-right" data-delay="0.2">
              <div className="note-header">
                <h3>Plus One</h3>
              </div>
              <div className="note-content">
                <p className="note-question">Can I bring a plus one?</p>
                <p className="note-answer">Due to limited space, we can only accommodate guests named on the invitation.</p>
                <p className="note-closing">Thank you for understanding, and we can't wait to celebrate it with you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WeddingDetails;
