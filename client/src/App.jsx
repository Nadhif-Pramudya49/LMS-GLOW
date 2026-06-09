import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookManager from './pages/BookManager';
import MemberManager from './pages/MemberManager';
import Transactions from './pages/Transactions';
import MyHistory from './pages/MyHistory';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const isAdmin = user?.role === 'ADMIN';
    const isLibrarian = user?.role === 'LIBRARIAN';
    const isMember = user?.role === 'MEMBER';

    return (
        <div>
            <nav style={{ background: '#2c3e50', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <strong style={{ fontSize: '1.2rem' }}>LMS</strong>
                    <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                    <Link to="/books" style={{ color: 'white', textDecoration: 'none' }}>Books</Link>
                    {(isAdmin || isLibrarian) && <Link to="/members" style={{ color: 'white', textDecoration: 'none' }}>Members</Link>}
                    {(isAdmin || isLibrarian) && <Link to="/transactions" style={{ color: 'white', textDecoration: 'none' }}>Transactions</Link>}
                    {isMember && <Link to="/history" style={{ color: 'white', textDecoration: 'none' }}>My History</Link>}
                </div>
                <button onClick={logout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
            </nav>
            <main>{children}</main>
        </div>
    );
};

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/books" 
                        element={
                            <PrivateRoute>
                                <BookManager />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/members" 
                        element={
                            <PrivateRoute>
                                <MemberManager />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/transactions" 
                        element={
                            <PrivateRoute>
                                <Transactions />
                            </PrivateRoute>
                        } 
                    />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
