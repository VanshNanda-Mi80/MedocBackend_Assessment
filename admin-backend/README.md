# Admin Backend

## Overview
The assignment focuses on building two independent backend services that showcase role-based access control (RBAC) and secure data sharing between the two systems.

1. Created two Express/Node.js backends using TypeScript.

2. Used a single MongoDB cluster to store data, with some collections accessible across both backends.

3. Implemented role-based access:
○ Backend 1 (User Backend): Handles user-specific functionalities.
○ Backend 2 (Admin Backend): Focuses on administrative operations with
privileges to access data from Backend 1.
4. Demonstrated cross-backend data sharing using secure API calls.

## Features
Backend 1: User Backend

Primary Features

1. Authentication
○ POST /auth/register: Register a new user.
○ POST /auth/login: Log in as a user and return a JWT.

2. User-Specific Operations
○ GET /notes: Fetch all notes of the authenticated user.
○ POST /notes: Create a new note.
○ PATCH /notes/:id: Update a specific note.
○ DELETE /notes/:id: Delete a specific note.

3. Shared Data Access
○ Expose limited data to Backend 2 (Admin Backend) via a secure endpoint.
○ Example: GET /admin/notes (Restricted to authorized admin tokens).

Technical Details
● State Management: Use Providers or Static Class Members.
● HTTP Library: Use the default HTTP package for API responses.
● Implement appropriate middleware to validate JWT tokens and role permissions.
