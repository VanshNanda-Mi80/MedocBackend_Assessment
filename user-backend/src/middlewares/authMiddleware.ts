import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'shared_admin_secret_key';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_user_backend_secret@001');
        req.user = decoded as any;  // Type assertion if necessary
        next();
    } catch (err) {
        return res.status(403).send('Invalid token');
    }
};
