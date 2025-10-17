# 🏠 Homeless Outreach Platform

A comprehensive web application designed to assist people experiencing homelessness and the outreach staff, case managers, and service providers who work to support them.

## 🌟 Features

### Current Features (v1.0)
- ✅ **User Authentication System**
  - Secure user registration with role-based access
  - Login/logout functionality
  - Password reset/forgot password functionality
  - Session management with JWT tokens

- ✅ **Role-Based Access Control**
  - Admin: Full system access, user management
  - Outreach: Field staff coordination
  - Staff: General system access
  - Provider: Service provider access

- ✅ **Admin Panel**
  - View all users
  - Activate/deactivate user accounts
  - Change user roles
  - User management dashboard

- ✅ **User Dashboard**
  - Personal profile view
  - Role-specific interface

### 🚀 Planned Features (Future Updates)
- Client/individual tracking system
- Service coordination tools
- Outreach visit logging
- Resource directory
- Reporting and analytics
- Multi-language support
- Mobile-responsive design enhancements
- Email notifications
- Document management
- Case notes and history

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite (easily portable)
- **Authentication**: JWT, bcryptjs, express-session
- **Frontend**: HTML5, CSS3, Vanilla JavaScript

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/acesonder/testwarming.git
cd testwarming
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` to set your configuration (optional, defaults are provided).

4. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Running in GitHub Codespaces

This application is fully configured to run in GitHub Codespaces:

1. Open the repository in Codespaces
2. Run `npm install`
3. Run `npm start`
4. Codespaces will automatically forward the port and provide a URL to access the application

## 📱 Usage

### Creating Your First Admin Account

1. Navigate to `/register`
2. Fill out the registration form
3. Select "Administrator" as the role
4. Submit the form
5. Log in at `/login`

### Accessing Different Areas

- **Home Page**: `/` - Landing page with feature overview
- **Login**: `/login` - User login
- **Register**: `/register` - New user registration
- **Dashboard**: `/dashboard` - User dashboard (requires login)
- **Admin Panel**: `/admin` - Admin control panel (requires admin role)
- **Forgot Password**: `/forgot-password` - Request password reset
- **Reset Password**: `/reset-password?token=XXX` - Reset password with token

## 🔐 Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for API authentication
- Session-based authentication for web interface
- Role-based access control
- Password reset tokens with expiration
- Input validation
- SQL injection protection (parameterized queries)

## 🗄️ Database Schema

### Users Table
- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password
- `first_name`: User's first name
- `last_name`: User's last name
- `role`: User role (admin, outreach, staff, provider)
- `organization`: Organization name
- `phone`: Contact phone number
- `is_active`: Account status
- `reset_token`: Password reset token
- `reset_token_expires`: Token expiration timestamp
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

## 📁 Project Structure

```
testwarming/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── adminController.js   # Admin operations
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   └── User.js              # User model
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── admin.js             # Admin routes
│   └── server.js                # Main application entry
├── public/
│   ├── css/
│   │   └── styles.css           # Stylesheets
│   ├── js/
│   │   └── utils.js             # Frontend utilities
│   ├── index.html               # Home page
│   ├── login.html               # Login page
│   ├── register.html            # Registration page
│   ├── forgot-password.html     # Forgot password page
│   ├── reset-password.html      # Reset password page
│   ├── dashboard.html           # User dashboard
│   └── admin.html               # Admin panel
├── data/                        # Database files (auto-created)
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Node dependencies
└── README.md                    # This file
```

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Admin (requires admin role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - Get specific user
- `PATCH /api/admin/users/:userId/status` - Update user status
- `PATCH /api/admin/users/:userId/role` - Update user role

## 🤝 Contributing

This is a modular application designed to grow incrementally. Future features will be added based on needs and feedback from outreach organizations.

## 📝 Future Development Roadmap

### Phase 2 - Client Management
- Individual/client profile system
- Service history tracking
- Contact information management

### Phase 3 - Service Coordination
- Service provider directory
- Referral system
- Appointment scheduling

### Phase 4 - Outreach Tools
- Visit logging
- Location mapping
- Mobile app companion

### Phase 5 - Reporting & Analytics
- Service utilization reports
- Outcome tracking
- Dashboard analytics

## 📄 License

ISC

## 🙋 Support

For questions about adding new features or extending functionality, please open an issue in the repository.

---

**Note**: This application is designed to be run in a secure environment with proper data protection measures. Ensure you follow data privacy regulations (HIPAA, GDPR, etc.) when handling sensitive information about individuals experiencing homelessness.
