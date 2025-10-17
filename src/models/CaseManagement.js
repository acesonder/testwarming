const db = require('../config/database');

class CaseManagement {
  // Create a new case
  static async create(caseData) {
    const { clientId, caseManagerId, status, priority, goalDescription, actionPlan } = caseData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO case_management (
          client_id, case_manager_id, status, priority, goal_description, action_plan
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [clientId, caseManagerId, status || 'open', priority || 'medium', goalDescription, actionPlan], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Get cases by client
  static async findByClientId(clientId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT cm.*, u.first_name as manager_first_name, u.last_name as manager_last_name
        FROM case_management cm
        LEFT JOIN users u ON cm.case_manager_id = u.id
        WHERE cm.client_id = ?
        ORDER BY cm.created_at DESC
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

  // Get cases by case manager
  static async findByCaseManager(caseManagerId, status = null) {
    let sql = `
      SELECT cm.*, c.first_name as client_first_name, c.last_name as client_last_name
      FROM case_management cm
      LEFT JOIN clients c ON cm.client_id = c.id
      WHERE cm.case_manager_id = ?
    `;
    const params = [caseManagerId];
    
    if (status) {
      sql += ' AND cm.status = ?';
      params.push(status);
    }
    
    sql += ' ORDER BY cm.updated_at DESC';
    
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Update case
  static async update(id, caseData) {
    const { status, priority, goalDescription, actionPlan, notes } = caseData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE case_management SET
          status = ?, priority = ?, goal_description = ?, action_plan = ?, notes = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(sql, [status, priority, goalDescription, actionPlan, notes, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Close case
  static async close(id, outcome) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE case_management SET
          status = 'closed', outcome = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(sql, [outcome, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = CaseManagement;
