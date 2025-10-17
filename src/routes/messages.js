const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Message operations
router.post('/', messageController.sendMessage);
router.get('/conversations', messageController.getConversationsList);
router.get('/conversations/:otherType/:otherId', messageController.getConversation);
router.get('/unread-count', messageController.getUnreadCount);

module.exports = router;
