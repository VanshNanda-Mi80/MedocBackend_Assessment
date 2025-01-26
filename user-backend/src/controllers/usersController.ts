import { Request, Response } from 'express';
import User from '../models/userModel'; // Assuming you have a User model defined

// Fetch All User Profiles
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, '_id name email'); // Fetch specific fields only
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Failed to fetch users');
    }
};

// Fetch Details of a Specific User
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id, '_id name email'); // Fetch specific fields only
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send('Failed to fetch user details');
    }
};

// Delete a User Profile
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id); // Delete the user by ID
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Failed to delete user');
    }
};
