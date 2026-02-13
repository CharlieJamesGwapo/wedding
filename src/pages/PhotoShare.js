import React, { useState, useRef, useEffect } from 'react';
import './PhotoShare.css';

const PhotoShare = () => {
  const [photos, setPhotos] = useState(() => {
    // Load photos from localStorage on initial render
    const savedPhotos = localStorage.getItem('weddingPhotos');
    if (savedPhotos) {
      try {
        return JSON.parse(savedPhotos);
      } catch (error) {
        console.error('Error loading photos from localStorage:', error);
      }
    }
    
    // Default photos if nothing is saved
    return [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1519741497675-93ad6298aa8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        uploader: 'Sarah Johnson',
        caption: 'Beautiful sunset at the venue!',
        timestamp: '2024-01-15 18:30',
        likes: 24
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1519225471986-9bb232d97d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        uploader: 'David Thompson',
        caption: 'The couple looks amazing together!',
        timestamp: '2024-01-16 14:22',
        likes: 18
      }
    ];
  });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [useCamera, setUseCamera] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Save photos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('weddingPhotos', JSON.stringify(photos));
  }, [photos]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
      setUseCamera(false);
    }
  };

  const openCamera = () => {
    setUseCamera(true);
    cameraInputRef.current?.click();
  };

  const openFileSelector = () => {
    setUseCamera(false);
    fileInputRef.current?.click();
  };

  const validateAndSetFile = (file) => {
    // Reset previous errors
    setUploadError('');
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPG, PNG, GIF, or WebP)');
      return false;
    }
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
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
    
    // Validation
    if (!selectedFile) {
      setUploadError('Please select a photo to upload');
      return;
    }
    
    if (!uploaderName.trim()) {
      setUploadError('Please enter your name');
      return;
    }
    
    if (uploaderName.trim().length < 2) {
      setUploadError('Name must be at least 2 characters long');
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    setUploadError('');
    
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }
      
      // Create a preview URL and convert to base64 for storage
      const photoUrl = URL.createObjectURL(selectedFile);
      
      // Convert file to base64 for persistent storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        
        const newPhoto = {
          id: Date.now(),
          url: base64String, // Store base64 instead of blob URL
          uploader: uploaderName.trim(),
          caption: caption.trim() || 'Beautiful moment!',
          timestamp: new Date().toLocaleString(),
          likes: 0
        };
        
        setPhotos(prev => [newPhoto, ...prev]);
        setSelectedFile(null);
        setCaption('');
        setUploaderName('');
        setShowUploadModal(false);
        setUploadProgress(0);
        setUploading(false);
        
        // Show success message
        alert('Photo uploaded successfully! Thank you for sharing your memories.');
      };
      
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Upload failed. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleLike = (photoId) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes: photo.likes + 1 }
        : photo
    ));
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setCaption('');
    setUploaderName('');
    setUploadError('');
    setUploadProgress(0);
    setDragActive(false);
    setUseCamera(false);
  };

  return (
    <div className="photo-share">
      <section className="hero-section">
        <div className="container">
          <h1>Photo Share</h1>
          <p>Share your memories from our special day</p>
        </div>
      </section>

      <section className="photo-content section">
        <div className="container">
          <div className="photo-intro">
            <h2>Our Wedding Gallery</h2>
            <p>
              Capture and share the beautiful moments from our wedding celebration. 
              Upload your favorite photos and help us create a comprehensive collection 
              of memories that we'll cherish forever.
            </p>
            <button className="btn btn-primary upload-btn" onClick={openUploadModal}>
              📸 Upload Photos
            </button>
          </div>

          <div className="photo-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-card">
                <div className="photo-container">
                  <img src={photo.url} alt={photo.caption} />
                  <div className="photo-overlay">
                    <button 
                      className="like-btn"
                      onClick={() => handleLike(photo.id)}
                    >
                      ❤️ {photo.likes}
                    </button>
                  </div>
                </div>
                <div className="photo-info">
                  <div className="photo-header">
                    <span className="uploader">{photo.uploader}</span>
                    <span className="timestamp">{photo.timestamp}</span>
                  </div>
                  <p className="caption">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {photos.length === 0 && (
            <div className="no-photos">
              <div className="no-photos-icon">📷</div>
              <h3>No Photos Yet</h3>
              <p>Be the first to share memories from our special day!</p>
            </div>
          )}
        </div>
      </section>

      {showUploadModal && (
        <div className="upload-modal" onClick={closeUploadModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeUploadModal}>×</button>
            <div className="modal-header">
              <h3>Share Your Photos</h3>
              <p>Help us capture every special moment</p>
            </div>
            
            <form onSubmit={handleUpload} className="upload-form">
              <div className="upload-area">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  style={{ display: 'none' }}
                />
                
                {selectedFile ? (
                  <div className="file-preview">
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                    />
                    <div className="file-info">
                      <p className="file-name">{selectedFile.name}</p>
                      <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button 
                      type="button" 
                      className="remove-file-btn"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div 
                    className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="drop-zone-content">
                      <span className="upload-icon">📸</span>
                      <h4>Click to upload or drag and drop</h4>
                      <p>PNG, JPG, GIF, WebP up to 10MB</p>
                      <div className="upload-buttons">
                        <button 
                          type="button" 
                          className="btn btn-outline btn-sm"
                          onClick={openFileSelector}
                        >
                          📁 Choose File
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-outline btn-sm"
                          onClick={openCamera}
                        >
                          📷 Take Photo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="uploaderName">Your Name *</label>
                <input
                  type="text"
                  id="uploaderName"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="caption">Caption</label>
                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows="3"
                  placeholder="Describe this moment..."
                ></textarea>
              </div>

              <div className="upload-guidelines">
                <h4>Photo Guidelines</h4>
                <ul>
                  <li>📸 High-quality photos preferred</li>
                  <li>👫 Focus on the couple and guests</li>
                  <li>🎉 Capture candid moments and emotions</li>
                  <li>📍 Include venue and decoration details</li>
                </ul>
              </div>

              {uploadError && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {uploadError}
                </div>
              )}

              {uploading && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">{uploadProgress}% uploaded...</p>
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={uploading || !selectedFile || !uploaderName.trim()}
                >
                  {uploading ? 'Uploading...' : 'Share Photo'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={closeUploadModal}
                  disabled={uploading}
                >
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
