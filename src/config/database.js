const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dbPath = process.env.DB_PATH || './data/outreach.db';
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        role TEXT DEFAULT 'staff',
        organization TEXT,
        phone TEXT,
        is_active INTEGER DEFAULT 1,
        reset_token TEXT,
        reset_token_expires INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        console.log('Users table ready');
      }
    });

    // Clients table
    db.run(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        date_of_birth TEXT,
        gender TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        zip_code TEXT,
        emergency_contact_name TEXT,
        emergency_contact_phone TEXT,
        notes TEXT,
        is_active INTEGER DEFAULT 1,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating clients table:', err.message);
      } else {
        console.log('Clients table ready');
      }
    });

    // Service History table
    db.run(`
      CREATE TABLE IF NOT EXISTS service_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        service_type TEXT NOT NULL,
        service_date TEXT NOT NULL,
        description TEXT,
        provided_by INTEGER,
        outcome TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (provided_by) REFERENCES users(id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating service_history table:', err.message);
      } else {
        console.log('Service History table ready');
      }
    });

    // Case Management table
    db.run(`
      CREATE TABLE IF NOT EXISTS case_management (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        case_manager_id INTEGER NOT NULL,
        status TEXT DEFAULT 'open',
        priority TEXT DEFAULT 'medium',
        goal_description TEXT,
        action_plan TEXT,
        notes TEXT,
        outcome TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (case_manager_id) REFERENCES users(id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating case_management table:', err.message);
      } else {
        console.log('Case Management table ready');
      }
    });

    // Consent Agreements table
    db.run(`
      CREATE TABLE IF NOT EXISTS consent_agreements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        consent_type TEXT NOT NULL,
        agreed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        signature TEXT,
        witnessed_by INTEGER,
        is_active INTEGER DEFAULT 1,
        revoked_at DATETIME,
        revoked_by INTEGER,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (witnessed_by) REFERENCES users(id),
        FOREIGN KEY (revoked_by) REFERENCES users(id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating consent_agreements table:', err.message);
      } else {
        console.log('Consent Agreements table ready');
      }
    });

    // Assessments table
    db.run(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        assessment_type TEXT NOT NULL,
        assessment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        assessment_data TEXT NOT NULL,
        assessed_by INTEGER,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (assessed_by) REFERENCES users(id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating assessments table:', err.message);
      } else {
        console.log('Assessments table ready');
      }
    });

    // Messages table for instant messaging
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_id INTEGER NOT NULL,
        recipient_id INTEGER NOT NULL,
        sender_type TEXT NOT NULL,
        recipient_type TEXT NOT NULL,
        content TEXT NOT NULL,
        conversation_id TEXT,
        is_read INTEGER DEFAULT 0,
        read_at DATETIME,
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating messages table:', err.message);
      } else {
        console.log('Messages table ready');
      }
    });

    // Create indexes for better performance
    db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(first_name, last_name)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_service_history_client ON service_history(client_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_case_management_client ON case_management(client_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_case_management_manager ON case_management(case_manager_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_consent_client ON consent_agreements(client_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_assessments_client ON assessments(client_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id, recipient_type)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id, sender_type)`);
  });
}

module.exports = db;
