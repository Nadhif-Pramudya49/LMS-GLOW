import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Edit, Trash2, Search, X } from 'lucide-react';

const MemberManager = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMember, setCurrentMember] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';
    const isLibrarian = user?.role === 'LIBRARIAN';

    useEffect(() => {
        if (user && (isAdmin || isLibrarian)) {
            fetchMembers();
        }
    }, [user, isAdmin, isLibrarian]);

    const fetchMembers = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('lms_token');
            if (!token) {
                setError('No authentication token found. Please login again.');
                return;
            }
            const res = await axios.get('/api/v1/members', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMembers(res.data);
        } catch (err) {
            console.error('Error fetching members:', err);
            const msg = err.response?.data?.message || 'Error fetching members list.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (user?.role === 'MEMBER') {
        return <div style={{ padding: '2rem', textAlign: 'center' }}><h2>Access Denied</h2><p>You don't have permission to manage members.</p></div>;
    }

    const handleOpenModal = (member = null) => {
        if (member) {
            setCurrentMember(member);
            setFormData({
                username: member.username,
                name: member.name,
                password: '' // Keep password empty on edit unless changing
            });
        } else {
            setCurrentMember(null);
            setFormData({ username: '', name: '', password: '' });
        }
        setIsModalOpen(true);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('lms_token');
        try {
            if (currentMember) {
                await axios.put(`/api/v1/members/${currentMember.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('/api/v1/members', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsModalOpen(false);
            fetchMembers();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this member?')) return;
        const token = localStorage.getItem('lms_token');
        try {
            await axios.delete(`/api/v1/members/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchMembers();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting member');
        }
    };

    const filteredMembers = members.filter(m => 
        m.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Member Management</h1>
                {isAdmin && (
                    <button 
                        onClick={() => handleOpenModal()}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        <UserPlus size={20} /> Add Member
                    </button>
                )}
            </div>

            <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
                <Search size={20} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                <input 
                    type="text" 
                    placeholder="Search by username or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </div>

            {loading ? (
                <p>Loading members...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '1rem' }}>Name</th>
                                <th style={{ padding: '1rem' }}>Username</th>
                                <th style={{ padding: '1rem' }}>Joined Date</th>
                                {isAdmin && <th style={{ padding: '1rem' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.length > 0 ? filteredMembers.map(m => (
                                <tr key={m.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{m.name}</td>
                                    <td style={{ padding: '1rem' }}>{m.username}</td>
                                    <td style={{ padding: '1rem' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                                    {isAdmin && (
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleOpenModal(m)} style={{ padding: '0.4rem', color: '#3498db', border: 'none', background: 'none', cursor: 'pointer' }}><Edit size={18}/></button>
                                                <button onClick={() => handleDelete(m.id)} style={{ padding: '0.4rem', color: '#e74c3c', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18}/></button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={isAdmin ? 4 : 3} style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No members found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2>{currentMember ? 'Edit Member' : 'Add New Member'}</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24}/></button>
                        </div>

                        {error && <div style={{ color: 'white', background: '#e74c3c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Username</label>
                                <input 
                                    type="text" 
                                    value={formData.username} 
                                    onChange={e => setFormData({...formData, username: e.target.value})}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Password {currentMember && '(Leave blank to keep same)'}</label>
                                <input 
                                    type="password" 
                                    value={formData.password} 
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    required={!currentMember}
                                />
                            </div>
                            <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
                                {currentMember ? 'Update Member' : 'Add Member'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberManager;
