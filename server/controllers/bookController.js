const db = require('../config/db');

// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public (Authenticated)
exports.getAllBooks = async (req, res) => {
    try {
        const [books] = await db.execute('SELECT * FROM books ORDER BY created_at DESC');
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add new book
// @route   POST /api/v1/books
// @access  Private (Admin, Librarian)
exports.addBook = async (req, res) => {
    const { title, author, isbn, category, stock } = req.body;

    try {
        if (!title || !author || !isbn) {
            return res.status(400).json({ message: 'Title, author, and ISBN are required' });
        }

        const [result] = await db.execute(
            'INSERT INTO books (title, author, isbn, category, stock) VALUES (?, ?, ?, ?, ?)',
            [title, author, isbn, category, stock || 0]
        );

        res.status(201).json({
            message: 'Book added successfully',
            bookId: result.insertId
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'ISBN already exists' });
        }
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update book
// @route   PUT /api/v1/books/:id
// @access  Private (Admin, Librarian)
exports.updateBook = async (req, res) => {
    const { title, author, isbn, category, stock } = req.body;
    const { id } = req.params;

    try {
        const [book] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
        if (book.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await db.execute(
            'UPDATE books SET title = ?, author = ?, isbn = ?, category = ?, stock = ? WHERE id = ?',
            [title, author, isbn, category, stock, id]
        );

        res.json({ message: 'Book updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete book
// @route   DELETE /api/v1/books/:id
// @access  Private (Admin, Librarian)
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const [book] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
        if (book.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await db.execute('DELETE FROM books WHERE id = ?', [id]);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'Cannot delete book with active transaction history' });
        }
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
