# Getting Started with Homeless Outreach Platform

## Quick Start

### 1. Installation
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will be available at http://localhost:3000

### 3. Create Your First Admin Account

1. Open your browser and navigate to http://localhost:3000
2. Click "Register" button
3. Fill in the registration form:
   - First Name: Your first name
   - Last Name: Your last name
   - Email: Your email address
   - Password: At least 8 characters
   - Role: Select "Administrator"
   - Organization: Your organization name (optional)
   - Phone: Your phone number (optional)
4. Click "Register"
5. You'll be redirected to the login page
6. Log in with your credentials

## Available Pages

- **Home** (`/`) - Landing page with feature overview
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Forgot Password** (`/forgot-password`) - Request password reset
- **Reset Password** (`/reset-password?token=XXX`) - Reset your password
- **Dashboard** (`/dashboard`) - User dashboard (requires login)
- **Admin Panel** (`/admin`) - Admin control panel (requires admin role)

## User Roles

The system supports four user roles:

1. **Admin** - Full system access, can manage all users
2. **Outreach** - Outreach worker with field access
3. **Staff** - General staff member
4. **Provider** - Service provider access

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout (requires auth)
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Admin Operations (requires admin role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - Get specific user
- `PATCH /api/admin/users/:userId/status` - Activate/deactivate user
- `PATCH /api/admin/users/:userId/role` - Change user role

## Testing the API

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "staff",
    "organization": "My Organization"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'
```

### Request Password Reset
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Get All Users (Admin)
```bash
curl http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Configuration

The application uses environment variables for configuration. Copy `.env.example` to `.env` and modify as needed:

```bash
cp .env.example .env
```

Key configuration options:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_PATH` - SQLite database path
- `JWT_SECRET` - Secret key for JWT tokens
- `SESSION_SECRET` - Secret key for sessions

## Security Notes

1. **Change Secrets**: Always change `JWT_SECRET` and `SESSION_SECRET` in production
2. **Use HTTPS**: In production, always use HTTPS
3. **Strong Passwords**: Enforce strong passwords (minimum 8 characters)
4. **Regular Backups**: Backup the SQLite database regularly (located at `./data/outreach.db`)

## Database

The application uses SQLite for data storage. The database is automatically created on first run at `./data/outreach.db`.

### Database Schema

**Users Table:**
- `id` - Unique identifier
- `email` - User email (unique)
- `password` - Hashed password
- `first_name` - User's first name
- `last_name` - User's last name
- `role` - User role (admin, outreach, staff, provider)
- `organization` - Organization name
- `phone` - Contact phone
- `is_active` - Account status (1=active, 0=inactive)
- `reset_token` - Password reset token
- `reset_token_expires` - Token expiration timestamp
- `created_at` - Account creation date
- `updated_at` - Last update date

## Troubleshooting

### Server won't start
- Make sure port 3000 is not already in use
- Check that all dependencies are installed: `npm install`
- Verify Node.js version (requires v14 or higher)

### Can't login
- Verify the email and password are correct
- Check that the user account is active
- Try requesting a password reset

### Database errors
- Ensure the `data/` directory exists and is writable
- Try deleting `data/outreach.db` and restarting (will lose all data)

## Next Steps

Now that your system is up and running, you can:

1. **Add Users**: Register outreach staff and service providers
2. **Manage Access**: Use the admin panel to control user roles and access
3. **Plan Features**: Think about what additional features you need
4. **Extend**: The modular architecture makes it easy to add new features

## Getting Help

For questions or issues:
1. Check this documentation
2. Review the README.md for more details
3. Open an issue in the repository

## Future Development

This platform is designed for incremental feature additions. Planned phases include:

- **Phase 2**: Client/individual management
- **Phase 3**: Service coordination and referrals
- **Phase 4**: Outreach visit logging
- **Phase 5**: Reporting and analytics

Each phase will be developed iteratively based on your needs and feedback!
