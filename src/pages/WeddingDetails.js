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

/* ===== WEDDING TIMELINE ICONS (hand-drawn sketch style) ===== */
const RingsIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    <ellipse cx="30" cy="42" rx="16" ry="16" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <ellipse cx="50" cy="42" rx="16" ry="16" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <path d="M25 28 Q28 22 32 28" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <circle cx="28.5" cy="24" r="2" fill="#2c2c2c" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    <rect x="12" y="28" width="56" height="36" rx="5" stroke="#2c2c2c" strokeWidth="2" />
    <circle cx="40" cy="46" r="11" stroke="#2c2c2c" strokeWidth="2" />
    <circle cx="40" cy="46" r="5" stroke="#2c2c2c" strokeWidth="1.5" />
    <path d="M28 28 L32 20 L48 20 L52 28" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <circle cx="57" cy="35" r="2.5" fill="#2c2c2c" />
    <path d="M36 46 Q38 42 42 44" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const GrazingIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    <ellipse cx="40" cy="50" rx="28" ry="10" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <path d="M20 50 Q20 44 40 44 Q60 44 60 50" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <circle cx="30" cy="40" r="4" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <circle cx="42" cy="38" r="5" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <circle cx="52" cy="42" r="3.5" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M34 32 Q36 24 38 32" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
    <path d="M46 30 Q48 22 50 30" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
    <path d="M25 38 Q24 32 28 36" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
  </svg>
);

const PlateIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    <circle cx="40" cy="44" r="22" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <circle cx="40" cy="44" r="14" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <circle cx="40" cy="44" r="4" stroke="#2c2c2c" strokeWidth="1" fill="none" />
    <path d="M14 36 L10 18" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 18 L10 18 L10 30" stroke="#2c2c2c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M66 36 L70 14" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M68 14 L72 14" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M68 18 L72 18" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M68 22 L72 22" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WineGlassIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    <path d="M22 16 L22 36 Q22 46 32 48 L32 60 L24 60" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M42 16 L42 36 Q42 46 32 48" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M22 30 Q32 34 42 30" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M38 16 L38 36 Q38 46 48 48 L48 60 L40 60" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M58 16 L58 36 Q58 46 48 48" stroke="#2c2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M38 30 Q48 34 58 30" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M24 60 L40 60" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 60 L56 60" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    {/* Clink sparkles */}
    <path d="M36 22 L40 18" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M34 18 L38 22" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const DanceIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    {/* Female figure */}
    <circle cx="30" cy="18" r="5" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <path d="M30 23 L30 42" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 42 L22 58" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 42 L38 58" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 30 L20 38" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 30 L42 26" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    {/* Dress hint */}
    <path d="M26 36 Q30 40 34 36" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
    {/* Male figure */}
    <circle cx="52" cy="18" r="5" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <path d="M52 23 L52 42" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 42 L44 58" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 42 L60 58" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 30 L42 26" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 30 L62 38" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
    {/* Music notes */}
    <path d="M16 14 Q14 10 18 12" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
    <path d="M64 14 Q62 10 66 12" stroke="#2c2c2c" strokeWidth="1.2" fill="none" />
  </svg>
);

const CakeCuttingIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    {/* Bottom tier */}
    <rect x="14" y="48" width="52" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    {/* Middle tier */}
    <rect x="20" y="34" width="40" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    {/* Top tier */}
    <rect x="28" y="20" width="24" height="14" rx="3" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    {/* Decorative dots */}
    <circle cx="24" cy="55" r="1.5" fill="#2c2c2c" />
    <circle cx="32" cy="55" r="1.5" fill="#2c2c2c" />
    <circle cx="40" cy="55" r="1.5" fill="#2c2c2c" />
    <circle cx="48" cy="55" r="1.5" fill="#2c2c2c" />
    <circle cx="56" cy="55" r="1.5" fill="#2c2c2c" />
    <circle cx="28" cy="41" r="1.5" fill="#2c2c2c" />
    <circle cx="36" cy="41" r="1.5" fill="#2c2c2c" />
    <circle cx="44" cy="41" r="1.5" fill="#2c2c2c" />
    <circle cx="52" cy="41" r="1.5" fill="#2c2c2c" />
    {/* Heart topper */}
    <path d="M37 18 C35 14, 30 14, 30 18 C30 22, 37 26, 37 26" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <path d="M37 18 C39 14, 44 14, 44 18 C44 22, 37 26, 37 26" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    {/* Candles */}
    <line x1="40" y1="20" x2="40" y2="14" stroke="#2c2c2c" strokeWidth="1.5" />
    <path d="M38 14 Q40 10 42 14" fill="#2c2c2c" />
  </svg>
);

const DiscoBallIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="timeline-icon-svg">
    <line x1="40" y1="8" x2="40" y2="20" stroke="#2c2c2c" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="20" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    {/* Grid lines */}
    <ellipse cx="40" cy="40" rx="20" ry="8" stroke="#2c2c2c" strokeWidth="1" fill="none" />
    <ellipse cx="40" cy="40" rx="20" ry="15" stroke="#2c2c2c" strokeWidth="0.8" fill="none" />
    <ellipse cx="40" cy="40" rx="8" ry="20" stroke="#2c2c2c" strokeWidth="1" fill="none" />
    <line x1="40" y1="20" x2="40" y2="60" stroke="#2c2c2c" strokeWidth="0.8" />
    {/* Sparkle rays */}
    <path d="M18 24 L14 20" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M62 24 L66 20" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M14 44 L8 44" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M66 44 L72 44" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M20 58 L16 62" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M60 58 L64 62" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
    {/* Small sparkles */}
    <circle cx="10" cy="16" r="1.5" fill="#2c2c2c" />
    <circle cx="70" cy="16" r="1.5" fill="#2c2c2c" />
    <circle cx="6" cy="50" r="1" fill="#2c2c2c" />
    <circle cx="74" cy="50" r="1" fill="#2c2c2c" />
  </svg>
);

const timelineEvents = [
  { time: '9:00AM', label: 'WEDDING', sublabel: 'CEREMONY', Icon: RingsIcon },
  { time: '11:00AM', label: 'PHOTO', sublabel: 'SHOOT', Icon: CameraIcon },
  { time: '12:00NN', label: 'GRAZING', sublabel: 'TABLE', Icon: GrazingIcon },
  { time: '1:00PM', label: 'WEDDING', sublabel: 'LUNCH', Icon: PlateIcon },
  { time: '2:00PM', label: 'WINE', sublabel: 'TOAST', Icon: WineGlassIcon },
  { time: '3:00PM', label: 'FIRST', sublabel: 'DANCE', Icon: DanceIcon },
  { time: '4:00PM', label: 'CAKE', sublabel: 'CUTTING', Icon: CakeCuttingIcon },
  { time: '5:00PM', label: 'PARTY', sublabel: 'TIME', Icon: DiscoBallIcon },
];

const WeddingTimeline = () => (
  <div className="wedding-timeline" data-animate="fade-up">
    <div className="timeline-header">
      <h2 className="timeline-title">
        <span className="timeline-title-script">Wedding</span>{' '}
        <span className="timeline-title-serif">Timeline</span>
      </h2>
    </div>
    <div className="timeline-grid">
      {timelineEvents.map((event, index) => (
        <div key={index} className="timeline-cell" data-animate="fade-up" data-delay={index * 0.08}>
          {/* Dash before icon (not on first of row) */}
          {index % 3 !== 0 && <div className="timeline-dash timeline-dash-left" />}
          <div className="timeline-event">
            <div className="timeline-icon-circle">
              <event.Icon />
            </div>
            <div className="timeline-event-time">{event.time}</div>
            <div className="timeline-event-label">{event.label}</div>
            <div className="timeline-event-sublabel">{event.sublabel}</div>
          </div>
          {/* Dash after icon (not on last of row) */}
          {index % 3 !== 2 && index !== timelineEvents.length - 1 && <div className="timeline-dash timeline-dash-right" />}
        </div>
      ))}
      {/* Signature cell */}
      <div className="timeline-cell timeline-signature-cell" data-animate="scale-in" data-delay="0.7">
        <div className="timeline-dash timeline-dash-left" />
        <div className="timeline-signature">
          <span className="timeline-sig-names">Mark &amp; Shayne</span>
          <span className="timeline-sig-date">02.25.2026</span>
        </div>
      </div>
    </div>
  </div>
);

/* Airplane icon SVG */
const AirplaneIcon = () => (
  <svg viewBox="0 0 24 24" className="airplane-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#2c2c2c" />
  </svg>
);

