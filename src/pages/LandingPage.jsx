import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useJobs } from '../context/JobContext';
import './LandingPage.css';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const { addSubscriber } = useJobs();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      const success = addSubscriber(email);
      if (success) {
        setSubscribeMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setSubscribeMessage('You are already subscribed!');
      }
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Career with Clowdi</h1>
          <p className="hero-subtitle">
            Connect with top employers and discover opportunities that match your skills and aspirations
          </p>
          <Link to="/jobs" className="cta-button">
            Browse Jobs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Clowdi?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Diverse Opportunities</h3>
              <p>Access thousands of job openings across various industries and locations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Filtering</h3>
              <p>Find the perfect role with our advanced filtering by industry, location, and salary</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Submit your application with ease and track your progress in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Candidates</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <h2 className="section-title">Stay Updated</h2>
          <p className="newsletter-subtitle">
            Subscribe to our mailing list and get the latest job opportunities delivered to your inbox
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
          {subscribeMessage && (
            <p className="subscribe-message">{subscribeMessage}</p>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of successful candidates who found their dream jobs with Clowdi</p>
          <Link to="/jobs" className="cta-button-secondary">
            Explore Opportunities
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
