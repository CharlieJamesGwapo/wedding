import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './FAQ.css';

const FAQ = () => {
  const [activeItem, setActiveItem] = useState(null);

  useScrollAnimation();

  const faqItems = [
    {
      question: "Can I bring a plus one?",
      answer: "Due to limited space, we can only accommodate guests named on the invitation."
    },
    {
      question: "Are children welcome?",
      answer: "As much as we love your little ones, we are only able to accommodate children who are part of the wedding or those specifically invited."
    },
    {
      question: "What time should I arrive?",
      answer: "Please arrive by 8:30 AM for the 9:00 AM ceremony."
    },
    {
      question: "Is parking available?",
      answer: "Limited parking is available at the church parking area. Additional parking may be found at nearby establishments. Carpooling is highly recommended."
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
      answer: "Please confirm by sending your complete name."
    },
    {
      question: "What gifts are appropriate?",
      answer: "Your presence and prayers are all that we request, but if you desire to give nonetheless, a monetary gift for our future is a delightful blessing."
    },
    {
      question: "Is there a dress code?",
      answer: "Formal attire in shades of gray. No jeans & no white color. Principal sponsors should wear Barong Tagalog/Long Sleeve and Long Gown/Filipiniana in neutral colors."
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
          <div className="faq-intro" data-animate="fade-up">
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
                data-animate="fade-up"
                data-delay={Math.min(index * 0.06, 0.5)}
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

          <div className="contact-section" data-animate="fade-up">
            <h2>Still Have Questions?</h2>
            <p>
              If you couldn't find the answer you're looking for, we'd be happy to help!
              Feel free to reach out to us directly.
            </p>
            <div className="contact-options">
              <div className="contact-option" data-animate="fade-up" data-delay="0.1">
                <span className="contact-icon">📧</span>
                <div>
                  <h3>Email Us</h3>
                  <p>wedding@shayneandmark.com</p>
                </div>
              </div>
              <div className="contact-option" data-animate="fade-up" data-delay="0.2">
                <span className="contact-icon">📱</span>
                <div>
                  <h3>Call Us</h3>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="contact-option" data-animate="fade-up" data-delay="0.3">
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
