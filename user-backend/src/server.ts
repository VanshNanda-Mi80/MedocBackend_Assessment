import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { registerUser, loginUser } from './controllers/authController';
import { getNotes, createNote, updateNote, deleteNote } from './controllers/notesController';
import { authMiddleware } from './middlewares/authMiddleware';
import { getAllUsers, getUserById, deleteUserById } from './controllers/usersController';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3001', // Allow requests from your admin backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
};

// Use CORS middleware
app.use(cors(corsOptions));

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Auth Routes
app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);

// Notes Routes (Protected by Authentication Middleware)
app.use(authMiddleware);

app.get('/notes', getNotes);
app.post('/notes', createNote);
app.patch('/notes/:id', updateNote);
app.delete('/notes/:id', deleteNote);

// User Management Routes
app.get('/users', getAllUsers); // Fetch all user profiles
app.get('/users/:id', getUserById); // Fetch details of a specific user
app.delete('/users/:id', deleteUserById); // Delete a user profile

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`User Backend running on http://localhost:${PORT}`);
});
