import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, Calendar, ArrowRightLeft, CheckCircle } from 'lucide-react';

const Transactions = () => {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [activeTransactions, setActiveTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [borrowDate, setBorrowDate] = useState(new Date().toISOString().split('T')[0]);
    const [msg, setMsg] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('lms_token');
        const headers = { Authorization: `Bearer ${token}` };
        
        try {
            // Fetch Books
            try {
                const booksRes = await axios.get('/api/v1/books', { headers });
                console.log('Books Data:', booksRes.data);
                setBooks(booksRes.data.filter(b => b.stock > 0));
            } catch (err) {
                console.error('Error fetching books:', err);
            }

            // Fetch Members
            try {
                const membersRes = await axios.get('/api/v1/members', { headers });
                console.log('Members Data:', membersRes.data);
                setMembers(membersRes.data);
            } catch (err) {
                console.error('Error fetching members:', err);
            }

            // Fetch History
            try {
                const historyRes = await axios.get('/api/v1/transactions/history', { headers });
                console.log('History Data:', historyRes.data);
                setActiveTransactions(historyRes.data.filter(t => t.status === 'BORROWED'));
            } catch (err) {
                console.error('Error fetching history:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBorrow = async (e) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });
        const token = localStorage.getItem('lms_token');

        try {
            await axios.post('/api/v1/transactions/borrow', 
                { bookId: selectedBook, memberId: selectedMember, borrowDate },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMsg({ type: 'success', text: 'Book borrowed successfully!' });
            setSelectedBook('');
            setSelectedMember('');
            fetchData();
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.message || 'Error processing borrow' });
        }
    };

    const handleReturn = async (transactionId) => {
        const returnDate = new Date().toISOString().split('T')[0];
        const token = localStorage.getItem('lms_token');

        try {
            await axios.put(`/api/v1/transactions/${transactionId}/return`, 
                { returnDate },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error processing return');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Transaction Management</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
                {/* Borrow Form */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <ArrowRightLeft size={20} /> New Borrowing
                    </h3>

                    {msg.text && (
                        <div style={{ 
                            padding: '0.75rem', 
                            borderRadius: '4px', 
                            marginBottom: '1rem', 
                            background: msg.type === 'success' ? '#2ecc71' : '#e74c3c',
                            color: 'white'
                        }}>
                            {msg.text}
                        </div>
                    )}

                    <form onSubmit={handleBorrow}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Select Member</label>
                            <select 
                                value={selectedMember} 
                                onChange={e => setSelectedMember(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            >
                                <option value="">-- Choose Member --</option>
                                {members.map(m => <option key={m.id} value={m.id}>{m.name} ({m.username})</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Select Book</label>
                            <select 
                                value={selectedBook} 
                                onChange={e => setSelectedBook(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            >
                                <option value="">-- Choose Book (Available Only) --</option>
                                {books.map(b => <option key={b.id} value={b.id}>{b.title} - {b.author}</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Borrow Date</label>
                            <input 
                                type="date" 
                                value={borrowDate}
                                onChange={e => setBorrowDate(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                        </div>

                        <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
                            Process Borrowing
                        </button>
                    </form>
                </div>

                {/* Active Transactions Table */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Active Borrowings</h3>
                    
                    {loading ? (
                        <p>Loading active transactions...</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                        <th style={{ padding: '1rem' }}>Book</th>
                                        <th style={{ padding: '1rem' }}>Member</th>
                                        <th style={{ padding: '1rem' }}>Date</th>
                                        <th style={{ padding: '1rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTransactions.length > 0 ? activeTransactions.map(t => (
                                        <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '1rem' }}>{t.book_title}</td>
                                            <td style={{ padding: '1rem' }}>{t.member_name}</td>
                                            <td style={{ padding: '1rem' }}>{new Date(t.borrow_date).toLocaleDateString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <button 
                                                    onClick={() => handleReturn(t.id)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    <CheckCircle size={16} /> Return
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No active borrowings.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
