import React, { useEffect, useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './WeddingDetails.css';

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

  const handleAddToCalendar = (type) => {
    const eventDetails = {
      ceremony: {
        title: 'Shayne & Mark Wedding Ceremony',
        date: '20260225T010000Z',
        endDate: '20260225T030000Z',
        location: 'Our Lady of Mount Carmel Parish Church, J.V. Serina St. Carmen, CDO City'
      },
      reception: {
        title: 'Shayne & Mark Wedding Reception',
        date: '20260225T040000Z',
        endDate: '20260225T100000Z',
        location: 'Somewhere by Casa de Canitoan, Canitoan-Macapagal Drive, CDO City'
      }
    };

    const details = eventDetails[type];
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(details.title)}&dates=${details.date}/${details.endDate}&details=${encodeURIComponent(`Location: ${details.location}`)}&location=${encodeURIComponent(details.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

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
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCalendar('ceremony')}
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
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
                <div className="event-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCalendar('reception')}
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="venue-section section">
        <div className="container">
          <h2 className="section-title" data-animate="fade-up">Venue Information</h2>
          <div className="venue-content">
            <div className="venue-info" data-animate="fade-left">
              <h3>Ceremony Venue</h3>
              <h4>Our Lady of Mount Carmel Parish Church</h4>
              <p>
                A beautiful and historic Catholic church located at J.V. Serina St. Carmen, CDO City.
                The perfect sacred setting for exchanging our wedding vows.
              </p>

              <div className="venue-details-cards">
                <div className="venue-card">
                  <div className="venue-card-content">
                    <h4>Address</h4>
                    <p>J.V. Serina St. Carmen</p>
                    <p>CDO City</p>
                  </div>
                </div>

                <div className="venue-card">
                  <div className="venue-card-content">
                    <h4>Arrival Time</h4>
                    <p>Please arrive by 8:30 AM</p>
                    <p>Ceremony begins at 9:00 AM</p>
                  </div>
                </div>

                <div className="venue-card">
                  <div className="venue-card-content">
                    <h4>Dress Code</h4>
                    <p>Semi-formal attire</p>
                    <p>Please avoid casual wear</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-section" data-animate="fade-right">
              <h3>Venue Locations</h3>
              <InteractiveMap />
            </div>
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
                  <span className="attire-icon"></span>
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
                  <span className="attire-icon"></span>
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
                <span className="gift-icon"></span>
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
                <span className="note-icon"></span>
                <h3>Children</h3>
              </div>
              <div className="note-content">
                <p className="note-question">Can we bring our kids to the wedding?</p>
                <p className="note-answer">As much as we love your little ones, we are only able to accommodate children who are part of the wedding or those specifically invited.</p>
              </div>
            </div>

            <div className="note-card" data-animate="fade-right" data-delay="0.2">
              <div className="note-header">
                <span className="note-icon"></span>
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
