const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { Pool } = require('pg');

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const query = async (text, params) => {
  const res = await pool.query(text, params);
  return res;
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Wedding API is running', timestamp: new Date().toISOString() });
});

// ====== PHOTOS ======
app.post('/api/photos', async (req, res) => {
  try {
    const { uploaderName, caption, imageData } = req.body;
    if (!uploaderName || !imageData) {
      return res.status(400).json({ success: false, message: 'Uploader name and image are required' });
    }

    const uploadResult = await cloudinary.uploader.upload(imageData, {
      folder: 'wedding-photos',
      transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
    });

    const imageUrl = uploadResult.secure_url;
    const result = await query(
      `INSERT INTO photos (uploader_name, caption, image_url, image_data, file_size, file_type, approved)
       VALUES ($1, $2, $3, NULL, $4, $5, TRUE) RETURNING *`,
      [uploaderName, caption || null, imageUrl, uploadResult.bytes || null, uploadResult.format || null]
    );
    const photo = result.rows[0];

    res.json({
      success: true,
      message: 'Photo uploaded successfully!',
      photo: { id: photo.id, uploaderName: photo.uploader_name, caption: photo.caption, uploadedAt: photo.uploaded_at }
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({ success: false, message: 'Error uploading photo. Please try again.' });
  }
});

app.get('/api/photos', async (req, res) => {
  try {
    const approvedOnly = req.query.approved !== 'false';
    const text = approvedOnly
      ? 'SELECT * FROM photos WHERE approved = TRUE ORDER BY uploaded_at DESC'
      : 'SELECT * FROM photos ORDER BY uploaded_at DESC';
    const result = await query(text);

    const photos = result.rows.map(photo => ({
      id: photo.id,
      url: photo.image_url || photo.image_data,
      uploader: photo.uploader_name,
      caption: photo.caption || 'Beautiful moment!',
      timestamp: new Date(photo.uploaded_at).toLocaleString(),
      likes: photo.likes
    }));

    res.json({ success: true, photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ success: false, message: 'Error fetching photos' });
  }
});

app.post('/api/photos/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('UPDATE photos SET likes = likes + 1 WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Photo not found' });
    res.json({ success: true, likes: result.rows[0].likes });
  } catch (error) {
    console.error('Error liking photo:', error);
    res.status(500).json({ success: false, message: 'Error liking photo' });
  }
});

// ====== RSVP ======
app.post('/api/rsvp', async (req, res) => {
  try {
    const { fullName, email, attending, numberOfGuests, mealPreference, dietaryRestrictions, message } = req.body;
    if (!fullName || !attending) {
      return res.status(400).json({ success: false, message: 'Full name and attendance status are required' });
    }
    if (attending === 'yes' && (!numberOfGuests || !mealPreference)) {
      return res.status(400).json({ success: false, message: 'Number of guests and meal preference are required for attending guests' });
    }

    const result = await query(
      `INSERT INTO rsvps (full_name, email, attending, number_of_guests, meal_preference, dietary_restrictions, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [fullName, email || null, attending, attending === 'yes' ? numberOfGuests : 0, attending === 'yes' ? mealPreference : null, dietaryRestrictions || null, message || null]
    );
    const row = result.rows[0];

    res.json({
      success: true,
      message: 'RSVP submitted successfully!',
      rsvp: { fullName: row.full_name, attending: row.attending, submittedAt: row.submitted_at }
    });
  } catch (error) {
    console.error('RSVP submission error:', error);
    res.status(500).json({ success: false, message: 'Error submitting RSVP. Please try again.' });
  }
});

app.get('/api/rsvps', async (req, res) => {
  try {
    const result = await query('SELECT * FROM rsvps ORDER BY submitted_at DESC');
    res.json({ success: true, rsvps: result.rows });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    res.status(500).json({ success: false, message: 'Error fetching RSVPs' });
  }
});

app.get('/api/rsvp-stats', async (req, res) => {
  try {
    const result = await query(`SELECT attending, COUNT(*) as count, SUM(number_of_guests) as total_guests FROM rsvps GROUP BY attending`);
    res.json({ success: true, stats: result.rows });
  } catch (error) {
    console.error('Error fetching RSVP stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching RSVP statistics' });
  }
});

// ====== GUESTBOOK ======
app.get('/api/guestbook', async (req, res) => {
  try {
    const result = await query('SELECT * FROM guestbook_wishes ORDER BY created_at DESC');
    const wishes = result.rows.map(wish => ({
      id: wish.id, name: wish.name, relationship: wish.relationship || '',
      message: wish.message, featured: wish.featured, date: wish.created_at
    }));
    res.json({ success: true, wishes });
  } catch (error) {
    console.error('Error fetching guestbook wishes:', error);
    res.status(500).json({ success: false, message: 'Error fetching guestbook wishes' });
  }
});

app.post('/api/guestbook', async (req, res) => {
  try {
    const { name, relationship, message } = req.body;
    if (!name || !message) return res.status(400).json({ success: false, message: 'Name and message are required' });

    const result = await query(
      `INSERT INTO guestbook_wishes (name, relationship, message) VALUES ($1, $2, $3) RETURNING *`,
      [name, relationship || null, message]
    );
    const wish = result.rows[0];

    res.json({
      success: true,
      message: 'Wish submitted successfully!',
      wish: { id: wish.id, name: wish.name, relationship: wish.relationship || '', message: wish.message, featured: wish.featured, date: wish.created_at }
    });
  } catch (error) {
    console.error('Guestbook submission error:', error);
    res.status(500).json({ success: false, message: 'Error submitting wish. Please try again.' });
  }
});

// ====== ADMIN ======
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [rsvpsResult, photosResult, statsResult] = await Promise.all([
      query('SELECT * FROM rsvps ORDER BY submitted_at DESC'),
      query('SELECT * FROM photos ORDER BY uploaded_at DESC'),
      query(`SELECT attending, COUNT(*) as count, SUM(number_of_guests) as total_guests FROM rsvps GROUP BY attending`)
    ]);
    res.json({ success: true, rsvps: rsvpsResult.rows, photos: photosResult.rows, stats: statsResult.rows });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ success: false, message: 'Error fetching admin data' });
  }
});

module.exports = app;
