"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_admin_backend_secret@001';
const adminAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', req.headers.authorization);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: Token is missing or invalid');
    }
    const token = authHeader.split(' ')[1]; // Extract the token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Verify the token
        req.admin = decoded; // Attach the admin data to the request object
        console.log('Decoded Token:', decoded);
        next();
    }
    catch (error) {
        res.status(403).send('Invalid token');
    }
};
exports.adminAuthMiddleware = adminAuthMiddleware;
