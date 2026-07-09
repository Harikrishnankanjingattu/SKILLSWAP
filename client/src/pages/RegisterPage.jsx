import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-form">
        <h2 className="auth-title">Create Account</h2>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleRegister}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              name="firstName"
              className="input-field"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              className="input-field"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            className="input-field"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="input-field"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
