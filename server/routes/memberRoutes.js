const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.use(verifyToken);

// Librarian can view but only Admin can modify
router.get('/', authorizeRoles('ADMIN', 'LIBRARIAN'), memberController.getAllMembers);
router.post('/', authorizeRoles('ADMIN'), memberController.addMember);
router.put('/:id', authorizeRoles('ADMIN'), memberController.updateMember);
router.delete('/:id', authorizeRoles('ADMIN'), memberController.deleteMember);

module.exports = router;
