import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [rsvps, setRsvps] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rsvps');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/admin/stats');
      const data = await response.json();

      if (data.success) {
        setRsvps(data.rsvps);
        setPhotos(data.photos);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin">
        <div className="loading">
          <h2>Loading Admin Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Wedding Admin Dashboard</h1>
        <p>Manage RSVPs and photo submissions</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total RSVPs</h3>
          <div className="stat-number">{rsvps.length}</div>
        </div>
        <div className="stat-card">
          <h3>Attending</h3>
          <div className="stat-number">
            {stats.find(s => s.attending === 'yes')?.count || 0}
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Guests</h3>
          <div className="stat-number">
            {stats.find(s => s.attending === 'yes')?.total_guests || 0}
          </div>
        </div>
        <div className="stat-card">
          <h3>Photos</h3>
          <div className="stat-number">{photos.length}</div>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'rsvps' ? 'active' : ''}`}
          onClick={() => setActiveTab('rsvps')}
        >
          RSVPs ({rsvps.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos ({photos.length})
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'rsvps' && (
          <div className="rsvps-section">
            <h2>RSVP Submissions</h2>
            {rsvps.length === 0 ? (
              <p>No RSVPs yet.</p>
            ) : (
              <div className="rsvps-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Guests</th>
                      <th>Meal</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((rsvp) => (
                      <tr key={rsvp.id}>
                        <td>{rsvp.full_name}</td>
                        <td>{rsvp.email || 'N/A'}</td>
                        <td>
                          <span className={`status ${rsvp.attending}`}>
                            {rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                          </span>
                        </td>
                        <td>{rsvp.number_of_guests}</td>
                        <td>{rsvp.meal_preference || 'N/A'}</td>
                        <td>{formatDate(rsvp.submitted_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="photos-section">
            <h2>Photo Submissions</h2>
            {photos.length === 0 ? (
              <p>No photos submitted yet.</p>
            ) : (
              <div className="photos-grid">
                {photos.map((photo) => (
                  <div key={photo.id} className="photo-card">
                    <img src={photo.url} alt={photo.caption} />
                    <div className="photo-info">
                      <h4>{photo.uploader}</h4>
                      <p>{photo.caption}</p>
                      <div className="photo-meta">
                        <span>❤️ {photo.likes}</span>
                        <span>{formatDate(photo.uploaded_at)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
