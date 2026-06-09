import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

const BookManager = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        stock: 0
    });
    const [error, setError] = useState('');

    const { user } = useAuth();
    const canManage = user?.role === 'ADMIN' || user?.role === 'LIBRARIAN';

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('lms_token');
            const res = await axios.get('/api/v1/books', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(res.data);
        } catch (err) {
            console.error('Error fetching books:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (book = null) => {
        if (book) {
            setCurrentBook(book);
            setFormData({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                category: book.category || '',
                stock: book.stock
            });
        } else {
            setCurrentBook(null);
            setFormData({ title: '', author: '', isbn: '', category: '', stock: 0 });
        }
        setIsModalOpen(true);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('lms_token');
        try {
            if (currentBook) {
                await axios.put(`/api/v1/books/${currentBook.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('/api/v1/books', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsModalOpen(false);
            fetchBooks();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        const token = localStorage.getItem('lms_token');
        try {
            await axios.delete(`/api/v1/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBooks();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting book');
        }
    };

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
    );

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Book Management</h1>
                {canManage && (
                    <button 
                        onClick={() => handleOpenModal()}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        <Plus size={20} /> Add Book
                    </button>
                )}
            </div>

            <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
                <Search size={20} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                <input 
                    type="text" 
                    placeholder="Search by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </div>

            {loading ? (
                <p>Loading books...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '1rem' }}>Title</th>
                                <th style={{ padding: '1rem' }}>Author</th>
                                <th style={{ padding: '1rem' }}>ISBN</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Stock</th>
                                {canManage && <th style={{ padding: '1rem' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.length > 0 ? filteredBooks.map(book => (
                                <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{book.title}</td>
                                    <td style={{ padding: '1rem' }}>{book.author}</td>
                                    <td style={{ padding: '1rem' }}>{book.isbn}</td>
                                    <td style={{ padding: '1rem' }}>{book.category}</td>
                                    <td style={{ padding: '1rem' }}>{book.stock}</td>
                                    {canManage && (
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleOpenModal(book)} style={{ padding: '0.4rem', color: '#3498db', border: 'none', background: 'none', cursor: 'pointer' }}><Edit size={18}/></button>
                                                <button onClick={() => handleDelete(book.id)} style={{ padding: '0.4rem', color: '#e74c3c', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18}/></button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={canManage ? 6 : 5} style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No books found.</td>
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
                            <h2>{currentBook ? 'Edit Book' : 'Add New Book'}</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24}/></button>
                        </div>

                        {error && <div style={{ color: 'white', background: '#e74c3c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Title</label>
                                <input 
                                    type="text" 
                                    value={formData.title} 
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Author</label>
                                <input 
                                    type="text" 
                                    value={formData.author} 
                                    onChange={e => setFormData({...formData, author: e.target.value})}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem' }}>ISBN</label>
                                <input 
                                    type="text" 
                                    value={formData.isbn} 
                                    onChange={e => setFormData({...formData, isbn: e.target.value})}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.3rem' }}>Category</label>
                                    <input 
                                        type="text" 
                                        value={formData.category} 
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                </div>
                                <div style={{ width: '100px' }}>
                                    <label style={{ display: 'block', marginBottom: '0.3rem' }}>Stock</label>
                                    <input 
                                        type="number" 
                                        value={formData.stock} 
                                        onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>
                            <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
                                {currentBook ? 'Update Book' : 'Add Book'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookManager;
