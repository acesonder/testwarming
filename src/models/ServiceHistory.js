const db = require('../config/database');

class ServiceHistory {
  // Create a new service history entry
  static async create(serviceData) {
    const { clientId, serviceType, serviceDate, description, providedBy, outcome, notes } = serviceData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO service_history (
          client_id, service_type, service_date, description, provided_by, outcome, notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [clientId, serviceType, serviceDate, description, providedBy, outcome, notes], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Get service history for a client
  static async findByClientId(clientId, options = {}) {
    const { limit = 50, offset = 0 } = options;
    
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT sh.*, u.first_name as provider_first_name, u.last_name as provider_last_name
        FROM service_history sh
        LEFT JOIN users u ON sh.provided_by = u.id
        WHERE sh.client_id = ?
        ORDER BY sh.service_date DESC
        LIMIT ? OFFSET ?
      `;
      
      db.all(sql, [clientId, limit, offset], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Update service history entry
  static async update(id, serviceData) {
    const { serviceType, serviceDate, description, outcome, notes } = serviceData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE service_history SET
          service_type = ?, service_date = ?, description = ?, outcome = ?, notes = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(sql, [serviceType, serviceDate, description, outcome, notes, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = ServiceHistory;
