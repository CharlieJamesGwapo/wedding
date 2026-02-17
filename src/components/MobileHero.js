import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MobileHero.css';

const MobileHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section 
      ref={heroRef}
      className={`mobile-hero ${isLoaded ? 'loaded' : ''}`}
      style={{
        transform: `translateY(${parallaxOffset}px)`
      }}
    >
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1519225471986-9bb232d97d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Wedding background"
          loading="eager"
          decoding="async"
        />
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Shayne</span>
            <span className="title-ampersand">&</span>
            <span className="title-line">Mark</span>
          </h1>
          
          <h2 className="hero-subtitle">Are Getting Married</h2>
          
          <div className="hero-date">
            <span className="date-icon">📅</span>
            <span>February 25, 2026</span>
            <span className="date-separator">•</span>
            <span className="location-icon">📍</span>
            <span>Cagayan de Oro City, Philippines</span>
          </div>
        </div>
        
        <div className="hero-actions">
          <Link to="/wedding-details" className="hero-btn primary">
            <span className="btn-icon">📋</span>
            <span>Details</span>
          </Link>
          <Link to="/our-story" className="hero-btn secondary">
            <span className="btn-icon">💕</span>
            <span>Our Story</span>
          </Link>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-chevron">
            <span>↓</span>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>
      
      <div className="floating-elements">
        <div className="floating-heart heart-1">❤️</div>
        <div className="floating-heart heart-2">💕</div>
        <div className="floating-heart heart-3">💖</div>
        <div className="floating-sparkle sparkle-1">✨</div>
        <div className="floating-sparkle sparkle-2">⭐</div>
        <div className="floating-sparkle sparkle-3">💫</div>
      </div>
    </section>
  );
};

export default MobileHero;
