const db = require('../config/database');

class Client {
  // Create a new client
  static async create(clientData) {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      address,
      city,
      state,
      zipCode,
      emergencyContactName,
      emergencyContactPhone,
      notes,
      createdBy
    } = clientData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO clients (
          first_name, last_name, date_of_birth, gender, phone, email,
          address, city, state, zip_code, emergency_contact_name,
          emergency_contact_phone, notes, created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [
        firstName, lastName, dateOfBirth, gender, phone, email,
        address, city, state, zipCode, emergencyContactName,
        emergencyContactPhone, notes, createdBy
      ], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, firstName, lastName });
        }
      });
    });
  }

  // Find client by ID
  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM clients WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Get all clients
  static async findAll(options = {}) {
    const { search, limit = 100, offset = 0 } = options;
    
    let sql = 'SELECT * FROM clients';
    const params = [];
    
    if (search) {
      sql += ' WHERE first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }
    
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
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

  // Update client
  static async update(id, clientData) {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      address,
      city,
      state,
      zipCode,
      emergencyContactName,
      emergencyContactPhone,
      notes
    } = clientData;
    
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE clients SET
          first_name = ?, last_name = ?, date_of_birth = ?, gender = ?,
          phone = ?, email = ?, address = ?, city = ?, state = ?, zip_code = ?,
          emergency_contact_name = ?, emergency_contact_phone = ?, notes = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(sql, [
        firstName, lastName, dateOfBirth, gender, phone, email,
        address, city, state, zipCode, emergencyContactName,
        emergencyContactPhone, notes, id
      ], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Delete client (soft delete)
  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE clients SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}

module.exports = Client;
