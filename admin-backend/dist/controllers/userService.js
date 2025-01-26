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
exports.deleteUserById = exports.fetchUserById = exports.fetchAllUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const USER_BACKEND_URL = process.env.USER_BACKEND_URL || 'http://localhost:3001';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'shared_admin_secret_key';
// Fetch All Users
const fetchAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${USER_BACKEND_URL}/users`, {
            headers: { Authorization: `Bearer ${ADMIN_SECRET}` },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Error fetching users:', error.message);
        }
        else {
            console.error('Unknown error:', error);
        }
        throw new Error('Failed to fetch users from user backend');
    }
});
exports.fetchAllUsers = fetchAllUsers;
// Fetch Specific User
const fetchUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${USER_BACKEND_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${ADMIN_SECRET}` },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Error fetching user details:', error.message);
        }
        else {
            console.error('Unknown error:', error);
        }
        throw new Error('Failed to fetch user details from user backend');
    }
});
exports.fetchUserById = fetchUserById;
// Delete User
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.delete(`${USER_BACKEND_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${ADMIN_SECRET}` },
        });
        return response.status === 204; // Return true if deletion was successful
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return false; // Return false if deletion failed
    }
});
exports.deleteUserById = deleteUserById;
