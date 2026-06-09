const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/members', memberRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'LMS API is running...' });
});

// Test DB Connection
db.query('SELECT 1')
    .then(() => {
        console.log('Connected to MySQL Database.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });
