import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Book, Users, ArrowRightLeft, CheckCircle, LayoutDashboard } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div style={{ 
            padding: '1rem', 
            borderRadius: '12px', 
            background: `${color}15`, 
            color: color 
        }}>
            <Icon size={24} />
        </div>
        <div>
            <p style={{ margin: 0, color: '#888', fontSize: '0.9rem', fontWeight: '500' }}>{title}</p>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#333' }}>{value}</h2>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('lms_token');
                const res = await axios.get('/api/v1/dashboard/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

    const isAdminOrLibrarian = user?.role === 'ADMIN' || user?.role === 'LIBRARIAN';

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <LayoutDashboard size={28} />
                <h1>Dashboard Overview</h1>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#666' }}>Welcome back, <span style={{ color: '#3498db' }}>{user?.name}</span>!</h3>
                <p style={{ color: '#888' }}>You are logged in as <strong>{user?.role}</strong>.</p>
            </div>

            {isAdminOrLibrarian ? (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                    gap: '1.5rem' 
                }}>
                    <StatCard title="Total Books" value={stats?.totalBooks || 0} icon={Book} color="#3498db" />
                    <StatCard title="Total Members" value={stats?.totalMembers || 0} icon={Users} color="#9b59b6" />
                    <StatCard title="Active Borrowings" value={stats?.activeBorrowings || 0} icon={ArrowRightLeft} color="#f39c12" />
                    <StatCard title="Returned Books" value={stats?.returnedTransactions || 0} icon={CheckCircle} color="#2ecc71" />
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                    gap: '1.5rem' 
                }}>
                    <StatCard title="My Active Borrowings" value={stats?.activeBorrowings || 0} icon={ArrowRightLeft} color="#f39c12" />
                    <StatCard title="Total Transactions" value={stats?.totalTransactions || 0} icon={CheckCircle} color="#2ecc71" />
                </div>
            )}

            <div style={{ marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '12px', border: '1px dashed #ddd', textAlign: 'center' }}>
                <p style={{ color: '#888', margin: 0 }}>
                    LMS - Library Management System v1.0 | 
                    Developed with Agentic AI & GSD Core
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
