const db = require('../config/database');

class Assessment {
  // Create a new assessment
  static async create(assessmentData) {
    const { clientId, assessmentType, assessmentData: data, assessedBy, notes } = assessmentData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO assessments (
          client_id, assessment_type, assessment_data, assessed_by, notes
        )
        VALUES (?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [clientId, assessmentType, JSON.stringify(data), assessedBy, notes], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Get assessments for a client
  static async findByClientId(clientId, assessmentType = null) {
    let sql = `
      SELECT a.*, u.first_name as assessor_first_name, u.last_name as assessor_last_name
      FROM assessments a
      LEFT JOIN users u ON a.assessed_by = u.id
      WHERE a.client_id = ?
    `;
    const params = [clientId];
    
    if (assessmentType) {
      sql += ' AND a.assessment_type = ?';
      params.push(assessmentType);
    }
    
    sql += ' ORDER BY a.assessment_date DESC';
    
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Parse JSON data
          const parsedRows = rows.map(row => ({
            ...row,
            assessment_data: JSON.parse(row.assessment_data)
          }));
          resolve(parsedRows);
        }
      });
    });
  }

  // Get assessment by ID
  static async findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT a.*, u.first_name as assessor_first_name, u.last_name as assessor_last_name
        FROM assessments a
        LEFT JOIN users u ON a.assessed_by = u.id
        WHERE a.id = ?
      `;
      
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            row.assessment_data = JSON.parse(row.assessment_data);
          }
          resolve(row);
        }
      });
    });
  }

  // Update assessment
  static async update(id, assessmentData) {
    const { assessmentData: data, notes } = assessmentData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE assessments SET
          assessment_data = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(sql, [JSON.stringify(data), notes, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = Assessment;
