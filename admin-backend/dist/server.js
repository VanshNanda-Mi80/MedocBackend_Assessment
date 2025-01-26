"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const adminController_1 = require("./controllers/adminController");
const auditController_1 = require("./controllers/auditController");
const adminAuthMiddleware_1 = require("./middlewares/adminAuthMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    console.log('Request body:', req.body); // Log the body for all requests
    next();
});
// MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGODB_URI || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Routes
app.post('/auth/login', adminController_1.loginAdmin);
app.use(adminAuthMiddleware_1.adminAuthMiddleware);
//Cross-backend communication
app.get('/users', adminController_1.getAllUsers); // Fetch all users
app.get('/users/:id', adminController_1.getUserById); // Fetch specific user details
app.delete('/users/:id', adminController_1.deleteUserByIdController); // Delete a user profile
app.get('/audit/notes', auditController_1.fetchNotesFromUserBackend); //
// Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Admin Backend running on http://localhost:${PORT}`);
});
