# User Backend

## Overview
A backend service for user management and note-taking functionality with role-based access control.

## Features
- User Registration and Login
- JWT Authentication
- CRUD Operations for Notes

## API Endpoints
### Authentication
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login and get a JWT token.

### Notes
- `GET /notes` - Fetch all notes of the authenticated user.
- `POST /notes` - Create a new note.
- `PATCH /notes/:id` - Update a specific note.
- `DELETE /notes/:id` - Delete a specific note.
