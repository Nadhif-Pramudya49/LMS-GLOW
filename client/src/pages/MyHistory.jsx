import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { History, Book } from 'lucide-react';

const MyHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        const token = localStorage.getItem('lms_token');
        try {
            const res = await axios.get('/api/v1/transactions/history', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(res.data);
        } catch (err) {
            console.error('Error fetching history:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <History size={28} />
                <h1>My Borrowing History</h1>
            </div>

            {loading ? (
                <p>Loading your history...</p>
            ) : (
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', background: '#f8f9fa' }}>
                                    <th style={{ padding: '1rem' }}>Book Title</th>
                                    <th style={{ padding: '1rem' }}>Borrow Date</th>
                                    <th style={{ padding: '1rem' }}>Return Date</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length > 0 ? history.map(t => (
                                    <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Book size={16} color="#3498db" /> {t.book_title}
                                        </td>
                                        <td style={{ padding: '1rem' }}>{new Date(t.borrow_date).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem' }}>{t.return_date ? new Date(t.return_date).toLocaleDateString() : '-'}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ 
                                                padding: '0.25rem 0.6rem', 
                                                borderRadius: '12px', 
                                                fontSize: '0.85rem',
                                                background: t.status === 'BORROWED' ? '#fff7ed' : '#f0fdf4',
                                                color: t.status === 'BORROWED' ? '#c2410c' : '#166534',
                                                border: `1px solid ${t.status === 'BORROWED' ? '#ffedd5' : '#dcfce7'}`
                                            }}>
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>You haven't borrowed any books yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyHistory;
