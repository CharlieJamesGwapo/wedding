import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519741497675-93ad6298aa8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Engagement photo 1',
      category: 'engagement'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1519225471986-9bb232d97d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Engagement photo 2',
      category: 'engagement'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Tuscany landscape',
      category: 'venue'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1509228468518-0dd793d4f4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Couple in Italy',
      category: 'engagement'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Romantic moment',
      category: 'engagement'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Mountain adventure',
      category: 'adventure'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Home together',
      category: 'life'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Portrait together',
      category: 'engagement'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1518391846010-8c3a5f2997c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Wine country',
      category: 'venue'
    }
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="gallery">
      <section className="hero-section">
        <div className="container">
          <h1>Our Gallery</h1>
          <p>Moments from our journey together</p>
        </div>
      </section>

      <section className="gallery-content section">
        <div className="container">
          <div className="gallery-intro">
            <h2>Our Love Story in Pictures</h2>
            <p>
              From our first meeting to our engagement, these photos capture the special moments 
              that have brought us to where we are today. We can't wait to add our wedding photos 
              to this collection!
            </p>
          </div>

          <div className="gallery-grid">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <span className="view-icon">🔍</span>
                    <p>Click to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-note">
            <div className="note-content">
              <h3>Wedding Photos Coming Soon!</h3>
              <p>
                After our special day, we'll be adding all the beautiful wedding photos here. 
                Check back after February 25, 2026 to see moments from our celebration in Cagayan de Oro!
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button 
              className="lightbox-nav prev" 
              onClick={() => navigateImage('prev')}
            >
              ‹
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="lightbox-image"
            />
            <button 
              className="lightbox-nav next" 
              onClick={() => navigateImage('next')}
            >
              ›
            </button>
            <div className="lightbox-info">
              <p>{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
