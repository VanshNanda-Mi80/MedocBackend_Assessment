"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByIdController = exports.getUserById = exports.getAllUsers = exports.loginAdmin = void 0;
const userService_1 = require("./userService");
const userService_2 = require("./userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_admin_backend_secret@001';
// Admin Login
const loginAdmin = (req, res) => {
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'MedocHealth@IT.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'MHITPL@9999';
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ adminId: 'adminId' }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated token:', token); // Log the token
        return res.json({ token });
    }
    console.log('Invalid credentials'); // Log invalid attempt
    res.status(401).send('Invalid credentials');
};
exports.loginAdmin = loginAdmin;
// Base URL for the user backend
const USER_BACKEND_URL = process.env.USER_BACKEND_URL || 'http://localhost:3001';
// Fetch All Users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.fetchAllUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).send('Failed to fetch users');
    }
});
exports.getAllUsers = getAllUsers;
// Fetch Specific User
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userService_1.fetchUserById)(id);
        res.json(user);
    }
    catch (error) {
        res.status(500).send('Failed to fetch user details');
    }
});
exports.getUserById = getUserById;
// Delete a User
const deleteUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield (0, userService_2.deleteUserById)(id);
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (error) {
        res.status(500).send('Failed to delete user');
    }
});
exports.deleteUserByIdController = deleteUserByIdController;
