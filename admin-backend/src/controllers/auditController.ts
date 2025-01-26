import { Request, Response } from 'express';
import AuditLog from '../models/auditLogModel';
import axios from 'axios';

const USER_BACKEND_URL = process.env.USER_BACKEND_URL || 'http://localhost:3001';

// Fetch Notes from User Backend
export const fetchNotesFromUserBackend = async (req: Request, res: Response) => {
    try {
        const adminToken = req.headers.authorization;
        if (!adminToken) {
            return res.status(401).send('Unauthorized');
        }

        // Make a secure API call to the User Backend
        const response = await axios.get(`${USER_BACKEND_URL}/notes`, {
            headers: { Authorization: adminToken },
        });

        // Log the action
        const log = new AuditLog({
            action: 'Fetched user notes',
            adminId: req.admin?.adminId, // Safe access with TypeScript
        });
        await log.save();

        res.json(response.data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching notes:', error.message);
            res.status(500).send('Failed to fetch notes from User Backend');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};
