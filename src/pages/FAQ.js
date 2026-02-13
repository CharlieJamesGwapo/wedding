import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeItem, setActiveItem] = useState(null);

  const faqItems = [
    {
      question: "Can I bring a plus one?",
      answer: "Your invitation will indicate if you have a plus one. Due to venue capacity, we're limited to the number of guests we can accommodate. Please check your invitation or contact us if you're unsure."
    },
    {
      question: "Are children welcome?",
      answer: "We love children, but this will be an adults-only celebration to allow our guests to relax and enjoy the evening. We hope you understand and look forward to celebrating with you!"
    },
    {
      question: "What time should I arrive?",
      answer: "Guests should arrive by 3:30 PM for the 4:00 PM ceremony. This will give you time to find parking, get settled, and enjoy the welcome drinks before the ceremony begins."
    },
    {
      question: "Is parking available?",
      answer: "Yes, there is ample free parking available on-site at Carmen Hotel. Our parking attendants will help direct you to the available spaces."
    },
    {
      question: "What is the weather like in Cagayan de Oro in February?",
      answer: "February is warm and tropical in Cagayan de Oro! Expect temperatures of 82-90°F with occasional rain showers. We recommend bringing a light umbrella or parasol, and staying hydrated throughout the celebration."
    },
    {
      question: "Will there be transportation provided?",
      answer: "We'll provide complimentary shuttle service between the recommended hotels and the wedding venue on the day of the wedding. Details about pickup times and locations will be shared closer to the date."
    },
    {
      question: "What if I have dietary restrictions?",
      answer: "Please let us know about any dietary restrictions when you RSVP. Our caterers can accommodate most dietary needs including vegetarian, vegan, gluten-free, and food allergies."
    },
    {
      question: "Can I take photos during the ceremony?",
      answer: "We ask that guests refrain from taking photos during the ceremony to allow our professional photographer to capture the moment and for everyone to be fully present. Feel free to take photos during the reception!"
    },
    {
      question: "When should I RSVP by?",
      answer: "Please RSVP by January 14, 2026. This helps us finalize catering and seating arrangements. You can RSVP through our website or return the RSVP card included with your invitation."
    },
    {
      question: "What gifts are appropriate?",
      answer: "Your presence is the greatest gift! If you wish to honor us with a gift, we have registries available. Please see our Registry page for more information."
    },
    {
      question: "Is there a dress code?",
      answer: "Yes, we suggest formal garden attire. Think elegant cocktail dresses for ladies and suits or sport coats for gentlemen. Please see our Dress Code page for detailed recommendations."
    },
    {
      question: "Will there be an open bar?",
      answer: "Yes, we'll have an open bar during cocktail hour and the reception, featuring a selection of wines, beers, and cocktails. Non-alcoholic beverages will also be available."
    }
  ];

  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div className="faq">
      <section className="hero-section">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about our wedding celebration</p>
        </div>
      </section>

      <section className="faq-content section">
        <div className="container">
          <div className="faq-intro">
            <h2>We're Here to Help</h2>
            <p>
              We know you have questions about our special day. Here are answers to some 
              of the most common questions we receive. If you don't see your question here, 
              please don't hesitate to reach out to us!
            </p>
          </div>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeItem === index ? 'active' : ''}`}
                onClick={() => toggleItem(index)}
              >
                <div className="faq-question">
                  <h3>{item.question}</h3>
                  <span className="faq-toggle">{activeItem === index ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-section">
            <h2>Still Have Questions?</h2>
            <p>
              If you couldn't find the answer you're looking for, we'd be happy to help! 
              Feel free to reach out to us directly.
            </p>
            <div className="contact-options">
              <div className="contact-option">
                <span className="contact-icon">📧</span>
                <div>
                  <h3>Email Us</h3>
                  <p>wedding@shayneandmark.com</p>
                </div>
              </div>
              <div className="contact-option">
                <span className="contact-icon">📱</span>
                <div>
                  <h3>Call Us</h3>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="contact-option">
                <span className="contact-icon">💬</span>
                <div>
                  <h3>Contact Form</h3>
                  <p>Send us a message through our website</p>
                </div>
              </div>
            </div>
            <a href="/contact" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
