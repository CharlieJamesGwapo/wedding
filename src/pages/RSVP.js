import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './RSVP.css';

const RSVP = () => {
  useScrollAnimation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attending: '',
    numberOfGuests: '',
    mealPreference: '',
    dietaryRestrictions: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.attending) {
      newErrors.attending = 'Please select if you will be attending';
    }
    
    if (formData.attending === 'yes') {
      if (!formData.numberOfGuests) {
        newErrors.numberOfGuests = 'Number of guests is required';
      } else if (formData.numberOfGuests < 1 || formData.numberOfGuests > 4) {
        newErrors.numberOfGuests = 'Number of guests must be between 1 and 4';
      }
      
      if (!formData.mealPreference) {
        newErrors.mealPreference = 'Meal preference is required';
      }
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/rsvp', {
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
        throw new Error(result.message || 'Failed to submit RSVP');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your RSVP. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      attending: '',
      numberOfGuests: '',
      mealPreference: '',
      dietaryRestrictions: '',
      message: ''
    });
    setSubmitted(false);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="rsvp">
        <section className="hero-section">
          <div className="container">
            <h1>RSVP Received!</h1>
            <p>Thank you for responding to our invitation</p>
          </div>
        </section>

        <section className="confirmation section">
          <div className="container">
            <div className="confirmation-card">
              <div className="confirmation-icon">✨</div>
              <h2>Thank You, {formData.fullName}!</h2>
              <p className="confirmation-message">
                {formData.attending === 'yes' 
                  ? "We're so excited to celebrate with you! Your RSVP has been received and we can't wait to see you on our special day."
                  : "Thank you for letting us know. We'll miss you and hope to celebrate together soon."}
              </p>
              
              {formData.attending === 'yes' && (
                <div className="rsvp-summary">
                  <h3>RSVP Summary</h3>
                  <div className="summary-item">
                    <span className="label">Attending:</span>
                    <span className="value">Yes</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Number of Guests:</span>
                    <span className="value">{formData.numberOfGuests}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Meal Preference:</span>
                    <span className="value">{formData.mealPreference}</span>
                  </div>
                  {formData.dietaryRestrictions && (
                    <div className="summary-item">
                      <span className="label">Dietary Restrictions:</span>
                      <span className="value">{formData.dietaryRestrictions}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="confirmation-actions">
                <button onClick={resetForm} className="btn btn-outline">
                  Submit Another RSVP
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
    <div className="rsvp">
      <section className="hero-section">
        <div className="container">
          <h1>RSVP</h1>
          <p>Please respond by January 25, 2026</p>
        </div>
      </section>

      <section className="rsvp-form section">
        <div className="container">
          <div className="form-container">
            <div className="form-intro" data-animate="fade-up">
              <h2>We Can't Wait to Celebrate With You!</h2>
              <p>
                Your presence at our wedding would mean the world to us. 
                Please fill out the form below to let us know if you can join us 
                for our special day in Cagayan de Oro.
              </p>
              <div className="rsvp-deadline">
                <span className="deadline-icon">📅</span>
                <div>
                  <h3>RSVP Deadline</h3>
                  <p>January 25, 2026</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="wedding-form" data-animate="fade-up" data-delay="0.2">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Will you be attending? *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-text">Yes, I'll be there!</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-text">No, unable to attend</span>
                  </label>
                </div>
                {errors.attending && <span className="error-message">{errors.attending}</span>}
              </div>

              {formData.attending === 'yes' && (
                <>
                  <div className="form-group">
                    <label htmlFor="numberOfGuests">Number of Guests *</label>
                    <select
                      id="numberOfGuests"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleInputChange}
                      className={errors.numberOfGuests ? 'error' : ''}
                    >
                      <option value="">Select number of guests</option>
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                    </select>
                    {errors.numberOfGuests && <span className="error-message">{errors.numberOfGuests}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="mealPreference">Meal Preference *</label>
                    <select
                      id="mealPreference"
                      name="mealPreference"
                      value={formData.mealPreference}
                      onChange={handleInputChange}
                      className={errors.mealPreference ? 'error' : ''}
                    >
                      <option value="">Select meal preference</option>
                      <option value="chicken">Chicken</option>
                      <option value="beef">Beef</option>
                      <option value="fish">Fish</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                    {errors.mealPreference && <span className="error-message">{errors.mealPreference}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
                    <textarea
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Please let us know about any food allergies or dietary restrictions"
                    ></textarea>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="message">Message for the Couple</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Share a message, memory, or well wishes with us!"
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RSVP;
