"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'shared_admin_secret_key';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Check for Admin Backend Token
    if (authHeader === `Bearer ${ADMIN_SECRET}`) {
        return next(); // Bypass authentication for admin backend requests
    }
    // Usual Authentication Logic for Users
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Authorization token required');
    }
    try {
        // Verify user token logic (e.g., JWT verification)
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_user_backend_secret@001');
        req.user = decoded; // Type assertion if necessary
        next();
    }
    catch (err) {
        return res.status(403).send('Invalid token');
    }
};
exports.authMiddleware = authMiddleware;
