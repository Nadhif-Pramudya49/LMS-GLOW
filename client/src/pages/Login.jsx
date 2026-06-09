import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/v1/auth/login', { username, password });
            const { token, user } = response.data;
            
            login(user, token);
            
            // Redirect based on role
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>LMS Login</h2>
                
                {error && <div style={{ color: 'white', background: '#e74c3c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Username</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                            required 
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ width: '100%', padding: '0.75rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
                    <p>admin / admin123</p>
                    <p>pustakawan / pustakawan123</p>
                    <p>anggota / anggota123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
