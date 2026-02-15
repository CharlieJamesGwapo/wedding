require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { initializeDatabase, rsvpModel, photoModel } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'build')));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'wedding@shayneandmark.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Initialize database connection
initializeDatabase();

// RSVP endpoint
app.post('/api/rsvp', async (req, res) => {
  try {
    const {
      fullName,
      email,
      attending,
      numberOfGuests,
      mealPreference,
      dietaryRestrictions,
      message
    } = req.body;

    // Validate required fields
    if (!fullName || !attending) {
      return res.status(400).json({ 
        success: false, 
        message: 'Full name and attendance status are required' 
      });
    }

    if (attending === 'yes' && (!numberOfGuests || !mealPreference)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Number of guests and meal preference are required for attending guests' 
      });
    }

    // Create RSVP entry in database
    const result = await rsvpModel.create({
      fullName,
      email,
      attending,
      numberOfGuests,
      mealPreference,
      dietaryRestrictions,
      message
    });
    
    const row = result.rows[0];

    // Map snake_case DB columns to camelCase for use in email functions
    const rsvp = {
      fullName: row.full_name,
      email: row.email,
      attending: row.attending,
      numberOfGuests: row.number_of_guests,
      mealPreference: row.meal_preference,
      dietaryRestrictions: row.dietary_restrictions,
      message: row.message,
      submittedAt: row.submitted_at
    };

    // Send confirmation email to the couple (with error handling)
    try {
      await sendRSVPNotification(rsvp);
      console.log('✅ RSVP notification email sent to couple');
    } catch (emailError) {
      console.error('⚠️ Failed to send notification email:', emailError.message);
    }

    // Send confirmation email to guest (only if email provided, with error handling)
    if (rsvp.email) {
      try {
        await sendGuestConfirmation(rsvp);
        console.log('✅ Confirmation email sent to guest');
      } catch (emailError) {
        console.error('⚠️ Failed to send confirmation email:', emailError.message);
      }
    }

    res.json({
      success: true,
      message: 'RSVP submitted successfully!',
      rsvp: {
        fullName: rsvp.fullName,
        attending: rsvp.attending,
        submittedAt: rsvp.submittedAt
      }
    });

  } catch (error) {
    console.error('RSVP submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting RSVP. Please try again.' 
    });
  }
});

// Get all RSVPs (admin endpoint)
app.get('/api/rsvps', async (req, res) => {
  try {
    const result = await rsvpModel.getAll();
    res.json({
      success: true,
      rsvps: result.rows
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching RSVPs'
    });
  }
});

// Get RSVP statistics
app.get('/api/rsvp-stats', async (req, res) => {
  try {
    const result = await rsvpModel.getStats();
    res.json({
      success: true,
      stats: result.rows
    });
  } catch (error) {
    console.error('Error fetching RSVP stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching RSVP statistics'
    });
  }
});

// Photo share endpoints
app.post('/api/photos', async (req, res) => {
  try {
    const {
      uploaderName,
      caption,
      imageData,
      fileType
    } = req.body;

    // Validate required fields
    if (!uploaderName || !imageData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Uploader name and image data are required' 
      });
    }

    let imageUrl = null;
    let fileSize = null;

    // Upload to Cloudinary if image data is provided
    if (imageData) {
      try {
        // Extract base64 data (remove data:image/type;base64, prefix)
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        
        const uploadResult = await cloudinary.uploader.upload(
          `data:image/${fileType || 'jpeg'};base64,${base64Data}`,
          {
            folder: 'wedding-photos',
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            max_file_size: 10485760, // 10MB
            public_id: `wedding-${Date.now()}-${Math.random().toString(36).substring(7)}`
          }
        );
        
        imageUrl = uploadResult.secure_url;
        fileSize = uploadResult.bytes;
        
        console.log('✅ Photo uploaded to Cloudinary:', imageUrl);
      } catch (cloudinaryError) {
        console.error('❌ Cloudinary upload error:', cloudinaryError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading photo to cloud storage. Please try again.'
        });
      }
    }

    // Create photo entry in database
    const result = await photoModel.create({
      uploaderName,
      caption,
      imageUrl,
      imageData: null, // Don't store base64 in DB when using Cloudinary
      fileSize,
      fileType
    });
    
    const photo = result.rows[0];

    res.json({ 
      success: true, 
      message: 'Photo uploaded successfully!',
      photo: {
        id: photo.id,
        uploaderName: photo.uploader_name,
        caption: photo.caption,
        imageUrl: photo.image_url,
        uploadedAt: photo.uploaded_at
      }
    });

  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading photo. Please try again.' 
    });
  }
});

