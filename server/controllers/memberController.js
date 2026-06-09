const db = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc    Get all members
// @route   GET /api/v1/members
// @access  Private (Admin, Librarian)
exports.getAllMembers = async (req, res) => {
    try {
        const [members] = await db.execute(
            'SELECT id, username, name, role, created_at FROM users WHERE role = "MEMBER" ORDER BY created_at DESC'
        );
        res.json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add new member
// @route   POST /api/v1/members
// @access  Private (Admin)
exports.addMember = async (req, res) => {
    const { username, password, name } = req.body;

    try {
        if (!username || !password || !name) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await db.execute(
            'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, "MEMBER")',
            [username, hashedPassword, name]
        );

        res.status(201).json({
            message: 'Member created successfully',
            memberId: result.insertId
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username already exists' });
        }
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update member
// @route   PUT /api/v1/members/:id
// @access  Private (Admin)
exports.updateMember = async (req, res) => {
    const { username, name, password } = req.body;
    const { id } = req.params;

    try {
        const [user] = await db.execute('SELECT * FROM users WHERE id = ? AND role = "MEMBER"', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Member not found' });
        }

        let query = 'UPDATE users SET username = ?, name = ?';
        let params = [username, name];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ', password = ?';
            params.push(hashedPassword);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await db.execute(query, params);
        res.json({ message: 'Member updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete member
// @route   DELETE /api/v1/members/:id
// @access  Private (Admin)
exports.deleteMember = async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await db.execute('SELECT * FROM users WHERE id = ? AND role = "MEMBER"', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Member not found' });
        }

        await db.execute('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'Member deleted successfully' });
    } catch (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'Cannot delete member with active transaction history' });
        }
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
