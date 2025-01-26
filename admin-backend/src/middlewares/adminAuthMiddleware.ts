import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your_admin_backend_secret@001';

export const adminAuthMiddleware = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', req.headers.authorization);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: Token is missing or invalid');
    }

    const token = authHeader.split(' ')[1]; // Extract the token
    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
        req.admin = decoded; // Attach the admin data to the request object
        console.log('Decoded Token:', decoded);
        next();
    } catch (error) {
        res.status(403).send('Invalid token');
    }

};
