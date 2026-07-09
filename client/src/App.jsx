import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-brand">SkillSwap</Link>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign Up</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
