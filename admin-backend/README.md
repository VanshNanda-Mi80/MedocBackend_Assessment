# Admin Backend

## Overview
The assignment focuses on building two independent backend services that showcase role-based access control (RBAC) and secure data sharing between the two systems.

1. Created two Express/Node.js backends using TypeScript.
2. Used a single MongoDB cluster to store data, with some collections accessible across both backends.
3. Implemented role-based access:
- Backend 1 (User Backend): Handles user-specific functionalities.
- Backend 2 (Admin Backend): Focuses on administrative operations with
privileges to access data from Backend 1.
4. Demonstrated cross-backend data sharing using secure API calls.

## Features
Backend 2: Admin Backend

###Primary Features
1. Authentication
- POST /auth/login: Login as an admin and return a JWT.

2. Administrative Operations
- GET /users: Fetch all user profiles.
- GET /users/:id: Fetch details of a specific user.
- DELETE /users/:id: Delete a user profile.
- GET /audit/notes: Fetch notes data from Backend 1 via secure API calls.

3. Cross-Backend Communication
- Implement API calls to Backend 1 for accessing shared user and notes data.
- Use JWT or API keys to authenticate cross-backend requests.

Technical Details
- State Management: Use Providers or Static Class Members.
- HTTP Library: Use the default HTTP package for API responses.
- Implement appropriate middleware to validate JWT tokens and role permissions.

## API Endpoints
### Authentication
- `POST http://localhost:3002/auth/login:` - Login as an admin and return a JWT.

### Administrative Operations
- `GET http://localhost:3002/users:` - Fetch all user profiles.
- `GET http://localhost:3002/users/:id:` - Fetch details of a specific user.
- `DELETE http://localhost:3002/users/:id:` - Delete a user profile.
- `GET http://localhost:3002/audit/notes:` - Fetch notes data from Backend 1 via secure API calls.

## Setup
- Clone the repository: git clone https://github.com/VanshNanda-Mi80/MedocBackend_Assessment.git
- Navigate to the project directory: cd adminBackend
- Install dependencies: npm install
- For production, build and start: npm run build npm start
- Create a .env file in the root directory and include the following (adjust as needed):
- MONGODB_URI
- JWT_SECRET
- PORT
- ADMIN_SECRET
