# Changelog

All notable changes to the Homeless Outreach Platform will be documented in this file.

## [1.0.0] - 2025-10-17

### Added - Initial Release

#### Core Features
- Complete user authentication system
  - User registration with role-based access
  - Secure login/logout functionality
  - Password hashing with bcryptjs
  - JWT token and session-based authentication
  
- Password recovery system
  - Forgot password functionality
  - Secure password reset with time-limited tokens
  
- User role management
  - Four roles: Admin, Outreach, Staff, Provider
  - Role-based access control middleware
  
- Admin panel
  - View all registered users
  - Activate/deactivate user accounts
  - Change user roles
  - Comprehensive user management interface
  
- User dashboard
  - Personal profile view
  - Role-specific access
  - Modern, responsive interface

#### Technical Implementation
- Express.js web server
- SQLite database with automatic schema initialization
- Modular architecture (routes, controllers, models, middleware)
- RESTful API design
- Responsive HTML/CSS frontend
- Environment variable configuration
- GitHub Codespaces ready

#### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile
- `GET /api/admin/users` - List all users (admin)
- `GET /api/admin/users/:userId` - Get specific user (admin)
- `PATCH /api/admin/users/:userId/status` - Update user status (admin)
- `PATCH /api/admin/users/:userId/role` - Update user role (admin)

#### Security
- Password hashing (bcrypt)
- JWT token authentication
- Session management
- SQL injection protection (parameterized queries)
- Input validation
- Password strength requirements (minimum 8 characters)

#### Documentation
- Comprehensive README.md
- GETTING_STARTED.md guide
- API documentation
- Environment variable examples
- Codespace configuration

### Database Schema

#### Users Table
- User identification (id, email)
- Authentication (password hash)
- Profile information (first_name, last_name, organization, phone)
- Access control (role, is_active)
- Password recovery (reset_token, reset_token_expires)
- Timestamps (created_at, updated_at)

## [Planned] - Future Releases

### Version 2.0 - Client Management
- Individual/client profile system
- Contact information management
- Service history tracking
- Notes and documentation

### Version 3.0 - Service Coordination
- Service provider directory
- Referral system
- Appointment scheduling
- Resource tracking

### Version 4.0 - Outreach Tools
- Visit logging
- Location/map integration
- Mobile-friendly interface
- Offline capability

### Version 5.0 - Analytics & Reporting
- Service utilization reports
- Outcome tracking
- Dashboard analytics
- Export capabilities

---

## Notes

This project follows modular development, with features added incrementally based on user needs and feedback. Each version will be documented here with detailed changes.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
