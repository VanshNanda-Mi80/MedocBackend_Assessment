"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authController_1 = require("./controllers/authController");
const notesController_1 = require("./controllers/notesController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const usersController_1 = require("./controllers/usersController");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests from your admin backend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
};
// Use CORS middleware
app.use((0, cors_1.default)(corsOptions));
// MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGODB_URI || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Auth Routes
app.post('/auth/register', authController_1.registerUser);
app.post('/auth/login', authController_1.loginUser);
// Notes Routes (Protected by Authentication Middleware)
app.use(authMiddleware_1.authMiddleware);
app.get('/notes', notesController_1.getNotes);
app.post('/notes', notesController_1.createNote);
app.patch('/notes/:id', notesController_1.updateNote);
app.delete('/notes/:id', notesController_1.deleteNote);
// User Management Routes
app.get('/users', usersController_1.getAllUsers); // Fetch all user profiles
app.get('/users/:id', usersController_1.getUserById); // Fetch details of a specific user
app.delete('/users/:id', usersController_1.deleteUserById); // Delete a user profile
// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`User Backend running on http://localhost:${PORT}`);
});
