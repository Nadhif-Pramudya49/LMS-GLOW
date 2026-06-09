const db = require('../config/db');

// @desc    Borrow a book
// @route   POST /api/v1/transactions/borrow
// @access  Private (Admin, Librarian)
exports.borrowBook = async (req, res) => {
    const { bookId, memberId, borrowDate } = req.body;
    const librarianId = req.user.id;

    if (!bookId || !memberId || !borrowDate) {
        return res.status(400).json({ message: 'Please provide bookId, memberId, and borrowDate' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Check if book exists and has stock
        const [books] = await connection.execute('SELECT stock FROM books WHERE id = ? FOR UPDATE', [bookId]);
        if (books.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Book not found' });
        }

        if (books[0].stock <= 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Book is out of stock' });
        }

        // 2. Check if member exists
        const [members] = await connection.execute('SELECT id FROM users WHERE id = ? AND role = "MEMBER"', [memberId]);
        if (members.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Member not found' });
        }

        // 3. Create transaction record
        await connection.execute(
            'INSERT INTO transactions (book_id, member_id, librarian_id, borrow_date, status) VALUES (?, ?, ?, ?, "BORROWED")',
            [bookId, memberId, librarianId, borrowDate]
        );

        // 4. Decrease book stock
        await connection.execute('UPDATE books SET stock = stock - 1 WHERE id = ?', [bookId]);

        await connection.commit();
        res.status(201).json({ message: 'Book borrowed successfully' });

    } catch (err) {
        await connection.rollback();
        console.error('Borrow error:', err);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        connection.release();
    }
};

// @desc    Return a book
// @route   PUT /api/v1/transactions/:id/return
// @access  Private (Admin, Librarian)
exports.returnBook = async (req, res) => {
    const { id } = req.params;
    const { returnDate } = req.body;

    if (!returnDate) {
        return res.status(400).json({ message: 'Please provide returnDate' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Check if transaction exists and is currently borrowed
        const [transactions] = await connection.execute(
            'SELECT * FROM transactions WHERE id = ? AND status = "BORROWED" FOR UPDATE',
            [id]
        );

        if (transactions.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Active transaction not found' });
        }

        const transaction = transactions[0];

        // 2. Update transaction record
        await connection.execute(
            'UPDATE transactions SET return_date = ?, status = "RETURNED" WHERE id = ?',
            [returnDate, id]
        );

        // 3. Increase book stock
        await connection.execute('UPDATE books SET stock = stock + 1 WHERE id = ?', [transaction.book_id]);

        await connection.commit();
        res.json({ message: 'Book returned successfully' });

    } catch (err) {
        await connection.rollback();
        console.error('Return error:', err);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        connection.release();
    }
};

// @desc    Get transaction history
// @route   GET /api/v1/transactions/history
// @access  Private (All authenticated)
exports.getHistory = async (req, res) => {
    try {
        let query = `
            SELECT t.*, b.title as book_title, u.name as member_name, l.name as librarian_name 
            FROM transactions t
            JOIN books b ON t.book_id = b.id
            JOIN users u ON t.member_id = u.id
            JOIN users l ON t.librarian_id = l.id
        `;
        let params = [];

        // If Member, they can only see their own history
        if (req.user.role === 'MEMBER') {
            query += ' WHERE t.member_id = ?';
            params.push(req.user.id);
        }

        query += ' ORDER BY t.borrow_date DESC';

        const [history] = await db.execute(query, params);
        res.json(history);
    } catch (err) {
        console.error('History error:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};
