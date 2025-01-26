import { Request, Response } from 'express';
import { fetchAllUsers, fetchUserById} from './userService';
import { deleteUserById } from './userService';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const JWT_SECRET = process.env.JWT_SECRET || 'your_admin_backend_secret@001';

// Admin Login
export const loginAdmin = (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'MedocHealth@IT.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'MHITPL@9999';
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ adminId: 'adminId' }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated token:', token);  // Log the token
        return res.json({ token });
    }
    console.log('Invalid credentials');  // Log invalid attempt
    res.status(401).send('Invalid credentials');
};


// Base URL for the user backend
const USER_BACKEND_URL = process.env.USER_BACKEND_URL || 'http://localhost:3001';

// Fetch All Users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await fetchAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send('Failed to fetch users');
    }
};

// Fetch Specific User
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await fetchUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).send('Failed to fetch user details');
    }
};

// Delete a User
export const deleteUserByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await deleteUserById(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Failed to delete user');
    }
};
