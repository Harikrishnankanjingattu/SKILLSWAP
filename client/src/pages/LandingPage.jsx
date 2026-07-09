import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">
        Exchange Skills,<br />
        <span style={{ color: 'var(--secondary)' }}>Empower Growth</span>
      </h1>
      <p className="hero-subtitle">
        Join the ultimate peer-to-peer learning platform. Teach what you know, learn what you need, without spending a dime.
      </p>
      <Link to="/register" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
        Get Started for Free
      </Link>
    </div>
  );
};

export default LandingPage;