/* Gift box icon SVG */
const GiftIcon = () => (
  <svg viewBox="0 0 100 100" className="gift-svg" xmlns="http://www.w3.org/2000/svg">
    {/* Hearts floating above */}
    <path d="M35 15 C33 10, 27 10, 27 15 C27 20, 35 25, 35 25 C35 25, 43 20, 43 15 C43 10, 37 10, 35 15Z" fill="none" stroke="#999" strokeWidth="1.5" />
    <path d="M55 8 C53 4, 48 4, 48 8 C48 12, 55 16, 55 16 C55 16, 62 12, 62 8 C62 4, 57 4, 55 8Z" fill="none" stroke="#999" strokeWidth="1.5" />
    <path d="M65 20 C64 17, 60 17, 60 20 C60 23, 65 25, 65 25 C65 25, 70 23, 70 20 C70 17, 66 17, 65 20Z" fill="none" stroke="#999" strokeWidth="1.2" />
    {/* Ribbon bow */}
    <path d="M40 35 Q50 25 50 35 Q50 25 60 35" fill="none" stroke="#999" strokeWidth="2" />
    {/* Gift box lid */}
    <rect x="25" y="35" width="50" height="12" rx="2" fill="none" stroke="#999" strokeWidth="2" />
    {/* Gift box body */}
    <rect x="28" y="47" width="44" height="35" rx="2" fill="none" stroke="#999" strokeWidth="2" />
    {/* Vertical ribbon */}
    <line x1="50" y1="35" x2="50" y2="82" stroke="#999" strokeWidth="2" />
    {/* Horizontal ribbon */}
    <line x1="28" y1="62" x2="72" y2="62" stroke="#999" strokeWidth="2" />
  </svg>
);

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
      <section className="wd-hero">
        <div className="container">
          <h1 className="wd-hero-title">Wedding Details</h1>
          <div className="wd-hero-divider" />
          <p className="wd-hero-subtitle">February 25, 2026 &middot; Cagayan de Oro City</p>
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
        </div>
      </section>

      <section className="events-content section" data-animate="fade-up">
        <div className="container">
          <h2 className="wd-script-title">Our Wedding Day</h2>
          <div className="events-grid">
            <div className="event-card" data-animate="fade-left" data-delay="0.1">
              <div className="event-badge">Ceremony</div>
              <div className="event-header">
                <h3>The Holy Matrimony</h3>
                <span className="event-time">9:00 AM</span>
              </div>
              <div className="event-divider" />
              <div className="event-details">
                <div className="event-info">
                  <h4>Our Lady of Mount Carmel Parish Church</h4>
                  <p>J.V. Serina St. Carmen, CDO City</p>
                </div>
                <p className="event-note">Please arrive by 8:30 AM</p>
              </div>
              <div className="event-card-spacer" />
              <div className="event-actions">
                <CalendarDropdown type="ceremony" />
              </div>
            </div>

            <div className="event-card" data-animate="fade-right" data-delay="0.2">
              <div className="event-badge">Reception</div>
              <div className="event-header">
                <h3>The Celebration</h3>
                <span className="event-time">Following Ceremony</span>
              </div>
              <div className="event-divider" />
              <div className="event-details">
                <div className="event-info">
                  <h4>Somewhere by Casa de Canitoan</h4>
                  <p>Canitoan-Macapagal Drive, CDO City</p>
                </div>
                <p className="event-note">Dinner, drinks &amp; dancing</p>
              </div>
              <div className="event-card-spacer" />
              <div className="event-actions">
                <CalendarDropdown type="reception" />
              </div>
            </div>
          </div>

          <RetroCalendar />
        </div>
      </section>

      <section className="timeline-section section">
        <div className="container">
          <div className="ig-card" data-animate="scale-in">
            {/* Top bar */}
            <div className="ig-card-top">
              <svg width="24" height="6" viewBox="0 0 24 6" fill="none">
                <circle cx="3" cy="3" r="2.5" fill="#2c2c2c"/>
                <circle cx="12" cy="3" r="2.5" fill="#2c2c2c"/>
                <circle cx="21" cy="3" r="2.5" fill="#2c2c2c"/>
              </svg>
            </div>
            {/* Photo */}
            <div className="ig-card-photo">
              <img src="/moments-13.jpg" alt="Mark & Shayne" />
            </div>
            {/* Actions */}
            <div className="ig-card-actions">
              <div className="ig-card-icons">
                {/* Heart */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#ed4956" stroke="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                {/* Comment */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                {/* Share */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
              <div className="ig-card-bookmark">
                {/* Bookmark */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
              </div>
            </div>
            {/* Likes & comments */}
            <div className="ig-card-footer">
              <div className="ig-card-likes">104</div>
              <div className="ig-card-comments">Show all comments (17)</div>
            </div>
          </div>
          <WeddingTimeline />
        </div>
      </section>

      <section className="venue-section section">
        <div className="container">
          <h2 className="wd-script-title" data-animate="fade-up">Venue Information</h2>

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
                  href="https://www.google.com/maps/place/Our+Lady+of+Mt.+Carmel+Parish/@8.4808783,124.6268749,17z/data=!4m14!1m7!3m6!1s0x32fff33aa383813f:0xf1871b29410b7707!2sOur+Lady+of+Mt.+Carmel+Parish!8m2!3d8.4808783!4d124.6294498!16s%2Fg%2F1vcl196m!3m5!1s0x32fff33aa383813f:0xf1871b29410b7707!8m2!3d8.4808783!4d124.6294498!16s%2Fg%2F1vcl196m"
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
            <h3 className="wd-script-title" style={{ fontSize: '2rem' }}>Venue Locations</h3>
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Finer Details - matching invitation */}
      <section className="finer-details-section section">
        <div className="container">
          <h2 className="finer-details-title" data-animate="fade-up">Finer Details</h2>

          {/* ATTIRE */}
          <div className="attire-invitation" data-animate="fade-up" data-delay="0.1">
            <div className="attire-header-row">
              <h3 className="attire-title-typewriter">ATTIRE</h3>
              <div className="attire-dotted-line" />
              <AirplaneIcon />
            </div>

            <div className="attire-group-invitation" data-animate="fade-up" data-delay="0.15">
              <h4 className="attire-group-label">FOR NINONG & NINANG</h4>
              <div className="attire-group-content">
                <div className="attire-swatches">
                  <div className="swatch" style={{ background: '#8a8068' }} />
                  <div className="swatch" style={{ background: '#c8b99a' }} />
                  <div className="swatch" style={{ background: '#c9a96e' }} />
                </div>
                <p className="attire-description-text">
                  Barong Tagalog/ Long sleeves/ Filipiniana/ Formal Dress in shade of camel, brown, & tan colors.
                </p>
              </div>
            </div>

            <div className="attire-group-invitation" data-animate="fade-up" data-delay="0.2">
              <h4 className="attire-group-label">FOR GUESTS</h4>
              <div className="attire-group-content">
                <div className="attire-swatches">
                  <div className="swatch" style={{ background: '#4a4a4a' }} />
                  <div className="swatch" style={{ background: '#808080' }} />
                  <div className="swatch" style={{ background: '#b0b0b0' }} />
                </div>
                <p className="attire-description-text">
                  Formal attire in shade of gray.<br />
                  *No jeans and no white color, please.
                </p>
              </div>
            </div>
          </div>

          {/* GIFT GUIDE */}
          <div className="gift-guide-invitation" data-animate="fade-up" data-delay="0.25">
            <h3 className="gift-title-typewriter">GIFT GUIDE</h3>
            <div className="gift-guide-content">
              <GiftIcon />
              <p className="gift-guide-text">
                There is nothing more precious than the honor of your presence and fervent prayers. But if we are honored to receive a gift from you, may we humbly request a monetary gift as we begin our new life together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="special-notes-section section">
        <div className="container">
          <h2 className="wd-script-title" data-animate="fade-up">Special Notes</h2>
          <div className="notes-grid">
            <div className="note-card" data-animate="fade-up" data-delay="0.1">
              <h3 className="note-card-title">CHILDREN</h3>
              <div className="note-card-divider" />
              <p className="note-card-question">Can we bring our kids to the wedding?</p>
              <p className="note-card-answer">As much as we love your little ones, we are only able to accommodate children who are part of the wedding or those specifically invited.</p>
            </div>

            <div className="note-card" data-animate="fade-up" data-delay="0.2">
              <h3 className="note-card-title">PLUS ONE</h3>
              <div className="note-card-divider" />
              <p className="note-card-question">Can I bring a plus one?</p>
              <p className="note-card-answer">Due to limited space, we can only accommodate guests named on the invitation.</p>
              <p className="note-card-closing">Thank you for understanding, and we can't wait to celebrate it with you.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WeddingDetails;
