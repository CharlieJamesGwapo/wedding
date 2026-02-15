import React, { useEffect, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './OurStory.css';

const OurStory = () => {
  const observerRef = useRef();

  useScrollAnimation();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="our-story">
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 20, 10, 0.5), rgba(30, 20, 10, 0.6)), url(${process.env.PUBLIC_URL}/moments-1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container">
          <h1 className="animate-on-scroll" id="hero-title">Our Story</h1>
          <p className="animate-on-scroll" id="hero-subtitle">Where It All Began</p>
        </div>
        <div className="floating-hearts">
          <span className="heart" style={{ left: '10%', animationDelay: '0s' }}>&#10084;</span>
          <span className="heart" style={{ left: '20%', animationDelay: '1s' }}>&#10084;</span>
          <span className="heart" style={{ left: '30%', animationDelay: '2s' }}>&#10084;</span>
          <span className="heart" style={{ left: '70%', animationDelay: '0.5s' }}>&#10084;</span>
          <span className="heart" style={{ left: '80%', animationDelay: '1.5s' }}>&#10084;</span>
          <span className="heart" style={{ left: '90%', animationDelay: '2.5s' }}>&#10084;</span>
        </div>
      </section>

      <section className="story-content section">
        <div className="container">
          <div className="story-intro animate-on-scroll" id="intro">
            <h2>The Beginning</h2>
            <div className="intro-with-photo">
              <div className="intro-photo animate-on-scroll" data-animate="zoom-in">
                <img src={`${process.env.PUBLIC_URL}/moments-2.jpg`} alt="Shayne and Mark together" />
              </div>
              <p className="highlight-text">
                It all began in 2016 with a simple introduction from a mutual friend.
                At the time, Shayne was working in a private school in the small town of Balingasag,
                while Mark was working overseas. Though they were in completely different places in life,
                fate quietly began weaving their story together.
              </p>
            </div>
          </div>

          <div className="story-chapters">
            <div className="chapter animate-on-scroll" id="chapter1" data-animate="fade-left">
              <div className="chapter-number">01</div>
              <div className="chapter-content">
                <h3>The First Message</h3>
                <div className="chapter-photo" data-animate="zoom-in">
                  <img src={`${process.env.PUBLIC_URL}/moments-3.jpg`} alt="A cherished memory" />
                </div>
                <p>
                  Mark made the first move and sent Shayne a message on Facebook.
                  What started as casual conversations slowly became daily exchanges, then meaningful talks,
                  and eventually something they both deeply looked forward to. Even with the distance,
                  their connection felt natural and effortless.
                </p>
              </div>
            </div>

            <div className="chapter animate-on-scroll" id="chapter2" data-animate="fade-right">
              <div className="chapter-number">02</div>
              <div className="chapter-content">
                <h3>The Beautiful Twist</h3>
                <div className="chapter-photo" data-animate="zoom-in">
                  <img src={`${process.env.PUBLIC_URL}/moments-5.jpg`} alt="Forever starts here" />
                </div>
                <p className="special-text">
                  Here's the beautiful twist, long before 2016, long before the messages and video calls,
                  Mark was already in college in the same town where Shayne was still in high school.
                  They walked the same streets, knew the same places, and breathed the same small-town air,
                  yet their paths never crossed.
                </p>
                <div className="quote-box">
                  <blockquote>
                    Isn't it amazing how two people can be so close in proximity,
                    yet meet only at the perfect time?
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="chapter animate-on-scroll" id="chapter3" data-animate="fade-left">
              <div className="chapter-number">03</div>
              <div className="chapter-content">
                <h3>Perfect Timing</h3>
                <div className="chapter-photo landscape" data-animate="zoom-in">
                  <img src={`${process.env.PUBLIC_URL}/moments-12.jpg`} alt="Our journey of love" />
                </div>
                <p>
                  Years passed. Seasons changed. And when the timing was finally right,
                  God brought them together in a way they never expected.
                </p>
              </div>
            </div>

            <div className="chapter animate-on-scroll" id="chapter4" data-animate="fade-right">
              <div className="chapter-number">04</div>
              <div className="chapter-content">
                <h3>The First Meeting</h3>
                <div className="chapter-photo" data-animate="zoom-in">
                  <img src={`${process.env.PUBLIC_URL}/moments-4.jpg`} alt="Love in every glance" />
                </div>
                <p>
                  After months of talking from afar, Mark finally disembarked and came home.
                  Not long after, he visited Shayne for the very first time. That visit wasn't just a reunion,
                  it was the moment their story truly began in person. The laughter felt warmer,
                  the smiles more certain, and the connection even stronger face to face.
                </p>
              </div>
            </div>

            <div className="chapter animate-on-scroll" id="chapter5" data-animate="fade-left">
              <div className="chapter-number">05</div>
              <div className="chapter-content">
                <h3>Written in the Stars</h3>
                <div className="chapter-photo" data-animate="zoom-in">
                  <img src={`${process.env.PUBLIC_URL}/moments-6.jpg`} alt="Two hearts, one love" />
                </div>
                <p>
                  What started as a simple Facebook message became a love story written in perfect timing,
                  a reminder that what is meant for you will always find its way back, even if it takes years.
                </p>
              </div>
            </div>
          </div>

          <div className="story-conclusion animate-on-scroll" id="conclusion">
            <div className="conclusion-photo" data-animate="zoom-in">
              <img src={`${process.env.PUBLIC_URL}/moments-1.jpg`} alt="Our beautiful moment together" />
            </div>
            <div className="conclusion-content" data-animate="scale-in">
              <h2>Forever Begins</h2>
              <p className="main-text">
                And now, here they are — hand in hand — choosing each other every day,
                grateful for timing, distance, and a love that patiently waited for the right moment.
              </p>
              <p className="final-text">
                This is not just where it all began.<br />
                This is where forever begins.
              </p>
            </div>
          </div>

          <div className="story-footer animate-on-scroll" id="footer">
            <div className="love-symbol" data-animate="scale-in">
              <div className="heart-animation">&#10084;</div>
              <p>Two Hearts, One Story</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
