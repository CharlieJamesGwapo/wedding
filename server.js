const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'build')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'wedding@shayneanddr.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Store RSVPs (in production, use a database)
let rsvps = [];

// RSVP endpoint
app.post('/api/rsvp', async (req, res) => {
  try {
    const {
      fullName,
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

    // Create RSVP entry
    const rsvp = {
      id: Date.now(),
      fullName,
      attending,
      numberOfGuests: attending === 'yes' ? numberOfGuests : 0,
      mealPreference: attending === 'yes' ? mealPreference : 'N/A',
      dietaryRestrictions: dietaryRestrictions || 'None',
      message: message || '',
      submittedAt: new Date().toISOString()
    };

    // Store RSVP
    rsvps.push(rsvp);

    // Send confirmation email to the couple
    await sendRSVPNotification(rsvp);

    // Send confirmation email to guest
    await sendGuestConfirmation(rsvp);

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
app.get('/api/rsvps', (req, res) => {
  res.json({
    success: true,
    rsvps: rsvps.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  });
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
    from: process.env.EMAIL_USER || 'wedding@shayneanddr.com',
    to: 'wedding@shayneanddr.com',
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
    <p>Shayne & DR</p>
  ` : `
    <h2>RSVP Confirmation - Thank You</h2>
    <p>Dear ${rsvp.fullName},</p>
    <p>Thank you for letting us know you won't be able to join us for our wedding. We understand and will miss you, but appreciate you taking the time to respond.</p>
    ${rsvp.message ? `<p>We received your message: "${rsvp.message}"</p>` : ''}
    <p>We hope to celebrate with you soon!</p>
    <p>With love,</p>
    <p>Shayne & DR</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER || 'wedding@shayneanddr.com',
    to: rsvp.fullName.includes('@') ? rsvp.fullName : 'guest@example.com', // In production, you'd collect email separately
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
    from: process.env.EMAIL_USER || 'wedding@shayneanddr.com',
    to: 'wedding@shayneanddr.com',
    subject,
    html: htmlContent
  });
}

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
  console.log(`💍 Ready to accept RSVPs!`);
});

module.exports = app;
