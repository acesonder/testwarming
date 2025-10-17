const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import database to initialize it
require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/clients');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/messages', messageRoutes);

// HTML Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/forgot-password.html'));
});

app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/reset-password.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.get('/clients', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/clients.html'));
});

app.get('/clients/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/client-profile.html'));
});

app.get('/messages', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/messages.html'));
});

app.get('/assessments', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assessments.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Homeless Outreach Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://0.0.0.0:${PORT}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   - GET  /              Home page`);
  console.log(`   - GET  /login         Login page`);
  console.log(`   - GET  /register      Registration page`);
  console.log(`   - GET  /dashboard     User dashboard`);
  console.log(`   - GET  /admin         Admin panel`);
  console.log(`   - POST /api/auth/register`);
  console.log(`   - POST /api/auth/login`);
  console.log(`   - POST /api/auth/forgot-password`);
  console.log(`   - POST /api/auth/reset-password`);
  console.log(`   - GET  /api/admin/users`);
  console.log(`\n💡 To create an admin user, use the register endpoint with role: "admin"\n`);
});

module.exports = app;
