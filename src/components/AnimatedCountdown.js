import React, { useState, useEffect } from 'react';
import './AnimatedCountdown.css';

const AnimatedCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const weddingDate = new Date('February 25, 2026 09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', color: '#d4af37' },
    { value: timeLeft.hours, label: 'Hours', color: '#b8941f' },
    { value: timeLeft.minutes, label: 'Minutes', color: '#d4af37' },
    { value: timeLeft.seconds, label: 'Seconds', color: '#b8941f' }
  ];

  return (
    <div className="animated-countdown">
      <div className="countdown-title">
        <h2>Until We Say I Do</h2>
        <div className="decorative-line"></div>
      </div>
      <div className="countdown-circles">
        {timeUnits.map((unit, index) => (
          <div key={index} className="countdown-circle" style={{ '--circle-color': unit.color }}>
            <svg className="progress-ring" viewBox="0 0 120 120">
              <circle
                className="progress-ring__circle"
                stroke="#e0e0e0"
                strokeWidth="2"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
              />
              <circle
                className="progress-ring__circle progress-ring__circle--progress"
                stroke={unit.color}
                strokeWidth="2"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
                style={{
                  strokeDasharray: 326.73,
                  strokeDashoffset: 326.73 - (326.73 * unit.value) / (unit.label === 'Days' ? 365 : unit.label === 'Hours' ? 24 : 60)
                }}
              />
            </svg>
            <div className="countdown-number">
              <span className="number">{String(unit.value).padStart(2, '0')}</span>
              <span className="label">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="countdown-message">
        <p>Every moment brings us closer to forever</p>
        <div className="decorative-line"></div>
      </div>
    </div>
  );
};

export default AnimatedCountdown;
