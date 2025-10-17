const db = require('../config/database');

class ConsentAgreement {
  // Create a new consent agreement
  static async create(consentData) {
    const { clientId, consentType, agreedAt, signature, witnessedBy, notes } = consentData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO consent_agreements (
          client_id, consent_type, agreed_at, signature, witnessed_by, notes
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [clientId, consentType, agreedAt || new Date().toISOString(), signature, witnessedBy, notes], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Get consent agreements for a client
  static async findByClientId(clientId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT ca.*, u.first_name as witness_first_name, u.last_name as witness_last_name
        FROM consent_agreements ca
        LEFT JOIN users u ON ca.witnessed_by = u.id
        WHERE ca.client_id = ?
        ORDER BY ca.agreed_at DESC
      `;
      
      db.all(sql, [clientId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Revoke consent
  static async revoke(id, revokedBy) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE consent_agreements SET
          is_active = 0, revoked_at = CURRENT_TIMESTAMP, revoked_by = ?
        WHERE id = ?
      `;
      
      db.run(sql, [revokedBy, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = ConsentAgreement;
