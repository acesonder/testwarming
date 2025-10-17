const db = require('../config/database');

class Message {
  // Create a new message
  static async create(messageData) {
    const { senderId, recipientId, senderType, recipientType, content, conversationId } = messageData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO messages (
          sender_id, recipient_id, sender_type, recipient_type, content, conversation_id
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [senderId, recipientId, senderType, recipientType, content, conversationId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Get conversation between two parties
  static async getConversation(user1Id, user1Type, user2Id, user2Type, options = {}) {
    const { limit = 50, offset = 0 } = options;
    
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT m.*
        FROM messages m
        WHERE (
          (m.sender_id = ? AND m.sender_type = ? AND m.recipient_id = ? AND m.recipient_type = ?)
          OR
          (m.sender_id = ? AND m.sender_type = ? AND m.recipient_id = ? AND m.recipient_type = ?)
        )
        ORDER BY m.sent_at DESC
        LIMIT ? OFFSET ?
      `;
      
      db.all(sql, [
        user1Id, user1Type, user2Id, user2Type,
        user2Id, user2Type, user1Id, user1Type,
        limit, offset
      ], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.reverse()); // Return in chronological order
        }
      });
    });
  }

  // Get conversations list for a user
  static async getConversationsList(userId, userType) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT DISTINCT
          CASE 
            WHEN m.sender_id = ? AND m.sender_type = ? THEN m.recipient_id
            ELSE m.sender_id
          END as other_user_id,
          CASE 
            WHEN m.sender_id = ? AND m.sender_type = ? THEN m.recipient_type
            ELSE m.sender_type
          END as other_user_type,
          MAX(m.sent_at) as last_message_time,
          (SELECT content FROM messages m2 
           WHERE (
             (m2.sender_id = ? AND m2.sender_type = ? AND m2.recipient_id = other_user_id AND m2.recipient_type = other_user_type)
             OR
             (m2.recipient_id = ? AND m2.recipient_type = ? AND m2.sender_id = other_user_id AND m2.sender_type = other_user_type)
           )
           ORDER BY m2.sent_at DESC LIMIT 1
          ) as last_message,
          SUM(CASE WHEN m.recipient_id = ? AND m.recipient_type = ? AND m.is_read = 0 THEN 1 ELSE 0 END) as unread_count
        FROM messages m
        WHERE (m.sender_id = ? AND m.sender_type = ?) OR (m.recipient_id = ? AND m.recipient_type = ?)
        GROUP BY other_user_id, other_user_type
        ORDER BY last_message_time DESC
      `;
      
      db.all(sql, [
        userId, userType, userId, userType,
        userId, userType, userId, userType,
        userId, userType,
        userId, userType, userId, userType
      ], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Mark messages as read
  static async markAsRead(recipientId, recipientType, senderId, senderType) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE messages SET is_read = 1, read_at = CURRENT_TIMESTAMP
        WHERE recipient_id = ? AND recipient_type = ? AND sender_id = ? AND sender_type = ? AND is_read = 0
      `;
      
      db.run(sql, [recipientId, recipientType, senderId, senderType], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Get unread message count
  static async getUnreadCount(userId, userType) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT COUNT(*) as count
        FROM messages
        WHERE recipient_id = ? AND recipient_type = ? AND is_read = 0
      `;
      
      db.get(sql, [userId, userType], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count);
        }
      });
    });
  }
}

module.exports = Message;
