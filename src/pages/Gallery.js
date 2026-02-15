import React, { useState, useEffect, useCallback } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Gallery.css';

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  useScrollAnimation();

  const images = [
    { id: 1, src: '/moments-1.jpg', alt: 'Our beautiful moment together', span: 'wide' },
    { id: 2, src: '/moments-3.jpg', alt: 'A cherished memory', span: 'tall' },
    { id: 3, src: '/moments-4.jpg', alt: 'Love in every glance', span: 'tall' },
    { id: 4, src: '/moments-2.jpg', alt: 'Together is our favorite place', span: 'wide' },
    { id: 5, src: '/moments-5.jpg', alt: 'Forever starts here', span: 'tall' },
    { id: 6, src: '/moments-6.jpg', alt: 'Two hearts, one love', span: 'tall' },
    { id: 7, src: '/moments-12.jpg', alt: 'Our journey of love', span: 'wide' },
  ];

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const navigateImage = useCallback((direction) => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      if (direction === 'next') return (prev + 1) % images.length;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, navigateImage]);

  // Touch/swipe support for lightbox
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      navigateImage(diff > 0 ? 'next' : 'prev');
    }
    setTouchStart(null);
  };

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery">
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(30, 20, 10, 0.6), rgba(30, 20, 10, 0.7)), url(${process.env.PUBLIC_URL}/moments-1.jpg)` }}>
        <div className="container">
          <h1 data-animate="fade-up">Our Gallery</h1>
          <p data-animate="fade-up" data-delay="0.2">Moments from our journey together</p>
        </div>
      </section>

      <section className="gallery-content section">
        <div className="container">
          <div className="gallery-intro" data-animate="fade-up">
            <h2>Our Love Story in Pictures</h2>
            <p>
              Every photo tells a part of our story — the laughter, the love,
              and the beautiful moments that brought us to forever.
            </p>
          </div>

          <div className="gallery-masonry">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item ${image.span} ${imageLoaded[image.id] ? 'loaded' : ''}`}
                onClick={() => openLightbox(index)}
                data-animate="zoom-in"
                data-delay={index * 0.1}
              >
                <div className="gallery-image-wrapper">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <span className="view-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          <line x1="11" y1="8" x2="11" y2="14"/>
                          <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                      </span>
                      <p>{image.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-counter" data-animate="fade-up">
            <span className="counter-number">{images.length}</span>
            <span className="counter-text">Precious Moments</span>
          </div>

          <div className="gallery-note" data-animate="fade-up">
            <div className="note-content">
              <div className="note-icon">📸</div>
              <h3>Wedding Photos Coming Soon!</h3>
              <p>
                After our special day, we'll be adding all the beautiful wedding photos here.
                Check back after February 25, 2026 to see moments from our celebration!
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <button
              className="lightbox-nav prev"
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              aria-label="Previous"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="lightbox-image"
            />

            <button
              className="lightbox-nav next"
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              aria-label="Next"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <div className="lightbox-footer">
              <p className="lightbox-caption">{images[selectedIndex].alt}</p>
              <p className="lightbox-counter">{selectedIndex + 1} / {images.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
