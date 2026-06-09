const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// All book routes require login
router.use(verifyToken);

router.get('/', bookController.getAllBooks);

// Only Admin and Librarian can modify books
router.post('/', authorizeRoles('ADMIN', 'LIBRARIAN'), bookController.addBook);
router.put('/:id', authorizeRoles('ADMIN', 'LIBRARIAN'), bookController.updateBook);
router.delete('/:id', authorizeRoles('ADMIN', 'LIBRARIAN'), bookController.deleteBook);

module.exports = router;
