const db = require('../config/db');

// @desc    Get dashboard statistics
// @route   GET /api/v1/dashboard/stats
// @access  Private
exports.getStats = async (req, res) => {
    try {
        const { role, id } = req.user;

        // Statistics for Admin & Librarian
        if (role === 'ADMIN' || role === 'LIBRARIAN') {
            const [booksCount] = await db.execute('SELECT COUNT(*) as total FROM books');
            const [membersCount] = await db.execute('SELECT COUNT(*) as total FROM users WHERE role = "MEMBER"');
            const [activeCount] = await db.execute('SELECT COUNT(*) as total FROM transactions WHERE status = "BORROWED"');
            const [returnedCount] = await db.execute('SELECT COUNT(*) as total FROM transactions WHERE status = "RETURNED"');

            return res.json({
                totalBooks: booksCount[0].total,
                totalMembers: membersCount[0].total,
                activeBorrowings: activeCount[0].total,
                returnedTransactions: returnedCount[0].total
            });
        }

        // Statistics for Member (Personal)
        if (role === 'MEMBER') {
            const [myActiveCount] = await db.execute(
                'SELECT COUNT(*) as total FROM transactions WHERE member_id = ? AND status = "BORROWED"', 
                [id]
            );
            const [myHistoryCount] = await db.execute(
                'SELECT COUNT(*) as total FROM transactions WHERE member_id = ?', 
                [id]
            );

            return res.json({
                activeBorrowings: myActiveCount[0].total,
                totalTransactions: myHistoryCount[0].total
            });
        }

    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};
