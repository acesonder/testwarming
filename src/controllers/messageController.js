const Message = require('../models/Message');
const Client = require('../models/Client');
const User = require('../models/User');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, recipientType, content } = req.body;
    
    if (!recipientId || !recipientType || !content) {
      return res.status(400).json({ error: 'Recipient ID, type, and content are required' });
    }

    // Validate recipient type
    if (!['user', 'client'].includes(recipientType)) {
      return res.status(400).json({ error: 'Invalid recipient type' });
    }

    // Verify recipient exists
    if (recipientType === 'client') {
      const client = await Client.findById(recipientId);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
    } else {
      const user = await User.findById(recipientId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    const messageData = {
      senderId: req.user.id,
      recipientId,
      senderType: 'user',
      recipientType,
      content
    };

    const message = await Message.create(messageData);
    res.status(201).json({
      message: 'Message sent successfully',
      messageId: message.id
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get conversation
exports.getConversation = async (req, res) => {
  try {
    const { otherId, otherType } = req.params;
    const { limit, offset } = req.query;

    if (!['user', 'client'].includes(otherType)) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    const messages = await Message.getConversation(
      req.user.id,
      'user',
      parseInt(otherId),
      otherType,
      {
        limit: parseInt(limit) || 50,
        offset: parseInt(offset) || 0
      }
    );

    // Mark messages as read
    await Message.markAsRead(req.user.id, 'user', parseInt(otherId), otherType);

    res.json({ messages });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to retrieve conversation' });
  }
};

// Get conversations list
exports.getConversationsList = async (req, res) => {
  try {
    const conversations = await Message.getConversationsList(req.user.id, 'user');
    
    // Enrich with user/client names
    const enrichedConversations = await Promise.all(
      conversations.map(async (conv) => {
        let otherUserName = 'Unknown';
        if (conv.other_user_type === 'user') {
          const user = await User.findById(conv.other_user_id);
          if (user) {
            otherUserName = `${user.first_name} ${user.last_name}`;
          }
        } else if (conv.other_user_type === 'client') {
          const client = await Client.findById(conv.other_user_id);
          if (client) {
            otherUserName = `${client.first_name} ${client.last_name}`;
          }
        }
        return {
          ...conv,
          other_user_name: otherUserName
        };
      })
    );

    res.json({ conversations: enrichedConversations });
  } catch (error) {
    console.error('Get conversations list error:', error);
    res.status(500).json({ error: 'Failed to retrieve conversations' });
  }
};

// Get unread message count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.getUnreadCount(req.user.id, 'user');
    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Failed to retrieve unread count' });
  }
};
