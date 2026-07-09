import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get('http://localhost:8000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ padding: '3rem 5%', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Welcome, {user.firstName}!</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Your Profile</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Location:</strong> {user.location || 'Not set'}</p>
          <p><strong>Bio:</strong> {user.bio || 'Add a bio to tell people about yourself.'}</p>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Your Skills</h3>
          {user.skills && user.skills.length > 0 ? (
            <ul>
              {user.skills.map(s => (
                <li key={s.id}>{s.skill.name} ({s.type})</li>
              ))}
            </ul>
          ) : (
            <p>You haven't added any skills yet. Start by adding skills you want to teach or learn!</p>
          )}
          <button className="btn-primary" style={{ marginTop: '1rem' }}>Add Skills</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
