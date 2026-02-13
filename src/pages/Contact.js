import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        setIsSubmitting(false);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsSubmitting(false);
      alert('There was an error sending your message. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="contact">
        <section className="hero-section">
          <div className="container">
            <h1>Message Received!</h1>
            <p>Thank you for reaching out to us</p>
          </div>
        </section>

        <section className="confirmation section">
          <div className="container">
            <div className="confirmation-card">
              <div className="confirmation-icon">✉️</div>
              <h2>Thank You, {formData.name}!</h2>
              <p className="confirmation-message">
                Your message has been received and we'll get back to you as soon as possible. 
                We appreciate you taking the time to reach out!
              </p>
              <div className="confirmation-actions">
                <button onClick={resetForm} className="btn btn-outline">
                  Send Another Message
                </button>
                <a href="/" className="btn btn-primary">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact">
      <section className="hero-section">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact-content section">
        <div className="container">
          <div className="contact-intro">
            <h2>Get in Touch</h2>
            <p>
              Whether you have questions about the wedding, need travel information, 
              or just want to share a sweet message with us, we'd love to hear from you!
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3>Ways to Reach Us</h3>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-details">
                    <h4>Email</h4>
                    <p>wedding@shayneanddr.com</p>
                    <span className="method-note">Best for detailed questions</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📱</div>
                  <div className="method-details">
                    <h4>Phone</h4>
                    <p>(555) 123-4567</p>
                    <span className="method-note">Available 9 AM - 8 PM PST</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💬</div>
                  <div className="method-details">
                    <h4>Text Message</h4>
                    <p>(555) 123-4567</p>
                    <span className="method-note">Quick questions are welcome!</span>
                  </div>
                </div>
              </div>

              <div className="response-info">
                <h4>Response Time</h4>
                <p>
                  We'll do our best to respond to all messages within 24-48 hours. 
                  During the busy wedding planning period, responses may take a bit longer, 
                  but we appreciate your patience!
                </p>
              </div>

              <div className="wedding-planner">
                <h4>Wedding Planner</h4>
                <p>
                  For vendor inquiries or professional questions, you can also contact 
                  our wedding planner:
                </p>
                <div className="planner-info">
                  <p><strong>Bella Events</strong></p>
                  <p>planner@bellaevents.com</p>
                  <p>(555) 987-6543</p>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Share your questions, well wishes, or anything else you'd like to tell us..."
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>

              <div className="form-note">
                <p>
                  We'll send a confirmation email to let you know we've received your message. 
                  If you don't hear back from us within 48 hours, please check your spam folder 
                  or feel free to reach out again.
                </p>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h3>Follow Our Journey</h3>
            <p>
              While we're keeping most wedding details private here, you can follow our 
              general adventures and see some behind-the-scenes moments:
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="social-icon">📷</span>
                <span>Instagram</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📘</span>
                <span>Facebook</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">🎵</span>
                <span>Spotify Playlist</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
