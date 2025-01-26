import axios from 'axios';
import { AxiosError } from 'axios';

const USER_BACKEND_URL = process.env.USER_BACKEND_URL || 'http://localhost:3001';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'shared_admin_secret_key';

// Fetch All Users
export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${USER_BACKEND_URL}/users`, {
            headers: { Authorization: `Bearer ${ADMIN_SECRET}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching users:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw new Error('Failed to fetch users from user backend');
    }
};

// Fetch Specific User
export const fetchUserById = async (userId: string) => {
    try {
        const response = await axios.get(`${USER_BACKEND_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${ADMIN_SECRET}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching user details:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw new Error('Failed to fetch user details from user backend');
    }
};

// Delete User
export const deleteUserById = async (userId: string): Promise<boolean> => {
  try {
      const response = await axios.delete(`${USER_BACKEND_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${ADMIN_SECRET}` },
      });
      return response.status === 204;  // Return true if deletion was successful
  } catch (error) {
      console.error('Error deleting user:', error);
      return false;  // Return false if deletion failed
  }
};
