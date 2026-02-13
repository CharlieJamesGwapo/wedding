import React from 'react';
import WeatherWidget from '../components/WeatherWidget';
import './WeddingDetails.css';

const WeddingDetails = () => {
  const handleAddToCalendar = (type) => {
    const eventDetails = {
      ceremony: {
        title: 'Shayne & Mark Wedding Ceremony',
        date: '20260214T160000Z',
        endDate: '20260214T170000Z',
        location: 'Our Lady of Mt. Carmel Parish, Cagayan de Oro City'
      },
      reception: {
        title: 'Shayne & Mark Wedding Reception',
        date: '20260214T180000Z',
        endDate: '20260214T230000Z',
        location: 'Carmen Hotel, Cagayan de Oro City'
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

      <section className="events-content section">
        <div className="container">
          <h2 className="section-title">Wedding Events</h2>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-header">
                <h3>Ceremony</h3>
                <span className="event-time">4:00 PM</span>
              </div>
              <div className="event-details">
                <div className="event-info">
                  <h4>Our Lady of Mt. Carmel Parish</h4>
                  <p>Carmen, Cagayan de Oro City</p>
                  <p>Misamis Oriental, Philippines</p>
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

            <div className="event-card">
              <div className="event-header">
                <h3>Reception</h3>
                <span className="event-time">6:00 PM</span>
              </div>
              <div className="event-details">
                <div className="event-info">
                  <h4>Carmen Hotel</h4>
                  <p>Cagayan de Oro City</p>
                  <p>Misamis Oriental, Philippines</p>
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
          <h2 className="section-title">Venue Information</h2>
          <div className="venue-content">
            <div className="venue-info">
              <h3>Ceremony Venue</h3>
              <h4>Our Lady of Mt. Carmel Parish</h4>
              <p>
                A beautiful and historic Catholic church in the heart of Cagayan de Oro City, 
                perfect for our sacred wedding ceremony. The church's stunning architecture 
                and spiritual atmosphere provide the perfect setting for exchanging our vows.
              </p>
              
              <div className="venue-details-grid">
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">📍</span>
                    <h5>Address</h5>
                  </div>
                  <p className="detail-content">Carmen, Cagayan de Oro City</p>
                  <p className="detail-content">Misamis Oriental, Philippines</p>
                </div>
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">⏰</span>
                    <h5>Arrival Time</h5>
                  </div>
                  <p className="detail-content">Please arrive by 3:30 PM</p>
                  <p className="detail-content">Ceremony begins at 4:00 PM</p>
                </div>
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">👔</span>
                    <h5>Dress Code</h5>
                  </div>
                  <p className="detail-content">Semi-formal attire</p>
                  <p className="detail-content">Please avoid casual wear</p>
                </div>
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">🚗</span>
                    <h5>Parking</h5>
                  </div>
                  <p className="detail-content">Limited parking available</p>
                  <p className="detail-content">Carpooling recommended</p>
                </div>
              </div>
            </div>
            
            <div className="map-section">
              <h3>Church Location</h3>
              <div className="map-container">
                <iframe
                  title="Our Lady of Mt. Carmel Parish Location"
                  src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Our+Lady+of+Mt.+Carmel+Parish,+Cagayan+de+Oro+City+(Our+Lady+of+Mt.+Carmel+Parish)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="map-actions">
                  <button 
                    className="btn btn-primary btn-map"
                    onClick={() => window.open('https://www.google.com/maps/place/Our+Lady+of+Mt.+Carmel+Parish/@8.4684423,124.6035427,14z/data=!4m10!1m2!2m1!1sCarmen+church!3m6!1s0x32fff33aa383813f:0xf1871b29410b7707!8m2!3d8.4808783!4d124.6294498!15sCg1DYXJtZW4gY2h1cmNoWg8iDWNhcm1lbiBjaHVyY2iSAQ9jYXRob2xpY19jaHVyY2iaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUktha3Q1YzJSM0VBReABAPoBBAgAECw', '_blank')}
                  >
                    <span className="btn-icon">🗺️</span>
                    Open in Google Maps
                  </button>
                  <button 
                    className="btn btn-secondary btn-map"
                    onClick={() => window.open('https://www.waze.com/ul?ll=8.4684423,124.6035427&navigate=yes', '_blank')}
                  >
                    <span className="btn-icon">🧭</span>
                    Get Directions (Waze)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reception-venue section">
        <div className="container">
          <h2 className="section-title">Reception Venue</h2>
          <div className="venue-content">
            <div className="venue-info">
              <h3>Carmen Hotel</h3>
              <p>
                Join us for an elegant reception at Carmen Hotel, where we'll celebrate 
                with dinner, dancing, and creating memories that will last a lifetime.
              </p>
              
              <div className="venue-details-grid">
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">📍</span>
                    <h5>Address</h5>
                  </div>
                  <p className="detail-content">Cagayan de Oro City</p>
                  <p className="detail-content">Misamis Oriental, Philippines</p>
                </div>
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">⏰</span>
                    <h5>Reception Time</h5>
                  </div>
                  <p className="detail-content">6:00 PM - 11:00 PM</p>
                  <p className="detail-content">Dinner served at 6:30 PM</p>
                </div>
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">🎵</span>
                    <h5>Entertainment</h5>
                  </div>
                  <p className="detail-content">Live music & DJ</p>
                  <p className="detail-content">Dancing until 11:00 PM</p>
                </div>
                <div className="venue-detail-item">
                  <div className="detail-header">
                    <span className="detail-icon">🏨</span>
                    <h5>Accommodations</h5>
                  </div>
                  <p className="detail-content">Hotel rooms available</p>
                  <p className="detail-content">Special wedding rate</p>
                </div>
              </div>
            </div>
            
            <div className="map-section">
              <h3>Hotel Location</h3>
              <div className="map-container">
                <iframe
                  title="Carmen Hotel Location"
                  src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Carmen+Hotel,+Cagayan+de+Oro+City+(Carmen+Hotel)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="map-actions">
                  <button 
                    className="btn btn-primary btn-map"
                    onClick={() => window.open('https://www.google.com/maps/search/Carmen+Hotel+Cagayan+de+Oro+City', '_blank')}
                  >
                    <span className="btn-icon">🗺️</span>
                    Open in Google Maps
                  </button>
                  <button 
                    className="btn btn-secondary btn-map"
                    onClick={() => window.open('https://www.waze.com/ul?ll=8.4684423,124.6035427&navigate=yes', '_blank')}
                  >
                    <span className="btn-icon">🧭</span>
                    Get Directions (Waze)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="transportation-section section">
        <div className="container">
          <h2 className="section-title">Transportation & Parking</h2>
          <div className="transport-options">
            <div className="transport-item">
              <div className="transport-icon">🚗</div>
              <div>
                <h4>Parking Information</h4>
                <p>Limited parking available at the church. Additional parking available at nearby establishments. Carpooling is highly recommended.</p>
              </div>
            </div>
            <div className="transport-item">
              <div className="transport-icon">🚌</div>
              <div>
                <h4>Shuttle Service</h4>
                <p>Complimentary shuttle service will be available from Carmen Hotel to the church and back. Schedule details will be provided closer to the date.</p>
              </div>
            </div>
            <div className="transport-item">
              <div className="transport-icon">✈️</div>
              <div>
                <h4>Airport Transportation</h4>
                <p>Laguindingan Airport (CGY) is approximately 30 minutes away. Taxi and ride-sharing services are readily available.</p>
              </div>
            </div>
            <div className="transport-item">
              <div className="transport-icon">🏨</div>
              <div>
                <h4>Hotel Accommodations</h4>
                <p>Special wedding rates available at Carmen Hotel and partner hotels. Contact us for accommodation assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="weather-section">
        <h2 className="section-title">Wedding Day Weather</h2>
        <WeatherWidget />
      </section>
    </div>
  );
};

export default WeddingDetails;
