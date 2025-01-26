import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
    loginAdmin,
    getAllUsers,
    getUserById,
    deleteUserByIdController,
} from './controllers/adminController';
import { fetchNotesFromUserBackend } from './controllers/auditController';
import { adminAuthMiddleware } from './middlewares/adminAuthMiddleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    console.log('Request body:', req.body); // Log the body for all requests
    next();
});


// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/auth/login', loginAdmin);

app.use(adminAuthMiddleware);

//Cross-backend communication
app.get('/users', getAllUsers); // Fetch all users
app.get('/users/:id', getUserById); // Fetch specific user details
app.delete('/users/:id', deleteUserByIdController); // Delete a user profile

app.get('/audit/notes', fetchNotesFromUserBackend); //

// Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Admin Backend running on http://localhost:${PORT}`);
});
