const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.use(verifyToken);

// Admin and Librarian can process borrow/return
router.post('/borrow', authorizeRoles('ADMIN', 'LIBRARIAN'), transactionController.borrowBook);
router.put('/:id/return', authorizeRoles('ADMIN', 'LIBRARIAN'), transactionController.returnBook);

// Everyone can view history (filtered by role in controller)
router.get('/history', transactionController.getHistory);

module.exports = router;
