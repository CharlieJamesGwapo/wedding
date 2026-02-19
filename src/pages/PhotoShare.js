import React, { useState, useRef, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './PhotoShare.css';

/* ===== NAUTICAL SVG ICONS ===== */
const CameraIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="ps-icon-svg">
    <rect x="12" y="28" width="56" height="36" rx="5" stroke="#2c2c2c" strokeWidth="2" />
    <circle cx="40" cy="46" r="11" stroke="#2c2c2c" strokeWidth="2" />
    <circle cx="40" cy="46" r="5" stroke="#2c2c2c" strokeWidth="1.5" />
    <path d="M28 28 L32 20 L48 20 L52 28" stroke="#2c2c2c" strokeWidth="2" fill="none" />
    <circle cx="57" cy="35" r="2.5" fill="#2c2c2c" />
    <path d="M36 46 Q38 42 42 44" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const InlineAirplane = () => (
  <svg viewBox="0 0 24 24" className="ps-inline-airplane" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#2c2c2c" />
  </svg>
);

const InlineAnchor = () => (
  <svg viewBox="0 0 24 24" className="ps-inline-anchor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="2" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <line x1="12" y1="7" x2="12" y2="20" stroke="#2c2c2c" strokeWidth="1.5" />
    <path d="M6 16 Q6 20 12 20 Q18 20 18 16" stroke="#2c2c2c" strokeWidth="1.5" fill="none" />
    <line x1="9" y1="10" x2="15" y2="10" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ps-heart-svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const PhotoShare = () => {
  useScrollAnimation();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/photos');
      const result = await response.json();
      setPhotos(result.success ? result.photos : []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSetFile(file);
  };

  const openCamera = () => { cameraInputRef.current?.click(); };
  const openFileSelector = () => { fileInputRef.current?.click(); };

  const validateAndSetFile = (file) => {
    setUploadError('');
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPG, PNG, GIF, or WebP)');
      return false;
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size must be less than 10MB');
      return false;
    }
    setSelectedFile(file);
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) { setUploadError('Please select a photo to upload'); return; }
    if (!uploaderName.trim()) { setUploadError('Please enter your name'); return; }
    if (uploaderName.trim().length < 2) { setUploadError('Name must be at least 2 characters long'); return; }

    setUploading(true);
    setUploadProgress(0);
    setUploadError('');

    try {
      // Convert file to base64
      setUploadProgress(10);
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(selectedFile);
      });

      setUploadProgress(30);

      // Upload to server (which uploads to Cloudinary)
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uploaderName: uploaderName.trim(),
          caption: caption.trim() || 'Beautiful moment!',
          imageData: base64String
        })
      });

      setUploadProgress(80);

      const result = await response.json();
      if (result.success) {
        setUploadProgress(100);
        await fetchPhotos();
        setSelectedFile(null);
        setCaption('');
        setUploaderName('');
        setShowUploadModal(false);
        setUploadProgress(0);
        setUploading(false);
        alert('Photo uploaded successfully! Thank you for sharing your memories.');
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Upload failed. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleLike = async (photoId) => {
    try {
      const response = await fetch(`/api/photos/${photoId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (result.success) {
        setPhotos(prev => prev.map(photo =>
          photo.id === photoId ? { ...photo, likes: result.likes } : photo
        ));
      }
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    document.body.style.overflow = 'hidden';
  };
  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setCaption('');
    setUploaderName('');
    setUploadError('');
    setUploadProgress(0);
    setDragActive(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="photo-share">
      {/* Hero */}
      <section className="ps-hero">
        <div className="container">
          <div className="ps-hero-icon" data-animate="pop-in">
            <CameraIcon />
          </div>
          <h1 className="ps-hero-title">Photo Share</h1>
          <div className="ps-hero-divider" />
          <p className="ps-hero-subtitle">Share Your Memories From Our Special Day</p>
        </div>
      </section>

      {/* Intro + Gallery */}
      <section className="ps-content section">
        <div className="container">
          {/* Retro typewriter header */}
          <div className="ps-section-header" data-animate="fade-up-blur">
            <InlineAnchor />
            <div className="ps-dotted-line" />
            <h2 className="ps-typewriter-title">WEDDING GALLERY</h2>
            <div className="ps-dotted-line" />
            <InlineAirplane />
          </div>

          <div className="ps-intro" data-animate="blur-in" data-delay="0.1">
            <h3 className="ps-intro-title">Our Captured Moments</h3>
            <div className="ps-intro-divider" />
            <p className="ps-intro-text">
              Capture and share the beautiful moments from our wedding celebration.
              Upload your favorite photos and help us create a comprehensive collection
              of memories that we'll cherish forever.
            </p>
            <button className="ps-upload-btn" onClick={openUploadModal} data-animate="bounce-in" data-delay="0.25">
              <CameraIcon />
              <span>Upload Photos</span>
            </button>
          </div>

          {loading ? (
            <div className="ps-loading" data-animate="fade-in">
              <div className="ps-loading-spinner" />
              <h3>Loading Photos...</h3>
              <p>Gathering beautiful memories from our wedding</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="ps-empty" data-animate="drift-up">
              <div className="ps-empty-icon">
                <CameraIcon />
              </div>
              <h3>No Photos Yet</h3>
              <p>Be the first to share memories from our special day!</p>
            </div>
          ) : (
            <div className="ps-grid">
              {photos.map((photo, index) => (
                <div key={photo.id} className="ps-card" data-animate="flip-up" data-delay={index * 0.1}>
                  <div className="ps-card-img">
                    <img src={photo.url} alt={photo.caption} />
                    <div className="ps-card-overlay">
                      <button
                        className="ps-like-btn"
                        onClick={() => handleLike(photo.id)}
                      >
                        <HeartIcon />
                        <span>{photo.likes}</span>
                      </button>
                    </div>
                  </div>
                  <div className="ps-card-body">
                    <div className="ps-card-header">
                      <span className="ps-card-uploader">{photo.uploader}</span>
                      <span className="ps-card-time">{photo.timestamp}</span>
                    </div>
                    <p className="ps-card-caption">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom wave */}
          <div className="ps-wave-decor" data-animate="fade-in" data-delay="0.3">
            <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10 Q15 4 30 10 Q45 16 60 10 Q75 4 90 10 Q105 16 120 10 Q135 4 150 10 Q165 16 180 10 Q195 4 210 10 Q225 16 240 10 Q255 4 270 10 Q285 16 300 10" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.4" />
            </svg>
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="ps-modal" onClick={closeUploadModal}>
          <div className="ps-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="ps-modal-close" onClick={closeUploadModal}>&times;</button>

            <div className="ps-modal-header">
              <div className="ps-modal-icon"><CameraIcon /></div>
              <h3>Share Your Photos</h3>
              <p>Help us capture every special moment</p>
            </div>

            <form onSubmit={handleUpload} className="ps-modal-form">
              <div className="ps-upload-area">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleCameraCapture} style={{ display: 'none' }} />

                {selectedFile ? (
                  <div className="ps-file-preview">
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
                    <div className="ps-file-info">
                      <p className="ps-file-name">{selectedFile.name}</p>
                      <p className="ps-file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button type="button" className="ps-remove-btn" onClick={() => setSelectedFile(null)}>Remove</button>
                  </div>
                ) : (
                  <div
                    className={`ps-dropzone ${dragActive ? 'ps-dropzone-active' : ''}`}
                    onClick={openFileSelector}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="ps-dropzone-icon"><CameraIcon /></div>
                    <h4>Click to upload or drag and drop</h4>
                    <p>PNG, JPG, GIF, WebP up to 10MB</p>
                    <div className="ps-dropzone-btns">
                      <button type="button" className="ps-dropzone-btn" onClick={(e) => { e.stopPropagation(); openFileSelector(); }}>
                        Choose File
                      </button>
                      <button type="button" className="ps-dropzone-btn" onClick={(e) => { e.stopPropagation(); openCamera(); }}>
                        Take Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="ps-form-group">
                <label htmlFor="uploaderName">Your Name *</label>
                <input type="text" id="uploaderName" value={uploaderName} onChange={(e) => setUploaderName(e.target.value)} required placeholder="Enter your name" />
              </div>

              <div className="ps-form-group">
                <label htmlFor="caption">Caption</label>
                <textarea id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} rows="3" placeholder="Describe this moment..." />
              </div>

              <div className="ps-guidelines">
                <h4>Photo Guidelines</h4>
                <ul>
                  <li>High-quality photos preferred</li>
                  <li>Focus on the couple and guests</li>
                  <li>Capture candid moments and emotions</li>
                  <li>Include venue and decoration details</li>
                </ul>
              </div>

              {uploadError && (
                <div className="ps-error">{uploadError}</div>
              )}

              {uploading && (
                <div className="ps-progress">
                  <div className="ps-progress-bar">
                    <div className="ps-progress-fill" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <p className="ps-progress-text">{uploadProgress}% uploaded...</p>
                </div>
              )}

              <div className="ps-form-actions">
                <button type="submit" className="ps-submit-btn" disabled={uploading || !selectedFile || !uploaderName.trim()}>
                  {uploading ? 'Uploading...' : 'Share Photo'}
                </button>
                <button type="button" className="ps-cancel-btn" onClick={closeUploadModal} disabled={uploading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoShare;
