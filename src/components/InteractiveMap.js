import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';

// Fix Leaflet default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

// Custom gold marker icon
const goldIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div class="marker-pin"><svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.716 23.284 0 15 0z" fill="#d4af37"/><circle cx="15" cy="14" r="6" fill="white"/></svg></div>',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -42],
});

const venues = [
  {
    id: 'ceremony',
    name: 'Our Lady of Mount Carmel Parish Church',
    type: 'Ceremony',
    time: '9:00 AM',
    address: 'J.V. Serina St. Carmen, CDO City',
    position: [8.4684, 124.6335],
    googleMapsUrl: 'https://www.google.com/maps/search/Our+Lady+of+Mount+Carmel+Parish+Church+J.V.+Serina+St.+Carmen+CDO+City',
    wazeUrl: 'https://www.waze.com/ul?ll=8.4684,124.6335&navigate=yes',
  },
  {
    id: 'reception',
    name: 'Somewhere by Casa de Canitoan',
    type: 'Reception',
    time: 'Following Ceremony',
    address: 'Canitoan-Macapagal Drive, CDO City',
    position: [8.4936, 124.6575],
    googleMapsUrl: 'https://www.google.com/maps/search/Somewhere+by+Casa+de+Canitoan+Canitoan-Macapagal+Drive+CDO+City',
    wazeUrl: 'https://www.waze.com/ul?ll=8.4936,124.6575&navigate=yes',
  },
];

const FlyToVenue = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 15, { duration: 1.2 });
  }
  return null;
};

const InteractiveMap = () => {
  const center = [8.48, 124.645];
  const [flyTo, setFlyTo] = useState(null);

  return (
    <div className="interactive-map-wrapper">
      <div className="map-legend">
        {venues.map(venue => (
          <button
            key={venue.id}
            className="legend-item"
            onClick={() => setFlyTo(venue.position)}
          >
            <div className="legend-marker" />
            <div className="legend-text">
              <strong>{venue.type}</strong>
              <span>{venue.name}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="interactive-map-container">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Tiles &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {flyTo && <FlyToVenue position={flyTo} />}
          {venues.map(venue => (
            <Marker key={venue.id} position={venue.position} icon={goldIcon}>
              <Popup className="venue-popup">
                <div className="popup-content">
                  <span className="popup-type">{venue.type}</span>
                  <h3 className="popup-name">{venue.name}</h3>
                  <p className="popup-address">{venue.address}</p>
                  <p className="popup-time">{venue.time}</p>
                  <div className="popup-actions">
                    <a href={venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="popup-btn google">
                      Google Maps
                    </a>
                    <a href={venue.wazeUrl} target="_blank" rel="noopener noreferrer" className="popup-btn waze">
                      Waze
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
