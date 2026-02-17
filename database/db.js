const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool to the Neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Test database connection
pool.on('connect', () => {
  console.log('🗄️  Connected to Neon PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Helper function to execute queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('📊 Query executed', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('❌ Query error:', { text, error });
    throw error;
  }
};

// Database initialization function
const initializeDatabase = async () => {
  try {
    // Test the connection
    await query('SELECT NOW()');
    console.log('✅ Database connection successful');
    
    // You can run schema initialization here if needed
    console.log('🗄️  Database is ready to use');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

// RSVP functions
const rsvpModel = {
  // Create a new RSVP
  create: async (rsvpData) => {
    const {
      fullName,
      email,
      attending,
      numberOfGuests,
      mealPreference,
      dietaryRestrictions,
      message
    } = rsvpData;

    const text = `
      INSERT INTO rsvps (full_name, email, attending, number_of_guests, meal_preference, dietary_restrictions, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      fullName,
      email || null,
      attending,
      attending === 'yes' ? numberOfGuests : 0,
      attending === 'yes' ? mealPreference : null,
      dietaryRestrictions || null,
      message || null
    ];

    return await query(text, values);
  },

  // Get all RSVPs (for admin)
  getAll: async () => {
    const text = 'SELECT * FROM rsvps ORDER BY submitted_at DESC';
    return await query(text);
  },

  // Get RSVP by ID
  getById: async (id) => {
    const text = 'SELECT * FROM rsvps WHERE id = $1';
    return await query(text, [id]);
  },

  // Get RSVP statistics
  getStats: async () => {
    const text = `
      SELECT 
        attending,
        COUNT(*) as count,
        SUM(number_of_guests) as total_guests
      FROM rsvps 
      GROUP BY attending
    `;
    return await query(text);
  }
};

// Photo functions
const photoModel = {
  // Create a new photo
  create: async (photoData) => {
    const {
      uploaderName,
      caption,
      imageUrl,
      imageData,
      fileSize,
      fileType
    } = photoData;

    const text = `
      INSERT INTO photos (uploader_name, caption, image_url, image_data, file_size, file_type, approved)
      VALUES ($1, $2, $3, $4, $5, $6, TRUE)
      RETURNING *
    `;
    
    const values = [
      uploaderName,
      caption || null,
      imageUrl,
      imageData || null,
      fileSize || null,
      fileType || null
    ];

    return await query(text, values);
  },

  // Get all photos (with optional approval filter)
  getAll: async (approvedOnly = true) => {
    const text = approvedOnly 
      ? 'SELECT * FROM photos WHERE approved = TRUE ORDER BY uploaded_at DESC'
      : 'SELECT * FROM photos ORDER BY uploaded_at DESC';
    return await query(text);
  },

  // Get photo by ID
  getById: async (id) => {
    const text = 'SELECT * FROM photos WHERE id = $1';
    return await query(text, [id]);
  },

  // Like a photo
  like: async (id) => {
    const text = 'UPDATE photos SET likes = likes + 1 WHERE id = $1 RETURNING *';
    return await query(text, [id]);
  },

  // Approve a photo (for moderation)
  approve: async (id) => {
    const text = 'UPDATE photos SET approved = TRUE WHERE id = $1 RETURNING *';
    return await query(text, [id]);
  },

  // Delete a photo
  delete: async (id) => {
    const text = 'DELETE FROM photos WHERE id = $1';
    return await query(text, [id]);
  }
};

// Guestbook functions
const guestbookModel = {
  // Create a new wish
  create: async (wishData) => {
    const { name, relationship, message } = wishData;

    const text = `
      INSERT INTO guestbook_wishes (name, relationship, message)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [name, relationship || null, message];
    return await query(text, values);
  },

  // Get all wishes
  getAll: async () => {
    const text = 'SELECT * FROM guestbook_wishes ORDER BY created_at DESC';
    return await query(text);
  },

  // Get featured wishes
  getFeatured: async () => {
    const text = 'SELECT * FROM guestbook_wishes WHERE featured = TRUE ORDER BY created_at DESC';
    return await query(text);
  },

  // Toggle featured status
  toggleFeatured: async (id) => {
    const text = 'UPDATE guestbook_wishes SET featured = NOT featured WHERE id = $1 RETURNING *';
    return await query(text, [id]);
  },

  // Delete a wish
  delete: async (id) => {
    const text = 'DELETE FROM guestbook_wishes WHERE id = $1';
    return await query(text, [id]);
  }
};

module.exports = {
  pool,
  query,
  initializeDatabase,
  rsvpModel,
  photoModel,
  guestbookModel
};