// Get all photos
app.get('/api/photos', async (req, res) => {
  try {
    const approvedOnly = req.query.approved !== 'false'; // Default to approved only
    const result = await photoModel.getAll(approvedOnly);
    
    // Transform the data to match the frontend expected format
    const photos = result.rows.map(photo => ({
      id: photo.id,
      url: photo.image_url || photo.image_data,
      uploader: photo.uploader_name,
      caption: photo.caption || 'Beautiful moment!',
      timestamp: new Date(photo.uploaded_at).toLocaleString(),
      likes: photo.likes
    }));

    res.json({
      success: true,
      photos
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching photos'
    });
  }
});

// Like a photo
app.post('/api/photos/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await photoModel.like(id);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    res.json({
      success: true,
      likes: result.rows[0].likes
    });
  } catch (error) {
    console.error('Error liking photo:', error);
    res.status(500).json({
      success: false,
      message: 'Error liking photo'
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Send email notification
    await sendContactNotification({ name, email, message });

    res.json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again.'
    });
  }
});

// Email functions
async function sendRSVPNotification(rsvp) {
  const subject = `New RSVP: ${rsvp.fullName} - ${rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}`;
  
  const htmlContent = `
    <h2>New RSVP Submission</h2>
    <p><strong>Name:</strong> ${rsvp.fullName}</p>
    <p><strong>Status:</strong> ${rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}</p>
    ${rsvp.attending === 'yes' ? `
      <p><strong>Number of Guests:</strong> ${rsvp.numberOfGuests}</p>
      <p><strong>Meal Preference:</strong> ${rsvp.mealPreference}</p>
      <p><strong>Dietary Restrictions:</strong> ${rsvp.dietaryRestrictions}</p>
    ` : ''}
    ${rsvp.message ? `<p><strong>Message:</strong> ${rsvp.message}</p>` : ''}
    <p><strong>Submitted:</strong> ${new Date(rsvp.submittedAt).toLocaleString()}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER || 'wedding@shayneandmark.com',
    to: process.env.EMAIL_USER,
    subject,
    html: htmlContent
  });
}

async function sendGuestConfirmation(rsvp) {
  const subject = rsvp.attending === 'yes' 
    ? "We're excited to celebrate with you!" 
    : "Thank you for your response";

  const htmlContent = rsvp.attending === 'yes' ? `
    <h2>RSVP Confirmation - We Can't Wait to See You!</h2>
    <p>Dear ${rsvp.fullName},</p>
    <p>Thank you for RSVPing to our wedding! We're so excited to celebrate with you on February 25, 2026 in Cagayan de Oro City, Philippines.</p>
    <p><strong>Your RSVP Details:</strong></p>
    <ul>
      <li>Attending: Yes</li>
      <li>Number of Guests: ${rsvp.numberOfGuests}</li>
      <li>Meal Preference: ${rsvp.mealPreference}</li>
      ${rsvp.dietaryRestrictions && rsvp.dietaryRestrictions !== 'None' ? `<li>Dietary Restrictions: ${rsvp.dietaryRestrictions}</li>` : ''}
    </ul>
    <p>If you need to make any changes to your RSVP, please contact us directly.</p>
    <p>With love and excitement,</p>
    <p>Shayne & Mark</p>
  ` : `
    <h2>RSVP Confirmation - Thank You</h2>
    <p>Dear ${rsvp.fullName},</p>
    <p>Thank you for letting us know you won't be able to join us for our wedding. We understand and will miss you, but appreciate you taking the time to respond.</p>
    ${rsvp.message ? `<p>We received your message: "${rsvp.message}"</p>` : ''}
    <p>We hope to celebrate with you soon!</p>
    <p>With love,</p>
    <p>Shayne & Mark</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER || 'wedding@shayneandmark.com',
    to: rsvp.email,
    subject,
    html: htmlContent
  });
}

async function sendContactNotification({ name, email, message }) {
  const subject = `New Contact Message from ${name}`;
  
  const htmlContent = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER || 'wedding@shayneandmark.com',
    to: process.env.EMAIL_USER,
    subject,
    html: htmlContent
  });
}

// Admin endpoints
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [rsvpsResult, photosResult, statsResult] = await Promise.all([
      rsvpModel.getAll(),
      photoModel.getAll(false), // Get all photos including unapproved
      rsvpModel.getStats()
    ]);

    res.json({
      success: true,
      rsvps: rsvpsResult.rows,
      photos: photosResult.rows,
      stats: statsResult.rows
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin data'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Wedding website API is running',
    timestamp: new Date().toISOString()
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 Wedding website server running on port ${PORT}`);
  console.log(`📧 Email notifications configured`);
  console.log(`☁️  Cloudinary photo storage configured`);
  console.log(`💍 Ready to accept RSVPs and photo uploads!`);
});

module.exports = app;
