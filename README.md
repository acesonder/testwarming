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

### ✨ Phase 2 Features (v2.0)
- ✅ **Client Management System**
  - Comprehensive client profiles
  - Contact information management
  - Demographics tracking
  - Emergency contacts
  
- ✅ **Service History Tracking**
  - Document all services provided
  - Track service types and outcomes
  - Service provider attribution
  
- ✅ **Case Management**
  - Create and manage cases
  - Set goals and action plans
  - Priority and status tracking
  - Case manager assignment
  
- ✅ **Consent Agreements**
  - Digital consent forms
  - Signature tracking
  - Witness documentation
  - Revocation management
  
- ✅ **Assessment Forms**
  - Initial Intake Assessment
  - Mental Health Assessment
  - Work Assessment
  - Income Assessment
  - Addiction Assessment
  - Housing Assessment
  
- ✅ **Instant Messaging**
  - Staff-to-client messaging
  - Staff-to-staff messaging
  - Unread message tracking
  - Conversation history

### 🚀 Planned Features (Future Updates)
- Outreach visit logging with GPS
- Resource directory
- Reporting and analytics dashboard
- Multi-language support
- Mobile app companion
- Email/SMS notifications
- Document management and uploads
- Calendar and appointment scheduling

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
- **Client Management**: `/clients` - Client list and management (requires login)
- **Client Profile**: `/clients/:id` - Individual client profile (requires login)
- **Messages**: `/messages` - Instant messaging interface (requires login)
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

### Clients Table
- `id`: Unique identifier
- `first_name`: Client's first name
- `last_name`: Client's last name
- `date_of_birth`: Date of birth
- `gender`: Gender
- `phone`: Contact phone
- `email`: Email address
- `address`: Street address
- `city`: City
- `state`: State
- `zip_code`: ZIP code
- `emergency_contact_name`: Emergency contact name
- `emergency_contact_phone`: Emergency contact phone
- `notes`: General notes
- `is_active`: Active status
- `created_by`: User who created the record
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Service History Table
- `id`: Unique identifier
- `client_id`: Reference to client
- `service_type`: Type of service provided
- `service_date`: Date service was provided
- `description`: Service description
- `provided_by`: User who provided service
- `outcome`: Service outcome
- `notes`: Additional notes
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Case Management Table
- `id`: Unique identifier
- `client_id`: Reference to client
- `case_manager_id`: Assigned case manager
- `status`: Case status (open, closed, etc.)
- `priority`: Priority level (low, medium, high, urgent)
- `goal_description`: Case goals
- `action_plan`: Action plan details
- `notes`: Case notes
- `outcome`: Case outcome
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Consent Agreements Table
- `id`: Unique identifier
- `client_id`: Reference to client
- `consent_type`: Type of consent
- `agreed_at`: Agreement timestamp
- `signature`: Client signature
- `witnessed_by`: User who witnessed
- `is_active`: Active status
- `revoked_at`: Revocation timestamp
- `revoked_by`: User who revoked
- `notes`: Additional notes
- `created_at`: Creation timestamp

### Assessments Table
- `id`: Unique identifier
- `client_id`: Reference to client
- `assessment_type`: Type of assessment
- `assessment_date`: Assessment date
- `assessment_data`: JSON data for assessment responses
- `assessed_by`: User who conducted assessment
- `notes`: Additional notes
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Messages Table
- `id`: Unique identifier
- `sender_id`: Sender ID
- `recipient_id`: Recipient ID
- `sender_type`: Sender type (user, client)
- `recipient_type`: Recipient type (user, client)
- `content`: Message content
- `conversation_id`: Conversation identifier
- `is_read`: Read status
- `read_at`: Read timestamp
- `sent_at`: Sent timestamp

## 📁 Project Structure

```
testwarming/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── adminController.js   # Admin operations
│   │   ├── clientController.js  # Client management
│   │   └── messageController.js # Messaging system
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Client.js            # Client model
│   │   ├── ServiceHistory.js    # Service history model
│   │   ├── CaseManagement.js    # Case management model
│   │   ├── ConsentAgreement.js  # Consent agreement model
│   │   ├── Assessment.js        # Assessment model
│   │   └── Message.js           # Message model
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── admin.js             # Admin routes
│   │   ├── clients.js           # Client routes
│   │   └── messages.js          # Message routes
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
│   ├── admin.html               # Admin panel
│   ├── clients.html             # Client management
│   ├── client-profile.html      # Client profile
│   └── messages.html            # Messaging interface
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

### Clients (requires authentication)
- `POST /api/clients` - Create new client
- `GET /api/clients` - Get all clients (with search)
- `GET /api/clients/:id` - Get client by ID
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client (soft delete)

### Service History (requires authentication)
- `GET /api/clients/:id/service-history` - Get client service history
- `POST /api/clients/:id/service-history` - Add service history entry

### Case Management (requires authentication)
- `GET /api/clients/:id/cases` - Get client cases
- `POST /api/clients/:id/cases` - Create new case

### Consent Agreements (requires authentication)
- `GET /api/clients/:id/consents` - Get client consent agreements
- `POST /api/clients/:id/consents` - Add consent agreement

### Assessments (requires authentication)
- `GET /api/clients/:id/assessments` - Get client assessments (filter by type)
- `POST /api/clients/:id/assessments` - Add assessment

### Messages (requires authentication)
- `POST /api/messages` - Send a message
- `GET /api/messages/conversations` - Get conversations list
- `GET /api/messages/conversations/:type/:id` - Get conversation with user/client
- `GET /api/messages/unread-count` - Get unread message count

## 🤝 Contributing

This is a modular application designed to grow incrementally. Future features will be added based on needs and feedback from outreach organizations.

## 📝 Future Development Roadmap

### Phase 2 - Client Management ✅ COMPLETED
- ✅ Individual/client profile system
- ✅ Service history tracking
- ✅ Contact information management
- ✅ Case management system
- ✅ Consent agreements
- ✅ Assessment forms
- ✅ Instant messaging

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
